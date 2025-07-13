import {useEffect, useRef, useState} from "react";
import {Avatar, Button, Card, message, Modal} from "antd";
import ProfileItem from "./ProfileItem";
import UpdateProfileModal from "./UpdateProfileModal";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import {useDispatch} from "react-redux";
import {setAvatar} from "../../../config/store/userSlice";
import {formatDate} from "../../../common/helper";

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [isAvatarUpdating,setIsAvatarUpdating] = useState(false);
  const [isUpdateAvatarModalOpen, setIsUpdateAvatarModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const fileQrInputRef = useRef(null);
  const [isQrUpdating, setIsQrUpdating] = useState(false);
  const [isCredentialsModalOpen, setIsCredentialsModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);

  const dispatch = useDispatch();
  const isInstructor = userData?.role === "INSTRUCTOR";
  const safeText = (value) => value || "N/A";

  const getUserProfile = async () => {
    try {
      const response = await axiosInstance.get(commonApi.viewProfile.url);
      console.log(response);
      if (response.data && response.data.code === 1000 && response.data.result) {
        setUserData(response.data.result);
      } else {
        message.error("Failed to fetch user information");
      }
    } catch (e) {
      console.log(e);
      message.error("Error occurred while fetching user information");
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateUser = async (updatedValues) => {
    try {
      const response = await axiosInstance.put(commonApi.updateProfile.url, updatedValues);

      if (response.data && response.data.code === 1000 && response.data.result) {
        setUserData(response.data.result);
        message.success("Profile updated successfully");
      } else {
        message.error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      message.error("An error occurred while updating profile");
    } finally {
      setIsModalOpen(false);
    }
  };

  // Handle open avatar modal
  const handleAvatarClick = () => {
    setIsAvatarModalOpen(true);
  };

  // Handle close avatar modal
  const handleCloseAvatarModal = () => {
    setIsAvatarModalOpen(false);
  };

  // Handle open update avatar modal
  const handleUpdateAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle avatar upload
  const handleAvatarUpdate = async (file) => {
    setIsAvatarUpdating(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.put(commonApi.updateAvatar.url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data && response.data.code === 1000 && response.data.result) {
        dispatch(setAvatar(response.data.result.avatar));
        setUserData(response.data.result);
        message.success("Avatar updated successfully");
      } else {
        message.error("Failed to update avatar");
      }
    } catch (error) {
      console.error("Error updating avatar:", error);
      message.error("An error occurred while updating avatar");
    } finally {
      setIsAvatarUpdating(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const formattedDate = userData.createdAt
    ? formatDate(userData.createdAt)
    : "";

  const handleOpenCredentialsModal = () => {
    setIsCredentialsModalOpen(true);
  };

  const handleCloseCredentialsModal = () => {
    setIsCredentialsModalOpen(false);
  };

  const handleOpenQrModal = () => {
    setIsQrModalOpen(true);
  };

  const handleCloseQrModal = () => {
    setIsQrModalOpen(false);
  };

  const handleUpdateQrClick = () => {
    if (fileQrInputRef.current) {
      fileQrInputRef.current.click();
    }
  };

  const handleQrUpdate = async (file) => {
    setIsQrUpdating(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axiosInstance.put(commonApi.updateQr.url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (response.data && response.data.code === 1000 && response.data.result) {
        setUserData(response.data.result);
        message.success("QR Code updated successfully");
      } else {
        message.error("Failed to update QR Code");
      }
    } catch (error) {
      console.error("Error updating QR Code:", error);
      message.error("An error occurred while updating QR Code");
    } finally {
      setIsQrUpdating(false);
    }
  };

  return (
    <div className="w-full h-full pt-2">
      <Card title="Profile" className="w-full shadow-lg">
        <div className="max-w-xl">
          <div className="flex items-center mb-6">
            <Avatar
              src={userData.avatar}
              size={96}
              className="mr-4 border-2 border-pink-500"
              onClick={handleAvatarClick}
            />
            <div>
              <h3 className="text-xl font-bold">{userData.name}</h3>
              <p className="text-gray-500">@{userData.username}</p>
            </div>
          </div>

          <Button type="primary" className="mb-6" onClick={handleOpenModal}>
            Update Profile
          </Button>

          <div className="space-y-2">
            <ProfileItem label="Email" value={userData.username} />
            <ProfileItem label="Full Name" value={safeText(userData.name)} />
            <ProfileItem label="Phone Number" value={safeText(userData.phoneNumber)} />
            <ProfileItem label="Biography" value={safeText(userData.bio)} />
            <ProfileItem label="Registration Date" value={safeText(formattedDate)} />

            {isInstructor && (
                <>
                  <ProfileItem
                      label="Teaching Credentials"
                      value={
                        userData.teachingCredentials ? (
                            <button
                                onClick={handleOpenCredentialsModal}
                                className="text-blue-600 underline"
                            >
                              View Credentials
                            </button>
                        ) : (
                            "N/A"
                        )
                      }
                  />

                  <ProfileItem label="Educational Background" value={safeText(userData.educationalBackground)} />

                  <ProfileItem
                      label="QR Code"
                      value={
                        userData.qrCodeUrl ? (
                            <button
                                onClick={handleOpenQrModal}
                                className="text-blue-600 underline"
                            >
                              View QR Code
                            </button>
                        ) : (
                            "N/A"
                        )
                      }
                  />
                </>
            )}
          </div>
        </div>
      </Card>

      {/* Avatar Modal */}
      <Modal
        title="Your Avatar"
        open={isAvatarModalOpen}
        onCancel={handleCloseAvatarModal}
        footer={null}
      >
        <div className="flex justify-center">
          <img src={userData.avatar} alt="Avatar" className="max-w-full max-h-96 object-contain" />
        </div>
        <div className="flex justify-center mt-4">
          <Button
            type="primary"
            loading={isAvatarUpdating}
            onClick={handleUpdateAvatarClick}
          >
            Update Avatar
          </Button>
        </div>
      </Modal>

      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) {
            handleAvatarUpdate(file);
          }
        }}
        accept="image/*"
        style={{ display: "none" }}
      />

      <input
          type="file"
          ref={fileQrInputRef}
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              handleQrUpdate(file);
            }
          }}
          accept="image/*"
          style={{ display: "none" }}
      />

      {/* Profile Update Modal */}
      <UpdateProfileModal
        visible={isModalOpen}
        onCancel={handleCancelModal}
        initialValues={userData}
        onSubmit={handleUpdateUser}
      />

      <Modal
          title="Teaching Credentials"
          open={isCredentialsModalOpen}
          onCancel={handleCloseCredentialsModal}
          footer={null}
          width="60vw"
          centered
      >
        <div className="flex justify-center">
          <img
              src={userData.teachingCredentials}
              alt="Teaching Credentials"
              className="w-[85vw] h-auto max-h-[65vh] object-contain rounded shadow-md"
          />
        </div>
      </Modal>

      <Modal
          title="Your QR Code"
          open={isQrModalOpen}
          onCancel={handleCloseQrModal}
          footer={null}
          centered
      >
        <div className="flex justify-center">
          <img
              src={userData.qrCodeUrl}
              alt="QR Code"
              className="w-[65vw] h-auto max-h-[65vh] object-contain rounded shadow-md"
          />
        </div>
        <div className="flex justify-center mt-4">
          <Button
              type="primary"
              loading={isQrUpdating}
              onClick={handleUpdateQrClick}
          >
            Update QR Code
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default UserProfilePage;

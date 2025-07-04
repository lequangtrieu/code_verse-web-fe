import { useEffect, useState, useRef } from "react";
import { Button, Avatar, Card, message, Modal, Upload } from "antd";
import ProfileItem from "./ProfileItem";
import UpdateProfileModal from "./UpdateProfileModal";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { useDispatch } from "react-redux";
import { setAvatar } from "../../../config/store/userSlice";

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
  const [setIsAvatarUpdating] = useState(false);
  const [setIsUpdateAvatarModalOpen] = useState(false);
  const fileInputRef = useRef(null);

  const dispatch = useDispatch();

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
      setIsUpdateAvatarModalOpen(false);
    }
  };

  if (!userData) {
    return <div>Loading...</div>;
  }

  const formattedDate = userData.createdAt
    ? new Date(userData.createdAt).toLocaleString()
    : "";

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
            <ProfileItem label="Full Name" value={userData.name} />
            <ProfileItem label="Phone Number" value={userData.phoneNumber} />
            <ProfileItem label="Biography" value={userData.bio} />
            <ProfileItem label="Registration Date" value={formattedDate} />
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

      {/* Profile Update Modal */}
      <UpdateProfileModal
        visible={isModalOpen}
        onCancel={handleCancelModal}
        initialValues={userData}
        onSubmit={handleUpdateUser}
      />
    </div>
  );
};

export default UserProfilePage;

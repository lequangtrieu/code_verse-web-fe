import React, { useEffect, useState } from "react";
import { Button, Avatar, Card, message } from "antd";
import ProfileItem from "./ProfileItem";
import UpdateProfileModal from "./UpdateProfileModal";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";

const UserProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

        <UpdateProfileModal
            visible={isModalOpen}
            initialValues={userData}
            onCancel={handleCancelModal}
            onSubmit={handleUpdateUser}
        />
      </div>
  );
};

export default UserProfilePage;

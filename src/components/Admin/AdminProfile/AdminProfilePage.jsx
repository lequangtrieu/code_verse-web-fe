import { useState } from "react";
import { Modal, Form, Input, Button, Upload, message, Avatar } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ProfileItem from "../AdminProfile/ProfileItem";

const userProfile = {
  id: 1,
  firstName: "Michael",
  lastName: "Nguyen",
  username: "obema007",
  email: "obema@example.com",
  phoneNumber: "+5445625987",
  registrationDate: "20, January 2024 9:00 PM",
  role: "Admin",
  biography: "Hello, it's really a pain to be followed. I am sorry for the elders, we accuse the chosen one...",
  avatar: "https://lumiere-a.akamaihd.net/v1/images/a_avatarpandorapedia_moat_16x9_1098_07_23778d78.jpeg?region=0%2C0%2C1920%2C1080",
};

const AdminProfilePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  const [editableFields, setEditableFields] = useState({
    avatar: userProfile.avatar,
    firstName: userProfile.firstName,
    lastName: userProfile.lastName,
    email: userProfile.email,
    phoneNumber: userProfile.phoneNumber,
    biography: userProfile.biography,
  });

  const [avatarFileUrl, setAvatarFileUrl] = useState(null); // URL ảnh mới upload
  const [uploadKey, setUploadKey] = useState(0);
  const handleOpenModal = () => {
    setIsModalOpen(true);
    form.setFieldsValue({ ...editableFields });
    setAvatarFileUrl(null); // Khi mở modal mới, reset ảnh upload tạm
  };

  const handleCancelModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdateUser = (values) => {
    console.log("Updated values:", values);
    setEditableFields((prev) => ({
      ...prev,
      ...values,
      avatar: avatarFileUrl ? avatarFileUrl : prev.avatar, // Nếu có ảnh mới thì dùng, không thì giữ avatar cũ
    }));
    setIsModalOpen(false);
    setAvatarFileUrl(null); //update xong, reset avatarFileUrl về null
  };

  const handleAvatarUpload = (info) => {
    const fileObj = info.file.originFileObj || info.fileList?.[0]?.originFileObj;

    if (!fileObj) {
      message.error("Không thể đọc file ảnh");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const url = e.target.result;
      setAvatarFileUrl(url); // Lưu ảnh mới upload vào state
      setUploadKey((prev) => prev + 1);
    };
    reader.onerror = () => {
      message.error("Lỗi khi đọc file");
    };
    reader.readAsDataURL(fileObj);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Profile</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      {/* Avatar + Name */}
      <div className="flex items-center mb-6">
        <Avatar
          src={editableFields.avatar}
          size={96}
          className="mr-4 border-2 border-pink-500"
        />
        <div>
          <h3 className="text-xl font-bold">
            {editableFields.firstName} {editableFields.lastName}
          </h3>
          <p className="text-gray-500">@{userProfile.username}</p>
        </div>
      </div>

      <Button type="primary" className="mb-6" onClick={handleOpenModal}>
        Update Profile
      </Button>

      <div className="space-y-2">
        <ProfileItem label="First Name" value={editableFields.firstName} />
        <ProfileItem label="Last Name" value={editableFields.lastName} />
        <ProfileItem label="Username" value={userProfile.username} />
        <ProfileItem label="Email" value={editableFields.email} />
        <ProfileItem label="Phone Number" value={editableFields.phoneNumber} />
        <ProfileItem label="Registration Date" value={userProfile.registrationDate} />
        <ProfileItem label="Role" value={userProfile.role} />
        <ProfileItem label="Biography" value={editableFields.biography} />
      </div>

      <Modal
        title="Update Profile"
        open={isModalOpen}
        onCancel={handleCancelModal}
        getContainer={false}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              handleUpdateUser(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
        okText="Update"
        cancelText="Cancel"
      >
        <Form form={form} initialValues={editableFields} layout="vertical">
          {/* Avatar Upload */}
          <Form.Item label="" name="avatar">
            <div className="flex flex-col items-start gap-4">
              <Avatar
                src={avatarFileUrl ? avatarFileUrl : editableFields.avatar}
                size={96}
                className="border-2 border-pink-500"
              />
              <Upload
                key={uploadKey}
                showUploadList={false}
                beforeUpload={() => false}
                onChange={handleAvatarUpload}
                accept="image/*"
              >
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            </div>
          </Form.Item>

          <Form.Item
            label="First Name"
            name="firstName"
            rules={[{ required: true, message: "Please input first name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please input last name!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please input email!" },
              { type: "email", message: "The input is not valid E-mail!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[
              { required: true, message: "Please input phone number!" },
              { pattern: /^\+?[0-9]{8,15}$/, message: "Phone number is not valid!" },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Biography"
            name="biography"
            rules={[{ required: true, message: "Please input biography!" }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AdminProfilePage;

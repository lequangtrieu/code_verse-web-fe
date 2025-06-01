import React, {useEffect, useState} from "react";
import {Avatar, Form, Input, message, Modal} from "antd";
import UploadImage from "../../../common/UploadImage";

const UpdateProfileModal = ({ visible, initialValues, onCancel, onSubmit }) => {
    const [form] = Form.useForm();

    // Chuyển avatar thành fileList dạng của UploadImage (mảng object)
    const [fileList, setFileList] = useState([]);

    useEffect(() => {
        if (visible && initialValues) {
            form.setFieldsValue(initialValues);
            if (initialValues.avatar) {
                setFileList([
                    {
                        uid: "-1",
                        name: "avatar.png",
                        status: "done",
                        url: initialValues.avatar,
                    },
                ]);
            } else {
                setFileList([]);
            }
        }
    }, [visible, initialValues, form]);

    // Khi fileList thay đổi (upload mới, xoá), cập nhật state
    const handleFileListChange = (newFileList) => {
        setFileList(newFileList);
    };

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            // Lấy avatar mới (file đầu tiên nếu có)
            const avatarUrl =
                fileList.length > 0
                    ? fileList[0].url || (fileList[0].originFileObj ? URL.createObjectURL(fileList[0].originFileObj) : null)
                    : null;

            onSubmit({ ...values, avatar: avatarUrl });
        } catch (error) {
            console.log("Validate Failed:", error);
            message.error("Please fix the errors before submitting.");
        }
    };

    return (
        <Modal
            title="Update Profile"
            visible={visible}
            onCancel={onCancel}
            onOk={handleOk}
            okText="Update"
            cancelText="Cancel"
            getContainer={false}
        >
            <Form form={form} layout="vertical">
                <Form.Item label="Avatar" name="avatar">
                    <div className="flex flex-col items-start gap-4">
                        <UploadImage
                            value={fileList}
                            onChange={handleFileListChange}
                            maxCount={1}
                            accept="image/*"
                        />
                    </div>
                </Form.Item>

                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: "Please input full name!" }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Email"
                    name="username"
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
                    name="bio"
                    rules={[{ required: true, message: "Please input biography!" }]}
                >
                    <Input.TextArea rows={4} />
                </Form.Item>

                <Form.Item label="Teaching Credentials" name="teachingCredentials">
                    <Input />
                </Form.Item>

                <Form.Item label="Education Background" name="educationalBackground">
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default UpdateProfileModal;

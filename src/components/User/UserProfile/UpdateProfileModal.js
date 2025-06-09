import React, { useEffect } from "react";
import { Form, Input, message, Modal } from "antd";

const UpdateProfileModal = ({ visible, initialValues, onCancel, onSubmit }) => {
    const [form] = Form.useForm();

    useEffect(() => {
        if (visible && initialValues) {
            form.setFieldsValue({
                name: initialValues.name,
                phoneNumber: initialValues.phoneNumber,
                bio: initialValues.bio,
            });
        }
    }, [visible, initialValues, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();

            // Prepare data to send to BE
            const updatedData = {
                name: values.name,
                phoneNumber: values.phoneNumber,
                bio: values.bio,
            };

            // Call onSubmit to handle the API request
            onSubmit(updatedData);

            // Optionally, close the modal after successful submission
            onCancel();
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
                <Form.Item
                    label="Full Name"
                    name="name"
                    rules={[{ required: true, message: "Please input full name!" }]}
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
            </Form>
        </Modal>
    );
};

export default UpdateProfileModal;

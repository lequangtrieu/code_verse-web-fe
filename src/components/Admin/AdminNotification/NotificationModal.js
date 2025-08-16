import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Modal, Input, Select, Form, message, Button } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
const { TextArea } = Input;

const ROLE_OPTIONS = ["ADMIN", "INSTRUCTOR", "LEARNER"];

const NotificationModal = ({ open, onClose, onSubmit, loading }) => {
    const [form] = Form.useForm();
    const [users, setUsers] = useState([]);
    const [filteredOptions, setFilteredOptions] = useState([]);
    const user = useSelector((state) => state?.user?.user);
    const [recipientIds, setRecipientIds] = useState([]);

    useEffect(() => {
        if (open) fetchUsers();
        // eslint-disable-next-line
    }, [open]);

    const fetchUsers = async () => {
        try {
            const res = await axiosInstance.get(commonApi.getActiveUsers.url);
            setUsers(res.data.result.filter(u => u.username !== user?.username) || []);
        } catch (err) {
            message.error("Failed to load users.");
        }
    };

    const handleRoleSelect = (role) => {
        const selected = users
            .filter((u) => u.role === role)
            .map((u) => ({ label: `${u.username} (${role})`, value: u.id }));

        const existingIds = new Set(recipientIds);
        const newIds = selected.filter((u) => !existingIds.has(u.value));

        setRecipientIds((prev) => [...prev, ...newIds.map((u) => u.value)]);
    };

    const handleUsernameSearch = (value) => {
        if (!value) {
            setFilteredOptions([]);
            return;
        }

        const matched = users
            .filter(
                (u) =>
                    u.username.toLowerCase().includes(value.toLowerCase()) &&
                    !recipientIds.includes(u.id)
            )
            .map((u) => ({
                label: `${u.username} (${u.role})`,
                value: u.id,
            }));

        setFilteredOptions(matched);
    };

    const handleUsernameSelect = (id) => {
        if (!recipientIds.includes(id)) {
            setRecipientIds([...recipientIds, id]);
        }
    };

    const handleRemoveRecipient = (id) => {
        setRecipientIds(recipientIds.filter((r) => r !== id));
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (recipientIds.length === 0) {
                return message.warning("Please select at least one receiver.");
            }

            var recipients = users.filter(u => recipientIds.includes(u.id)).map(us => us.username);

            const payload = {
                senderUsername: user?.username,
                title: "_ADMIN_" + values.title,
                content: values.content,
                recipientUsernames: recipients,
            };

            await onSubmit(payload);
            form.resetFields();
            setRecipientIds([]);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal
            title="Send Notification"
            open={open}
            onCancel={() => {
                form.resetFields();
                setRecipientIds([]);
                onClose();
            }}
            onOk={handleSubmit}
            okText="Send"
            destroyOnClose
            loading={loading}
            getContainer={false}
        >
            <Form form={form} layout="vertical">
                
                    <Form.Item name="title" label="Title" rules={[{ required: true }]}>
                        <Input placeholder="Notification title" />
                    </Form.Item>

                    <Form.Item name="content" label="Content" rules={[{ required: true }]}>
                        <TextArea rows={4} placeholder="Write your message here..." />
                    </Form.Item>

                    {/* Role select */}
                    <div className="mb-2">
                        <label className="font-medium">Select receivers:</label>
                        <div className="flex gap-2 mt-1">
                            {ROLE_OPTIONS.map((role) => (
                                <Button key={role} onClick={() => handleRoleSelect(role)}>
                                    {role}
                                </Button>
                            ))}
                        </div>
                    </div>

                    {/* Username select */}
                    <div className="mb-3">
                        <label className="font-medium">Find by username:</label>
                        <Select
                            showSearch
                            onSearch={handleUsernameSearch}
                            onSelect={handleUsernameSelect}
                            options={filteredOptions}
                            placeholder="Search username"
                            style={{ width: "100%", marginTop: 4 }}
                            filterOption={false}
                        />
                    </div>

                    {/* Display selected recipients */}
                    {recipientIds.length > 0 && (
                        <div className="mb-2">
                            
                            <div style={{ position: "relative", maxHeight: 100, overflowY: "auto", paddingRight: 8, marginBottom: 24 }}>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {recipientIds.map((id) => {
                                        const user = users.find((u) => u.id === id);
                                        return (
                                            <span
                                                key={id}
                                                className="bg-gray-200 px-2 py-1 rounded text-sm cursor-pointer"
                                                onClick={() => handleRemoveRecipient(id)}
                                            >
                                                {user?.username || "Unknown"} ✖
                                            </span>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                
            </Form>
        </Modal>
    );
};

export default NotificationModal;

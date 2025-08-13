import { useState, useEffect } from "react";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { message, Table, Button, Input, Modal, Form, Space, Tag, Select } from "antd";

const { Option } = Select;

const AdminReportReasonsPage = () => {
    const [reasons, setReasons] = useState([]);
    const [filteredReasons, setFilteredReasons] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingReason, setEditingReason] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [form] = Form.useForm();

    useEffect(() => {
        fetchReasons();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            applyFilters();
        }, 300);

        return () => clearTimeout(timer);
    }, [searchQuery, statusFilter, reasons]);

    const fetchReasons = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(commonApi.adminReportReason.getAll.url);
            setReasons(res.data.result || []);
        } catch (err) {
            message.error("Failed to fetch report reasons.");
        } finally {
            setLoading(false);
        }
    };

    const applyFilters = () => {
        let filtered = [...reasons];

        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((r) =>
                (r.title?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                (r.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
            );
        }

        if (statusFilter !== "all") {
            const isActive = statusFilter === "active";
            filtered = filtered.filter((r) => r.active === isActive);
        }

        setFilteredReasons(filtered);
    };

    const openModal = (reason = null) => {
        setEditingReason(reason);
        if (reason) {
            form.setFieldsValue({
                title: reason.title,
                description: reason.description
            });
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (editingReason) {
                await axiosInstance.put(commonApi.adminReportReason.update.url(editingReason.id), values);
                message.success("Report reason updated successfully.");
            } else {
                await axiosInstance.post(commonApi.adminReportReason.create.url, values);
                message.success("Report reason created successfully.");
            }
            setIsModalOpen(false);
            fetchReasons();
        } catch (err) {
            message.error("Failed to save report reason.");
        }
    };

    const handleHide = async (id) => {
        Modal.confirm({
            title: "Are you sure to hide this reason?",
            onOk: async () => {
                try {
                    await axiosInstance.put(commonApi.adminReportReason.hide.url(id));
                    message.success("Report reason hidden successfully.");
                    fetchReasons();
                } catch (err) {
                    message.error("Failed to hide report reason.");
                }
            }
        });
    };

    const handleUnhide = async (id) => {
        Modal.confirm({
            title: "Are you sure to unhide this reason?",
            onOk: async () => {
                try {
                    await axiosInstance.put(commonApi.adminReportReason.unhide.url(id));
                    message.success("Report reason unhidden successfully.");
                    fetchReasons();
                } catch (err) {
                    message.error("Failed to unhide report reason.");
                }
            }
        });
    };

    const columns = [
        { title: "#", render: (_, __, index) => index + 1 },
        { title: "Title", dataIndex: "title" },
        { title: "Description", dataIndex: "description" },
        {
            title: "Status",
            dataIndex: "active",
            render: (active) => active ? <Tag color="green">Active</Tag> : <Tag color="red">Hidden</Tag>
        },
        {
            title: "Actions",
            render: (_, record) => (
                <Space>
                    <Button onClick={() => openModal(record)}>Edit</Button>
                    {record.active ? (
                        <Button danger onClick={() => handleHide(record.id)}>Hide</Button>
                    ) : (
                        <Button type="primary" onClick={() => handleUnhide(record.id)}>Unhide</Button>
                    )}
                </Space>
            )
        }
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2">Manage Report Reasons</h2>
            <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

            {/* Filters */}
            <div className="flex flex-wrap gap-4 mb-4">
                <Input
                    placeholder="Search by title or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                />
                <Select
                    placeholder="Filter by status"
                    className="w-52"
                    value={statusFilter}
                    onChange={setStatusFilter}
                >
                    <Option value="all">All</Option>
                    <Option value="active">Active</Option>
                    <Option value="hidden">Hidden</Option>
                </Select>
                <Button type="primary" onClick={() => openModal()}>
                    Add Report Reason
                </Button>
            </div>

            <Table
                dataSource={filteredReasons}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                open={isModalOpen}
                title={editingReason ? "Edit Report Reason" : "Add Report Reason"}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Title"
                        rules={[{ required: true, message: "Please enter title" }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="description"
                        label="Description"
                        rules={[{ required: true, message: "Please enter description" }]}
                    >
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminReportReasonsPage;

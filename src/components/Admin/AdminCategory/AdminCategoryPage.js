import { useState, useEffect } from "react";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { message, Table, Button, Input, Modal, Form, Space } from "antd";

const AdminCategoryPage = () => {
    const [categories, setCategories] = useState([]);
    const [filteredCategories, setFilteredCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [form] = Form.useForm();

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const timer = setTimeout(() => {
            applyFilters();
        }, 300);
        return () => clearTimeout(timer);
    }, [searchQuery, categories]);

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(commonApi.adminCategory.getAll.url);
            setCategories(res.data?.result || []);
        } catch {
            message.error("Failed to fetch categories.");
        } finally {
            setLoading(false);
        }
    };


    const applyFilters = () => {
        let filtered = [...categories];
        if (searchQuery.trim() !== "") {
            filtered = filtered.filter((c) =>
                (c.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
                (c.description?.toLowerCase() || "").includes(searchQuery.toLowerCase())
            );
        }
        setFilteredCategories(filtered);
    };

    const openModal = (category = null) => {
        setEditingCategory(category);
        if (category) {
            form.setFieldsValue({
                name: category.name,
                description: category.description
            });
        } else {
            form.resetFields();
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async () => {
        try {
            const values = await form.validateFields();
            if (editingCategory) {
                await axiosInstance.put(commonApi.adminCategory.update.url(editingCategory.id), values);
                message.success("Category updated successfully.");
            } else {
                await axiosInstance.post(commonApi.adminCategory.create.url, values);
                message.success("Category created successfully.");
            }
            setIsModalOpen(false);
            fetchCategories();
        } catch {
            message.error("Failed to save category.");
        }
    };

    const columns = [
        { title: "#", render: (_, __, index) => index + 1 },
        { title: "Name", dataIndex: "name" },
        { title: "Description", dataIndex: "description" },
        {
            title: "Actions",
            render: (_, record) => (
                <Space>
                    <Button onClick={() => openModal(record)}>Edit</Button>
                </Space>
            )
        }
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2">Manage Categories</h2>
            <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

            <div className="flex flex-wrap gap-4 mb-4">
                <Input
                    placeholder="Search by name or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64"
                />
                <Button type="primary" onClick={() => openModal()}>Add Category</Button>
            </div>

            <Table
                dataSource={filteredCategories}
                columns={columns}
                rowKey="id"
                loading={loading}
                pagination={{ pageSize: 10 }}
            />

            <Modal
                open={isModalOpen}
                getContainer={false}
                title={editingCategory ? "Edit Category" : "Add Category"}
                onCancel={() => setIsModalOpen(false)}
                onOk={handleSubmit}
            >
                <Form form={form} layout="vertical">
                    <Form.Item name="name" label="Name" rules={[{ required: true, message: "Please enter name" }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item name="description" label="Description">
                        <Input.TextArea rows={3} />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default AdminCategoryPage;

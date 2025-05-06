import React, { useState, useEffect, useRef } from "react";
import { Form, Input, Upload, Modal, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

export default function CourseDescription({ categoryList, formData, updateFormData, markComplete, markIncomplete, suppressErrors }) {
    const [form] = Form.useForm();
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const localSuppressed = true;
    const finalSuppressErrors = suppressErrors && localSuppressed;
    const categories = categoryList || [];

    const hasInitialized = useRef(false);

    const handleBeforeUpload = (file) => {
        const isImage = file.type.startsWith("image/");
        if (!isImage) {
            message.error("You can only upload image file!");
            return Upload.LIST_IGNORE;
        }
        return false;
    }

    const handlePreview = async (file) => {
        let previewUrl = file.url || (file.originFileObj && URL.createObjectURL(file.originFileObj));
        if (!previewUrl) {
            message.warning("Preview not available");
            return;
        }

        setPreviewImage(previewUrl);
        setPreviewTitle(file.name || "Image Preview");
        setPreviewVisible(true);
    };



    const handleCancel = () => setPreviewVisible(false);

    useEffect(() => {
        if (!hasInitialized.current && categoryList.length > 0) {
            const values = {
                ...formData?.description,
                categoryId: formData?.description?.categoryId || categories[0]?.id,
              };
            form.setFieldsValue(values);
            hasInitialized.current = true;

            if (values?.previewImage) {
                setPreviewImage(values.previewImage);
            }
        }
        // eslint-disable-next-line
    }, [categoryList, formData, form]);

    const values = Form.useWatch([], form);

    useEffect(() => {
        if (!values) return;

        const updated = {
            ...values,
            previewImage: previewImage || formData?.description?.previewImage,
        };

        updateFormData("description", updated);

        form
            .validateFields()
            .then(() => markComplete())
            .catch(() => markIncomplete());
            // eslint-disable-next-line
    }, [values, previewImage]);

    return (
        <Form
            form={form}
            layout="vertical"
            className="max-w-3xl mx-auto"
        >
            {/* Title */}
            <Form.Item
                label="Course Title"
                name="title"
                rules={[{ required: true, message: "Please enter the course title" }]}
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <Input placeholder="e.g., Learn React from Scratch" />
            </Form.Item>

            {/* Description */}
            <Form.Item
                label="Course Description"
                name="description"
                rules={[{ required: true, message: "Please enter the description" }]}
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <TextArea rows={5} placeholder="Write a short overview about the course" />
            </Form.Item>

            {/* Category */}
            <Form.Item
                label="Category"
                name="categoryId"
                rules={[{ required: true, message: "Please select a category" }]}
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <Select>
                    {categories.map((category) => (
                        <Option key={category.id} value={category.id}>{category.name}</Option>
                    ))}
                </Select>
            </Form.Item>

            {/* Cover Image */}
            <Form.Item
                label="Course Cover Image"
                htmlFor={null}
                name="cover"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[{ required: true, message: "Please upload a cover image" }]}
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <Upload name="cover"
                    listType="picture-card"
                    maxCount={1} accept="image/*"
                    beforeUpload={handleBeforeUpload}
                    onPreview={handlePreview}
                    onChange={({ fileList }) => {
                        form.setFieldsValue({ cover: fileList });

                        const file = fileList[0]?.originFileObj;
                        if (file) {
                            const previewUrl = URL.createObjectURL(file);
                            setPreviewImage(previewUrl);

                            updateFormData("description", {
                                ...form.getFieldsValue(),
                                previewImage: previewUrl,
                                cover: fileList,
                            });
                        }
                    }}
                    defaultFileList={formData?.description?.cover?.map(file => ({
                        ...file,
                        url: formData?.description?.previewImage || file.url,
                    })) || []}>
                    <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>
                </Upload>

                <Modal
                    open={previewVisible}
                    title={previewTitle}
                    footer={null}
                    onCancel={handleCancel}
                >
                    <img alt="preview" style={{ width: "100%" }} src={formData.description.previewImage} />
                </Modal>
            </Form.Item>
        </Form>
    );
}

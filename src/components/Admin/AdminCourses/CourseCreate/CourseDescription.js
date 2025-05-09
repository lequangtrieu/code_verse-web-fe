import React, { useState, useEffect, useRef } from "react";
import { Form, Input, InputNumber, Radio, Upload, Modal, Select, message, Space, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

export default function CourseDescription({
    form: initialForm,
    categoryList, formData,
    updateFormData,
    markComplete,
    markIncomplete,
    suppressErrors,
    isEditing = false,
    onSave,
    onCancel
}) {
    const [currentForm] = Form.useForm();
    const form = initialForm || currentForm;
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");
    const localSuppressed = true;
    const finalSuppressErrors = suppressErrors && localSuppressed;
    const categories = categoryList || [];
    const [levels] = useState([
        { levelId: "BEGINNER", name: "Beginner" },
        { levelId: "INTERMEDIATE", name: "Intermediate" },
        { levelId: "ADVANCED", name: "Advanced" }
    ]);
    const [languages] = useState([
        { language: "JAVA", name: "Java" },
        { language: "PYTHON", name: "Python" },
        { language: "C", name: "C" },
        { language: "JAVASCRIPT", name: "JavaScript" },
        { language: "CPP", name: "C++" },
        { language: "CSHARP", name: "C#" },
        { language: "RUBY", name: "Ruby" },
        { language: "KOTLIN", name: "Kotlin" }
    ]);

    const hasInitialized = useRef(false);
    const hasValidatedOnce = useRef(false);
    const previousIsPaid = useRef(null);

    const values = Form.useWatch([], form);
    const isPaid = Form.useWatch("isPaid", form);

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
            const initialValues = {
                ...formData?.description,
                ...formData?.bonus,
                categoryId: formData?.description?.categoryId || categories[0]?.id,
                levelId: formData?.bonus?.levelId || levels[0]?.levelId,
                language: formData?.bonus?.language || languages[0]?.language
            };
            form.setFieldsValue(initialValues);
            hasInitialized.current = true;

            if (initialValues?.previewImage) {
                setPreviewImage(initialValues.previewImage);
            }
        }
        // eslint-disable-next-line
    }, [categoryList, formData]);

    useEffect(() => {
        previousIsPaid.current = isPaid;
    }, [isPaid]);

    useEffect(() => {
        if (!values || !hasInitialized.current) return;

        const cleanValues = { ...form.getFieldsValue(true) };
        if (!cleanValues.isPaid) delete cleanValues.price;

        updateFormData("description", {
            title: cleanValues.title,
            description: cleanValues.description,
            categoryId: cleanValues.categoryId,
            cover: cleanValues.cover,
            previewImage: previewImage || formData?.description?.previewImage
        });

        updateFormData("bonus", {
            isPaid: cleanValues.isPaid,
            price: cleanValues.isPaid ? cleanValues.price : undefined,
            levelId: cleanValues.levelId,
            language: cleanValues.language
        });

        const timeout = setTimeout(() => {
            const fieldsToValidate = [
                "title", "description", "categoryId", "cover",
                "isPaid", "levelId", "language"
            ];
            if (form.getFieldValue("isPaid")) fieldsToValidate.push("price");

            form.validateFields(fieldsToValidate)
                .then(() => {
                    markComplete?.();
                    hasValidatedOnce.current = true;
                })
                .catch(() => {
                    markIncomplete?.();
                    hasValidatedOnce.current = false;
                });
        }, 100);

        return () => clearTimeout(timeout);
        // eslint-disable-next-line
    }, [values, previewImage]);

    return (
        <Form
            name="courseDescription"
            form={form}
            layout="vertical"
            className="max-w-3xl mx-auto"
            // onFinish={onFinish}
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

            <Form.Item
                name="isPaid"
                label="Is this course paid?"
                htmlFor={null}
                rules={[{ required: true, message: "Please choose Free or Paid" }]}
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <Radio.Group optionType="button" buttonStyle="solid">
                    <Radio value={false}>Free</Radio>
                    <Radio value={true}>Paid</Radio>
                </Radio.Group>
            </Form.Item>

            {isPaid && (
                <Form.Item
                    name="price"
                    label="Course Price (VND)"
                    rules={[{ required: true, message: "Please enter the price" }]}
                    preserve={false}
                    validateStatus={finalSuppressErrors ? "" : undefined}
                    help={finalSuppressErrors ? "" : undefined}
                >
                    <InputNumber min={1} placeholder="e.g. 100000" className="w-full" />
                </Form.Item>
            )}

            <Form.Item
                name="levelId"
                label="Course Level"
                rules={[{ required: true, message: "Please select level" }]}
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <Select>
                    {levels.map((level) => (
                        <Option key={level.levelId} value={level.levelId}>
                            {level.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                name="language"
                label="Course Language"
                rules={[{ required: true, message: "Please select language" }]}
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <Select>
                    {languages.map((language) => (
                        <Option key={language.language} value={language.language}>
                            {language.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            {isEditing && (
                <Form.Item>
                    <Space className="flex justify-end">
                        <Button type="default" onClick={onCancel}>Cancel</Button>
                        <Button
                            type="primary"
                            onClick={() => onSave?.(form)}
                        >
                            Save
                        </Button>
                    </Space>
                </Form.Item>
            )}
        </Form>
    );
}

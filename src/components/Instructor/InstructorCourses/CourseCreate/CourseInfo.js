import React, { useEffect, useState, useRef } from "react";
import { Button, Form, Input, InputNumber, Radio, Select, Space, message } from "antd";
import UploadImage from "../../../../common/UploadImage";
import commonApi from "../../../../common/api";
import axiosInstance from "../../../../config/axiosInstance";
import LoadingOverlay from "../../../../common/LoadingOverlay";

const { TextArea } = Input;
const { Option } = Select;

export default function CourseDescription({
    form: externalForm,
    formData,
    onSave,
    onCancel
}) {
    const [form] = Form.useForm();
    const activeForm = externalForm || form;
    const [categories, setCategories] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);

    const levels = [
        { levelId: "BEGINNER", name: "Beginner" },
        { levelId: "INTERMEDIATE", name: "Intermediate" },
        { levelId: "ADVANCED", name: "Advanced" }
    ];

    const languages = [
        { language: "JAVA", name: "Java" },
        { language: "PYTHON", name: "Python" },
        { language: "C", name: "C" },
        { language: "JAVASCRIPT", name: "JavaScript" },
        { language: "CPP", name: "C++" },
        { language: "CSHARP", name: "C#" },
        { language: "RUBY", name: "Ruby" },
        { language: "KOTLIN", name: "Kotlin" }
    ];

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const result = await axiosInstance.get(commonApi.category.url);
            setCategories(result.data.result);
        } catch (error) {
            message.error("Error when fetching category data.");
            setCategories([]);
        } finally {
            setTimeout(() => {
                setInitialLoading(false);
            }, 400);
        }
    };

    const hasInitialized = useRef(false);

    useEffect(() => {
        if (!hasInitialized.current && formData && categories.length > 0) {
            const initialValues = {
                ...formData.description,
                ...formData.bonus,
                categoryId: formData.description?.categoryId ?? categories[0]?.id,
                levelId: formData.bonus?.levelId ?? levels[0]?.levelId,
                language: formData.bonus?.language ?? languages[0]?.language
            };
            activeForm.setFieldsValue(initialValues);
            hasInitialized.current = true;
        }
        // eslint-disable-next-line
    }, [formData, categories.length, activeForm]);

    const isPaid = Form.useWatch("isPaid", activeForm);
    const coverFileList = Form.useWatch("cover", activeForm) || [];

    return (
        <Form
            name="courseDescription"
            form={activeForm}
            layout="vertical"
            className="max-w-3xl mx-auto"
        >
            {initialLoading && <LoadingOverlay />}
            <Form.Item
                label="Course Title"
                name="title"
                rules={[{ required: true, message: "Please enter the course title" }]}
            >
                <Input placeholder="e.g., Learn React from Scratch" />
            </Form.Item>

            <Form.Item
                label="Course Description"
                name="description"
                rules={[{ required: true, message: "Please enter the description" }]}
            >
                <TextArea rows={5} placeholder="Write a short overview about the course" />
            </Form.Item>

            <Form.Item
                label="Category"
                name="categoryId"
                rules={[{ required: true, message: "Please select a category" }]}
            >
                <Select>
                    {categories.map((category) => (
                        <Option key={category.id} value={category.id}>
                            {category.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item
                label="Course Cover Image"
                name="cover"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                rules={[{ required: true, message: "Please upload a cover image" }]}
            >
                <UploadImage label="Upload Cover" maxCount={1} value={coverFileList} />
            </Form.Item>

            <Form.Item
                name="isPaid"
                label="Is this course paid?"
                rules={[{ required: true, message: "Please choose Free or Paid" }]}
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
                >
                    <InputNumber min={1} placeholder="e.g. 100000" className="w-full" />
                </Form.Item>
            )}

            <Form.Item
                name="levelId"
                label="Course Level"
                rules={[{ required: true, message: "Please select level" }]}
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
            >
                <Select>
                    {languages.map((language) => (
                        <Option key={language.language} value={language.language}>
                            {language.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Space className="flex justify-end">
                    <Button type="default" onClick={onCancel}>Cancel</Button>
                    <Button type="primary" onClick={() => {
                        console.log(activeForm.getFieldsValue());
                        onSave?.(activeForm);
                    }}>Save</Button>
                </Space>
            </Form.Item>
        </Form>
    );
}

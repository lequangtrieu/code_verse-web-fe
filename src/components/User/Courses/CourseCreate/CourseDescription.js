// CourseDescription.jsx
import React from "react";
import { Form, Input, Upload, Button, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

export default function CourseDescription({ markComplete, next }) {
  const [form] = Form.useForm();

  const handleFinish = (values) => {
    console.log("Course Info Submitted:", values);
    markComplete(); // Mark this section as completed in sidebar
    next(); // Move to the next section
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="max-w-3xl mx-auto"
    >
      {/* Title */}
      <Form.Item
        label="Course Title"
        name="title"
        rules={[{ required: true, message: "Please enter the course title" }]}
      >
        <Input placeholder="e.g., Learn React from Scratch" />
      </Form.Item>

      {/* Description */}
      <Form.Item
        label="Course Description"
        name="description"
        rules={[{ required: true, message: "Please enter the description" }]}
      >
        <TextArea rows={5} placeholder="Write a short overview about the course" />
      </Form.Item>

      {/* Category */}
      <Form.Item
        label="Category"
        name="category"
        rules={[{ required: true, message: "Please select a category" }]}
      >
        <Select placeholder="Choose a category">
          <Option value="web">Web Development</Option>
          <Option value="data">Data Science</Option>
          <Option value="ai">AI & Machine Learning</Option>
          <Option value="mobile">Mobile Development</Option>
        </Select>
      </Form.Item>

      {/* Cover Image */}
      <Form.Item
        label="Course Cover Image"
        name="cover"
        valuePropName="fileList"
        getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        rules={[{ required: true, message: "Please upload a cover image" }]}
      >
        <Upload name="cover" listType="picture" beforeUpload={() => false}>
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Form.Item>
    </Form>
  );
}

import React, { useEffect } from "react";
import { Form, Input, Select, Button, Space } from "antd";

const { Option } = Select;

const levels = [
  { levelId: "BEGINNER", name: "Beginner" },
  { levelId: "INTERMEDIATE", name: "Intermediate" },
  { levelId: "ADVANCED", name: "Advanced" },
];

const languages = [
  { language: "JAVA", name: "Java" },
  { language: "PYTHON", name: "Python" },
  { language: "C", name: "C" },
  { language: "JAVASCRIPT", name: "JavaScript" },
  { language: "CPP", name: "C++" },
  { language: "CSHARP", name: "C#" },
  { language: "RUBY", name: "Ruby" },
  { language: "KOTLIN", name: "Kotlin" },
];

const TrainingBasicInfo = ({ onSave, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form
      name="trainingBasicInfo"
      form={form}
      layout="vertical"
      className="max-w-2xl mx-auto"
    >
      <Form.Item
        label="Title"
        name="title"
        rules={[{ required: true, message: "Please enter a title" }]}
      >
        <Input placeholder="e.g., Java Training Level 1" />
      </Form.Item>

      <Form.Item
        name="levelId"
        label="Level"
        rules={[{ required: true, message: "Please select level" }]}
      >
        <Select placeholder="Select course level">
          {levels.map((level) => (
            <Option key={level.levelId} value={level.levelId}>
              {level.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="language"
        label="Language"
        rules={[{ required: true, message: "Please select language" }]}
      >
        <Select placeholder="Select language">
          {languages.map((lang) => (
            <Option key={lang.language} value={lang.language}>
              {lang.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="expReward" label="EXP Reward">
        <Input type="number" min={0} placeholder="e.g., 100" />
      </Form.Item>

      <Form.Item>
        <Space className="flex justify-end">
          <Button type="primary" onClick={() => onSave(form)}>
            Save
          </Button>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default TrainingBasicInfo;
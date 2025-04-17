import React from "react";
import { Form, Input, Button, Select, Space, Divider } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

export default function CourseMaterial({ form, markComplete}) {
  return (
    <>
      <Divider orientation="left">Add Lessons</Divider>

      <Form.List name="lessons">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, index) => (
              <Space
                key={key}
                direction="vertical"
                size="large"
                className="w-full mb-4 p-4 border border-gray-200 rounded-md bg-gray-50"
              >
                <h3 className="text-lg font-semibold">Lesson {index + 1}</h3>

                <Form.Item
                  {...restField}
                  name={[name, "title"]}
                  label="Lesson Title"
                  rules={[{ required: true, message: "Title is required" }]}
                >
                  <Input placeholder="Enter lesson title" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "type"]}
                  label="Lesson Type"
                  rules={[{ required: true, message: "Select type" }]}
                >
                  <Select placeholder="Choose lesson type">
                    <Option value="document">Document</Option>
                    <Option value="video">Video</Option>
                    <Option value="quiz">Quiz</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "content"]}
                  label="Lesson Content"
                  rules={[{ required: true, message: "Enter content or link" }]}
                >
                  <Input.TextArea placeholder="Enter content, link, or quiz data" rows={3} />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "duration"]}
                  label="Estimated Duration (mins)"
                  rules={[{ required: true, message: "Enter duration" }]}
                >
                  <Input type="number" placeholder="Duration in minutes" />
                </Form.Item>

                <Button
                  danger
                  type="dashed"
                  icon={<MinusCircleOutlined />}
                  onClick={() => remove(name)}
                >
                  Remove Lesson
                </Button>
              </Space>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                Add Lesson
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Divider />
    </>
  );
}

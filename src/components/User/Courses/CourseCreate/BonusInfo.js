import React, { useState } from "react";
import { Form, Input, InputNumber, Radio, Button, Select, message } from "antd";

const { TextArea } = Input;
const { Option } = Select;

export default function BonusInfo({ markComplete, next }) {
  const [form] = Form.useForm();
  const [isPaid, setIsPaid] = useState(false);

  const handleFinish = (values) => {
    console.log("Bonus Info Submitted:", values);
    markComplete();
    next();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className="max-w-2xl mx-auto"
    >
      {/* Pricing */}
      <Form.Item name="isPaid" label="Is this course paid?" initialValue={false}>
        <Radio.Group
          onChange={(e) => setIsPaid(e.target.value)}
          optionType="button"
          buttonStyle="solid"
        >
          <Radio value={false}>Free</Radio>
          <Radio value={true}>Paid</Radio>
        </Radio.Group>
      </Form.Item>

      {isPaid && (
        <Form.Item
          name="price"
          label="Course Price ($)"
          rules={[{ required: true, message: "Please enter the price" }]}
        >
          <InputNumber min={1} placeholder="e.g. 49.99" className="w-full" />
        </Form.Item>
      )}

      {/* Difficulty Level */}
      <Form.Item
        name="level"
        label="Course Level"
        rules={[{ required: true, message: "Please select level" }]}
      >
        <Select placeholder="Choose difficulty level">
          <Option value="beginner">Beginner</Option>
          <Option value="intermediate">Intermediate</Option>
          <Option value="advanced">Advanced</Option>
        </Select>
      </Form.Item>

      {/* Optional Notes */}
      <Form.Item name="notes" label="Additional Notes (optional)">
        <TextArea rows={3} placeholder="Add any remarks, prerequisites, etc." />
      </Form.Item>

      {/* Submit */}
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Finish & Submit Course
        </Button>
      </Form.Item>
    </Form>
  );
}

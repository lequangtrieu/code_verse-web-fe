import React from "react";
import { Form, Input, Space, Checkbox } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

const AnswerItem = React.memo(({ moduleIndex, lessonIndex, questionIndex, aField, removeAnswer }) => {
    return (

        <Space
            key={`module-${moduleIndex}-lesson-${lessonIndex}-q-${questionIndex}-a-${aField.key}`}
            align="baseline"
            className="w-full"
        >
            <Form.Item
                // {...aField}
                name={[aField.name, "text"]}
                label={`Answer ${aField.name + 1}`}
                rules={[{ required: true, message: "Answer required" }]}
            >
                <Input placeholder="Answer text" />
            </Form.Item>

            <Form.Item
                // {...aField}
                name={[aField.name, "isCorrect"]}
                valuePropName="checked"
                label="Correct?"
            >
                <Checkbox />
            </Form.Item>

            <MinusCircleOutlined onClick={() => removeAnswer(aField.name)} />
        </Space>
    );
});

export default AnswerItem;
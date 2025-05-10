import React from "react";
import { Form, Input } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";

const TaskItem = React.memo(({ moduleIndex, lessonIndex, exerciseIndex, tField, removeTask, suppressErrors }) => {

    const localSuppressed = true;
    const finalSuppressErrors = suppressErrors && localSuppressed;

    return (
        <div className="w-full flex items-start gap-4">
            <Form.Item
                name={[tField.name, "description"]}
                label={`Task ${tField.name + 1}`}
                rules={[{ required: true, message: "Description required" }]}
                className="flex-1"
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <Input.TextArea rows={2} placeholder="Enter Task Description" className="w-full" />
            </Form.Item>
            <div className="mt-[30px]">
                <MinusCircleOutlined onClick={() => removeTask(tField.name)} />
            </div>
        </div>
    )
});

export default TaskItem;
import React from "react";
import { Form, Input, Button, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import LessonItem from "./LessonItem";

const ModuleItem = React.memo(({
    form,
    moduleField,
    removeModule,
    videoPreview,
    setVideoPreview,
    markLessonComplete,
    markLessonIncomplete,
    suppressErrors }) => {

    const localSuppressed = true;
    const finalSuppressErrors = suppressErrors && localSuppressed;

    return (
        <Space
            key={`module-${moduleField.key}`}
            direction="vertical"
            size="large"
            className="w-full mb-6 p-4 border border-gray-300 rounded bg-gray-50"
        >
            <h3 className="text-xl font-semibold">Module {moduleField.name + 1}</h3>

            <Form.Item
                {...moduleField}
                name={[moduleField.name, "title"]}
                label="Module Title"
                rules={[{ required: true, message: "Module title required" }]}
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <Input placeholder="Enter module title" />
            </Form.Item>

            <Form.List name={[moduleField.name, "lessons"]}>
                {(lessonFields, { add, remove }) => (
                    <>
                        {lessonFields.map((lessonField, lessonIndex) => {
                            return (
                                <LessonItem
                                    key={`module-${moduleField.name}-lesson-${lessonField.key}`}
                                    form={form}
                                    lessonField={lessonField}
                                    moduleIndex={moduleField.name}
                                    lessonIndex={lessonIndex}
                                    removeLesson={remove}
                                    videoPreview={videoPreview}
                                    setVideoPreview={setVideoPreview}
                                    markLessonComplete={markLessonComplete}
                                    markLessonIncomplete={markLessonIncomplete}
                                    suppressErrors={suppressErrors}
                                />
                            )
                        })}
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

            <Button
                danger
                type="dashed"
                icon={<MinusCircleOutlined />}
                onClick={() => removeModule(moduleField.name)}
            >
                Remove Module
            </Button>
        </Space>
    );
});

export default ModuleItem;

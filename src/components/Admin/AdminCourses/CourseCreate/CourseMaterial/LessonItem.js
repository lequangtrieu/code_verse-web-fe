import React, { useCallback, useEffect } from "react";
import { Form, Input, Select, Button, Upload, Space, Divider, InputNumber, message } from "antd";
import { MinusCircleOutlined, UploadOutlined, PlusOutlined } from "@ant-design/icons";
import QuizItem from "./QuizItem";

const { Option } = Select;
const lessonTypes = ['Video', 'Document', 'Quiz'];

const LessonItem = React.memo(
    ({
        lessonField,
        lessonIndex,
        moduleIndex,
        removeLesson,
        form,
        videoPreview,
        setVideoPreview,
        markLessonComplete,
        markLessonIncomplete,
        suppressErrors
    }) => {

        const localSuppressed = true;
        const finalSuppressErrors = suppressErrors && localSuppressed;
        const key = `module-${moduleIndex}-lesson-${lessonIndex}`;
        const lessonType = Form.useWatch(
            ["modules", moduleIndex, "lessons", lessonIndex, "type"],
            form
        );
        const lessonData = Form.useWatch(
            ["modules", moduleIndex, "lessons", lessonIndex],
            form
        );

        const memoMarkComplete = useCallback(() => {
            markLessonComplete(moduleIndex, lessonIndex);
        }, [moduleIndex, lessonIndex, markLessonComplete]);

        const memoMarkIncomplete = useCallback(() => {
            markLessonIncomplete(moduleIndex, lessonIndex);
        }, [moduleIndex, lessonIndex, markLessonIncomplete]);


        const handleBeforeUpload = (file) => {
            const isVideo = file.type.startsWith("video/");
            if (!isVideo) {
                message.error("you can only upload video file!");
                return Upload.LIST_IGNORE;
            }
            return false;
        };

        const handleVideoChange = (info) => {
            const file = info?.fileList?.[0]?.originFileObj;
            if (file && file.type.startsWith("video/")) {
                const previewUrl = URL.createObjectURL(file);
                setVideoPreview((prev) => ({ ...prev, [key]: previewUrl }));

                const modules = form.getFieldValue("modules") || [];
                const updatedModules = [...modules];

                if (
                    updatedModules[moduleIndex] &&
                    updatedModules[moduleIndex].lessons &&
                    updatedModules[moduleIndex].lessons[lessonIndex]
                ) {
                    updatedModules[moduleIndex].lessons[lessonIndex].previewVideo = previewUrl;
                    form.setFieldsValue({ modules: updatedModules });
                }
            } else {
                setVideoPreview((prev) => ({ ...prev, [key]: null }));
            }
        };

        useEffect(() => {
            if (!lessonData) {
                memoMarkIncomplete();
                return;
            }

            const { title, type, duration } = lessonData;
            if (!title || !type || !duration) {
                memoMarkIncomplete();
                return;
            }

            if (type === "Video") {
                const videoValid = Array.isArray(lessonData.video) && lessonData.video.length > 0;
                return videoValid ? memoMarkComplete() : memoMarkIncomplete();
            }

            if (type === "Document") {
                const doc = lessonData.document;
                return doc && doc.trim().length > 0 ? memoMarkComplete() : memoMarkIncomplete();
            }

            if (type === "Quiz") {
                const questions = lessonData.content;
                if (!Array.isArray(questions) || questions.length === 0) {
                    return memoMarkIncomplete();
                }

                for (let q of questions) {
                    if (!q?.question?.trim() || !Array.isArray(q.answers) || q.answers.length < 2) {
                        return memoMarkIncomplete();
                    }

                    const hasCorrect = q.answers.every(a => a?.text?.trim()) && q.answers.some(a => a?.isCorrect);
                    if (!hasCorrect) {
                        return memoMarkIncomplete();
                    }
                }

                return memoMarkComplete();
            }

            memoMarkIncomplete();
        }, [lessonData]);

        return (
            <Space
                key={key}
                direction="vertical"
                size="middle"
                className="w-full mb-4 p-4 border border-dashed border-gray-300 rounded"
            >
                <h4 className="text-md font-semibold">Lesson {lessonIndex + 1}</h4>

                <Form.Item
                    name={[lessonField.name, "title"]}
                    label="Lesson Title"
                    rules={[{ required: true, message: "Lesson title required" }]}
                    validateStatus={finalSuppressErrors ? "" : undefined}
                    help={finalSuppressErrors ? "" : undefined}
                >
                    <Input placeholder="Lesson title" />
                </Form.Item>

                <Form.Item
                    name={[lessonField.name, "type"]}
                    label="Lesson Type"
                    rules={[{ required: true, message: "Lesson type required" }]}
                    validateStatus={finalSuppressErrors ? "" : undefined}
                    help={finalSuppressErrors ? "" : undefined}
                >
                    <Select placeholder="Select type">
                        {lessonTypes.map((type) => (
                            <Option key={type} value={type}>{type}</Option>
                        ))}
                    </Select>
                </Form.Item>

                {lessonType === "Video" && (
                    <>
                        {(videoPreview[key] || lessonData?.previewVideo) && (
                            <video
                                width="100%"
                                controls
                                src={videoPreview[key] || lessonData?.previewVideo}
                                style={{ marginBottom: "1rem" }}
                            />
                        )}
                        <Form.Item
                            name={[lessonField.name, "video"]}
                            label="Upload Video"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                            rules={[{ required: true, message: "Upload required" }]}
                            validateStatus={finalSuppressErrors ? "" : undefined}
                            help={finalSuppressErrors ? "" : undefined}
                        >
                            <Upload
                                accept="video/*"
                                maxCount={1}
                                showUploadList={false}
                                beforeUpload={handleBeforeUpload}
                                onChange={handleVideoChange}
                            >
                                <Button icon={<UploadOutlined />}>Upload Video</Button>
                            </Upload>
                        </Form.Item>
                    </>
                )}

                {lessonType === "Document" && (
                    <Form.Item
                        name={[lessonField.name, "document"]}
                        label="Document Content"
                        rules={[{ required: true, message: "Enter content" }]}
                        validateStatus={finalSuppressErrors ? "" : undefined}
                        help={finalSuppressErrors ? "" : undefined}
                    >
                        <Input.TextArea rows={4} placeholder="Enter lesson content" />
                    </Form.Item>
                )}

                {lessonType === "Quiz" && (
                    <>
                        <Form.List name={[lessonField.name, "content"]}>
                            {(questionFields, { add: addQuestion, remove: removeQuestion }) => (
                                <>
                                    <Divider orientation="left">Quiz Questions</Divider>

                                    {questionFields.map((qField, qIndex) => {
                                        return (
                                            <QuizItem
                                                key={`module-${moduleIndex}-lesson-${lessonIndex}-q-${qField.key}`}
                                                form={form}
                                                moduleIndex={moduleIndex}
                                                lessonIndex={lessonIndex}
                                                qField={qField}
                                                qIndex={qIndex}
                                                removeQuestion={removeQuestion}
                                                suppressErrors={suppressErrors}
                                            />
                                        )
                                    })}
                                    <Form.Item>
                                        <Button
                                            type="dashed"
                                            onClick={() => addQuestion()}
                                            block
                                            icon={<PlusOutlined />}
                                        >
                                            Add Question
                                        </Button>
                                    </Form.Item>


                                </>
                            )}
                        </Form.List>
                    </>


                )}

                <Form.Item
                    name={[lessonField.name, "duration"]}
                    label="Estimated Duration (mins)"
                    rules={[{ required: true, message: "Enter duration" }]}
                    validateStatus={finalSuppressErrors ? "" : undefined}
                    help={finalSuppressErrors ? "" : undefined}
                >
                    <InputNumber min={1} placeholder="Minutes" className="w-full" />
                </Form.Item>

                <Button
                    danger
                    type="dashed"
                    icon={<MinusCircleOutlined />}
                    onClick={() => removeLesson(lessonField.name)}
                >
                    Remove Lesson
                </Button>
            </Space>
        );
    }
);

export default LessonItem;

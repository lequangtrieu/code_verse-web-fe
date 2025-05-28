import React, { useCallback, useEffect } from "react";
import { Form, Input, Button, Space, Divider, InputNumber } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import QuizItem from "./QuizItem";
import TaskItem from "./TaskItem";

const LessonItem = React.memo(
    ({
        lessonField,
        lessonIndex,
        moduleIndex,
        removeLesson,
        form,
        // videoPreview,
        // setVideoPreview,
        markLessonComplete,
        markLessonIncomplete,
        suppressErrors
    }) => {

        const localSuppressed = true;
        const finalSuppressErrors = suppressErrors && localSuppressed;
        const key = `module-${moduleIndex}-lesson-${lessonIndex}`;

        const lessonData = Form.useWatch(["modules", moduleIndex, "lessons", lessonIndex], form);
        
        const exerciseType = lessonData?.exerciseType;

        const memoMarkComplete = useCallback(() => {
            markLessonComplete(moduleIndex, lessonIndex);
        }, [moduleIndex, lessonIndex, markLessonComplete]);

        const memoMarkIncomplete = useCallback(() => {
            markLessonIncomplete(moduleIndex, lessonIndex);
        }, [moduleIndex, lessonIndex, markLessonIncomplete]);

        // const handleBeforeUpload = (file) => {
        //     const isVideo = file.type.startsWith("video/");
        //     if (!isVideo) {
        //         message.error("You can only upload video file!");
        //         return Upload.LIST_IGNORE;
        //     }
        //     return false;
        // };

        // const handleVideoChange = (info) => {
        //     const file = info?.fileList?.[0]?.originFileObj;
        //     if (file && file.type.startsWith("video/")) {
        //         const previewUrl = URL.createObjectURL(file);
        //         setVideoPreview((prev) => ({ ...prev, [key]: previewUrl }));

        //         const modules = form.getFieldValue("modules") || [];
        //         const updatedModules = [...modules];

        //         if (
        //             updatedModules[moduleIndex] &&
        //             updatedModules[moduleIndex].lessons &&
        //             updatedModules[moduleIndex].lessons[lessonIndex]
        //         ) {
        //             updatedModules[moduleIndex].lessons[lessonIndex].previewVideo = previewUrl;
        //             form.setFieldsValue({ modules: updatedModules });
        //         }
        //     } else {
        //         setVideoPreview((prev) => ({ ...prev, [key]: null }));
        //     }
        // };

        useEffect(() => {
            if (!lessonData) {
                memoMarkIncomplete();
                return;
            }

            const { title, theory, exercise, duration } = lessonData;
            if (!title || !theory || !exercise || !duration) {
                memoMarkIncomplete();
                return;
            }

            // Validate Theory
            // if (theoryType === "Video") {
            //     const videoValid = Array.isArray(lessonData.video) && lessonData.video.length > 0;
            //     if (!videoValid) {
            //         memoMarkIncomplete();
            //         return;
            //     }
            // } else if (theoryType === "Document") {
            //     const doc = lessonData.document;
            //     if (!doc || !doc.trim()) {
            //         memoMarkIncomplete();
            //         return;
            //     }
            // } else {
            //     memoMarkIncomplete();
            //     return;
            // }

            // // Validate Exercise
            // if (exerciseType === "Quiz") {
            //     const questions = lessonData.content;
            //     if (!Array.isArray(questions) || questions.length === 0) {
            //         memoMarkIncomplete();
            //         return;
            //     }

            //     for (let q of questions) {
            //         if (!q?.question?.trim() || !Array.isArray(q.answers) || q.answers.length < 2) {
            //             memoMarkIncomplete();
            //             return;
            //         }

            //         const hasCorrect = q.answers.every(a => a?.text?.trim()) && q.answers.some(a => a?.isCorrect);
            //         if (!hasCorrect) {
            //             memoMarkIncomplete();
            //             return;
            //         }
            //     }
            // } else if (exerciseType === "Task") {
            //     const task = lessonData.taskDescription;
            //     if (!task || !task.trim()) {
            //         memoMarkIncomplete();
            //         return;
            //     }
            // } else {
            //     memoMarkIncomplete();
            //     return;
            // }

            memoMarkComplete();
            // eslint-disable-next-line
        }, [lessonData]);

        return (
            <Space
                key={key}
                direction="vertical"
                size="middle"
                className="w-full mb-4 p-4 border border-dashed border-gray-300 rounded"
            >
                <h4 className="text-md font-semibold">Lesson {lessonIndex + 1}</h4>

                {/* Lesson Title */}
                <Form.Item
                    name={[lessonField.name, "title"]}
                    label="Lesson Title"
                    rules={[{ required: true, message: "Lesson title required" }]}
                    validateStatus={finalSuppressErrors ? "" : undefined}
                    help={finalSuppressErrors ? "" : undefined}
                >
                    <Input placeholder="Lesson title" />
                </Form.Item>

                {/* Theory Section */}
                <Divider orientation="left">Theory Section</Divider>

                <Form.Item
                    name={[lessonField.name, "theory", "title"]}
                    label="Title"
                    rules={[{ required: true, message: "Theory type required" }]}
                    validateStatus={finalSuppressErrors ? "" : undefined}
                    help={finalSuppressErrors ? "" : undefined}
                >
                    <Input placeholder="Theory title" />
                </Form.Item>

                <Form.Item
                    name={[lessonField.name, "theory", "content"]}
                    label="Content"
                    rules={[{ required: true, message: "Enter theory content" }]}
                    validateStatus={finalSuppressErrors ? "" : undefined}
                    help={finalSuppressErrors ? "" : undefined}
                >
                    <Input.TextArea rows={4} placeholder="Enter document content" />
                </Form.Item>




                {/* <Form.Item
                    name={[lessonField.name, "theoryType"]}
                    label="Theory Type"
                    rules={[{ required: true, message: "Theory type required" }]}
                    validateStatus={finalSuppressErrors ? "" : undefined}
                    help={finalSuppressErrors ? "" : undefined}
                >
                    <Select placeholder="Select theory type">
                        {theoryTypes.map((type) => (
                            <Option key={type} value={type}>{type}</Option>
                        ))}
                    </Select>
                </Form.Item> */}

                {/* Render Theory Content */}
                {/* {theoryType === "Video" && (
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

                {theoryType === "Document" && (
                    <Form.Item
                        name={[lessonField.name, "document"]}
                        label="Document Content"
                        rules={[{ required: true, message: "Enter document content" }]}
                        validateStatus={finalSuppressErrors ? "" : undefined}
                        help={finalSuppressErrors ? "" : undefined}
                    >
                        <Input.TextArea rows={4} placeholder="Enter document content" />
                    </Form.Item>
                )} */}



                {/* Exercise Section */}
                <Divider orientation="left">Exercise Section</Divider>

                {/* <Form.Item
                    name={[lessonField.name, "exerciseType"]}
                    label="Exercise Type"
                    rules={[{ required: true, message: "Exercise type required" }]}
                >
                    <Select placeholder="Select exercise type">
                        {exerciseTypes.map((type) => (
                            <Option key={type} value={type}>{type}</Option>
                        ))}
                    </Select>
                </Form.Item> */}

                <Form.Item
                    name={[lessonField.name, "exercise", "title"]}
                    label="Title"
                    rules={[{ required: true, message: "Exercise title required" }]}
                >
                    <Input placeholder="Exercise title" />
                </Form.Item>
                <Form.Item
                    name={[lessonField.name, "exercise", "instruction"]}
                    label="Instruction"
                >
                    <Input.TextArea rows={3} placeholder="Exercise instruction" />
                </Form.Item>
                <Form.Item
                    name={[lessonField.name, "exercise", "expReward"]}
                    label="Exp Reward"
                >
                    <InputNumber min={0} placeholder="Exp Reward" className="w-full" />
                </Form.Item>
                <Form.List name={[lessonField.name, "exercise", "tasks"]}>
                    {(taskFields, { add: addTask, remove: removeTask }) => (
                        <>
                            {taskFields.map((tField) => {
                                return (
                                    <TaskItem
                                        key={`module-${moduleIndex}-lesson-${lessonIndex}-exercise-${lessonIndex}-answer-${tField.name}`}
                                        moduleIndex={moduleIndex}
                                        lessonIndex={lessonIndex}
                                        exerciseIndex={lessonIndex}
                                        tField={tField}
                                        removeTask={removeTask}
                                        suppressErrors={suppressErrors}
                                    ></TaskItem>
                                )
                            })}
                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => addTask()}
                                    icon={<PlusOutlined />}
                                >
                                    Add Task
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>



                {/* Render Exercise Content */}
                {exerciseType === "Quiz" && (
                    <Form.List name={[lessonField.name, "content"]}>
                        {(questionFields, { add: addQuestion, remove: removeQuestion }) => (
                            <>
                                {questionFields.map((qField, qIndex) => (
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
                                ))}
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
                )}

                {exerciseType === "Task" && (
                    <Form.Item
                        name={[lessonField.name, "taskDescription"]}
                        label="Task Description"
                        rules={[{ required: true, message: "Enter task description" }]}
                    >
                        <Input.TextArea rows={4} placeholder="Describe the task for students" />
                    </Form.Item>
                )}

                {/* Duration */}
                <Form.Item
                    name={[lessonField.name, "duration"]}
                    label="Estimated Duration (mins)"
                    rules={[{ required: true, message: "Enter duration" }]}
                    validateStatus={finalSuppressErrors ? "" : undefined}
                    help={finalSuppressErrors ? "" : undefined}
                >
                    <InputNumber min={1} placeholder="Minutes" className="w-full" />
                </Form.Item>

                {/* Remove Button */}
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

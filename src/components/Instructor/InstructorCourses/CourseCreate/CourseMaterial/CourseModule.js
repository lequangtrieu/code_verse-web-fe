import React, { useState, useRef } from "react";
import { Button, Collapse, Modal, Input, InputNumber, Form, Tabs, Typography, Select, message } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import RichTextEditor from "./RichTextEditor";
import axiosInstance from "../../../../../config/axiosInstance";
import commonApi from "../../../../../common/api";
import ExerciseForm from "./ExerciseForm";
import QuizForm from "./QuizForm";
import { duration } from "moment/moment";

const { Panel } = Collapse;
const { Title } = Typography;
const { Option } = Select;

function htmlToFile(htmlContent, fileName = "theory.html") {
    const blob = new Blob([htmlContent], { type: "text/html" });
    return new File([blob], fileName, { type: "text/html" });
}

const CourseModule = ({ courseId }) => {
    const [modules, setModules] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showModuleModal, setShowModuleModal] = useState(false);
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [activeModuleId, setActiveModuleId] = useState(null);
    const [editingModule, setEditingModule] = useState(null);
    const [editingLesson, setEditingLesson] = useState(null);
    const [loadingModule, setLoadingModule] = useState(false);
    const [loadingLesson, setLoadingLesson] = useState(false);
    const [loadingTheory, setLoadingTheory] = useState(false);
    const editorRef = useRef();

    const [moduleForm] = Form.useForm();
    const [lessonForm] = Form.useForm();
    const [theoryForm] = Form.useForm();

    const markTheoryTouched = () => { }

    const handleSaveModule = async () => {
        setLoadingModule(true);
        try {
            const values = await moduleForm.validateFields();
            const orderIndex = modules.length + 1;

            if (editingModule) {
                // Update module
                const res = await axiosInstance.put(commonApi.updateCourseModule.url(editingModule.id), {
                    title: values.title,
                    orderIndex: orderIndex
                });

                setModules((prev) =>
                    prev.map((m) => (m.id === editingModule.id ? res.data.result : m))
                );
                message.success("Module updated successfully!");
            } else {
                // Create module
                const res = await axiosInstance.post(commonApi.createModule.url, {
                    courseId: courseId,
                    title: values.title,
                    orderIndex: orderIndex
                });

                setModules([...modules, { ...res.data.result, lessons: [] }]);
                message.success("Module created successfully!");
            }

            setShowModuleModal(false);
            setEditingModule(null);
            moduleForm.resetFields();
        } catch (error) {
            console.log("Failed to save module:", error);
            message.error("Error saving module.");
        } finally {
            setLoadingModule(false);
        }
    };

    const handleSaveLesson = async () => {
        setLoadingLesson(true);
        try {
            const values = await lessonForm.validateFields();
            const module = modules.find((m) => m.id === activeModuleId);
            const orderIndex = module?.lessons.length + 1 || 1;

            if (editingLesson) {
                // Update lesson
                const res = await axiosInstance.put(commonApi.updateLesson.url(editingLesson.id), {
                    title: values.title,
                    lessonType: values.lessonType,
                    duration: values.duration,
                    expReward: values.expReward,
                    orderIndex: orderIndex
                });

                const updatedModules = modules.map((mod) =>
                    mod.id === activeModuleId
                        ? {
                            ...mod,
                            lessons: mod.lessons.map((l) =>
                                l.id === editingLesson.id ? res.data.result : l
                            ),
                        }
                        : mod
                );
                setModules(updatedModules);
                message.success("Lesson updated successfully!");
            } else {
                const res = await axiosInstance.post(commonApi.createLesson.url, {
                    courseModuleId: activeModuleId,
                    title: values.title,
                    lessonType: values.lessonType,
                    orderIndex: orderIndex,
                    duration: values.duration,
                    expReward: values.expReward
                });

                const updatedModules = modules.map((mod) =>
                    mod.id === activeModuleId
                        ? {
                            ...mod,
                            lessons: [...mod.lessons, res.data.result],
                        }
                        : mod
                );
                setModules(updatedModules);
                message.success("Lesson created successfully!");
            }

            setShowLessonModal(false);
            setEditingLesson(null);
            lessonForm.resetFields();
        } catch (error) {
            console.log("Failed to save lesson:", error);
            message.error("Error saving lesson.");
        } finally {
            setLoadingLesson(false);
        }
    };

    const handleSaveTheory = async () => {
        setLoadingTheory(true);
        const htmlContent = editorRef.current?.getHtml();

        try {
            const values = await theoryForm.validateFields();
            const title = values.title;
            const lessonId = selectedLesson.id;
            const result = await saveTheory({ lessonId, title, htmlContent });
            message.success("Theory saved successfully!");
        } catch (err) {
            message.error("Error saving theory.");
        } finally {
            setLoadingTheory(false);
        }
    };

    const saveTheory = async ({ lessonId, title, htmlContent }) => {
        const htmlFile = htmlToFile(htmlContent, `${title}.html`);

        const formData = new FormData();
        formData.append("lessonId", lessonId);
        formData.append("title", title);
        formData.append("contentFile", htmlFile);

        try {
            const res = await axiosInstance.post(commonApi.createTheory.url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            return res.data;
        } catch (error) {
            console.error("Failed to save theory:", error);
            throw error;
        }
    };

    const renderModuleHeader = (mod) => (
        <div className="flex justify-between items-center">
            <span>{mod.title}</span>
            <div className="flex space-x-1">
                <Button
                    size="small"
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveModuleId(mod.id);
                        setShowLessonModal(true);
                    }}
                />
                <Button
                    size="small"
                    type="text"
                    icon={<span className="text-sm"><EditOutlined /></span>}
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditingModule(mod);
                        moduleForm.setFieldsValue({ title: mod.title });
                        setShowModuleModal(true);
                    }}
                />
            </div>
        </div>
    );

    return (
        <div className="flex border border-gray-200 min-h-[500px]">
            {/* Sidebar */}
            <div className="w-[300px] bg-white p-4">
                <Title level={4}>Modules</Title>
                <Button
                    type="dashed"
                    icon={<PlusOutlined />}
                    onClick={() => setShowModuleModal(true)}
                    block
                >
                    Add Module
                </Button>

                <div className="mt-4">
                    <Collapse accordion>
                        {modules.map((mod) => (
                            <Panel
                                header={renderModuleHeader(mod)}
                                key={mod.id}
                            >
                                {mod.lessons.map((lesson) => (
                                    <div
                                        key={lesson.id}
                                        className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer
                          ${selectedLesson?.id === lesson.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                    >
                                        <span
                                            onClick={() => setSelectedLesson({ ...lesson, moduleId: mod.id })}
                                            className="flex-1 truncate"
                                        >
                                            {lesson.title}
                                        </span>
                                        <Button
                                            size="small"
                                            type="text"
                                            icon={<span className="text-base"><EditOutlined /></span>}
                                            onClick={() => {
                                                setActiveModuleId(mod.id);
                                                setEditingLesson({ ...lesson });
                                                lessonForm.setFieldsValue({
                                                    title: lesson.title,
                                                    type: lesson.lessonType,
                                                });
                                                setShowLessonModal(true);
                                            }}
                                        />
                                    </div>
                                ))}
                            </Panel>
                        ))}
                    </Collapse>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-white">
                {selectedLesson ? (
                    <>
                        <Title level={4}>Lesson Form: {selectedLesson.title}</Title>

                        {selectedLesson.lessonType === "CODE" ? (
                            <Tabs defaultActiveKey="theory">
                                <Tabs.TabPane tab="Theory" key="theory">
                                    <Form
                                        form={theoryForm}
                                        layout="vertical"
                                        onValuesChange={() => markTheoryTouched()}
                                    >
                                        <Form.Item
                                            name="title"
                                            label="Theory Title"
                                            rules={[{ required: true, message: "Please input the theory title" }]}
                                        >
                                            <Input placeholder="Enter theory title" />
                                        </Form.Item>

                                        <Form.Item label="Theory Content" required>
                                            <RichTextEditor
                                                content={theoryForm.getFieldValue("content") || ""}
                                                onChange={(value) => theoryForm.setFieldsValue({ content: value })}
                                                lessonId={selectedLesson.id}
                                                ref={editorRef}
                                            />
                                        </Form.Item>
                                        <Button
                                            type="primary"
                                            className="mt-6 justify-end"
                                            onClick={handleSaveTheory}
                                            loading={loadingTheory}
                                        >
                                            Save Theory
                                        </Button>
                                    </Form>
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Exercise" key="exercise">
                                    <ExerciseForm lessonId={selectedLesson.id} />
                                </Tabs.TabPane>
                            </Tabs>
                        ) : (
                            <QuizForm lessonId={selectedLesson.id} />
                        )}
                    </>
                ) : (
                    <Title level={4}>Select a lesson to edit</Title>
                )}
            </div>

            {/* Module Modal */}
            <Modal
                title="Module"
                open={showModuleModal}
                onCancel={() => setShowModuleModal(false)}
                footer={null}
            >
                <Form form={moduleForm} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Module Title"
                        rules={[{ required: true, message: "Please input module title" }]}
                    >
                        <Input placeholder="e.g., Learn React from Scratch" />
                    </Form.Item>

                    <div className="flex justify-end gap-2">
                        <Button onClick={() => setShowModuleModal(false)}>Cancel</Button>
                        <Button type="primary" onClick={handleSaveModule} loading={loadingModule}>
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>

            {/* Lesson Modal */}
            <Modal
                title="Lesson"
                open={showLessonModal}
                onCancel={() => {
                    setShowLessonModal(false);
                    setEditingLesson(null);
                    lessonForm.resetFields();
                }}
                footer={null}
            >
                <Form form={lessonForm} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Lesson Title"
                        rules={[{ required: true, message: "Please input lesson title" }]}
                    >
                        <Input placeholder="e.g., Learn React from Scratch" />
                    </Form.Item>
                    <Form.Item
                        name="lessonType"
                        label="Lesson Type"
                        rules={[{ required: true }]}
                    >
                        <Select placeholder="Select lesson type">
                            <Option value="CODE">Code</Option>
                            <Option value="EXAM">Quiz</Option>
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="duration"
                        label="Estimated Duration (mins)"
                        rules={[{ required: true, message: "Please enter duration" }]}
                    >
                        <InputNumber min={1} placeholder="Minutes" className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="expReward"
                        label="Exp Reward"
                        rules={[{ required: true, message: "Please enter EXP Reward" }]}
                    >
                        <InputNumber min={0} placeholder="Exp Reward" className="w-full" />
                    </Form.Item>
                    <div className="flex justify-end gap-2">
                        <Button onClick={() => setShowLessonModal(false)}>Cancel</Button>
                        <Button type="primary" onClick={handleSaveLesson} loading={loadingLesson}>
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
        </div>
    );
};

export default CourseModule;

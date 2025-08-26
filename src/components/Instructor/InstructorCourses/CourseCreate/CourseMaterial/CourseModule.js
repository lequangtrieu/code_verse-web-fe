import React, { useState, useEffect } from "react";
import { Button, Collapse, Modal, Input, InputNumber, Form, Tabs, Typography, Select, message, Tooltip } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined, ThunderboltTwoTone, ToolTwoTone, RocketTwoTone } from "@ant-design/icons";
import axiosInstance from "../../../../../config/axiosInstance";
import commonApi from "../../../../../common/api";
import ExerciseForm from "./ExerciseForm";
import QuizForm from "./QuizForm";
import TheoryForm from "./TheoryForm";
import LoadingOverlay from "../../../../../common/LoadingOverlay";
import { useUnsavedChanges } from "../../../../../common/useUnsavedChange";

const { Panel } = Collapse;
const { Title, Text } = Typography;
const { Option } = Select;

const CourseModule = ({ courseId, setCanPreview }) => {
    const [modules, setModules] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState(null);
    const [showModuleModal, setShowModuleModal] = useState(false);
    const [showLessonModal, setShowLessonModal] = useState(false);
    const [activeModuleId, setActiveModuleId] = useState(null);
    const [editingModule, setEditingModule] = useState(null);
    const [editingLesson, setEditingLesson] = useState(null);
    const [loadingModule, setLoadingModule] = useState(false);
    const [loadingLesson, setLoadingLesson] = useState(false);
    const [initialLoading, setInitialLoading] = useState(false);
    const [showGenerateModal, setShowGenerateModal] = useState(false);
    const [loadingGenerate, setLoadingGenerate] = useState(false);
    const [loadingAIGenerate, setLoadingAIGenerate] = useState(false);
    const [hasUnsavedTheory, setHasUnsavedTheory] = useState(false);
    const [hasUnsavedExercise, setHasUnsavedExercise] = useState(false);
    const [hasUnsavedQuiz, setHasUnsavedQuiz] = useState(false);
    const [activeTab, setActiveTab] = useState("theory");

    const [moduleForm] = Form.useForm();
    const [lessonForm] = Form.useForm();
    const [generateForm] = Form.useForm();

    const [deleteConfirm, setDeleteConfirm] = useState({
        visible: false,
        type: '',
        target: null,
    });

    useUnsavedChanges(hasUnsavedExercise || hasUnsavedQuiz || hasUnsavedTheory);

    useEffect(() => {
        if(modules?.some?.(module => Array.isArray(module.lessons) && module.lessons.length > 0)) setCanPreview(true);
        // eslint-disable-next-line
    }, [modules]);

    useEffect(() => {
        fetchModules();
        // eslint-disable-next-line
    }, [courseId]);

    const fetchModules = async () => {
        setInitialLoading(true);
        try {
            const result = await axiosInstance.get(commonApi.getModules.url(courseId));
            setModules(result.data.result);
        } catch (error) {
            message.error("Error fetch course modules.");
        } finally {
            setTimeout(() => {
                setInitialLoading(false);
            }, 400);
        }
    };

    const handleSaveModule = async () => {
        setLoadingModule(true);
        try {
            const values = await moduleForm.validateFields();
            const orderIndex = modules.length + 1;

            if (editingModule) {
                // Update module
                const res = await axiosInstance.put(commonApi.updateCourseModule.url(editingModule.id), {
                    title: values.title,
                    orderIndex: editingModule.orderIndex
                });

                setModules((prev) =>
                    prev.map((m) => (m.id === editingModule.id ? {
                        ...res.data.result,
                        lessons: m.lessons ?? []
                    } : m))
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
        } finally {
            setLoadingModule(false);
        }
    };

    const handleSaveLesson = async () => {
        setLoadingLesson(true);
        try {
            const values = await lessonForm.validateFields();
            const module = modules.find((m) => m.id === activeModuleId);
            const orderIndex = module?.lessons?.length + 1 || 1;

            if (editingLesson) {
                // Update lesson
                const res = await axiosInstance.put(commonApi.updateLesson.url(editingLesson.id), {
                    title: values.title,
                    lessonType: values.lessonType,
                    duration: values.duration,
                    expReward: values.expReward,
                    orderIndex: editingLesson.orderIndex
                });

                const updatedModules = modules.map((mod) =>
                    mod.id === activeModuleId
                        ? {
                            ...mod,
                            lessons: mod.lessons?.map((l) =>
                                l.id === editingLesson.id ? res.data.result : l
                            ),
                        }
                        : mod
                );
                setModules(updatedModules);
                if (selectedLesson.id === editingLesson.id) setSelectedLesson({ ...res.data.result, moduleId: activeModuleId });
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
                            lessons: [...mod.lessons ?? [], res.data.result],
                        }
                        : mod
                );
                setModules(updatedModules);
                setSelectedLesson({ ...res.data.result, moduleId: activeModuleId })
                message.success("Lesson created successfully!");
            }

            setShowLessonModal(false);
            setEditingLesson(null);
            lessonForm.resetFields();
        } catch (error) {
            message.error("Error saving lesson.");
        } finally {
            setLoadingLesson(false);
        }
    };

    const confirmDelete = async () => {
        if (!deleteConfirm.target) return;

        setInitialLoading(true);
        try {
            if (deleteConfirm.type === 'module') {
                await axiosInstance.delete(commonApi.updateCourseModule.url(deleteConfirm.target.id));
                message.success("Module deleted successfully!");
            } else if (deleteConfirm.type === 'lesson') {
                await axiosInstance.delete(commonApi.updateLesson.url(deleteConfirm.target.id));
                message.success("Lesson deleted successfully!");
            }

            fetchModules();
            setSelectedLesson(null);
        } catch (err) {
            message.error("Delete failed.");
        } finally {
            setDeleteConfirm({ visible: false, type: '', target: null });
            setTimeout(() => {
                setInitialLoading(false);
            }, 400);
        }
    };

    const renderModuleHeader = (mod) => (
        <div className="flex justify-between items-center">
            <Text>{mod.title}</Text>
            <div className="flex space-x-1">
                <Button
                    size="small"
                    type="text"
                    icon={<PlusOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        setActiveModuleId(mod.id);
                        setShowLessonModal(true);
                        lessonForm.setFieldsValue({
                            title: null,
                            lessonType: "CODE",
                            duration: null,
                            expReward: null
                        });
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
                <Button
                    size="small"
                    type="text"
                    danger
                    icon={<span className="text-sm"><DeleteOutlined /></span>}
                    onClick={(e) => {
                        e.stopPropagation();
                        setDeleteConfirm({ visible: true, type: 'module', target: mod });
                    }}
                />
            </div>
        </div>
    );

    const handleGenerate = async (mode) => {
        try {
            const { modules: moduleCount, lessons: lessonCount } = await generateForm.validateFields();

            let generatedData = [];
            if (mode === "ai") {
                setLoadingAIGenerate(true);
                const res = await axiosInstance.post(commonApi.aiDraftCourse.url, {
                    courseId,
                    modules: moduleCount,
                    lessons: lessonCount
                });
                generatedData = res.data.result.modules;
            } else {
                setLoadingGenerate(true);
                generatedData = Array.from({ length: moduleCount }).map((_, m) => ({
                    title: `Module ${(modules?.length ?? 0) + m + 1}`,
                    subLessons: Array.from({ length: lessonCount }).map((_, l) => ({
                        title: `Lesson ${l + 1}`,
                        lessonType: "CODE",
                        duration: 10,
                        expReward: 10
                    }))
                }));
            }

            // Persist to backend
            for (let [mIndex, mod] of generatedData.entries()) {
                const modRes = await axiosInstance.post(commonApi.createModule.url, {
                    courseId,
                    title: mod.title,
                    orderIndex: modules.length + mIndex + 1
                });

                const newModule = { ...modRes.data.result, lessons: [] };

                for (let [lIndex, lesson] of mod.subLessons.entries()) {
                    const lessonRes = await axiosInstance.post(commonApi.createLesson.url, {
                        courseModuleId: modRes.data.result.id,
                        title: lesson.title,
                        lessonType: lesson.lessonType,
                        duration: lesson.duration,
                        expReward: lesson.expReward,
                        orderIndex: lIndex + 1
                    });
                    newModule.lessons.push(lessonRes.data.result);
                }

                setModules((prev) => [...prev, newModule]);
            }

            message.success(mode === "ai" ? "AI drafted modules created!" : "Manual modules created!");
            setShowGenerateModal(false);
            generateForm.resetFields();
        } catch (err) {
            console.error(err);
            message.error("Failed to generate.");
        } finally {
            setLoadingGenerate(false);
            setLoadingAIGenerate(false);
        }
    };

    return (
        <div className="flex border border-gray-200 min-h-[500px]">
            {initialLoading && <LoadingOverlay />}
            {/* Sidebar */}
            <div className="w-[300px] bg-white p-4">
                <Title level={4}>Modules</Title>
                <div className="flex justify-between items-center w-full gap-2">
                    <Button
                        type="dashed"
                        icon={<PlusOutlined />}
                        onClick={() => setShowModuleModal(true)}
                        block
                    >
                        Add Module
                    </Button>
                    <Tooltip title="Fast Generate">
                        <Button
                            type="primary"
                            icon={<ThunderboltTwoTone twoToneColor="#FFD666" />}
                            style={{ paddingRight: "10px", paddingLeft: "10px" }}
                            className="bg-gradient-to-r from-blue-500 to-purple-500"
                            onClick={() => setShowGenerateModal(true)}
                        >
                        </Button>
                    </Tooltip>
                </div>

                <div className="mt-4">
                    <div className="max-h-[800px] overflow-y-auto pr-2">
                        <Collapse accordion>
                            {modules?.map((mod) => (
                                <Panel
                                    header={renderModuleHeader(mod)}
                                    key={mod.id}
                                >
                                    {/* <div className="max-h-[250px] overflow-y-auto pr-1"> */}
                                    {mod.lessons?.map((lesson) => (
                                        <div
                                            key={lesson.id}
                                            className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer
                          ${selectedLesson?.id === lesson.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                                        >
                                            <span
                                                onClick={() => {
                                                    if (hasUnsavedTheory || hasUnsavedExercise || hasUnsavedQuiz) {
                                                        Modal.confirm({
                                                            title: "Unsaved changes",
                                                            content: "You have unsaved changes. Do you want to leave without saving?",
                                                            okText: "Leave",
                                                            cancelText: "Stay",
                                                            onOk: () => {
                                                                setHasUnsavedExercise(false);
                                                                setHasUnsavedQuiz(false);
                                                                setHasUnsavedTheory(false);
                                                                setSelectedLesson({ ...lesson, moduleId: mod.id });
                                                            },
                                                        });
                                                    } else setSelectedLesson({ ...lesson, moduleId: mod.id });
                                                }}
                                                className="flex-1 truncate"
                                            >
                                                <Text>{lesson.title}</Text>
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
                                                        lessonType: lesson.lessonType,
                                                        duration: lesson.duration,
                                                        expReward: lesson.expReward
                                                    });
                                                    setShowLessonModal(true);
                                                }}
                                            />
                                            <Button
                                                size="small"
                                                type="text"
                                                danger
                                                icon={<DeleteOutlined />}
                                                onClick={() => {
                                                    setDeleteConfirm({ visible: true, type: 'lesson', target: { ...lesson, moduleId: mod.id } });
                                                }}
                                            />
                                        </div>
                                    ))}
                                    {/* </div> */}
                                </Panel>
                            ))}
                        </Collapse>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 bg-white">
                {selectedLesson ? (
                    <>
                        <Title level={4}>Lesson Form: {selectedLesson.title}</Title>

                        {selectedLesson.lessonType === "CODE" ? (
                            <Tabs activeKey={activeTab} onChange={setActiveTab}>
                                <Tabs.TabPane tab="Theory" key="theory">
                                    <TheoryForm
                                        lessonId={selectedLesson.id}
                                        isActive={activeTab === "theory"}
                                        hasChange={hasUnsavedTheory}
                                        setHasChange={setHasUnsavedTheory}
                                    />
                                </Tabs.TabPane>
                                <Tabs.TabPane tab="Exercise" key="exercise">
                                    <ExerciseForm
                                        lessonId={selectedLesson.id}
                                        hasChange={hasUnsavedExercise}
                                        setHasChange={setHasUnsavedExercise}
                                    />
                                </Tabs.TabPane>
                            </Tabs>
                        ) : (
                            <QuizForm
                                lessonId={selectedLesson.id}
                                hasChange={hasUnsavedQuiz}
                                setHasChange={setHasUnsavedQuiz} />
                        )}
                    </>
                ) : (
                    <Title level={4}>Select a lesson to edit</Title>
                )}
            </div>

            {/* Module Modal */}
            <Modal
                title="Module"
                getContainer={false}
                open={showModuleModal}
                onCancel={() => {
                    moduleForm.resetFields();
                    setShowModuleModal(false);
                }}
                footer={null}
            >
                <Form form={moduleForm} layout="vertical">
                    <Form.Item
                        name="title"
                        label="Module Title"
                        rules={[{ required: true, message: "Please input module title" }]}
                    >
                        <Input placeholder="e.g., Learn React from Scratch" maxLength={250} showCount />
                    </Form.Item>

                    <div className="flex justify-end gap-2">
                        <Button onClick={() => {
                            moduleForm.resetFields();
                            setShowModuleModal(false);
                        }}>Cancel</Button>
                        <Button type="primary" onClick={handleSaveModule} loading={loadingModule}>
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>

            {/* Lesson Modal */}
            <Modal
                title="Lesson"
                getContainer={false}
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
                        <Input placeholder="e.g., Learn React from Scratch" maxLength={250} showCount />
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
                        <InputNumber min={1} max={30} placeholder="Minutes" className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="expReward"
                        label="Exp Reward"
                        rules={[{ required: true, message: "Please enter EXP Reward" }]}
                    >
                        <InputNumber min={0} max={50} placeholder="Exp Reward" className="w-full" />
                    </Form.Item>
                    <div className="flex justify-end gap-2">
                        <Button onClick={() => setShowLessonModal(false)}>Cancel</Button>
                        <Button type="primary" onClick={handleSaveLesson} loading={loadingLesson}>
                            Save
                        </Button>
                    </div>
                </Form>
            </Modal>
            <Modal
                centered={true}
                open={deleteConfirm.visible}
                getContainer={false}
                title={`Confirm Delete ${deleteConfirm.type === 'module' ? 'Module' : 'Lesson'}`}
                onCancel={() => setDeleteConfirm({ visible: false, type: '', target: null })}
                onOk={confirmDelete}
                okText="Yes, Delete"
                okButtonProps={{ danger: true }}
            >
                <p>
                    Are you sure you want to delete this {deleteConfirm.type}? This action cannot be undone.
                </p>
            </Modal>

            <Modal centered={true}
                getContainer={false}
                title="Fast Generate Modules & Lessons"
                open={showGenerateModal}
                onCancel={() => {
                    setShowGenerateModal(false);
                    generateForm.resetFields();
                }}
                footer={null}
            >
                <Form form={generateForm} layout="vertical">
                    <Form.Item
                        name="modules"
                        label="Number of Modules"
                        rules={[{ required: true, message: "Enter number of modules" }]}
                    >
                        <InputNumber min={1} max={10} className="w-full" />
                    </Form.Item>
                    <Form.Item
                        name="lessons"
                        label="Lessons per Module"
                        rules={[{ required: true, message: "Enter number of lessons" }]}
                    >
                        <InputNumber min={1} max={10} className="w-full" />
                    </Form.Item>
                </Form>

                <div className="grid grid-cols-2 gap-3 mt-4">
                    {/* Manual Panel */}
                    <Button
                        type="dashed"
                        disabled={loadingAIGenerate}
                        loading={loadingGenerate}
                        onClick={() => handleGenerate("manual")}
                        className="min-h-28 flex flex-col items-center justify-center py-[80px]"
                    >
                        <ToolTwoTone twoToneColor="#2563EB" className="!text-3xl mb-2" />
                        <strong>Manual</strong>
                        <span className="text-xs text-gray-500">Empty placeholders</span>
                    </Button>

                    {/* AI Draft Panel */}
                    <Button
                        type="dashed"
                        disabled={loadingGenerate}
                        loading={loadingAIGenerate}
                        onClick={() => handleGenerate("ai")}
                        className="min-h-28 flex flex-col items-center justify-center py-[80px]"
                    >
                        <RocketTwoTone twoToneColor="#16A34A" className="!text-3xl mb-2" />
                        <strong>AI Drafted</strong>
                        <span className="text-xs text-gray-500 text-wrap">AI will generate title of modules and lessons based on your course information.</span>
                    </Button>
                </div>
            </Modal>

        </div>
    );
};

export default CourseModule;

import React, { useState, useEffect } from "react";
import { Form, Input, Button, List, Modal, Select, Switch, Space, Card, message } from "antd";
import { DeleteOutlined, EditOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import axiosInstance from "../../../../../config/axiosInstance";
import commonApi from "../../../../../common/api";

const { TextArea } = Input;

const PRIORITY_OPTIONS = [
    { label: "Required", value: "REQUIRED" },
    { label: "Optional", value: "OPTIONAL" },
];

const ExerciseForm = ({ lessonId }) => {
    const [exerciseId, setExerciseId] = useState(null);
    const [exerciseForm] = Form.useForm();
    const [taskDescription, setTaskDescription] = useState("");
    const [isAddingTask, setIsAddingTask] = useState(false);
    const [editingTaskId, setEditingTaskId] = useState(null);
    const [editingDescription, setEditingDescription] = useState("");
    const [exerciseTasks, setExerciseTasks] = useState([]);
    const [testCases, setTestCases] = useState([]);
    const [editingTestCase, setEditingTestCase] = useState(null);
    const [isTestCaseModalOpen, setIsTestCaseModalOpen] = useState(false);
    const [testCaseForm] = Form.useForm();

    useEffect(() => {
        fetchExercise();
    }, [lessonId]);

    const fetchExercise = async () => {
        try {
            const res = await axiosInstance.get(commonApi.getExerciseByLessonId.url(lessonId));
            setExerciseId(res.data.result.id);
        } catch {
            message.error("Failed to get exercise.");
        } finally{
            setTimeout(() => {
                
            }, 400);
        }
    };

    const handleSaveExercise = async (values) => {
        try {
            const newExercise = {
                lessonId: lessonId,
                ...values
            };
            await axiosInstance.post(commonApi.createExercise.url, newExercise);
            message.success("Exercise saved successfully!");
        } catch {
            message.error("Error saving exercise.");
        }
    };

    const handleSaveTask = async () => {
        if (!taskDescription.trim()) return;

        try {
            const newTask = {
                exerciseId: exerciseId,
                description: taskDescription,
            };
            const res = await axiosInstance.post(commonApi.createExerciseTask.url, newTask);
            setExerciseTasks((prev) => [...prev, res.data.result]);
            setTaskDescription("");
            setIsAddingTask(false);
        } catch (err) {
            message.error("Failed to save task");
        }
    };

    const handleUpdateTask = () => {
        setExerciseTasks((prev) =>
            prev.map((t) =>
                t.id === editingTaskId ? { ...t, description: editingDescription } : t
            )
        );
        setEditingTaskId(null);
        setEditingDescription("");
    };

    const handleCancelEdit = () => {
        setEditingTaskId(null);
        setEditingDescription("");
    };

    const handleEditTask = (task) => {
        setEditingTaskId(task.id);
        setEditingDescription(task.description);
    };

    const handleAddTestCase = async (values) => {
        if (editingTestCase) {
            setTestCases((prev) =>
                prev.map((tc) =>
                    tc === editingTestCase ? { ...editingTestCase, ...values } : tc
                )
            );
        } else {
            const newTestCase = { ...values, exerciseId: exerciseId };
            const res = await axiosInstance.post(commonApi.createTestCase.url, newTestCase);
            setTestCases([...testCases, res.data.result]);
            message.success("Test case saved successfully!");
        }
        setIsTestCaseModalOpen(false);
        setEditingTestCase(null);
        testCaseForm.resetFields();
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Exercise Info + Task List */}
            <div className="flex gap-4">
                {/* Exercise Info */}
                <Card title="Exercise" className="flex-1">
                    <Form form={exerciseForm} layout="vertical" onFinish={handleSaveExercise}>
                        <Form.Item name="title" label="Exercise Title" rules={[{ required: true }]}>
                            <Input placeholder="Enter title" />
                        </Form.Item>
                        <Form.Item name="instruction" label="Instruction" rules={[{ required: true }]}>
                            <TextArea rows={4} placeholder="Enter instruction" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                Save Exercise
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>

                {/* Exercise Tasks */}
                <Card title="Exercise Tasks" className="flex-1">
                    {!isAddingTask ? (
                        <Button type="dashed" onClick={() => setIsAddingTask(true)}>
                            + Add Task
                        </Button>
                    ) : (
                        <div className="flex gap-2 mb-2">
                            <Input
                                placeholder="Enter task description"
                                value={taskDescription}
                                onChange={(e) => setTaskDescription(e.target.value)}
                                className="flex-1"
                            />
                            <Button type="primary" onClick={handleSaveTask}>
                                Save
                            </Button>
                            <Button onClick={() => {
                                setIsAddingTask(false);
                                setTaskDescription("");
                            }}>
                                Cancel
                            </Button>
                        </div>
                    )}
                    <div className="max-h-64 overflow-y-auto mt-4">
                        <List
                            bordered
                            dataSource={exerciseTasks}
                            renderItem={(item) => (
                                <List.Item
                                    actions={
                                        editingTaskId === item.id
                                            ? [
                                                <Button
                                                    type="link"
                                                    onClick={handleUpdateTask}
                                                    icon={<CheckOutlined />}
                                                />,
                                                <Button
                                                    type="link"
                                                    onClick={handleCancelEdit}
                                                    icon={<CloseOutlined />}
                                                />,
                                            ]
                                            : [
                                                <Button
                                                    type="link"
                                                    icon={<EditOutlined />}
                                                    onClick={() => handleEditTask(item)}
                                                />,
                                                <Button
                                                    type="link"
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={() =>
                                                        setExerciseTasks((prev) => prev.filter((t) => t.id !== item.id))
                                                    }
                                                />,
                                            ]
                                    }
                                >
                                    {editingTaskId === item.id ? (
                                        <Input
                                            value={editingDescription}
                                            onChange={(e) => setEditingDescription(e.target.value)}
                                        />
                                    ) : (
                                        item.description
                                    )}
                                </List.Item>
                            )}
                        />
                    </div>
                </Card>
            </div>

            {/* Test Cases */}
            <Card title="Test Cases" className="border p-4 rounded shadow">
                <h3 className="font-semibold">Test Cases</h3>
                <Button onClick={() => {
                    setIsTestCaseModalOpen(true);
                    setEditingTestCase(null);
                    testCaseForm.resetFields();
                }}>
                    + Add Test Case
                </Button>

                <div className="max-h-64 overflow-y-auto mt-4">
                    <List
                        dataSource={testCases}
                        bordered
                        renderItem={(item) => (
                            <List.Item
                                actions={[
                                    <Button
                                        type="link"
                                        icon={<EditOutlined />}
                                        onClick={() => {
                                            setEditingTestCase(item);
                                            setIsTestCaseModalOpen(true);
                                            testCaseForm.setFieldsValue(item);
                                        }}
                                    />,
                                    <Button
                                        type="link"
                                        danger
                                        icon={<DeleteOutlined />}
                                        onClick={() =>
                                            setTestCases((prev) => prev.filter((tc) => tc !== item))
                                        }
                                    />
                                ]}
                            >
                                <Space direction="vertical">
                                    <div><strong>Input:</strong> {item.input}</div>
                                    <div><strong>Expected Output:</strong> {item.expectedOutput}</div>
                                    <div><strong>Priority:</strong> {item.priority}</div>
                                    <div><strong>Public:</strong> {item.isPublic ? "Yes" : "No"}</div>
                                </Space>
                            </List.Item>
                        )}
                    />
                </div>
            </Card>

            {/* Test Case Modal */}
            <Modal
                title={editingTestCase ? "Edit Test Case" : "Add Test Case"}
                open={isTestCaseModalOpen}
                onCancel={() => {
                    setIsTestCaseModalOpen(false);
                    setEditingTestCase(null);
                    testCaseForm.resetFields();
                }}
                onOk={() => testCaseForm.submit()}
                okText="Save"
            >
                <Form
                    form={testCaseForm}
                    layout="vertical"
                    onFinish={handleAddTestCase}
                >
                    <Form.Item name="input" label="Input" rules={[{ required: true }]}>
                        <Input placeholder="e.g. 1,2,3" />
                    </Form.Item>
                    <Form.Item name="expectedOutput" label="Expected Output" rules={[{ required: true }]}>
                        <Input placeholder="e.g. 6" />
                    </Form.Item>
                    <Form.Item name="priority" label="Priority" rules={[{ required: true }]}>
                        <Select options={PRIORITY_OPTIONS} />
                    </Form.Item>
                    <Form.Item name="isPublic" label="Public?" valuePropName="checked">
                        <Switch />
                    </Form.Item>
                </Form>
            </Modal>

        </div>
    );
};

export default ExerciseForm;
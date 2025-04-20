import React, { useState } from "react";
import { Card, Tabs, Button, Modal, Input, Form, message } from "antd";
import { PlusOutlined } from "@ant-design/icons";

const { TabPane } = Tabs;

const LessonContentAdmin = ({ lesson, onUpdateLesson }) => {
  const [isTheoryModalVisible, setIsTheoryModalVisible] = useState(false);
  const [isExerciseModalVisible, setIsExerciseModalVisible] = useState(false);
  const [newTheory, setNewTheory] = useState({
    title: "",
    content: "",
    example: "",
  });
  const [newExercise, setNewExercise] = useState({
    title: "",
    tasks: [],
    instruction: "",
  });

  const handleCreateTheory = () => {
    if (!newTheory.title || !newTheory.content || !newTheory.example) {
      message.error("Please fill in all the fields for Theory.");
      return;
    }
    onUpdateLesson("theory", newTheory); // Pass the new theory content to parent component
    setNewTheory({ title: "", content: "", example: "" });
    setIsTheoryModalVisible(false);
  };

  const handleCreateExercise = () => {
    if (
      !newExercise.title ||
      newExercise.tasks.length === 0 ||
      !newExercise.instruction
    ) {
      message.error("Please fill in all the fields for Exercise.");
      return;
    }
    onUpdateLesson("exercise", newExercise); // Pass the new exercise content to parent component
    setNewExercise({ title: "", tasks: [], instruction: "" });
    setIsExerciseModalVisible(false);
  };

  const handleAddTask = () => {
    setNewExercise({ ...newExercise, tasks: [...newExercise.tasks, ""] });
  };

  const handleChangeTask = (index, value) => {
    const updatedTasks = [...newExercise.tasks];
    updatedTasks[index] = value;
    setNewExercise({ ...newExercise, tasks: updatedTasks });
  };

  if (!lesson)
    return (
      <div className="w-1/2 p-4">Select a lesson to view the content.</div>
    );

  return (
    <div className="max-h-[850px] w-full p-4 bg-white overflow-y-auto">
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="Theory" key="1">
          <Card bordered={false}>
            <h2 className="text-xl font-semibold mb-2">
              {lesson.theory.title}
            </h2>
            <p className="text-gray-700 mb-4">{lesson.theory.content}</p>
            <pre className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
              {lesson.theory.example}
            </pre>

            {/* Button to create new Theory */}
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => setIsTheoryModalVisible(true)}
              block
              className="mt-4"
            >
              Create New Theory
            </Button>
          </Card>
        </TabPane>

        <TabPane tab="Exercise" key="2">
          <Card bordered={false}>
            <h2 className="text-xl font-semibold mb-2">
              {lesson.exercise.title}
            </h2>
            <ul className="list-disc ml-6 text-gray-700">
              {lesson.exercise.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
            <p className="mt-4">{lesson.exercise.instruction}</p>

            {/* Button to create new Exercise */}
            <Button
              type="dashed"
              icon={<PlusOutlined />}
              onClick={() => setIsExerciseModalVisible(true)}
              block
              className="mt-4"
            >
              Create New Exercise
            </Button>
          </Card>
        </TabPane>
      </Tabs>

      {/* Create Theory Modal */}
      <Modal
        title="Create New Theory"
        visible={isTheoryModalVisible}
        onCancel={() => setIsTheoryModalVisible(false)}
        onOk={handleCreateTheory}
        okText="Create"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Theory Title">
            <Input
              value={newTheory.title}
              onChange={(e) =>
                setNewTheory({ ...newTheory, title: e.target.value })
              }
              placeholder="Enter theory title"
            />
          </Form.Item>
          <Form.Item label="Theory Content">
            <Input.TextArea
              value={newTheory.content}
              onChange={(e) =>
                setNewTheory({ ...newTheory, content: e.target.value })
              }
              placeholder="Enter theory content"
            />
          </Form.Item>
          <Form.Item label="Theory Example">
            <Input.TextArea
              value={newTheory.example}
              onChange={(e) =>
                setNewTheory({ ...newTheory, example: e.target.value })
              }
              placeholder="Enter theory example"
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Exercise Modal */}
      <Modal
        title="Create New Exercise"
        visible={isExerciseModalVisible}
        onCancel={() => setIsExerciseModalVisible(false)}
        onOk={handleCreateExercise}
        okText="Create"
        cancelText="Cancel"
      >
        <Form layout="vertical">
          <Form.Item label="Exercise Title">
            <Input
              value={newExercise.title}
              onChange={(e) =>
                setNewExercise({ ...newExercise, title: e.target.value })
              }
              placeholder="Enter exercise title"
            />
          </Form.Item>
          <Form.Item label="Exercise Tasks">
            {newExercise.tasks.map((task, index) => (
              <Input
                key={index}
                value={task}
                onChange={(e) => handleChangeTask(index, e.target.value)}
                placeholder={`Task ${index + 1}`}
                className="mb-2"
              />
            ))}
            <Button
              type="dashed"
              onClick={handleAddTask}
              icon={<PlusOutlined />}
              block
            >
              Add Task
            </Button>
          </Form.Item>
          <Form.Item label="Exercise Instruction">
            <Input.TextArea
              value={newExercise.instruction}
              onChange={(e) =>
                setNewExercise({ ...newExercise, instruction: e.target.value })
              }
              placeholder="Enter exercise instruction"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default LessonContentAdmin;

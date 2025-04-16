import React from "react";
import { Card, Tabs } from "antd";

const { TabPane } = Tabs;

const LessonContent = ({ lesson }) => {
  if (!lesson)
    return (
      <div className="w-1/2 p-4">Select a lesson to view the content.</div>
    );

  return (
    <div className="max-h-[850px] w-1/2 p-4 bg-white overflow-y-auto">
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
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default LessonContent;

import React from "react";
import { Card, Tabs, Input, Button } from "antd";

const { TabPane } = Tabs;
const { TextArea } = Input;

const LessonContent = ({ lesson }) => {
  if (!lesson)
    return (
      <div className="max-h-[850px] min-w-[400px] w-1/2 p-4 bg-white overflow-y-auto">
        Select a lesson to view the content.
      </div>
    );

  return (
    <div className="max-h-[850px] min-w-[400px] w-1/2 p-4 bg-white overflow-y-auto">
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
        <TabPane tab="Discussion" key="3">
          <Card bordered={false}>
            <h2 className="text-xl font-semibold mb-4">Discussion</h2>

            <div className="space-y-4 mb-4">
              {lesson.comments?.map((cmt, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded">
                  <p className="font-semibold text-sm">{cmt.author}</p>
                  <p className="text-gray-800 text-sm">{cmt.content}</p>
                </div>
              ))}
            </div>

            <TextArea
              rows={3}
              placeholder="Write your comment here..."
              style={{ resize: "none" }}
            />

            <div className="mt-2 text-right">
              <Button type="primary">Submit</Button>
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default LessonContent;

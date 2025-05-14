import React, { useState } from "react";
import { Collapse, List } from "antd";
import {
  FileTextOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";

const { Panel } = Collapse;

const LessonSidebar = ({ lessons, selectedLessonId, onSelect }) => {
  const [collapsed, setCollapsed] = useState(false);

  if (collapsed) {
    return (
      <div className="w-12 min-w-[48px] bg-white border-r border-gray-200 shadow-sm flex flex-col justify-between items-center py-4">
        <button
          onClick={() => setCollapsed(false)}
          className="text-gray-600 hover:text-blue-500 transition-colors"
        >
          <MenuUnfoldOutlined />
        </button>
      </div>
    );
  }

  return (
    <div className="min-w-[250px] w-80 px-3 pb-2 bg-white border-r border-gray-200 overflow-y-auto shadow-sm max-h-[850px] flex flex-col">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 sticky top-0 bg-white z-10 pb-2">
        Lesson List
      </h2>

      <div className="max-h-[500px] overflow-y-auto space-y-2">
        {lessons.map((lesson) =>
          lesson.type === "quiz" ? (
            <div
              key={lesson.id}
              className={`cursor-pointer rounded px-2 py-2 flex items-center gap-2 ${
                selectedLessonId === lesson.id
                  ? "bg-blue-100 text-blue-700 font-medium"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => onSelect(lesson)}
            >
              📝 <span>{lesson.title}</span>
            </div>
          ) : (
            <Collapse
              accordion
              bordered={false}
              key={lesson.id}
              defaultActiveKey={[lesson.id]}
            >
              <Panel
                header={
                  <span className="font-medium text-base">{lesson.title}</span>
                }
                key={lesson.id}
              >
                <List
                  size="small"
                  bordered={false}
                  dataSource={lesson.subLessons}
                  renderItem={(sub) => (
                    <List.Item
                      className={`cursor-pointer rounded px-2 py-1 flex items-center justify-between gap-2 ${
                        selectedLessonId === sub.id
                          ? "bg-blue-100 text-blue-700 font-medium"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => onSelect(sub)}
                    >
                      <div className="flex items-center gap-2">
                        <FileTextOutlined className="text-base mr-1" />
                        {sub.title}
                      </div>
                      {sub.completed && (
                        <span className="text-green-500">✓</span>
                      )}
                    </List.Item>
                  )}
                />
              </Panel>
            </Collapse>
          )
        )}
      </div>

      <div className="flex-auto mt-auto pt-3 border-t">
        <button
          onClick={() => setCollapsed(true)}
          className="w-full flex justify-center py-2 text-gray-600 hover:text-blue-500 transition-colors"
        >
          <MenuFoldOutlined />
        </button>
      </div>
    </div>
  );
};

export default LessonSidebar;

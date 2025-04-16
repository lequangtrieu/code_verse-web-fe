import React from "react";
import { Collapse, List } from "antd";
import { FileTextOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const LessonSidebar = ({ lessons, selectedLessonId, onSelect }) => {
  return (
    <div className="min-w-[330px] w-80 px-3 pb-6 bg-white border-r border-gray-200 overflow-y-auto shadow-sm max-h-[850px]">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 sticky top-0 bg-white z-10 pb-2">
        Lesson List
      </h2>

      <Collapse accordion bordered={false} defaultActiveKey={[lessons[0]?.id]}>
        {lessons.map((lesson) => (
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
                  className={`cursor-pointer rounded px-2 py-1 flex items-center gap-2 ${
                    selectedLessonId === sub.id
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => onSelect(sub)}
                >
                  <FileTextOutlined className="text-base mr-1" />
                  {sub.title}
                </List.Item>
              )}
            />
          </Panel>
        ))}
      </Collapse>
    </div>
  );
};

export default LessonSidebar;

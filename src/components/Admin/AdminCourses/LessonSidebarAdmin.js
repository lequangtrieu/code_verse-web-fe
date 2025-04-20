import React from "react";
import { Collapse, List, Button, Modal, Input } from "antd";
import { FileTextOutlined, PlusOutlined } from "@ant-design/icons";

const { Panel } = Collapse;

const LessonSidebarAdmin = ({
  lessons,
  selectedLessonId,
  onSelect,
  onCreateLesson,
  onCreateConcept,
}) => {
  const [isLessonModalVisible, setIsLessonModalVisible] = React.useState(false);
  const [newLessonTitle, setNewLessonTitle] = React.useState("");
  const [isConceptModalVisible, setIsConceptModalVisible] =
    React.useState(false);
  const [newConceptTitle, setNewConceptTitle] = React.useState("");
  const [selectedLesson, setSelectedLesson] = React.useState(null);

  const handleCreateLesson = () => {
    if (newLessonTitle.trim() === "") {
      Modal.error({
        title: "Error",
        content: "Lesson title cannot be empty.",
      });
      return;
    }
    onCreateLesson(newLessonTitle); // Pass the new lesson title to the parent component to handle it
    setNewLessonTitle(""); // Clear the input field
    setIsLessonModalVisible(false); // Close the modal
  };

  const handleCreateConcept = () => {
    if (newConceptTitle.trim() === "") {
      Modal.error({
        title: "Error",
        content: "Concept title cannot be empty.",
      });
      return;
    }
    if (selectedLesson) {
      onCreateConcept(selectedLesson.id, newConceptTitle); // Pass the new concept title to the parent component to handle it
      setNewConceptTitle(""); // Clear the input field
      setIsConceptModalVisible(false); // Close the modal
    }
  };

  return (
    <div className="min-w-[330px] w-80 px-3 pb-6 bg-white border-r border-gray-200 overflow-y-auto shadow-sm max-h-[850px]">
      <h2 className="text-xl font-semibold mb-4 text-blue-600 sticky top-0 bg-white z-10 pb-2">
        Lesson List
      </h2>

      {/* Create Lesson Button */}
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsLessonModalVisible(true)}
        className="mb-4"
        block
      >
        Create Lesson
      </Button>

      <Collapse accordion bordered={false} defaultActiveKey={[lessons[0]?.id]}>
        {lessons.map((lesson) => (
          <Panel
            header={
              <span className="font-medium text-base">{lesson.title}</span>
            }
            key={lesson.id}
          >
            {/* Create Concept Button for each lesson */}
            <Button
              type="default"
              icon={<PlusOutlined />}
              onClick={() => {
                setSelectedLesson(lesson); // Set the selected lesson to add concept
                setIsConceptModalVisible(true);
              }}
              className="mb-4"
              block
            >
              Create Concept
            </Button>

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

      {/* Create Lesson Modal */}
      <Modal
        title="Create New Lesson"
        visible={isLessonModalVisible}
        onCancel={() => setIsLessonModalVisible(false)}
        onOk={handleCreateLesson}
        okText="Create"
        cancelText="Cancel"
      >
        <Input
          value={newLessonTitle}
          onChange={(e) => setNewLessonTitle(e.target.value)}
          placeholder="Enter lesson title"
        />
      </Modal>

      {/* Create Concept Modal */}
      <Modal
        title="Create New Concept"
        visible={isConceptModalVisible}
        onCancel={() => setIsConceptModalVisible(false)}
        onOk={handleCreateConcept}
        okText="Create"
        cancelText="Cancel"
      >
        <Input
          value={newConceptTitle}
          onChange={(e) => setNewConceptTitle(e.target.value)}
          placeholder="Enter concept title"
        />
      </Modal>
    </div>
  );
};

export default LessonSidebarAdmin;

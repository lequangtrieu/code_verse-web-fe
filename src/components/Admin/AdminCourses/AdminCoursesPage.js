import React, { useState } from "react";
import {
  Card,
  Row,
  Col,
  Tabs,
  Tag,
  Pagination,
  Tooltip,
  Modal,
  Collapse,
  Button,
  Input,
  Select,
  Upload,
  Form,
  message,
} from "antd";
import {
  HeartOutlined,
  BookOutlined,
  ClockCircleOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";

import LessonDetailsModal from "../AdminQuiz/AdminQuizPage";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;

const coursesData = {
  publish: [
    {
      id: 1,
      category: "Development",
      title: "Nidnies course to understand about software",
      lessons: 29,
      duration: "2 hr 10 min",
      price: "$32.00",
      originalPrice: "$67.00",
      instructor: "Rinis Jhon",
      rating: 4.5,
      reviews: 44,
      imageUrl:
        "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
    },
    {
      id: 2,
      category: "Lifestyle",
      title: "Minws course to understand about solution",
      lessons: 25,
      duration: "1 hr 40 min",
      price: "$40.00",
      originalPrice: "$67.00",
      instructor: "Jane Austen",
      rating: 4.5,
      reviews: 44,
      imageUrl:
        "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
    },
    {
      id: 3,
      category: "Web Design",
      title: "Design course to understand about solution",
      lessons: 36,
      duration: "3 hr 40 min",
      price: "$40.00",
      originalPrice: "$67.00",
      instructor: "Micle Robin",
      rating: 4.5,
      reviews: 44,
      imageUrl:
        "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
    },
    {
      id: 4,
      category: "Marketing",
      title: "Advanced Marketing Strategies",
      lessons: 30,
      duration: "4 hr 20 min",
      price: "$50.00",
      originalPrice: "$100.00",
      instructor: "Tom Riddle",
      rating: 4.8,
      reviews: 55,
      imageUrl:
        "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
    },
    {
      id: 5,
      category: "Marketing",
      title: "Advanced Marketing Strategies",
      lessons: 30,
      duration: "4 hr 20 min",
      price: "$50.00",
      originalPrice: "$100.00",
      instructor: "Tom Riddle",
      rating: 4.8,
      reviews: 55,
      imageUrl:
        "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
    },
  ],
  pending: [
    {
      id: 5,
      category: "Business",
      title: "Business development course to grow your career",
      lessons: 20,
      duration: "2 hr 00 min",
      price: "$25.00",
      originalPrice: "$50.00",
      instructor: "Harry Potter",
      rating: 4.0,
      reviews: 20,
      imageUrl:
        "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
    },
  ],
  draft: [
    {
      id: 6,
      category: "Programming",
      title: "Learn Python from scratch to advanced level",
      lessons: 40,
      duration: "5 hr 30 min",
      price: "$60.00",
      originalPrice: "$100.00",
      instructor: "Luna Lovegood",
      rating: 4.7,
      reviews: 35,
      imageUrl:
        "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
    },
  ],
};

const AdminCoursesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [topics, setTopics] = useState([]);
  const [isActive, setIsActive] = useState(true);
  const [courseInfo, setCourseInfo] = useState({
    title: "",
    slug: "",
    freeRegularPrice: "",
    discountedPrice: "",
    aboutCourse: "",
    courseType: "All",
    offerType: "premium",
  });

  const pageSize = 4;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const getCoursesForTab = (tab) => {
    const allCourses = coursesData[tab];
    return allCourses.slice(
      (currentPage - 1) * pageSize,
      currentPage * pageSize
    );
  };

  const showModal = (course) => {
    setSelectedCourse(course);
    setIsActive(true);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleAddTopic = () => {
    const newTopic = {
      name: `Topic ${topics.length + 1}`, // Default name for new topic
      lessons: [],
    };
    setTopics([...topics, newTopic]);
  };
  const handleAddLesson = (topicIndex) => {
    const lessonName = prompt("Enter lesson name:");

    if (lessonName && lessonName.trim() !== "") {
      const updatedTopics = [...topics];
      updatedTopics[topicIndex].lessons.push(lessonName);
      setTopics(updatedTopics);
    }
  };

  const handleTopicChange = (index, value) => {
    const updatedTopics = [...topics];
    updatedTopics[index].name = value;
    setTopics(updatedTopics);
  }; 

  const handleChangeCourseInfo = (e) => {
    const { name, value } = e.target;
    setCourseInfo({ ...courseInfo, [name]: value });
  };

  const handleFileUpload = (info) => {
    if (info.file.status === "done") {
      console.log("File uploaded successfully:", info.file);
    } else if (info.file.status === "error") {
      console.error("File upload failed:", info.file);
    }
  };

  const showConfirmModal = () => {
    setIsConfirmModalVisible(true);
  };

  const handleConfirmCancel = () => {
    setIsConfirmModalVisible(false);
  };

  const handleConfirmOk = () => {
    setIsActive((prevState) => !prevState);
    setIsConfirmModalVisible(false);
    message.success(
      `Course has been ${isActive ? "deactivated" : "activated"} successfully!`
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Course Management</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Publish" key="1">
          <Row gutter={[16, 16]} justify="start">
            {getCoursesForTab("publish").map((course) => (
              <Col xs={24} sm={12} md={6} key={course.id}>
                <Card
                  hoverable
                  cover={
                    <div className="overflow-hidden">
                      <img
                        alt={course.title}
                        src={course.imageUrl}
                        className="transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  }
                  actions={[<HeartOutlined key="heart" />]}
                  className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  onClick={() => showModal(course)}
                >
                  <Tag
                    color={
                      course.category === "Development"
                        ? "blue"
                        : course.category === "Lifestyle"
                        ? "red"
                        : "green"
                    }
                  >
                    {course.category}
                  </Tag>
                  <Tooltip title={course.title}>
                    <h3 className="font-semibold text-xl truncate">
                      {course.title}
                    </h3>
                  </Tooltip>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div
                      className="left"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <BookOutlined
                        style={{ color: "purple", marginRight: "8px" }}
                      />
                      {course.lessons} Lessons
                    </div>
                    <div
                      className="right"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <ClockCircleOutlined
                        style={{ color: "purple", marginRight: "8px" }}
                      />
                      {course.duration}
                    </div>
                  </div>
                  <div className="mt-2 text-lg font-semibold">
                    {course.price}{" "}
                    <span className="line-through text-gray-400">
                      {course.originalPrice}
                    </span>
                  </div>
                  <div
                    className="flex items-center mt-2"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="text-sm text-gray-700" style={{ flex: 1 }}>
                      {course.instructor}
                    </div>
                    <div
                      className="text-yellow-500"
                      style={{
                        textAlign: "right",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>
                        {"★".repeat(Math.floor(course.rating))}
                        {"☆".repeat(5 - Math.floor(course.rating))}
                      </span>
                      <span>({course.reviews})</span>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={coursesData.publish.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          />
        </TabPane>

        <TabPane tab="Pending" key="2">
          <Row gutter={[16, 16]} justify="start">
            {getCoursesForTab("pending").map((course) => (
              <Col xs={24} sm={12} md={6} key={course.id}>
                <Card
                  hoverable
                  cover={
                    <div className="overflow-hidden">
                      <img
                        alt={course.title}
                        src={course.imageUrl}
                        className="transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  }
                  actions={[<HeartOutlined key="heart" />]}
                  className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  onClick={() => showModal(course)}
                >
                  <Tag color="orange">{course.category}</Tag>
                  <Tooltip title={course.title}>
                    <h3 className="font-semibold text-xl truncate">
                      {course.title}
                    </h3>
                  </Tooltip>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div
                      className="left"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <BookOutlined
                        style={{ color: "purple", marginRight: "8px" }}
                      />
                      {course.lessons} Lessons
                    </div>
                    <div
                      className="right"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <ClockCircleOutlined
                        style={{ color: "purple", marginRight: "8px" }}
                      />
                      {course.duration}
                    </div>
                  </div>
                  <div className="mt-2 text-lg font-semibold">
                    {course.price}{" "}
                    <span className="line-through text-gray-400">
                      {course.originalPrice}
                    </span>
                  </div>
                  <div
                    className="flex items-center mt-2"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="text-sm text-gray-700" style={{ flex: 1 }}>
                      {course.instructor}
                    </div>
                    <div
                      className="text-yellow-500"
                      style={{
                        textAlign: "right",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>
                        {"★".repeat(Math.floor(course.rating))}
                        {"☆".repeat(5 - Math.floor(course.rating))}
                      </span>
                      <span>({course.reviews})</span>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={coursesData.pending.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          />
        </TabPane>

        <TabPane tab="Draft" key="3">
          <Row gutter={[16, 16]} justify="start">
            {getCoursesForTab("draft").map((course) => (
              <Col xs={24} sm={12} md={6} key={course.id}>
                <Card
                  hoverable
                  cover={
                    <div className="overflow-hidden">
                      <img
                        alt={course.title}
                        src={course.imageUrl}
                        className="transition-all duration-300 hover:scale-110"
                      />
                    </div>
                  }
                  actions={[<HeartOutlined key="heart" />]}
                  className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
                  onClick={() => showModal(course)}
                >
                  <Tag color="gray">{course.category}</Tag>
                  <Tooltip title={course.title}>
                    <h3 className="font-semibold text-xl truncate">
                      {course.title}
                    </h3>
                  </Tooltip>
                  <div className="flex justify-between text-sm text-gray-500">
                    <div
                      className="left"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <BookOutlined
                        style={{ color: "purple", marginRight: "8px" }}
                      />
                      {course.lessons} Lessons
                    </div>
                    <div
                      className="right"
                      style={{ display: "flex", alignItems: "center" }}
                    >
                      <ClockCircleOutlined
                        style={{ color: "purple", marginRight: "8px" }}
                      />
                      {course.duration}
                    </div>
                  </div>
                  <div className="mt-2 text-lg font-semibold">
                    {course.price}{" "}
                    <span className="line-through text-gray-400">
                      {course.originalPrice}
                    </span>
                  </div>
                  <div
                    className="flex items-center mt-2"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div className="text-sm text-gray-700" style={{ flex: 1 }}>
                      {course.instructor}
                    </div>
                    <div
                      className="text-yellow-500"
                      style={{
                        textAlign: "right",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginRight: "8px" }}>
                        {"★".repeat(Math.floor(course.rating))}
                        {"☆".repeat(5 - Math.floor(course.rating))}
                      </span>
                      <span>({course.reviews})</span>
                    </div>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={coursesData.draft.length}
            onChange={handlePageChange}
            showSizeChanger={false}
            style={{
              justifyContent: "center",
              alignItems: "center",
              marginTop: "50px",
            }}
          />
        </TabPane>
      </Tabs>

      <Modal
        title={
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span>{selectedCourse?.title}</span>
            <Button
              type={isActive ? "primary" : "default"}
              onClick={showConfirmModal}
              style={{ marginLeft: "auto" }}
            >
              {isActive ? "Deactivate Course" : "Activate Course"}
            </Button>
          </div>
        }
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
      >
        {selectedCourse && (
          <div>
            <Collapse defaultActiveKey={["1"]}>
              <Panel header="Course Info" key="1">
                <Form layout="vertical">
                  <Form.Item label="Course Title">
                    <Input
                      name="title"
                      value={selectedCourse?.title}
                      onChange={handleChangeCourseInfo}
                    />
                  </Form.Item>
                  <Form.Item label="Lessons Number">
                    <Input
                      name="lessons"
                      value={selectedCourse?.lessons}
                      onChange={handleChangeCourseInfo}
                    />
                  </Form.Item>
                  <Form.Item label="Free Regular Price ($)">
                    <Input
                      name="freeRegularPrice"
                      value={selectedCourse?.originalPrice}
                      onChange={handleChangeCourseInfo}
                    />
                  </Form.Item>
                  <Form.Item label="Discounted Price ($)">
                    <Input
                      name="discountedPrice"
                      value={selectedCourse?.price}
                      onChange={handleChangeCourseInfo}
                    />
                  </Form.Item>
                  <Form.Item label="About Course">
                    <Input.TextArea
                      name="aboutCourse"
                      value={selectedCourse?.category}
                      onChange={handleChangeCourseInfo}
                    />
                  </Form.Item>
                  <Button type="primary" onClick={() => alert("Updated Info")}>
                    Update Info
                  </Button>
                </Form>
              </Panel>

              <Panel header="Course Intro" key="2">
                <Upload
                  name="course-image"
                  action="/upload.do"
                  listType="picture"
                  onChange={handleFileUpload}
                >
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </Panel>

              <Panel header="Course Builder" key="3">
                <Button
                  type="dashed"
                  onClick={handleAddTopic}
                  icon={<PlusOutlined />}
                  style={{ width: "100%", marginBottom: 16 }}
                >
                  Add Topic
                </Button>
                <div>
                {topics.map((topic, index) => (
              <div key={index} style={{ marginBottom: 10 }}>
                <Input
                  placeholder={`Topic ${index + 1}`}
                  value={topic.name}
                  onChange={(e) => handleTopicChange(index, e.target.value)}
                  style={{ marginBottom: "5px" }}
                />
                <Button type="dashed" onClick={() => handleAddLesson(index)} icon={<PlusOutlined />}>
                  Add Lesson
                </Button>
                {topic.lessons.map((lesson, idx) => (
                  <div key={idx}>
                    <Input value={lesson} disabled style={{ marginBottom: "5px", width: "100%" }} />
                  </div>
                ))}
              </div>
            ))}
                </div>
              </Panel>
            </Collapse>
          </div>
        )}
      </Modal>

      <Modal
        title="Are you sure?"
        visible={isConfirmModalVisible}
        onCancel={handleConfirmCancel}
        onOk={handleConfirmOk}
        okText="Yes"
        cancelText="No"
      >
        <p>
          Are you sure you want to {isActive ? "deactivate" : "activate"} this
          course?
        </p>
      </Modal>
    </div>
  );
};

export default AdminCoursesPage;

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
  Button,
  Input,
  Form,
  message,
} from "antd";
import {
  HeartOutlined,
  BookOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import CourseDetails from "./CourseDetails";

const { TabPane } = Tabs;

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
  ],
};

const AdminCoursesPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState(null); // Track the selected course
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

  const handleCourseClick = (course) => {
    setSelectedCourse(course); // Set selected course when clicked
  };

  const handleBackToList = () => {
    setSelectedCourse(null); // Go back to course list
  };

  return (
    <div className="p-6" style={{ height: "100vh", overflowY: "auto" }}>
      <h2 className="text-2xl font-semibold mb-4">Course Management</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      {selectedCourse ? (
        // If a course is selected, render the CourseDetails component
        <CourseDetails course={selectedCourse} onBack={handleBackToList} />
      ) : (
        // If no course is selected, display the course list
        <Tabs defaultActiveKey="1">
          <TabPane tab="Publish" key="1">
            <div style={{ height: "calc(100vh - 200px)", overflowY: "auto" }}>
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
                      onClick={() => handleCourseClick(course)} // Handle course click
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
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          className="text-sm text-gray-700"
                          style={{ flex: 1 }}
                        >
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
            </div>
          </TabPane>
          {/* Other Tabs (Pending, Draft) */}
        </Tabs>
      )}
    </div>
  );
};

export default AdminCoursesPage;

import React from "react";
import { Button, Card, Form, Input, Upload, message, Row, Col } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import LessonManagement from "./LessonManagement";

const CourseDetails = ({ course, onBack }) => {
  const handleFileUpload = (info) => {
    if (info.file.status === "done") {
      message.success("File uploaded successfully.");
    } else if (info.file.status === "error") {
      message.error("File upload failed.");
    }
  };

  return (
    <div className="p-6">
      {/* Back to Course List Button */}
      <Button type="link" onClick={onBack} className="mb-4">
        Back to Course List
      </Button>

      {/* Course Information Card */}
      <Card
        title="Course Information"
        className="mb-6"
        style={{
          maxHeight: "500px",
          overflowY: "auto",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adds shadow
          backgroundColor: "#f9f9f9", // Sets a light background color
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <p>
              <strong>Instructor:</strong> {course.instructor}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>Category:</strong> {course.category}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>Lessons:</strong> {course.lessons}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>Price:</strong> {course.price}
            </p>
          </Col>
          <Col span={12}>
            <p>
              <strong>Duration:</strong> {course.duration}
            </p>
          </Col>
        </Row>
      </Card>

      {/* Edit Course Form */}
      <Card
        title="Edit Course"
        className="mb-6"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <Form layout="vertical">
          <Form.Item label="Course Title">
            <Input defaultValue={course.title} />
          </Form.Item>
          <Form.Item label="Price ($)">
            <Input defaultValue={course.price} />
          </Form.Item>
          <Button type="primary">Save Changes</Button>
        </Form>
      </Card>

      {/* Upload Course Image */}
      <Card
        title="Upload Course Image"
        className="mb-6"
        style={{ maxHeight: "500px", overflowY: "auto" }}
      >
        <Upload
          name="course-image"
          action="/upload.do"
          listType="picture"
          onChange={handleFileUpload}
        >
          <Button icon={<UploadOutlined />}>Click to Upload</Button>
        </Upload>
      </Card>

      <LessonManagement />
    </div>
  );
};

export default CourseDetails;

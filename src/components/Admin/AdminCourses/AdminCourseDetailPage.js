import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { formatCurrency } from "../../../common/helper";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { Card, Descriptions, Tag, Typography, message } from "antd";
import CourseModuleList from "../../Instructor/InstructorCourses/CourseView/CourseModuleList";

const { Title, Paragraph } = Typography;

const AdminCourseDetailPage = () => {
    const { id } = useParams();
    const [course, setCourse] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);

    const loadCourseData = async () => {
        try {
            const res = await axiosInstance.get(commonApi.instructorGetCourse.url(id));
            setCourse(res.data.result);
        } catch (err) {
            message.error("Error loading course data.");
        } finally {
            setTimeout(() => {
                setInitialLoading(false);
            }, 400);
        }
    };

    useEffect(() => {
        if (id) loadCourseData();
    }, [id]);

    if (initialLoading) return <LoadingOverlay />;
    if (!course) return <p className="text-center mt-10">Course not found.</p>;

    const handleAccept = async () => {
        try {
            await axiosInstance.patch(commonApi.updateCourseStatus.url(id), { status: 'PUBLISHED' });
            message.success("Course has been accepted and published!");
            loadCourseData();
        } catch (error) {
            message.error("Error while updating course status.");
        }
    };

    const handleReject = async () => {
        try {
            await axiosInstance.patch(commonApi.updateCourseStatus.url(id), { status: 'DRAFT' });
            message.success("Course has been rejected and moved to draft.");
            loadCourseData();
        } catch (error) {
            message.error("Error while updating course status.");
        }
    };


    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {/* Course Overview */}
            <Card className="shadow">
                <div className="flex flex-col md:flex-row gap-6">
                    <img
                        src={course.thumbnailUrl || "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"}
                        alt="Course Thumbnail"
                        className="w-full md:w-60 h-auto object-cover rounded-lg border"
                    />
                    <div className="flex-1">
                        <Title level={3}>{course.title}</Title>
                        <Paragraph>{course.description}</Paragraph>
                        <Descriptions column={1} size="small">
                            <Descriptions.Item label="Category">{course.category}</Descriptions.Item>
                            <Descriptions.Item label="Level">{course.level}</Descriptions.Item>
                            <Descriptions.Item label="Language">{course.language}</Descriptions.Item>
                            <Descriptions.Item label="Price">
                                {course.price > 0 ? formatCurrency(course.price) : <Tag color="green">Free</Tag>}
                            </Descriptions.Item>
                            <Descriptions.Item label="Status">
                                {course.status === "PUBLISHED" && <Tag color="green">Published</Tag>}
                                {course.status === "DRAFT" && <Tag color="blue">Draft</Tag>}
                                {course.status === "PENDING" && <Tag color="orange">Pending</Tag>}
                                {course.deleted && <Tag color="red">Deleted</Tag>}
                            </Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
            </Card>

            {/* Modules & Lessons */}
            <Card title="Course Modules" className="shadow">
                <CourseModuleList courseId={id} />
            </Card>

            {course.status === "PENDING" && (
                <div className="mt-4 flex gap-2">
                    <button
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-1 rounded"
                        onClick={handleAccept}
                    >
                        Accept
                    </button>
                    <button
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded"
                        onClick={handleReject}
                    >
                        Reject
                    </button>
                </div>
            )}

        </div>
    );
};

export default AdminCourseDetailPage;

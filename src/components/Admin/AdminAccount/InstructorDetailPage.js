import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import { Card, List, Avatar, message, Pagination } from "antd";
import commonApi from "../../../common/api";
import LoadingOverlay from "../../../common/LoadingOverlay";

const InstructorDetailPage = () => {
    const { id } = useParams();
    const [instructor, setInstructor] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loadingInstructor, setLoadingInstructor] = useState(false);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        fetchInstructorDetail();
        fetchInstructorCourses();
    }, [id]);

    const fetchInstructorDetail = async () => {
        setLoadingInstructor(true);
        try {
            const res = await axiosInstance.get(commonApi.getUserDetailInfoByUserID.url(id));
            setInstructor(res.data);
        } catch (error) {
            message.error("Failed to load instructor details");
        } finally {
            setLoadingInstructor(false);
        }
    };

    const fetchInstructorCourses = async () => {
        setLoadingCourses(true);
        try {
            const res = await axiosInstance.get(commonApi.getAllCoursesByInstructorID.url(id));
            setCourses(Array.isArray(res.data.result) ? res.data.result : []);
        } catch (error) {
            message.error("Failed to load instructor courses");
            setCourses([]);
        } finally {
            setLoadingCourses(false);
        }
    };

    // Slice the courses for the current page
    const paginatedCourses = courses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    if (loadingInstructor) return <LoadingOverlay />;
    if (!instructor) return <div>Instructor not found</div>;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div style={{ padding: 24 }}>
            <Card title="Instructor's Information" style={{ marginBottom: 24 }}>
                <Avatar
                    size={100}
                    src={instructor.avatar ? instructor.avatar : undefined}
                    style={{ backgroundColor: instructor.avatar ? 'transparent' : '#87d068' }}
                >
                    {!instructor.avatar && instructor.name ? instructor.name.charAt(0).toUpperCase() : null}
                </Avatar>
                <p><b>Name:</b> {instructor.name}</p>
                <p><b>Email:</b> {instructor.username}</p>
                <p><b>Phone Number:</b> {instructor.phoneNumber || "N/A"}</p>
                <p><b>Bio:</b> {instructor.bio || "N/A"}</p>
                <p><b>Verified:</b> {instructor.isVerified ? "Yes" : "No"}</p>
                <p>
                    <b>Teaching Credentials:</b>{" "}
                    {instructor.teachingCredentials ? (
                        <a href={instructor.teachingCredentials} target="_blank" rel="noreferrer">
                            View Document
                        </a>
                    ) : (
                        "N/A"
                    )}
                </p>
            </Card>

            <Card title="Courses Taught by Instructor">
                {loadingCourses && <LoadingOverlay />}
                <List
                    loading={loadingCourses}
                    itemLayout="vertical"
                    dataSource={paginatedCourses}
                    renderItem={(course) => (
                        <List.Item
                            key={course.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                padding: 16,
                                borderBottom: "1px solid #f0f0f0",
                            }}
                        >
                            <img
                                src={course.thumbnailUrl}
                                alt={course.title}
                                style={{
                                    width: 120,
                                    height: 80,
                                    objectFit: "cover",
                                    borderRadius: 6,
                                    marginRight: 20,
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: 8 }}>{course.title}</h3>
                                <p style={{ marginBottom: 8, color: "#666" }}>{course.description}</p>
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: 12,
                                        fontSize: 14,
                                        color: "#888",
                                    }}
                                >
                                    <span><b>Category:</b> {course.category}</span>
                                    <span><b>Level:</b> {course.level || "N/A"}</span>
                                    <span><b>Price:</b> {course.price ? course.price.toLocaleString() + " VND" : "Free"}</span>
                                    <span><b>Status:</b> {course.status || "Unknown"}</span>
                                </div>
                            </div>
                        </List.Item>
                    )}
                    locale={{ emptyText: "No courses found" }}
                />

                <Pagination
                    current={currentPage}
                    total={courses.length}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                    showSizeChanger={false}
                    style={{ marginTop: 16, textAlign: 'center' }}
                />
            </Card>
        </div>
    );
};

export default InstructorDetailPage;

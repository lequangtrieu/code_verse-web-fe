import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, List, Avatar, message } from "antd";
import getAuthInfo from "../../../config/getAuthInfo";
import commonApi from "../../../common/api";

const InstructorDetailPage = () => {
    const { id } = useParams();
    const [instructor, setInstructor] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loadingInstructor, setLoadingInstructor] = useState(false);
    const [loadingCourses, setLoadingCourses] = useState(false);

    useEffect(() => {
        fetchInstructorDetail();
        fetchInstructorCourses();
    }, [id]);

    const fetchInstructorDetail = async () => {
        setLoadingInstructor(true);
        try {
            const { token } = getAuthInfo();
            const res = await axios.get(commonApi.getUserDetailInfoByUserID.url(id), {
                headers: { Authorization: `Bearer ${token}` },
            });
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
            const { token } = getAuthInfo();
            const res = await axios.get(commonApi.getAllCoursesByInstructorID.url(id), {
                headers: { Authorization: `Bearer ${token}` },
            });
            setCourses(Array.isArray(res.data.result) ? res.data.result : []);
        } catch (error) {
            message.error("Failed to load instructor courses");
            setCourses([]);
        } finally {
            setLoadingCourses(false);
        }
    };



    if (loadingInstructor) return <div>Loading instructor info...</div>;
    if (!instructor) return <div>Instructor not found</div>;

    return (
        <div style={{ padding: 24 }}>
            <Card
                title="Instructor's Information"
                style={{ marginBottom: 24 }}
            >
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
                <List
                    loading={loadingCourses}
                    itemLayout="vertical"
                    dataSource={courses}
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
            </Card>
        </div>
    );
};

export default InstructorDetailPage;

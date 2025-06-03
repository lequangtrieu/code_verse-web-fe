import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, List, Avatar, message, Progress, Rate } from "antd";
import getAuthInfo from "../../../config/getAuthInfo";
import commonApi from "../../../common/api";

const LearnerDetailPage = () => {
    const { id } = useParams();
    const [userDetail, setUserDetail] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingCourses, setLoadingCourses] = useState(false);

    useEffect(() => {
        fetchUserDetail();
        fetchUserCourses();
    }, [id]);

    const fetchUserDetail = async () => {
        setLoadingUser(true);
        try {
            const { token } = getAuthInfo();
            const res = await axios.get(commonApi.getUserDetailInfoByUserID.url(id), {
                headers: { Authorization: `Bearer ${token}` }
            });
            setUserDetail(res.data);
        } catch (error) {
            message.error("Failed to load user details");
        } finally {
            setLoadingUser(false);
        }
    };

    const fetchUserCourses = async () => {
        setLoadingCourses(true);
        try {
            const { token } = getAuthInfo();
            const res = await axios.get(commonApi.getAllCourseByLearnerID.url(id), {
                headers: { Authorization: `Bearer ${token}` }
            });

            setCourses(res.data);
        } catch (error) {
            message.error("Failed to load user courses");
        } finally {
            setLoadingCourses(false);
        }
    };

    if (loadingUser) return <div>Loading user info...</div>;
    if (!userDetail) return <div>User not found</div>;

    return (
        <div style={{ padding: 24 }}>
            <Card
                title="Learner's Information"
                style={{ marginBottom: 24 }}
            >
                <Avatar
                    size={100}
                    src={userDetail.avatar ? userDetail.avatar : undefined}
                    style={{ backgroundColor: userDetail.avatar ? 'transparent' : '#87d068' }}
                >
                    {!userDetail.avatar && userDetail.name ? userDetail.name.charAt(0).toUpperCase() : null}
                </Avatar>
                <p><b>Name:</b> {userDetail.name}</p>
                <p><b>Email:</b> {userDetail.username}</p>
                <p><b>Phone Number:</b> {userDetail.phoneNumber}</p>
                <p><b>Role:</b> {userDetail.role}</p>
                <p><b>Bio:</b> {userDetail.bio}</p>
                <p><b>Verified:</b> {userDetail.isVerified ? "Yes" : "No"}</p>
            </Card>


            <Card title="Learner's Courses">
                <List
                    loading={loadingCourses}
                    itemLayout="vertical"
                    dataSource={courses}
                    renderItem={course => (
                        <List.Item
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                padding: 16,
                                borderBottom: '1px solid #f0f0f0'
                            }}
                        >
                            <img
                                src={course.thumbnailUrl}
                                alt={course.title}
                                style={{ width: 120, height: 80, objectFit: 'cover', borderRadius: 6, marginRight: 20 }}
                            />
                            <div style={{ flex: 1 }}>
                                <h3 style={{ marginBottom: 8 }}>{course.title}</h3>
                                <p style={{ marginBottom: 8, color: '#666' }}>{course.description}</p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, fontSize: 14, color: '#888' }}>
                                    <span><b>Category:</b> {course.category}</span>
                                    <span><b>Instructor:</b> {course.instructor}</span>
                                    <span>
                                        <b>Rating:</b>
                                        <Rate disabled allowHalf defaultValue={course.rating} style={{ fontSize: 14, marginLeft: 4 }} />
                                        <span style={{ marginLeft: 6 }}>({course.ratingCount})</span>
                                    </span>
                                    <span><b>Lessons:</b> {course.totalLessons}</span>
                                </div>
                                <div style={{ marginTop: 12 }}>
                                    <b>Progress:</b>
                                    <Progress
                                        percent={Math.round(course.completionPercentage)}
                                        status="active"
                                        strokeColor={{
                                            '0%': '#108ee9',
                                            '100%': '#87d068',
                                        }}
                                        style={{ width: 200, marginLeft: 10 }}
                                    />
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

export default LearnerDetailPage;

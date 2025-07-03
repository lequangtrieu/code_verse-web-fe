import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import { Card, List, Avatar, message, Progress, Rate, Pagination } from "antd";
import commonApi from "../../../common/api";
import LoadingOverlay from "../../../common/LoadingOverlay";

const LearnerDetailPage = () => {
    const { id } = useParams();
    const [userDetail, setUserDetail] = useState(null);
    const [courses, setCourses] = useState([]);
    const [loadingUser, setLoadingUser] = useState(false);
    const [loadingCourses, setLoadingCourses] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    useEffect(() => {
        fetchUserDetail();
        fetchUserCourses();
    }, [id]);

    const fetchUserDetail = async () => {
        setLoadingUser(true);
        try {
            const res = await axiosInstance.get(commonApi.getUserDetailInfoByUserID.url(id));
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
            const res = await axiosInstance.get(commonApi.getAllCourseByLearnerID.url(id));
            setCourses(res.data);
        } catch (error) {
            message.error("Failed to load user courses");
        } finally {
            setLoadingCourses(false);
        }
    };

    // Slice the courses for the current page
    const paginatedCourses = courses.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    if (loadingUser) return <LoadingOverlay />;
    if (!userDetail) return <div>User not found</div>;

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
    };

    return (
        <div style={{ padding: 24 }}>
            <Card title="Learner's Information" style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
                    <Avatar
                        size={120}
                        src={userDetail.avatar || undefined}
                        style={{ backgroundColor: userDetail.avatar ? 'transparent' : '#87d068' }}
                    >
                        {!userDetail.avatar && userDetail.name?.charAt(0).toUpperCase()}
                    </Avatar>

                    <div style={{ flex: 1, lineHeight: 1.8 }}>
                        <p><b>Name:</b> {userDetail.name}</p>
                        <p><b>Email:</b> {userDetail.username}</p>
                        <p><b>Phone:</b> {userDetail.phoneNumber}</p>
                        <p><b>Role:</b> {userDetail.role}</p>
                        <p><b>Bio:</b> {userDetail.bio}</p>
                        <p><b>Verified:</b>
                            <span style={{ marginLeft: 8, color: userDetail.isVerified ? 'green' : 'red' }}>
                                {userDetail.isVerified ? 'Yes' : 'No'}
                            </span>
                        </p>
                        {userDetail.bio && (
                            <p><b>Bio:</b> <span style={{ color: '#555' }}>{userDetail.bio}</span></p>
                        )}
                    </div>
                </div>
            </Card>

            <Card title="Learner's Courses">
                {loadingCourses && <LoadingOverlay />}
                <List
                    loading={loadingCourses}
                    itemLayout="vertical"
                    dataSource={paginatedCourses}
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

export default LearnerDetailPage;

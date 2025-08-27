import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { formatCurrency } from "../../../common/helper";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { Form, Card, Descriptions, Tag, Typography, message, Button, Image } from "antd";
import CourseDescription from "./CourseCreate/CourseInfo";
import CourseModule from "./CourseCreate/CourseMaterial/CourseModule";
import CourseModuleList from "./CourseView/CourseModuleList";
import { useNavigate } from "react-router-dom";

const { Title, Paragraph } = Typography;

const InstructorCourseDetailView = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(null);
    const [initialFormData, setInitialFormData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [course, setCourse] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [canPreview, setCanPreview] = useState(false);
    const navigate = useNavigate();

    const toggleEdit = () => {
        if (isEditing) {
            setFormData(initialFormData);
        }
        setIsEditing(prev => !prev);
        setRefreshKey(prev => prev + 1);
    };

    const sortCourseData = (courseData) => {
        const sortedCourse = { ...courseData };

        sortedCourse.modules = [];

        setCourse(sortedCourse);
    };

    const transformCourseDetailToFormData = (courseDetail) => ({
        description: {
            title: courseDetail.title,
            description: courseDetail.description,
            categoryId: courseDetail.categoryId,
            cover: courseDetail.thumbnailUrl ? [
                {
                    uid: '-1',
                    name: 'cover.jpg',
                    status: 'done',
                    url: courseDetail.thumbnailUrl,
                }
            ] : null,
            previewImage: courseDetail.thumbnailUrl || null,
        },
        bonus: {
            isPaid: courseDetail.price !== 0,
            price: courseDetail.price !== 0 ? courseDetail.price : null,
            levelId: courseDetail.level,
            language: courseDetail.language
        }
    });

    const loadInitialData = async () => {
        try {
            const [categoryRes, courseRes] = await Promise.all([
                axiosInstance.get(commonApi.category.url),
                axiosInstance.get(commonApi.instructorGetCourse.url(id)),
            ]);
            setCategories(categoryRes.data.result);
            sortCourseData(courseRes.data.result);
            if(course?.status !== "DRAFT") setCanPreview(true);
        } catch (err) {
            message.error("Error loading data.");
        } finally {
            setTimeout(() => {
                setInitialLoading(false);
            }, 400);
        }
    };

    useEffect(() => {
        if (course) {
            const transformed = transformCourseDetailToFormData(course);
            setFormData(transformed);
            setInitialFormData(transformed);
        }
    }, [course]);

    useEffect(() => {
        if (id) loadInitialData();
        // eslint-disable-next-line
    }, [id]);

    const updateFormDataField = (section, newData) => {
        setFormData((prev) => ({
            ...prev,
            [section]: {
                ...prev?.[section],
                ...newData,
            },
        }));
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [refreshKey]);

    const buildCourseFormData = (courseDetail) => {
        const fData = new FormData();

        fData.append("title", courseDetail.title || "");
        fData.append("description", courseDetail.description || "");
        fData.append("categoryId", courseDetail.categoryId);
        fData.append("level", courseDetail.levelId);
        fData.append("price", courseDetail.isPaid ? courseDetail.price : 0);
        fData.append("language", courseDetail.language);
        if (courseDetail.cover && courseDetail.cover[0]?.url) {
            fData.append("thumbnailUrl", courseDetail.cover[0]?.url);
        }

        if (courseDetail.cover && courseDetail.cover.length > 0 && courseDetail.cover[0].originFileObj) {
            fData.append("imageFile", courseDetail.cover[0].originFileObj);
        }
        return fData;
    };

    const handleSaveDraft = (courseDetail) => {
        const fData = buildCourseFormData(courseDetail);
        axiosInstance.put(commonApi.updateCourse.url(id), fData, {
            headers: { "Content-Type": "multipart/form-data" }
        }).then(() => {
            message.success("Course save as draft!");
            loadInitialData();
            toggleEdit();
        })
            .catch((error) => {
                message.error("Fail to save draft." + error);
            });
    }

    const handleSubmitForApproval = async () => {
        if (!id) {
            message.error("Course ID not found.");
            return;
        }

        setSubmitLoading(true);
        try {
            const res = await axiosInstance.get(commonApi.validateCourse.url(id));

            const { valid, errors } = res.data.result;

            if (valid) {
                await axiosInstance.patch(commonApi.updateCourseStatus.url(id), {
                    status: "PENDING",
                });

                loadInitialData();
                message.success("Course submitted for approval.");
            } else {
                // message.error("Course has validation issues:");
                // errors.forEach(err => {
                //     message.error(err);
                // });
                message.error(errors[0]);
            }
        } catch (error) {
            console.error("Validation error:", error);
            message.error("Failed to validate course.");
        } finally {
            setSubmitLoading(false);
        }
    };

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {initialLoading && <LoadingOverlay />}
            {/* Course Overview */}
            <Card variant="outlined" className="shadow">
                {!isEditing && course?.status === "DRAFT" && (
                    <div className="flex justify-end gap-2 mb-4">
                        <Button type="primary" onClick={handleSubmitForApproval} loading={submitLoading}>
                            Submit
                        </Button>
                        <Button type="primary" onClick={toggleEdit}>
                            Edit
                        </Button>
                    </div>
                )}

                <Form.Provider
                    onFormFinish={(name, { values, forms }) => {
                        if (name === "courseDescription") {
                            // You can call a centralized save logic here
                            handleSaveDraft(values);
                        }
                    }}
                >
                    {isEditing ? (
                        <CourseDescription
                            categoryList={categories}
                            form={form}
                            formData={formData}
                            updateFormData={updateFormDataField}
                            suppressErrors={true}
                            isEditing={true}
                            name="courseDescription"
                            onSave={() => {
                                const values = form.getFieldsValue(true);
                                handleSaveDraft(values);
                            }}
                            onCancel={toggleEdit}

                        />
                    ) : (
                        <div className="flex flex-col md:flex-row gap-6">

                            {/* <img
                                src={course?.thumbnailUrl || "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"}
                                alt="Course Thumbnail"
                                className="w-full md:w-60 h-auto object-cover rounded-lg border"
                            /> */}
                            <Image
                                width="20vw"
                                height="100%"
                                src={course?.thumbnailUrl || "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"}
                                alt="Course Thumbnail"
                                style={{ objectFit: "cover", borderRadius: 8 }}
                            />
                            <div className="flex-1">
                                <Title level={3}>{course?.title}</Title>
                                <Paragraph>{course?.description}</Paragraph>
                                <Descriptions column={1} size="small">
                                    <Descriptions.Item label="Category">{course?.category}</Descriptions.Item>
                                    <Descriptions.Item label="Level">{course?.level}</Descriptions.Item>
                                    <Descriptions.Item label="Language">{course?.language}</Descriptions.Item>
                                    <Descriptions.Item label="Price">
                                        {course?.price > 0 ? `${formatCurrency(course?.price)}` : <Tag color="green">Free</Tag>}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Status">
                                        {course?.status === "PUBLISHED" && (
                                            <Tag color="green">Published</Tag>
                                        )}
                                        {course?.status === "DRAFT" && (
                                            <Tag color="blue">Draft</Tag>
                                        )}
                                        {course?.status === "PENDING" && (
                                            <Tag color="orange">Pending</Tag>
                                        )}
                                        {course?.deleted && <Tag color="red">Deleted</Tag>}
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                        </div>
                    )
                    }
                </Form.Provider>

            </Card>

            {/* Modules & Lessons */}
            <Card
                title="Course Modules"
                variant="outlined"
                className="shadow"
                extra={
                    (canPreview && <Button type="text" size="small" onClick={() => window.open(`/course/${id}/view`, "_blank")}>
                      Preview
                    </Button>)
                  }
                  >
                {course?.status === "DRAFT" ? <CourseModule courseId={id} setCanPreview={setCanPreview} /> : (
                    <CourseModuleList courseId={id} />
                )}
            </Card>
        </div>
    );
};

export default InstructorCourseDetailView;

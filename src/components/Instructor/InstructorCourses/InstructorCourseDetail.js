import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { formatCurrency } from "../../../common/helper";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { Form, Card, Descriptions, Tag, Collapse, Typography, Divider, message, Button } from "antd";
import CourseDescription from "./CourseCreate/CourseInfo";

const { Title, Paragraph, Text } = Typography;

const InstructorCourseDetailView = () => {
    const { id } = useParams();
    const [isEditing, setIsEditing] = useState(false);
    const [form] = Form.useForm();
    const [formData, setFormData] = useState(null);
    const [initialFormData, setInitialFormData] = useState(null);
    const [categories, setCategories] = useState([]);
    const [course, setCourse] = useState(null);
    const [initialLoading, setInitialLoading] = useState(true);
    const [refreshKey, setRefreshKey] = useState(0);

    const toggleEdit = () => {
        if (isEditing) {
            setFormData(initialFormData);
        }
        setIsEditing(prev => !prev);
        setRefreshKey(prev => prev + 1);
    };

    const sortCourseData = (courseData) => {
        const sortedCourse = { ...courseData };

        sortedCourse.modules = [...courseData.modules]
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .map(module => ({
                ...module,
                lessons: [...module.lessons].sort((a, b) => a.orderIndex - b.orderIndex)
            }));

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
        } catch (err) {
            message.error("Error loading course or categories");
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

    if (!course) return <p>Course not found.</p>;

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
                console.log(error);
                message.error("Fail to save draft.");
            });
    }

    return (
        <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
            {initialLoading && <LoadingOverlay />}
            {/* Course Overview */}
            <Card variant="outlined" className="shadow">
                {!isEditing && (
                    <div className="flex justify-end mb-4">
                        <Button type="primary" onClick={toggleEdit}>
                            Edit
                        </Button>
                        {/* {isEditing && (
                        <Button type="primary"> Save </Button>
                    )} */}
                    </div>
                )}

                <Form.Provider
                    onFormFinish={(name, { values, forms }) => {
                        if (name === "courseDescription") {
                            // You can call a centralized save logic here
                            handleSaveDraft(values);
                        } else if (name === "courseMaterial") {

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
                                        {course.price > 0 ? `${formatCurrency(course.price)}` : <Tag color="green">Free</Tag>}
                                    </Descriptions.Item>
                                    <Descriptions.Item label="Status">
                                        {course.status === "PUBLISHED" && (
                                            <Tag color="green">Published</Tag>
                                        )}
                                        {course.status === "DRAFT" && (
                                            <Tag color="blue">Draft</Tag>
                                        )}
                                        {course.status === "PENDING" && (
                                            <Tag color="orange">Pending</Tag>
                                        )}
                                        {course.deleted && <Tag color="red">Deleted</Tag>}
                                    </Descriptions.Item>
                                </Descriptions>
                            </div>
                        </div>
                    )
                    }
                </Form.Provider>

            </Card>

            {/* Modules & Lessons */}
            <Card title="Course Modules" variant="outlined" className="shadow">
                {course.modules.length > 0 ? (
                    <Collapse
                        accordion
                        items={course.modules.map((module, moduleIndex) => ({
                            key: module.id.toString(),
                            label: `Module ${moduleIndex + 1}: ${module.title}`,
                            children: (
                                <>
                                    {module.lessons.length > 0 ? (
                                        <>
                                            {module.lessons.map((lesson, lessonIndex) => (
                                                <div key={lesson.id} className="mb-6">
                                                    <Title level={5}>Lesson {lessonIndex + 1}: {lesson.title}</Title>

                                                    <div className="flex flex-col md:flex-row gap-6">
                                                        {lesson.theory && (
                                                            <Card
                                                                title={<Text strong>Theory</Text>}
                                                                variant="outlined"
                                                                className="w-full md:w-1/2"
                                                            >
                                                                <p><Text type="secondary">Title:</Text> {lesson.theory.title}</p>
                                                                <p><Text type="secondary">Content:</Text> {lesson.theory.content}</p>
                                                            </Card>
                                                        )}

                                                        {lesson.exercise && (
                                                            <Card
                                                                title={<Text strong>Exercise</Text>}
                                                                variant="outlined"
                                                                className="w-full md:w-1/2"
                                                            >
                                                                <p><Text type="secondary">Title:</Text> {lesson.exercise.title}</p>
                                                                <p><Text type="secondary">Instruction:</Text> {lesson.exercise.instruction}</p>
                                                                <p><Text type="secondary">EXP Reward:</Text> {lesson.exercise.expReward}</p>
                                                                <Divider plain orientation="left">Tasks</Divider>
                                                                <ul className="list-disc pl-5">
                                                                    {lesson.exercise.tasks.map((task) => (
                                                                        <li key={task.id}>{task.description}</li>
                                                                    ))}
                                                                </ul>
                                                            </Card>
                                                        )}
                                                    </div>
                                                    <Divider />
                                                </div>
                                            ))}
                                        </>
                                    ) : (
                                        <div className="text-center p-4 text-gray-500">
                                            No lessons yet.
                                        </div>
                                    )}

                                </>
                            ),
                        }))}
                        className="shadow"
                    />
                ) : (
                    <div className="text-center p-4 text-gray-500">
                        No modules yet.
                    </div>
                )}


            </Card>
        </div>
    );
};

export default InstructorCourseDetailView;

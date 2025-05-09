import React, { useState, useEffect, useCallback } from "react";
import { Steps, Button, message, Form, Modal } from "antd";
import {
    CheckCircleOutlined,
    CloseCircleOutlined,
} from "@ant-design/icons";
import LoadingOverlay from "../../../../common/LoadingOverlay";
import CourseDescription from "./CourseDescription";
import CourseMaterial from "./CourseMaterial/CourseMaterial";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axiosInstance from "../../../../config/axiosInstance";
import commonApi from "../../../../common/api";

const { Step } = Steps;
const { confirm } = Modal;

const steps = [
    { title: "Course Info", component: CourseDescription },
    { title: "Course Material", component: CourseMaterial },
    { title: "Submit & Review" }
];

export default function CourseForm() {
    const [form] = Form.useForm();
    const [current, setCurrent] = useState(0);
    const user = useSelector((state) => state?.user?.user);
    const [completed, setCompleted] = useState({});
    const [showErrors, setShowErrors] = useState(false);
    const [categories, setCategories] = useState([]);
    const [initialLoading, setInitialLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const result = await axiosInstance.get(commonApi.category.url);
            setCategories(result.data.result);
        } catch (error) {
            message.error("Error when fetching category data.");
            setCategories([]);
        } finally {
            setTimeout(() => {
                setInitialLoading(false);
            }, 400);
        }
    };

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [current]);

    const next = () => {
        setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const prev = () => {
        setCurrent((prev) => Math.max(prev - 1, 0));
    };

    const markComplete = useCallback((index) => {
        setCompleted((prev) => ({ ...prev, [index]: true }));
    }, []);

    const markIncomplete = useCallback((index) => {
        setCompleted((prev) => ({ ...prev, [index]: false }));
    }, []);

    const [formData, setFormData] = useState({
        description: {},
        modules: [],
        bonus: {}
    });

    const updateFormData = useCallback((section, data) => {
        setFormData(prev => ({
            ...prev,
            [section]: data
        }));
    }, []);

    const CurrentComponent = steps[current]?.component;

    const buildCourseFormData = (formData, instructor, isPublished = false) => {
        const fData = new FormData();

        const { description, modules, bonus } = formData;
        console.log(formData);
        fData.append("title", description.title || "");
        fData.append("description", description.description || "");
        fData.append("categoryId", description.categoryId);
        fData.append("instructor", instructor);
        fData.append("level", bonus.levelId || "BEGINNER");
        fData.append("language", bonus.language || "JAVA");
        fData.append("price", bonus.isPaid ? bonus.price : 0);
        fData.append("isPublished", isPublished);

        if (description.cover && description.cover.length > 0 && description.cover[0].originFileObj) {
            fData.append("imageFile", description.cover[0].originFileObj);
        }

        modules.forEach((module, moduleIndex) => {
            fData.append(`modules[${moduleIndex}].title`, module.title || "");
            fData.append(`modules[${moduleIndex}].orderIndex`, moduleIndex + 1);

            module.lessons?.forEach((lesson, lessonIndex) => {
                const base = `modules[${moduleIndex}].lessons[${lessonIndex}]`;
                fData.append(`${base}.title`, lesson.title || "");
                fData.append(`${base}.orderIndex`, lessonIndex);
                fData.append(`${base}.defaultCode`, lesson.defaultCode || "");
                fData.append(`${base}.duration`, lesson.duration || 0);

                if (lesson.theory) {
                    fData.append(`${base}.theory.title`, lesson.theory?.title || "");
                    fData.append(`${base}.theory.content`, lesson.theory?.content || "");
                }

                if (lesson.exercise) {
                    fData.append(`${base}.exercise.title`, lesson.exercise?.title || "");
                    fData.append(`${base}.exercise.instruction`, lesson.exercise?.instruction || "");
                    fData.append(`${base}.exercise.expReward`, lesson.exercise?.expReward || 0);

                    lesson.exercise?.tasks?.forEach((task, taskIndex) => {
                        fData.append(`${base}.exercise.tasks[${taskIndex}].description`, task.description || "");
                    });
                }
            })
        })
        return fData;
    };

    const handleSaveDraft = () => {
        const fData = buildCourseFormData(formData, user.username, false);
        axiosInstance.post(commonApi.createCourse.url, fData, {
            headers: { "Content-Type": "multipart/form-data" }
        })
            .then(() => {
                message.success("Course save as draft!");
                navigate('/admin-panel/courses');
            })
            .catch((error) => {
                console.log(error);
                message.error("Fail to save draft.");
            })
    };


    const handleSubmit = () => {
        const allCompleted = steps
            .slice(0, steps.length - 1)
            .every((_, index) => completed[index]);
        setShowErrors(true);
        if (!allCompleted) {
            markIncomplete(steps.length - 1);
            message.error("Please complete all sections before submitting.");
            return;
        }

        confirm({
            title: "Ready to publish your course?",
            content: "The course will be published to every learner.",
            okText: "Yes, Publish",
            cancelText: "Cancel",
            centered: true,
            onOk: () => {
                form.validateFields()
                    .then(() => {
                        const fData = buildCourseFormData(formData, user.username, true);
                        axiosInstance.post(commonApi.createCourse.url, fData, {
                            headers: { "Content-Type": "multipart/form-data" }
                        })
                            .then(() => {
                                message.success("Course published successfully!");
                                markComplete(steps.length - 1);
                                navigate('/admin-panel/courses');
                            })
                            .catch((error) => {
                                console.error("Publishing failed:", error);
                                message.error("Failed to publish course.");
                            });
                    })
                    .catch((err) => {
                        markIncomplete(steps.length - 1);
                        message.error("Some fields are still invalid. Please check again.");
                        console.error("Validation Error:", err);
                    });
            }
        });
    };



    return (

        <div className="flex-1">
            {initialLoading && <LoadingOverlay />}

            <div className="flex min-h-screen bg-gray-50">
                {/* Sidebar */}
                <div className="w-64 bg-white border-r">
                    <ul className="mt-10 space-y-4 p-4">
                        {steps.map((step, index) => (
                            <li
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`cursor-pointer flex items-center justify-between px-4 py-2 rounded-lg transition ${current === index
                                    ? "bg-blue-100 text-blue-600 font-semibold"
                                    : "text-gray-600 hover:bg-gray-100"
                                    }`}
                            >
                                <span>{step.title}</span>
                                {completed[index] ? (
                                    <CheckCircleOutlined className="text-green-500" />
                                ) : (
                                    <CloseCircleOutlined className="text-gray-300" />
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Main Form */}
                <div className="flex-1 p-10">
                    <Steps current={current} className="mb-10">
                        {steps.map((step, index) => (
                            <Step
                                key={index}
                                title={step.title}
                                status={
                                    completed[index]
                                        ? "finish"
                                        : index === current
                                            ? "process"
                                            : "wait"
                                }
                            />
                        ))}
                    </Steps>

                    <Form
                        form={form}
                        layout="vertical"
                        className="bg-white p-6 rounded shadow"
                        validateTrigger="onSubmit"
                    >
                        {CurrentComponent ? (
                            <CurrentComponent
                                categoryList={categories}
                                formData={formData}
                                updateFormData={updateFormData}
                                markComplete={() => markComplete(current)}
                                markIncomplete={() => markIncomplete(current)}
                                suppressErrors={!showErrors}
                            />
                        ) : (
                            <div className="text-center">
                                <h2 className="text-xl font-bold p-5">Ready to Submit!</h2>
                                <Button type="default" onClick={handleSaveDraft}>
                                    Save Draft
                                </Button>
                                <Button type="primary" onClick={handleSubmit} style={{ marginLeft: 10 }}>
                                    Publish
                                </Button>
                            </div>
                        )}
                    </Form>

                    {/* Navigation Buttons */}
                    <div className="mt-8 flex justify-between">
                        <Button disabled={current === 0} onClick={prev}>
                            Previous
                        </Button>
                        {current < steps.length - 1 && (
                            <Button type="primary" onClick={next}>
                                Next
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

import React, { useEffect, useState } from "react";
import { Steps, Button, Form, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseDescription from "./CourseInfo";
import CourseModule from "./CourseMaterial/CourseModule";
import axiosInstance from "../../../../config/axiosInstance";
import commonApi from "../../../../common/api";
import LoadingOverlay from "../../../../common/LoadingOverlay";

const { Step } = Steps;

export default function CourseForm() {
    const [courseId, setCourseId] = useState(null);
    const [initialLoading, setInitialLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);

    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user?.user);

    const [form] = Form.useForm();
    const [current, setCurrent] = useState(
        location.pathname.includes("material") ? 1 : 0
    );

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, [current]);

    const next = () => {
        setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
    };

    useEffect(() => {
        const stepParam = location.pathname.includes("material") ? 1 : 0;
        setCurrent(stepParam);
    }, [location.pathname]);

    const handleSave = async (formInstance) => {
        setInitialLoading(true);
        try {
            const values = await formInstance.validateFields();
        
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("description", values.description);
            formData.append("categoryId", values.categoryId);
            formData.append("instructor", user.username);
            formData.append("level", values.levelId || "BEGINNER");
            formData.append("language", values.language || "JAVA");
            formData.append("price", values.isPaid ? values.price : 0);
            formData.append("status", "DRAFT");

            if (values.cover?.[0]?.originFileObj) {
                formData.append("imageFile", values.cover[0].originFileObj);
            }

            const res = await axiosInstance.post(commonApi.createCourse.url, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            message.success("Course created. Proceed to materials.");
            setCourseId(res.data.result?.id);
            next();
        } catch (error) {
            console.error("Course creation failed:", error);
            message.error("Failed to create course.");
        } finally {
            setInitialLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/instructor-panel/courses');
    }

    const handleSubmitForApproval = async () => {
        if (!courseId) {
            message.error("Course ID not found.");
            return;
        }

        setSubmitLoading(true);
        try {
            const res = await axiosInstance.get(commonApi.validateCourse.url(courseId));

            const { valid, errors } = res.data.result;

            if (valid) {
                await axiosInstance.patch(commonApi.updateCourseStatus.url(courseId), {
                    status: "PENDING",
                });

                message.success("Course submitted for approval.");
                navigate("/instructor-panel/courses");
            } else {
                message.error("Course has validation issues:");
                errors.forEach(err => {
                    message.error(err);
                });
            }
        } catch (error) {
            console.error("Validation error:", error);
            message.error("Failed to validate course.");
        } finally{
            setSubmitLoading(false);
        }
    };

    const steps = [
        {
            title: "Course Info",
            component: (
                <CourseDescription
                    form={form}
                    formData={{}}
                    onSave={handleSave}
                    onCancel={handleCancel}
                />
            ),
        },
        {
            title: "Course Material",
            component: <CourseModule courseId={courseId} />,
        },
    ];

    return (
        <div className="flex-1 min-h-screen bg-gray-50 p-10">
            {initialLoading && <LoadingOverlay />}
            <Steps current={current} className="mb-10">
                {steps.map((step, index) => (
                    <Step key={index} title={step.title} />
                ))}
            </Steps>

            <div className="bg-white p-6 rounded shadow">
                {steps[current].component}
            </div>

            <div className="mt-8 flex justify-between">
                {current > 0 && (
                    <Button onClick={() => navigate(`/instructor-panel/courses`)}>
                        Back
                    </Button>
                )}
                {current === 1 && courseId && (
                    <Button
                        type="primary"
                        onClick={handleSubmitForApproval}
                        loading={submitLoading}
                    >
                        Submit
                    </Button>
                )}
            </div>
        </div>
    );
}

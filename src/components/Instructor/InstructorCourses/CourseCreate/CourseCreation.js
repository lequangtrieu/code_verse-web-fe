import React, { useEffect, useState } from "react";
import { Steps, Button, Form, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseDescription from "./CourseInfo";
import CourseModule from "./CourseMaterial/CourseModule";
import axiosInstance from "../../../../config/axiosInstance";
import commonApi from "../../../../common/api";

const { Step } = Steps;

export default function CourseForm() {
    const [courseId, setCourseId] = useState(null);

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
        }
    };

    const handleCancel = () => {
        navigate('/instructor-panel/courses');
    }

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
            </div>
        </div>
    );
}

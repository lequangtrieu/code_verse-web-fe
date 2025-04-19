import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ModuleItem from "./ModuleItem";


export default function CourseMaterial({ formData, updateFormData, markComplete, markIncomplete }) {
    const [form] = Form.useForm();
    const [videoPreview, setVideoPreview] = useState({});
    const hasInitialized = useRef(false);
    const [completedLessons, setCompletedLessons] = useState({});
    const modules = Form.useWatch("modules", form);

    const markLessonComplete = (moduleIdx, lessonIdx) => {
        setCompletedLessons((prev) => ({
            ...prev,
            [`${moduleIdx}-${lessonIdx}`]: true,
        }));
    };

    const markLessonIncomplete = (moduleIdx, lessonIdx) => {
        setCompletedLessons((prev) => ({
            ...prev,
            [`${moduleIdx}-${lessonIdx}`]: false,
        }));
    };

    useEffect(() => {
        if (!hasInitialized.current && formData?.modules?.length) {
            form.setFieldsValue({ modules: formData.modules });
            hasInitialized.current = true;
        }
    }, [formData, form]);

    useEffect(() => {
        const formModules = form.getFieldValue("modules") || [];
        const previews = {};

        formModules.forEach((module, moduleIdx) => {
            module.lessons?.forEach((lesson, lessonIdx) => {
                const fileList = lesson?.video;
                const file = Array.isArray(fileList) ? fileList[0]?.originFileObj : null;
                if (file && file.type?.startsWith("video/")) {
                    const key = `${moduleIdx}-${lessonIdx}`;
                    previews[key] = URL.createObjectURL(file);
                }
            });
        });

        setVideoPreview(previews);
    }, [form]);

    useEffect(() => {
        return () => {
            Object.values(videoPreview).forEach((url) => URL.revokeObjectURL(url));
        };
    }, [videoPreview]);

    const onValuesChange = (_, allValues) => {
        updateFormData("modules", allValues.modules || []);
    };

    useEffect(() => {
        if (!modules || modules.length === 0) {
            markIncomplete();
            return;
        }

        let lessonKeys = [];

        for (let m = 0; m < modules.length; m++) {
            const module = modules[m];
            if (!module?.title || !Array.isArray(module.lessons) || module.lessons.length === 0) {
                markIncomplete();
                return;
            }

            for (let l = 0; l < module.lessons.length; l++) {
                lessonKeys.push(`${m}-${l}`);
            }
        }

        const allComplete = lessonKeys.every((key) => completedLessons[key]);
        if (allComplete && lessonKeys.length > 0) {
            markComplete();
        } else {
            markIncomplete();
        }
    }, [modules, completedLessons, markComplete, markIncomplete]);


    return (
        <>
            <Divider orientation="left">Add Modules and Lessons</Divider>
            <Form
                form={form}
                layout="vertical"
                onValuesChange={onValuesChange}
            >
                <Form.List name="modules">
                    {(moduleFields, { add: addModule, remove: removeModule }) => (
                        <>
                            {moduleFields.map((moduleField) => {
                                return (<ModuleItem
                                    key={`module-${moduleField.name}`}
                                    form={form}
                                    moduleField={moduleField}
                                    removeModule={removeModule}
                                    videoPreview={videoPreview}
                                    setVideoPreview={setVideoPreview}
                                    markLessonComplete={markLessonComplete}
                                    markLessonIncomplete={markLessonIncomplete}
                                />)
                            })}

                            <Form.Item>
                                <Button
                                    type="dashed"
                                    onClick={() => addModule()}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    Add Module
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </>
    );
}

import React, { useEffect, useState, useRef } from "react";
import { Form, Button, Divider } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import ModuleItem from "./ModuleItem";
import SortablePanel from "./SortablePanel";


export default function CourseMaterial({ formData, updateFormData, markComplete, markIncomplete, suppressErrors }) {
    const [form] = Form.useForm();
    const [videoPreview, setVideoPreview] = useState({});
    const hasInitialized = useRef(false);
    const [completedLessons, setCompletedLessons] = useState({});
    const [moduleOrder, setModuleOrder] = useState([]);
    const modules = Form.useWatch("modules", form);

    useEffect(() => {
        if (modules && Array.isArray(modules)) {
            const keys = modules.map((_, index) => index);
            setModuleOrder(keys);
        }
    }, [modules]);

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

    // useEffect(() => {
    //     const formModules = form.getFieldValue("modules") || [];
    //     const previews = {};

    //     formModules.forEach((module, moduleIdx) => {
    //         module?.lessons?.forEach((lesson, lessonIdx) => {
    //             const fileList = lesson?.video;
    //             const file = Array.isArray(fileList) ? fileList[0]?.originFileObj : null;
    //             if (file && file.type?.startsWith("video/")) {
    //                 const key = `${moduleIdx}-${lessonIdx}`;
    //                 previews[key] = URL.createObjectURL(file);
    //             }
    //         });
    //     });

    //     setVideoPreview(previews);
    // }, [form]);

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
        // eslint-disable-next-line
    }, [modules, completedLessons]);


    return (
        <>
            <Divider orientation="left">Add Modules and Lessons</Divider>
            <Form
                form={form}
                layout="vertical"
                onValuesChange={onValuesChange}
            >
                <Form.List name="modules">
                    {(moduleFields, { add: addModule, remove: removeModule }) => {

                        const handleDragEnd = (event) => {
                            const { active, over } = event;
                            if (!over || active.id === over.id) return;

                            const oldIndex = moduleOrder.indexOf(active.id);
                            const newIndex = moduleOrder.indexOf(over.id);
                            const newOrder = arrayMove(moduleOrder, oldIndex, newIndex);
                            setModuleOrder(newOrder);

                            const modules = [...(form.getFieldValue("modules") || [])];
                            const reordered = newOrder.map((key, index) => {
                                const field = moduleFields.find((f) => f.key === key);
                                if (!field) return null;

                                return { ...modules[field.name], orderIndex: index };
                            });

                            form.setFieldsValue({ modules: reordered });
                            updateFormData("modules", reordered);
                        };

                        return (
                            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                                    <SortableContext items={moduleOrder} strategy={verticalListSortingStrategy}>
                                        {moduleFields.map((moduleField) => {

                                            return (
                                                <SortablePanel
                                                    key={moduleField.key}
                                                    id={moduleField.key}
                                                    header={`Module ${moduleField.name + 1}`}
                                                >
                                                        <ModuleItem
                                                            key={`module-${moduleField.name}`}
                                                            form={form}
                                                            moduleField={moduleField}
                                                            removeModule={removeModule}
                                                            videoPreview={videoPreview}
                                                            setVideoPreview={setVideoPreview}
                                                            markLessonComplete={markLessonComplete}
                                                            markLessonIncomplete={markLessonIncomplete}
                                                            suppressErrors={suppressErrors}
                                                        />


                                                </SortablePanel>
                                            )
                                        }
                                        )
                                        }
                                    </SortableContext>


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
                            </DndContext>
                        )
                    }}
                </Form.List>
            </Form>
        </>
    );
}

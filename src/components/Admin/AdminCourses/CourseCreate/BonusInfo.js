import React, { useState, useEffect, useRef } from "react";
import { Form, Input, InputNumber, Radio, Select } from "antd";

const { TextArea } = Input;
const { Option } = Select;

export default function BonusInfo({ formData, updateFormData, markComplete, markIncomplete, suppressErrors }) {
    const [form] = Form.useForm();
    const hasInitialized = useRef(false);
    const hasValidatedOnce = useRef(false);
    const localSuppressed = true;
    const finalSuppressErrors = suppressErrors && localSuppressed;
    // eslint-disable-next-line
    const [levels, setLevels] = useState([
        { levelId: "BEGINNER", name: "Beginner" },
        { levelId: "INTERMEDIATE", name: "Intermediate" },
        { levelId: "ADVANCED", name: "Advanced" }
    ]);

    const values = Form.useWatch([], form);
    const isPaid = Form.useWatch("isPaid", form);
    const previousIsPaid = useRef(null);

    useEffect(() => {
        if (!hasInitialized.current) {
            const initialValues = {
                levelId: levels[0]?.levelId,
                ...formData?.bonus,
            };
            form.setFieldsValue(initialValues);
            hasInitialized.current = true;
        }
        // eslint-disable-next-line
    }, [formData]);

    useEffect(() => {
       
        previousIsPaid.current = isPaid;
    }, [isPaid]);

    useEffect(() => {
        if (!values || !hasInitialized.current) return;

        const timer = setTimeout(() => {
            const cleanValues = { ...form.getFieldsValue(true) };
            if (!cleanValues.isPaid) {
                delete cleanValues.price;
            }
    
            updateFormData("bonus", cleanValues);
    
            const fieldsToValidate = ["isPaid", "levelId"];
            if (cleanValues.isPaid) {
                fieldsToValidate.push("price");
            }
    
            form
                .validateFields(fieldsToValidate)
                .then(() => {
                    markComplete();
                    hasValidatedOnce.current = true;
                })
                .catch(() => {
                    markIncomplete();
                    hasValidatedOnce.current = false;
                });
        }, 100);
        return () => clearTimeout(timer);
        // eslint-disable-next-line
    }, [values]);

    useEffect(() => {
        if (!hasValidatedOnce.current && hasInitialized.current) {
            const fieldsToValidate = ["isPaid", "levelId"];
            if (form.getFieldValue("isPaid")) {
                fieldsToValidate.push("price");
            }
            form
                .validateFields(fieldsToValidate)
                .then(() => markComplete())
                .catch(() => markIncomplete());
        }
        // eslint-disable-next-line
    }, [hasInitialized.current]);

    return (
        <Form
            form={form}
            layout="vertical"
            className="max-w-2xl mx-auto"
        >
            <Form.Item
                name="isPaid"
                label="Is this course paid?"
                htmlFor={null}
                rules={[{ required: true, message: "Please choose Free or Paid" }]}
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <Radio.Group optionType="button" buttonStyle="solid">
                    <Radio value={false}>Free</Radio>
                    <Radio value={true}>Paid</Radio>
                </Radio.Group>
            </Form.Item>

            {isPaid && (
                <Form.Item
                    name="price"
                    label="Course Price (VND)"
                    rules={[{ required: true, message: "Please enter the price" }]}
                    preserve={false}
                    validateStatus={finalSuppressErrors ? "" : undefined}
                    help={finalSuppressErrors ? "" : undefined}
                >
                    <InputNumber min={1} placeholder="e.g. 100000" className="w-full" />
                </Form.Item>
            )}

            <Form.Item
                name="levelId"
                label="Course Level"
                rules={[{ required: true, message: "Please select level" }]}
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <Select>
                    {levels.map((level) => (
                        <Option key={level.levelId} value={level.levelId}>
                            {level.name}
                        </Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name="notes" label="Additional Notes (optional)">
                <TextArea rows={3} placeholder="Add any remarks, prerequisites, etc." />
            </Form.Item>
        </Form>
    );
}

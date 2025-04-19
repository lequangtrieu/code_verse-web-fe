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
        { levelId: 1, name: "Beginner" },
        { levelId: 2, name: "Intermediate" },
        { levelId: 3, name: "Advanced" }
    ]);

    const values = Form.useWatch([], form);
    const isPaid = Form.useWatch("isPaid", form);

    useEffect(() => {
        if (!hasInitialized.current) {
            const values = {
                levelId: levels[0]?.levelId,
                ...formData?.bonus
            };
            form.setFieldsValue(values);
            hasInitialized.current = true;
        }
        // eslint-disable-next-line
    }, [formData]);

    useEffect(() => {
        if (!values) return;

        updateFormData("bonus", values);

        if (!values.isPaid) {
            form.setFields([
                { name: "price", rules: [] }
            ]);
            form.resetFields(["price"]);
        }

        form
            .validateFields()
            .then(() => {
                markComplete();
                hasValidatedOnce.current = true;
            })
            .catch(() => {
                markIncomplete();
                hasValidatedOnce.current = false;
            });
            // eslint-disable-next-line
    }, [values]);

    useEffect(() => {
        if (!hasValidatedOnce.current && hasInitialized.current) {
            form
                .validateFields()
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

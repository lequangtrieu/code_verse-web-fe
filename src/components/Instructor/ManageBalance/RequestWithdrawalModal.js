import { useEffect, useState } from "react";
import { Modal, Form, InputNumber, Button, Alert, message } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";

const MIN_WITHDRAWAL = 20000;

const RequestWithdrawalModal = ({
                                    open,
                                    onClose,
                                    onSuccess,
                                    currentBalance,
                                    hasPending,
                                    instructorId
                                }) => {
    const [form] = Form.useForm();
    const [submitting, setSubmitting] = useState(false);

    const handleManualSubmit = async () => {
        if (hasPending) {
            message.warning("You already have a pending withdrawal request.");
            return;
        }

        try {
            const values = await form.validateFields();
            setSubmitting(true);

            // Gọi API mới theo structure RESTful: /api/instructors/{id}/withdrawals/create
            await axiosInstance.post(
                commonApi.withdrawal.createRequest.url(instructorId),
                { amount: values.amount }
            );

            message.success("Your request has been submitted successfully.");
            form.resetFields();
            onClose();

            // Gọi callback để refresh dữ liệu ở parent
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("❌ Create withdrawal failed:", err);
            const msg = err?.response?.data?.message || "Failed to create withdrawal request.";
            message.error(msg);
        } finally {
            setSubmitting(false);
        }
    };

    useEffect(() => {
        if (open) form.resetFields();
    }, [open]);

    return (
        <Modal
            open={open}
            getContainer={false}
            title="Request Withdrawal"
            onCancel={onClose}
            footer={null}
            destroyOnClose
        >
            {hasPending && (
                <Alert
                    type="warning"
                    showIcon
                    className="mb-4"
                    icon={<ExclamationCircleOutlined />}
                    message="You already have a pending withdrawal request."
                />
            )}

            <div className="text-sm mb-4 space-y-1">
                <p>💰 <span className="font-medium">Current Balance:</span>{" "}
                    <span className="font-semibold text-blue-600">
                        {currentBalance.toLocaleString("vi-VN")} ₫
                    </span>
                </p>
                <p className="text-xs text-gray-500">
                    Minimum withdrawal amount: {MIN_WITHDRAWAL.toLocaleString("vi-VN")} ₫
                </p>
            </div>

            <Form form={form} layout="vertical" disabled={submitting || hasPending}>
                <Form.Item
                    name="amount"
                    label="Amount to Withdraw"
                    rules={[
                        { required: true, message: "Please enter amount" },
                        {
                            validator: (_, value) => {
                                if (!value) return Promise.resolve();
                                if (value < MIN_WITHDRAWAL) {
                                    return Promise.reject(`At least ${MIN_WITHDRAWAL.toLocaleString("vi-VN")} ₫`);
                                }
                                if (value > currentBalance) {
                                    return Promise.reject("Amount exceeds current balance");
                                }
                                return Promise.resolve();
                            }
                        }
                    ]}
                >
                    <InputNumber
                        min={0}
                        className="w-full"
                        formatter={v => `${v}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={v => v.replace(/\D/g, "")}
                        addonAfter="₫"
                        placeholder="Enter amount"
                    />
                </Form.Item>

                <Form.Item className="text-right">
                    <Button
                        type="primary"
                        onClick={handleManualSubmit}
                        loading={submitting}
                        disabled={hasPending}
                    >
                        Submit Request
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default RequestWithdrawalModal;

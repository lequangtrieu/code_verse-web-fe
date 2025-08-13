import { useEffect, useState } from "react";
import { Button, Select, Input, Upload, message as antdMsg } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axiosInstance from "../../src/config/axiosInstance";
import commonApi from "./api";
import CustomModal from "./CustomModal";

const { TextArea } = Input;

const ReportCommentModal = ({ open, onClose, messageId, reportedUserId }) => {
    const [reasons, setReasons] = useState([]);
    const [selectedReason, setSelectedReason] = useState(null);
    const [customReason, setCustomReason] = useState("");
    const [evidence, setEvidence] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [previewUrl, setPreviewUrl] = useState(null);

    useEffect(() => {
        if (open) {
            axiosInstance
                .get(commonApi.adminReportReason.getActive.url)
                .then((res) => setReasons(res.data.result))
                .catch(() => antdMsg.error("Failed to load report reasons"));
        }
    }, [open]);

    const handleSubmit = async () => {
        if (!selectedReason) {
            antdMsg.warning("Please select a reason");
            return;
        }

        const isOtherReason = selectedReason === reasons.find((r) => r.title === "Other")?.id;

        if (isOtherReason && !customReason.trim()) {
            antdMsg.warning("Please provide a custom reason for 'Other'");
            return;
        }

        const formData = new FormData();
        formData.append("reportedUserId", reportedUserId);
        formData.append("reasonId", selectedReason);
        if (customReason) formData.append("customReason", customReason);
        if (messageId) formData.append("messageId", messageId);
        if (evidence) formData.append("evidence", evidence);

        setSubmitting(true);
        try {
            await axiosInstance.post(commonApi.userReport.url, formData, {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            });
            antdMsg.success("Report submitted successfully");
            resetForm();
            onClose();
        } catch (err) {
            antdMsg.error("Failed to submit report");
        } finally {
            setSubmitting(false);
        }
    };

    const handleBeforeUpload = (file) => {
        setEvidence(file);
        const objectUrl = URL.createObjectURL(file);
        setPreviewUrl(objectUrl);
        return false; // prevent auto upload
    };

    useEffect(() => {
        return () => {
            // cleanup blob URL tránh memory leak
            if (previewUrl) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    const resetForm = () => {
        setSelectedReason(null);
        setCustomReason("");
        setEvidence(null);
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl(null);
        }
    };

    return (
        <CustomModal
            open={open}
            onClose={() => {
                resetForm();
                onClose();
            }}
            title="Report Comment"
            footer
            footerContent={
                <>
                    <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                        onClick={() => {
                            resetForm();
                            onClose();
                        }}>Cancel</button>
                    <button className="px-4 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 text-white" onClick={handleSubmit} loading={submitting}>
                        Submit
                    </button>
                </>
            }
        >
            <div className="space-y-4">
                <div>
                    <label className="font-semibold">Reason</label>
                    <Select
                        className="w-full"
                        placeholder="Select a reason"
                        onChange={setSelectedReason}
                        value={selectedReason}
                    >
                        {reasons.map((r) => (
                            <Select.Option key={r.id} value={r.id}>
                                {r.title}
                            </Select.Option>
                        ))}
                    </Select>
                </div>

                {selectedReason === reasons.find((r) => r.title === "Other")?.id && (
                    <div>
                        <label className="font-semibold">Custom Reason</label>
                        <TextArea
                            rows={3}
                            value={customReason}
                            onChange={(e) => setCustomReason(e.target.value)}
                        />
                    </div>
                )}

                <div>
                    <label className="font-semibold">Evidence (optional)</label>
                    <Upload
                        beforeUpload={handleBeforeUpload}
                        showUploadList={false}
                        maxCount={1}
                        accept="image/*"
                    >
                        <Button icon={<UploadOutlined />}>Upload</Button>
                    </Upload>

                    {previewUrl && (
                        <img
                            src={previewUrl}
                            alt="evidence"
                            className="mt-2 rounded max-h-40 border"
                        />
                    )}
                </div>
            </div>
        </CustomModal>
    );
};

export default ReportCommentModal;

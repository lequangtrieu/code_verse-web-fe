import React, { useState, useEffect } from "react";
import { Upload, Modal, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const UploadImage = ({
                         value = [],
                         onChange,
                         maxCount = 1,
                         label = "Upload",
                         accept = "image/*",
                         disabled = false,
                     }) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState("");
    const [previewTitle, setPreviewTitle] = useState("");

    // Kiểm tra file là ảnh
    const handleBeforeUpload = (file) => {
        if (!file.type.startsWith("image/")) {
            message.error("You can only upload image files!");
            return Upload.LIST_IGNORE; // bỏ file không hợp lệ
        }
        return false; // chặn upload tự động, xử lý thủ công
    };

    // Xử lý preview ảnh
    const handlePreview = (file) => {
        const url = file.url || (file.originFileObj && URL.createObjectURL(file.originFileObj));
        if (!url) {
            message.warning("Preview not available");
            return;
        }
        setPreviewImage(url);
        setPreviewTitle(file.name || "Image Preview");
        setPreviewVisible(true);
    };

    // Đóng modal preview
    const handleCancel = () => setPreviewVisible(false);

    // Giải phóng URL Object khi không còn dùng (React 18 Strict Mode chạy 2 lần dev)
    useEffect(() => {
        return () => {
            if (previewImage && previewImage.startsWith("blob:")) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage]);

    // Khi fileList thay đổi, gọi onChange prop truyền lên cha
    const handleChange = ({ fileList }) => {
        onChange && onChange(fileList);
    };

    return (
        <>
            <Upload
                listType="picture-card"
                maxCount={maxCount}
                accept={accept}
                beforeUpload={handleBeforeUpload}
                onPreview={handlePreview}
                onChange={handleChange}
                fileList={value}
                disabled={disabled}
            >
                {value.length >= maxCount ? null : (
                    <div>
                        <UploadOutlined />
                        <div style={{ marginTop: 8 }}>{label}</div>
                    </div>
                )}
            </Upload>

            <Modal
                open={previewVisible}
                title={previewTitle}
                footer={null}
                onCancel={handleCancel}
                width="70%"
                destroyOnClose
            >
                <img
                    alt="preview"
                    style={{ width: "100%", maxHeight: "75vh", objectFit: "contain" }}
                    src={previewImage}
                />
            </Modal>
        </>
    );
};

export default UploadImage;

import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { message, Button } from "antd";
import NotificationModal from "./NotificationModal";
import NotificationTabs from "./NotificationTabs";
import { useState } from "react";

const AdminNotificationPage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [loadingModal, setLoadingModal] = useState(false);

    const handleRedirectToCreate = () => {
        setIsOpen(true);
    }
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2">Notification</h2>
            <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded">
            </div>
            <div className="flex gap-4 mb-6">
                <Button
                    className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    onClick={handleRedirectToCreate}
                >
                    Create Notification
                </Button>
            </div>
            <NotificationTabs />
            <NotificationModal
                open={isOpen}
                onClose={() => setIsOpen(false)}
                onSubmit={(payload) => {
                    setLoadingModal(true);
                    axiosInstance.post(commonApi.createNotification.url, payload)
                        .then(() => {
                            message.success("Notification sent");
                            setIsOpen(false);
                            setLoadingModal(false);
                        })
                        .catch(() => message.error("Failed to send notification"));
                }}
                loading={loadingModal}
            />

        </div>
    );
};

export default AdminNotificationPage;
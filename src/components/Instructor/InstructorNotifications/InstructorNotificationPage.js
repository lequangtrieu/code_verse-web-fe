import { useContext, useEffect } from "react";
import Context from "../../../config/context/context";
import { Table, Typography } from "antd";

const { Text } = Typography;

const InstructorNotificationPage = () => {
    const { notifications, handleMarkAllAsRead } = useContext(Context);

    useEffect(() => {
        if (notifications.some((n) => !n.read)) handleMarkAllAsRead();
        // eslint-disable-next-line
      }, [notifications]);

    const columns = [
        {
            title: "Title",
            dataIndex: "title",
            key: "title",
            width: "15%",
            render: (text) => <Text strong>{text}</Text>,
        },
        {
            title: "Content",
            dataIndex: "content",
            key: "content",
            width: "55%",
            render: (text) => <Text type="secondary">{text}</Text>,
        },
        {
            title: "Sender",
            dataIndex: "sender",
            key: "sender",
            width: "15%",
            render: (sender) => sender ? (
                <span>
                     <b>{sender.role === "ADMIN" ? "Administrator" : sender.name}</b> <br />
                    {sender.role === "ADMIN" ? <></> : <Text type="secondary">{sender.role === "ADMIN" ? "ADMIN" : sender.username}</Text>}
                </span>
            ) : (
                <i>System</i>
            ),
        },
        {
            title: "Created At",
            dataIndex: "createdAt",
            key: "createdAt",
            width: "15%",
            render: (date) =>
                new Date(date).toLocaleString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                }),
        },
    ];

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2">Notification</h2>
            <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded">
            </div>

            <Table
                columns={columns}
                dataSource={notifications}
                rowKey="id"
                pagination={{ pageSize: 6 }}
            />

        </div>
    );
};

export default InstructorNotificationPage;
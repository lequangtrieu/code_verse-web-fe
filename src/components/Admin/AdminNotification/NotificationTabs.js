import React, { useEffect, useState } from "react";
import { Tabs, Table, Typography, message } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { useSelector } from "react-redux";
const { TabPane } = Tabs;
const { Text } = Typography;

const NotificationTabs = () => {
  const [sentNotifs, setSentNotifs] = useState([]);
  const [receivedNotifs, setReceivedNotifs] = useState([]);
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    if (!user?.username) return;
    fetchNotifications();
    // eslint-disable-next-line
  }, [user?.username]);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const [sentRes, receivedRes] = await Promise.all([
        axiosInstance.get(commonApi.getNotificationsSent.url),
        axiosInstance.get(commonApi.getNotifications.url, {
          params: { username: user?.username },
        }),
      ]);

      setSentNotifs(sentRes.data.result || []);
      setReceivedNotifs(receivedRes.data.result || []);
    } catch (err) {
      message.error("Failed to load notifications");
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Content",
      dataIndex: "content",
      key: "content",
      render: (text) => <Text type="secondary">{text}</Text>,
    },
    {
      title: "Sender",
      dataIndex: "sender",
      key: "sender",
      render: (sender) => sender ? (
        <span>
          <b>{sender.name}</b> <br />
          <Text type="secondary">{sender.username}</Text>
        </span>
      ) : (
        <i>System</i>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
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
    <Tabs defaultActiveKey="received">
      <TabPane tab="Received Notifications" key="received">
        <Table
          columns={columns}
          dataSource={receivedNotifs}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 6 }}
        />
      </TabPane>

      <TabPane tab="Sent Notifications" key="sent">
        <Table
          columns={columns}
          dataSource={sentNotifs}
          rowKey="id"
          loading={loading}
          pagination={{ pageSize: 6 }}
        />
      </TabPane>
    </Tabs>
  );
};

export default NotificationTabs;

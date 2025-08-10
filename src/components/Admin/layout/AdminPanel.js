import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Menu, message } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DashboardOutlined,
  UserOutlined,
  BookOutlined,
  StarOutlined,
  SettingOutlined,
  LogoutOutlined,
  TeamOutlined,
  NotificationOutlined, DollarOutlined
} from "@ant-design/icons";
import ROLE from "../../../common/role";
import { logoutUser } from "../../../config/store/userSlice";
import useDocumentTitle from "../../../common/useDocumentTitle";

const { Sider, Content } = Layout;

const AdminPanel = () => {
  useDocumentTitle("PanelAdmin - CodeVerse");
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (user?.role !== ROLE.ADMIN) {
      message.error("You do not have permission to access the admin panel.");
      navigate("/");
    }
  }, [user]);

  const handleLogout = () => {
    message.success("You have been logged out successfully.");
    dispatch(logoutUser());
    navigate("/");
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    } else {
      navigate(`/admin-panel/${key}`);
    }
  };

  return (
    <Layout className="min-h-screen">
      <Sider
        width={265}
        collapsible
        collapsed={collapsed}
        onCollapse={setCollapsed}
        trigger={null}
        className="bg-white shadow-md flex flex-col justify-between"
      >
        <div className="p-4 font-semibold uppercase text-gray-600 border-b">
          {!collapsed && `Welcome, ${user?.username}`}
        </div>
        <Menu
          mode="inline"
          defaultSelectedKeys={["dashboard"]}
          className="border-r-0"
          onClick={handleMenuClick}
        >
          <Menu.Item key="profile" icon={<UserOutlined />}>
            My Profile
          </Menu.Item>
          <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
            System Statistics
          </Menu.Item>
          <Menu.Item key="accounts" icon={<TeamOutlined />}>
            User Management
          </Menu.Item>
          <Menu.Item key="approveInstructor" icon={<UserOutlined />}>
            Approve Instructor Requests
          </Menu.Item>
          <Menu.Item key="courses" icon={<BookOutlined />}>
            Course Management
          </Menu.Item>
          <Menu.Item key="financial" icon={<StarOutlined />}>
            Financial Management
          </Menu.Item>
          <Menu.Item key="violation" icon={<TeamOutlined />}>
            Violation Management
          </Menu.Item>
          <Menu.Item key="sendNotifications" icon={<NotificationOutlined />}>
            Send Notifications
          </Menu.Item>
          <Menu.Item key="withdrawalRequests" icon={<DollarOutlined />}>
            Withdrawal Requests
          </Menu.Item>

          {!collapsed && (
            <div className="px-4 pt-4 pb-1 text-xs text-gray-500 font-semibold">
              SETTINGS
            </div>
          )}
          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            <span className="text-red-500">Logout</span>
          </Menu.Item>
        </Menu>
        <div className="custom-sider-trigger">
          <div
            onClick={() => setCollapsed(!collapsed)}
            className="flex items-center justify-center h-11 cursor-pointer border-t text-gray-500 hover:text-primary transition-colors"
          >
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </div>
        </div>
      </Sider>

      <Layout>
        <Content className="p-8 bg-[#fafafa]">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default AdminPanel;

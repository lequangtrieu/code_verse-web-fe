import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";

import { Layout, Menu, Badge, message } from "antd";
import {
  DashboardOutlined,
  UserOutlined,
  MessageOutlined,
  BookOutlined,
  StarOutlined,
  QuestionCircleOutlined,
  SettingOutlined,
  LogoutOutlined,
  BarsOutlined,
  ScheduleOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from "@ant-design/icons";
import ROLE from "../../../common/role";
import { setUserDetails } from "../../../config/store/userSlice";

const { Sider, Content } = Layout;

const UserPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    if (user?.role !== ROLE.STUDENT) {
      message.error("You do not have permission to access the student panel.");
      navigate("/");
    }
  }, [user]);

  const handleLogout = () => {
    message.success("You have been logged out successfully.");
    localStorage.clear();
    dispatch(setUserDetails(null));
    navigate("/");
  };

  const handleMenuClick = ({ key }) => {
    if (key === "logout") {
      handleLogout();
    } else {
      navigate(`/user-panel/${key}`);
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
        style={{ marginTop: "20px" }}
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
            Dashboard
          </Menu.Item>
          <Menu.Item key="messages" icon={<MessageOutlined />}>
            Messages <Badge count={12} offset={[10, 0]} />
          </Menu.Item>
          <Menu.Item key="courses" icon={<BookOutlined />}>
            Enrolled Courses
          </Menu.Item>
          <Menu.Item key="wishlist" icon={<BarsOutlined />}>
            Wishlist
          </Menu.Item>
          <Menu.Item key="reviews" icon={<StarOutlined />}>
            Reviews
          </Menu.Item>
          <Menu.Item key="quiz" icon={<QuestionCircleOutlined />}>
            My Quiz Attempts
          </Menu.Item>
          <Menu.Item key="assignment" icon={<ScheduleOutlined />}>
            Assignments
          </Menu.Item>

          {!collapsed && (
            <div className="px-4 pt-4 pb-1 text-xs text-gray-500 font-semibold">
              USER
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
export default UserPanel;

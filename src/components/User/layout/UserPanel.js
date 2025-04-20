import { useEffect } from "react";
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
  TeamOutlined,
} from "@ant-design/icons";
import ROLE from "../../../common/role";
import { setUserDetails } from "../../../config/store/userSlice";

const { Sider, Content } = Layout;

const UserPanel = () => {
  const user = useSelector((state) => state?.user?.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    <Layout className="min-h-screen py-6">
      <Sider width={265} className="bg-white shadow-md">
        <div className="p-4 font-semibold uppercase text-gray-600 border-b">
          Welcome, {user?.username}
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
          <Menu.Item key="reviews" icon={<StarOutlined />}>
            Reviews
          </Menu.Item>
          <Menu.Item key="quiz" icon={<QuestionCircleOutlined />}>
            My Quiz Attempts
          </Menu.Item>

          <div className="px-4 pt-4 pb-1 text-xs text-gray-500 font-semibold">
            USER
          </div>

          <Menu.Item key="settings" icon={<SettingOutlined />}>
            Settings
          </Menu.Item>
          <Menu.Item key="logout" icon={<LogoutOutlined />}>
            <span className="text-red-500">Logout</span>
          </Menu.Item>
        </Menu>
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

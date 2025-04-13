import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, notification } from "antd";
import { Modal, Button, Tabs, Form, Input, Avatar, Dropdown } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  GoogleOutlined,
  GithubOutlined,
  ProfileOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import scrollTop from "../../config/scrollTop";

const { TabPane } = Tabs;

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  const openModal = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  const handleLogin = (values) => {
    setIsModalOpen(false);
    setIsLoggedIn(true);
  };

  const handleRegister = (values) => {
    setIsModalOpen(false);
    setIsLoggedIn(true);
    notification.success({
      message: "Registration Successful",
      description: "Welcome to CodeVerse! You have successfully registered.",
      placement: "topRight",
    });
  };

  const userMenu = (
    <Menu
      items={[
        {
          key: "profile",
          label: (
            <div className="flex items-center gap-2 px-2 py-1">
              <Avatar icon={<UserOutlined />} size="small" />
              <div>
                <div className="font-semibold">John Doe</div>
                <div className="text-xs text-gray-400">john@example.com</div>
              </div>
            </div>
          ),
          disabled: true,
        },
        {
          type: "divider",
        },
        {
          key: "my-profile",
          icon: <ProfileOutlined />,
          label: "My Profile",
        },
        {
          key: "settings",
          icon: <SettingOutlined />,
          label: "Settings",
        },
        {
          type: "divider",
        },
        {
          key: "logout",
          icon: <LogoutOutlined />,
          label: <span className="text-red-500">Logout</span>,
        },
      ]}
    />
  );

  const checkActive = (path) =>
    location.pathname.startsWith(path)
      ? "border-b-[#2c31cf] text-[#2c31cf]"
      : "border-transparent text-[#3b3c54]";

  return (
    <>
      <div className="header-content transition-all duration-300 justify-between flex items-center h-[82px] px-4 bg-white fixed top-0 left-0 right-0 shadow z-50">
        <div className="flex items-center gap-x-[34px] h-full">
          <Link to="/">
            <img
              className="cursor-pointer w-[82px] xs:w-[82px] xs:h-[82px]"
              alt="logo"
              src="../../logoCodeVerse.png"
            />
          </Link>
          <div className="hidden lg:flex h-full gap-8 text-[15px] font-[600]">
            <Link
              to="/course"
              onClick={scrollTop}
              className={`h-full flex items-center transition font-semibold border-b-2 ${checkActive(
                "/course"
              )} hover:text-[#2c31cf] hover:border-b-[#2c31cf]`}
            >
              Courses
            </Link>
            <Link
              to="/practice"
              onClick={scrollTop}
              className={`h-full flex items-center transition font-semibold border-b-2 ${checkActive(
                "/practice"
              )} hover:text-[#2c31cf] hover:border-b-[#2c31cf]`}
            >
              Practice
            </Link>
            <Link
              to="/fights"
              onClick={scrollTop}
              className={`h-full flex items-center transition font-semibold border-b-2 ${checkActive(
                "/fights"
              )} hover:text-[#2c31cf] hover:border-b-[#2c31cf]`}
            >
              Compete
            </Link>
            <Link
              to="/challenges"
              onClick={scrollTop}
              className={`h-full flex items-center transition font-semibold border-b-2 ${checkActive(
                "/challenges"
              )} hover:text-[#2c31cf] hover:border-b-[#2c31cf]`}
            >
              Challenges
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Dropdown
              overlay={userMenu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Avatar
                icon={<UserOutlined />}
                className="cursor-pointer hover:shadow-md transition"
              />
            </Dropdown>
          ) : (
            <div className="flex gap-2">
              <Button
                type="default"
                className="text-[#2c31cf] border-[#2c31cf] hover:bg-[#4d96ff] hover:text-white"
                onClick={() => openModal("login")}
              >
                Login
              </Button>
              <Button
                type="primary"
                className="bg-[#E8505B] text-white hover:bg-[#4d96ff] hover:text-white border-none"
                onClick={() => openModal("register")}
              >
                Register
              </Button>
            </div>
          )}
          <div className="lg:hidden">
            <MenuOutlined className="text-xl text-gray-700" />
          </div>
        </div>
      </div>

      <Modal
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
        className="custom-modal"
        getContainer={false}
        width={400}
      >
        <Tabs activeKey={activeTab} onChange={setActiveTab} centered>
          <TabPane tab="Login" key="login">
            <Form layout="vertical" onFinish={handleLogin}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>

              <div className="flex justify-end mb-3">
                <a href="#" className="text-sm text-[#4d96ff] hover:underline">
                  Forgot password?
                </a>
              </div>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div className="my-4 flex items-center justify-center gap-2 text-gray-400">
              <div className="h-[1px] bg-gray-300 flex-1" />
              or login with
              <div className="h-[1px] bg-gray-300 flex-1" />
            </div>

            <div className="flex justify-center gap-3">
              <Button
                icon={<GoogleOutlined />}
                className="flex items-center gap-2 border hover:border-[#4d96ff]"
              >
                Google
              </Button>
              <Button
                icon={<GithubOutlined />}
                className="flex items-center gap-2 border hover:border-[#4d96ff]"
              >
                GitHub
              </Button>
            </div>
          </TabPane>

          <TabPane tab="Register" key="register">
            <Form layout="vertical" onFinish={handleRegister}>
              <Form.Item
                name="username"
                label="Username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Please input your email!" },
                  {
                    type: "email",
                    message: "The input is not a valid email!",
                  },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: true, message: "Please input your password!" },
                  {
                    pattern:
                      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/,
                    message:
                      "Password must be at least 6 characters and include uppercase, lowercase, and a number",
                  },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                name="confirmPassword"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  { required: true, message: "Please confirm your password!" },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error("Passwords do not match!")
                      );
                    },
                  }),
                ]}
              >
                <Input.Password />
              </Form.Item>

              <Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Register
                </Button>
              </Form.Item>
            </Form>
          </TabPane>
        </Tabs>
      </Modal>
    </>
  );
};

export default Header;

import { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  Dropdown,
  Form,
  Input,
  Menu,
  Modal,
  notification,
  Tabs,
} from "antd";
import { message } from "antd";
import {
  DashboardOutlined,
  GithubOutlined,
  LogoutOutlined,
  MenuOutlined,
  ProfileOutlined,
  SettingOutlined,
  UserOutlined,
} from "@ant-design/icons";
import scrollTop from "../../config/scrollTop";
import { GoogleLogin } from "@react-oauth/google";
import commonApi from "../../common/api";
import axios from "axios";
import Context from "../../config/context/context";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "../../config/store/userSlice";
import ROLE from "../../common/role";

const { TabPane } = Tabs;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const location = useLocation();
  const { fetchUserDetails } = useContext(Context);

  const openModal = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(commonApi.signIn.url, values);

      if (response.data?.result?.authenticated) {
        localStorage.setItem("username", values.username);
        localStorage.setItem("password", values.password);
        localStorage.setItem("token", response.data?.result?.token);
        message.success("Login successful!");
        setIsModalOpen(false);
        fetchUserDetails();
      } else {
        message.error("Login failed, please try again.");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        message.error(`Error ${status}: ${data.message || "Login failed."}`);
      } else {
        message.error("Unable to connect to the server.");
      }
    }
  };

  const handleRegister = async (values) => {
    try {
      const response = await axios.post(commonApi.signUP.url, values);

      if (response.status === 200) {
        notification.success({
          message: "Registration Successful",
          description:
            "Your account has been created successfully. Please check your email to verify your account before logging in.",
          placement: "topRight",
        });
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        const errorMessage =
          data?.message || "Registration failed. Please try again.";

        notification.error({
          message: `Registration Failed (Status ${status})`,
          description: errorMessage,
          placement: "topRight",
        });
      } else {
        notification.error({
          message: "Network Error",
          description: "Cannot connect to the server. Please try again later.",
          placement: "topRight",
        });
      }
    }
  };

  const handleLogout = () => {
    message.success("You have been logged out successfully.");
    localStorage.clear();
    dispatch(setUserDetails(null));
    navigate("/");
  };

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout();
        break;
      case "admin-dashboard":
        scrollTop();
        navigate("/admin-panel");
        break;
      case "my-profile":
        navigate("/user-panel");
        break;
      case "settings":
        navigate("/settings");
        break;
      default:
        break;
    }
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        key="profile"
        disabled
        className="cursor-default hover:!bg-white"
      >
        <div className="flex items-center gap-2 px-2 py-1">
          <Avatar
            icon={user?.avatar ? user?.avatar : <UserOutlined />}
            size="small"
          />
          <div>
            <div className="font-semibold">{user?.username}</div>
            <div className="text-xs text-gray-400">{user?.email}</div>
          </div>
        </div>
      </Menu.Item>

      <Menu.Divider />

      {user?.role === ROLE.ADMIN && (
        <Menu.Item key="admin-dashboard" icon={<DashboardOutlined />}>
          Admin Dashboard
        </Menu.Item>
      )}

      <Menu.Item key="my-profile" icon={<ProfileOutlined />}>
        My Profile
      </Menu.Item>

      <Menu.Item key="settings" icon={<SettingOutlined />}>
        Settings
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="logout" icon={<LogoutOutlined />}>
        <span className="text-red-500">Logout</span>
      </Menu.Item>
    </Menu>
  );

  const checkActive = (path) =>
    location.pathname.startsWith(path)
      ? "border-b-[#2c31cf] text-[#2c31cf]"
      : "border-transparent text-[#3b3c54]";

  const handleGoogleSuccess = async (response) => {
    try {
      // const res = await fetch(commonApi.googleLogin.url, {
      //   method: commonApi.googleLogin.method,
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   credentials: "include",
      //   body: JSON.stringify({ token: response.credential }),
      // });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {}, [user]);
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
              to="/test"
              onClick={scrollTop}
              className={`h-full flex items-center transition font-semibold border-b-2 ${checkActive(
                "/test"
              )} hover:text-[#2c31cf] hover:border-b-[#2c31cf]`}
            >
              DEMO LEARN
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
          {user?.role ? (
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
                name="username"
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

            <div className="my-6">
              <div className="flex items-center text-gray-400 text-sm mb-4">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="mx-3 whitespace-nowrap">or login with</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              <div className="flex justify-center gap-4 flex-wrap">
                <div className="w-fit flex justify-center">
                  <GoogleLogin onSuccess={handleGoogleSuccess} />
                </div>

                <Button
                  icon={<GithubOutlined />}
                  className="flex items-center justify-center gap-2 border hover:border-[#4d96ff] min-w-[150px]"
                >
                  GitHub
                </Button>
              </div>
            </div>
          </TabPane>

          <TabPane tab="Register" key="register">
            <Form layout="vertical" onFinish={handleRegister}>
              <Form.Item
                name="username"
                label="Name"
                rules={[{ required: true, message: "Please input your name!" }]}
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

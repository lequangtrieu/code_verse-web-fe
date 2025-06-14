import {useContext, useEffect, useState} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {Avatar, Badge, Button, Dropdown, Form, Input, Menu, message, Modal, notification, Popover, Tabs,} from "antd";
import {
  DashboardOutlined,
  GithubOutlined,
  LogoutOutlined,
  MenuOutlined,
  ProfileOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  UserOutlined,
} from "@ant-design/icons";
import scrollTop from "../../config/scrollTop";
import {GoogleLogin} from "@react-oauth/google";
import commonApi from "../../common/api";
import axios from "axios";
import Context from "../../config/context/context";
import {useDispatch, useSelector} from "react-redux";
import {logoutUser} from "../../config/store/userSlice";
import ROLE from "../../common/role";
import setAuthInfo from "../../config/setAuthInfo";
import {formatCurrency, getDiscountedPrice} from "../../common/helper";

const { TabPane } = Tabs;

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const location = useLocation();
  const { fetchUserDetails, cartDetailCount, cartItems } = useContext(Context);

  const openModal = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };
  const handleCartClick = () => {
    scrollTop();
    navigate("/cart");
  };

  const handleLogin = async (values) => {
    dispatch(logoutUser());

    try {
      const response = await axios.post(commonApi.signIn.url, values);

      if (response.data?.result?.authenticated) {
        setAuthInfo({
          username: values.username,
          token: response.data.result.token,
          refreshToken: response.data.result.refreshToken,
        });

        notification.success({
          message: "Login Successful",
          description: `Welcome back, ${values.username}!`,
          placement: "topLeft",
          duration: 4,
        });

        setIsModalOpen(false);
        await fetchUserDetails();
      } else {
        notification.error({
          message: "Login Failed",
          description: "Authentication unsuccessful. Please try again.",
          placement: "topLeft",
          duration: 4,
        });
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;

        notification.error({
          message: `Login Error.`,
          description: data.message || "Login failed. Please try again.",
          placement: "topLeft",
          duration: 5,
        });
      } else {
        notification.error({
          message: "Network Error",
          description:
            "Unable to connect to the server. Please check your connection.",
          placement: "topLeft",
          duration: 5,
        });
      }
    }
  };

  const handleGoogleSuccess = async (response) => {
    dispatch(logoutUser());
    const token = response.credential;

    try {
      const res = await axios.post(commonApi.googleLogin.url, {
        username: token,
      });

      if (res.data?.result?.authenticated) {
        setAuthInfo({
          username: res.data.result.username,
          token: res.data.result.token,
          refreshToken: res.data.result.refreshToken,
        });

        notification.success({
          message: "Login Successful",
          description: `Welcome back, ${res.data.result.username}!`,
          placement: "topLeft",
          duration: 4,
        });

        setIsModalOpen(false);
        await fetchUserDetails();
      } else {
        notification.error({
          message: "Google Login Failed",
          description: "Authentication unsuccessful. Please try again.",
          placement: "topLeft",
          duration: 4,
        });
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;
        notification.error({
          message: `Login Failed`,
          description: data.message || "Google login failed. Please try again.",
          placement: "topLeft",
          duration: 5,
        });
      } else {
        notification.error({
          message: "Network Error",
          description:
            "Unable to connect to the server. Please check your network.",
          placement: "topLeft",
          duration: 5,
        });
      }
    }
  };

  const handleForgotPassword = async (values) => {
    try {
      await axios.post(commonApi.resetPassword.url, {
        username: values.username,
      });

      setTimeout(() => {
        notification.success({
          message: "Email Sent",
          description: "Check your inbox for password reset instructions.",
          placement: "topLeft",
        });
        setIsForgotModalOpen(false);
        setIsModalOpen(false);
      }, 1000);
    } catch (error) {
      notification.error({
        message: "Error",
        description:
          error?.response?.data?.message ||
          "Failed to send reset link. Please try again.",
        placement: "topLeft",
      });
    }
  };

  const handleLogout = () => {
    notification.success({
      message: "Logout system",
      description: "You have been logged out successfully.",
      placement: "topLeft",
    });
    dispatch(logoutUser());
    navigate("/");
  };

  const handleMenuClick = ({ key }) => {
    switch (key) {
      case "logout":
        handleLogout();
        break;
      case "dashboard":
        scrollTop();

        if (user?.role === ROLE.ADMIN) {
          navigate("/admin-panel");
        } else if (user?.role === ROLE.LEARNER) {
          navigate("/user-panel");
        } else if (user?.role === ROLE.INSTRUCTOR){
          navigate("/instructor-panel")
        }
        break;
      case "my-profile":
        if (user?.role === ROLE.ADMIN) {
          navigate("/admin-panel/profile");
        } else if (user?.role === ROLE.LEARNER) {
          navigate("/user-panel/profile");
        }
        break;
      case "settings":
        if (user?.role === ROLE.ADMIN) {
          navigate("/admin-panel");
        } else if (user?.role === ROLE.LEARNER) {
          navigate("/user-panel/settings");
        }
        break;
      default:
        break;
    }
  };

  const handleCourseClick = (id) => {
    scrollTop();
    navigate(`/course/${id}`);
  };

  const cartContent = (
    <div style={{ width: 300 }}>
      {cartItems.length > 0 ? (
        <>
          {cartItems.map((item) => {
            const finalPrice = getDiscountedPrice(item.price, item.discount);
            return (
              <div key={item.key} className="flex gap-3 py-2 border-b">
                <img
                  onClick={() => handleCourseClick(item.idCourse)}
                  src={item.image}
                  alt={item.product}
                  className="w-12 h-12 rounded cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-md"
                />
                <div className="flex-1">
                  <div className="font-semibold">{item.product}</div>
                  <div className="text-sm text-gray-500">
                    <span className="text-indigo-600 font-medium">
                      {formatCurrency(finalPrice)}
                    </span>
                    {item.discount > 0 && (
                      <span className="line-through text-gray-400 ml-2">
                        {formatCurrency(item.price)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
          <div className="flex justify-between mt-2 font-semibold">
            <span>Total:</span>
            <span>
              {formatCurrency(
                cartItems.reduce(
                  (acc, item) =>
                    acc + getDiscountedPrice(item.price, item.discount),
                  0
                )
              )}
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-20">
          <img
            src="../../logoCodeVerse.png"
            alt="Empty Cart"
            className="w-32 h-32 mb-6"
          />
          <h2 className="text-gray-500 text-lg">Your cart is empty</h2>
        </div>
      )}
    </div>
  );

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item
        key="profile"
        disabled
        className="cursor-default hover:!bg-white"
      >
        <div className="flex items-center gap-2 px-2 py-1">
          <Avatar
            src={user?.avatar}
            icon={!user?.avatar && <UserOutlined />}
            size="small"
          />
          <div>
            <div className="font-semibold">{user?.name}</div>
            <div className="text-xs text-gray-400">{user?.username}</div>
          </div>
        </div>
      </Menu.Item>

      <Menu.Divider />

      <Menu.Item key="dashboard" icon={<DashboardOutlined />}>
        {user?.role === ROLE.ADMIN ? "Admin Dashboard" : user?.role === ROLE.LEARNER ? "Student Dashboard" : "Instructor Dashboard"}
      </Menu.Item>

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

  useEffect(() => {}, [user]);
  return (
    <>
      <div style={{zIndex: 1031}} className="header-content transition-all duration-300 justify-between flex items-center h-[82px] px-4 bg-white fixed top-0 left-0 right-0 shadow">
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

            <Link
              to="/ranking"
              onClick={scrollTop}
              className={`h-full flex items-center transition font-semibold border-b-2 ${checkActive(
                "/ranking"
              )} hover:text-[#2c31cf] hover:border-b-[#2c31cf]`}
            >
              Ranking
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user?.role ? (
            <Popover
              content={cartContent}
              trigger="hover"
              placement="bottomRight"
            >
              <Button
                className="text-gray-700 border-full hover:bg-[#4d96ff] hover:text-white relative"
                style={{ fontSize: "18px", verticalAlign: "middle" }}
                onClick={handleCartClick}
              >
                <ShoppingCartOutlined />
                <Badge
                  count={cartDetailCount || 0}
                  style={{
                    position: "absolute",
                    top: -25,
                    right: -16,
                    backgroundColor: "#E8505B",
                  }}
                />
              </Button>
            </Popover>
          ) : (
            ""
          )}

          {user?.role ? (
            <Dropdown
              overlay={userMenu}
              placement="bottomRight"
              trigger={["click"]}
            >
              <Avatar
                src={user?.avatar}
                icon={!user?.avatar && <UserOutlined />}
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
              <Link to="register">
                <Button
                    type="primary"
                    className="bg-[#E8505B] text-white hover:bg-[#4d96ff] hover:text-white border-none"
                >
                  Register
                </Button>
              </Link>
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
                label="User name"
                rules={[
                  { required: true, message: "Please input your username!" },
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
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>

              <div className="flex justify-end mb-3">
                <span
                  onClick={() => setIsForgotModalOpen(true)}
                  className="text-sm text-[#4d96ff] hover:underline cursor-pointer"
                >
                  Forgot password?
                </span>
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
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                      message.error("Google Login Failed");
                    }}
                  />
                </div>
              </div>
            </div>
          </TabPane>
        </Tabs>
      </Modal>

      <Modal
        open={isForgotModalOpen}
        onCancel={() => setIsForgotModalOpen(false)}
        footer={null}
        centered
        getContainer={false}
        className="custom-modal"
        title="Reset your password"
      >
        <Form layout="vertical" onFinish={handleForgotPassword}>
          <Form.Item
            name="username"
            label="User Name"
            rules={[
              { required: true, message: "Please input your username!" },
              { type: "email", message: "The input is not a valid email!" },
            ]}
          >
            <Input placeholder="Enter your username" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Send reset link
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Header;

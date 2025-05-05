import { Button, Carousel, Avatar, Form, Input, Modal, notification, Tabs } from "antd";
import { Link } from "react-router-dom";
import {
  FaPuzzlePiece,
  FaUsers,
  FaChalkboardTeacher,
  FaRocket,
  FaQuoteLeft,
} from "react-icons/fa";
import { useContext, useState } from "react";


import { message } from "antd";
import {
  GithubOutlined,
} from "@ant-design/icons";
import { GoogleLogin } from "@react-oauth/google";
import commonApi from "../../common/api";
import axios from "axios";
import Context from "../../config/context/context";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../config/store/userSlice";
import setAuthInfo from "../../config/setAuthInfo";
import FeatureSection from '../layout/FeaturesSection';

const { TabPane } = Tabs;

const reviews = [
  {
    name: "Alex, 14 years old",
    comment:
      "CodeVerse made coding exciting and easy to understand. I've built my first app at 14!",
    avatar: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
  },
  {
    name: "Sara, 13 years old",
    comment:
      "I love the challenges! They help me think critically and improve every day.",
    avatar: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
  },
  {
    name: "Minh, 15 tuổi",
    comment: "Bài giảng rất dễ hiểu, mình cảm thấy tự tin hơn khi lập trình!",
    avatar: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
  },
  {
    name: "Linh, 12 tuổi",
    comment:
      "Giao diện đẹp, dễ sử dụng và nội dung rất phù hợp cho người mới học.",
    avatar: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
  },
  {
    name: "David, 16 years old",
    comment: "Learning to code has never been this fun. CodeVerse rocks!",
    avatar: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
  },
];

const Home = () => {
  const dispatch = useDispatch();
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const user = useSelector((state) => state?.user?.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { fetchUserDetails } = useContext(Context);

  const openModal = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
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

  const handleRegister = async (values) => {
    dispatch(logoutUser());
    try {
      const response = await axios.post(commonApi.signUP.url, values);

      if (response.status === 200) {
        setTimeout(() => {
          notification.success({
            message: "Registration Successful",
            description:
              "Your account has been created successfully. Please check your email to verify your account before logging in.",
            placement: "topLeft",
          });
        }, 1000);
      }
    } catch (error) {
      if (error.response) {
        const { data } = error.response;

        const errorMessage =
          data?.message || "Registration failed. Please try again.";

        notification.error({
          message: `Registration Failed.`,
          description: errorMessage,
          placement: "topLeft",
        });
      } else {
        notification.error({
          message: "Network Error",
          description: "Cannot connect to the server. Please try again later.",
          placement: "topLeft",
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
  return (
    <div className="bg-white text-[#3b3c54]">
      <section className="flex items-center justify-center bg-[#0D2C53] text-white px-32">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full p-8">
          {/* Left side */}
          <div className="flex flex-col justify-center space-y-6">
            <h1 className="text-4xl font-bold leading-snug">
              Dedicated online programming learning platform
              <span className="text-[#2BE4AC]"> for students</span>
            </h1>
            <div className="space-y-3">
              {[
                "Learn programming from 0",
                "Ignite a passion for technology",
                "Conquer the digital world, assert yourself",
                "Open up attractive job opportunities in the future",
              ].map((text, idx) => (
                <div key={idx} className="bg-[#0C2A4D] p-4 rounded-md flex items-center">
                  <span className="text-lg font-medium">+ {text}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <p className="text-sm">Our partners</p>
              <div className="flex gap-6 mt-2 items-center">
                <img src="/logo192.png" alt="FPT" className="h-6" />
                <img src="/logo192.png" alt="FPT Polytechnic" className="h-6" />
                <img src="/logo192.png" alt="MOET" className="h-6" />
                <img src="/logo192.png" alt="FUNiX" className="h-6" />
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="mt-10 md:mt-0 md:ml-10 bg-white text-black rounded-xl p-8 shadow-lg relative">
            <h2 className="text-lg font-semibold mb-4">
              Learn to code with millions of people with CodeVerse
            </h2>
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

            <div className="mt-4 text-center text-sm">Or continue with</div>
            <div className="flex justify-center gap-4 flex-wrap">
              <div className="w-fit flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => {
                    message.error("Google Login Failed");
                  }}
                />
              </div>

              <Button
                icon={<GithubOutlined />}
                className="flex items-center justify-center gap-2 border hover:border-[#4d96ff] min-w-[150px]"
              >
                GitHub
              </Button>
            </div>

            <div className="mt-4 text-sm text-center">
              If you do not already have an account, please
              <a onClick={() => openModal("register")} className="text-blue-600 font-medium ml-1">Sign up</a>
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
                  name="name"
                  label="Name"
                  rules={[{ required: true, message: "Please input your name!" }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="username"
                  label="User Name"
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

      </section>

      <section className="py-20 px-4 bg-[#fffdf5]">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold">
            Why CodeVerse is the #1 Coding Platform for Students?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-xl shadow hover:shadow-lg">
            <FaChalkboardTeacher className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Expert Curriculum</h3>
            <p>Lessons designed by top developers and educators.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg">
            <FaPuzzlePiece className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Fun Challenges</h3>
            <p>Learn by doing with real problems and quizzes.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg">
            <FaRocket className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Fast Progress</h3>
            <p>Track your journey and unlock achievements.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg">
            <FaUsers className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Peer Community</h3>
            <p>Share ideas, projects, and inspiration with others.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fa] py-20 text-center">
        <Carousel autoplay className="max-w-6xl mx-auto mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-6">Welcome to CodeVerse</h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              The ultimate platform to learn, practice and compete in
              programming. Your journey starts here.
            </p>
            <img
              src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
              alt="Hero"
              className="mx-auto rounded-xl mt-4 w-full max-h-96 object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-6">
              Master Coding with Real Projects
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
              Build real-world skills through hands-on challenges and expert-led
              lessons.
            </p>
            <img
              src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
              alt="Hero"
              className="mx-auto rounded-xl mt-4 w-full max-h-96 object-cover"
            />
          </div>
        </Carousel>

        <div className="flex justify-center gap-4">
          <Link to="/courses">
            <Button
              type="primary"
              size="large"
              className="bg-[#4d96ff] hover:bg-[#2c31cf]"
            >
              Start Learning
            </Button>
          </Link>
          <Link to="/fights">
            <Button
              size="large"
              className="border-[#4d96ff] text-[#4d96ff] hover:border-[#2c31cf] hover:text-[#2c31cf]"
            >
              Join a Contest
            </Button>
          </Link>
        </div>
      </section>
      <section>
        <div className="flex flex-col bg-[#19395E] text-white py-16 px-32">
          <h2 className="text-4xl font-semibold mb-4">Why is CodeVerse</h2>
          <h3 className="text-6xl font-semibold text-[#34E8C5] mb-4">THE NUMBER 1 PROGRAMMING LEARNING PLATFORM</h3>
          <h2 className="text-4xl font-semibold mb-4">for students?</h2>
        </div>

        <FeatureSection
          title="Why is CodeVerse"
          subtitle="THE NUMBER 1 PROGRAMMING LEARNING PLATFORM"
          content="The lecture system closely follows the international programming program..."
          buttonText="Start learning"
          image="/imgPlaceholderCousre.png"
          reverse={false}
        />
        <FeatureSection
          title="Interactive Learning"
          subtitle="LEARN BY DOING"
          content="Students write code, solve problems and get immediate feedback..."
          buttonText="Explore Courses"
          image="/banerDemo.png"
          reverse={true}
        />
        <FeatureSection
          title="Track Your Progress"
          subtitle="MEASURE GROWTH"
          content="Built-in scoring and analysis help students and teachers assess progress."
          buttonText="Start Tracking"
          image="/imgPlaceholderCousre.png"
          reverse={false}
        />
      </section>


      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
            alt="Kids Coding"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Why Kids Should Learn Programming Early?
            </h2>
            <p className="text-lg mb-4">
              Programming builds problem-solving, logical thinking, and
              creativity from an early age. It fosters confidence and prepares
              kids for a tech-driven future.
            </p>
            <p className="text-lg">
              Children who learn to code early often excel in math, science, and
              digital communication — making them future-ready and empowered.
            </p>
          </div>
        </div>
      </section>



      <section className="bg-[#f5f7fa] py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">CodeVerse in Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="text-4xl font-bold text-[#4d96ff]">120,000+</h3>
              <p className="text-lg mt-2">Students</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[#4d96ff]">30+</h3>
              <p className="text-lg mt-2">Countries</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[#4d96ff]">4.9/5</h3>
              <p className="text-lg mt-2">Average Rating</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">What Students Say</h2>
          <Carousel
            autoplay
            dots
            slidesToShow={3}
            slidesToScroll={1}
            className="mx-auto"
          >
            {reviews.map((review, idx) => (
              <div key={idx} className="px-4">
                <div className="p-6 rounded-lg shadow flex flex-col items-center text-center h-full bg-white">
                  <FaQuoteLeft className="text-2xl text-[#4d96ff] mb-4" />
                  <p className="italic mb-4">"{review.comment}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <Avatar src={review.avatar} size={48} />
                    <p className="font-semibold">{review.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>

      <section className="bg-[#111827] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Begin Your Coding Adventure?
          </h2>
          <p className="text-lg mb-8">
            Start learning, building, and competing today. Unlock your potential
            with CodeVerse.
          </p>
          <Link to="/register">
            <Button
              type="primary"
              size="large"
              className="bg-[#4d96ff] hover:bg-[#2c31cf]"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-[#f5f7fa] py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="text-left max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-bold">What is CodeVerse?</h3>
              <p>
                CodeVerse is an online learning platform where students can
                learn programming through interactive lessons, real projects,
                and coding contests.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Who can join CodeVerse?</h3>
              <p>
                Anyone with a passion for coding! Whether you're a beginner or
                an advanced learner, CodeVerse has something for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Is there a free trial?</h3>
              <p>
                Yes! CodeVerse offers a free trial with access to select courses
                and features to help you get started.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div >
  );
};

export default Home;

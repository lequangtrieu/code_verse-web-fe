import { Button, Carousel, Avatar, Form, Input, Modal, notification, Tabs } from "antd";
import { FaArrowRight } from "react-icons/fa";
import { useContext, useState } from "react";
import {
  FaQuoteLeft,
} from "react-icons/fa";

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
import FeatureSection from './Molecule/FeaturesSection';
import WhyCard from './Molecule/WhyCard';
import CounterCard from '../layout/Molecule/CounterCard';
import Marquee from "react-fast-marquee";
import ScrollFadeIn from "../layout/Molecule/ScrollFadeIn";
import {Link} from "react-router-dom";
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

const itemsWhy = [
  {
    image: '/landing-page/box-reason-main-1.png',
    title: 'Develop logical thinking & problem-solving skills',
    description:
      'Programming helps students practice logical thinking and problem-solving skills systematically and creatively.',
  },
  {
    image: '/landing-page/box-reason-main-2.png',
    title: 'Participate in a large-scale programming competition',
    description:
      'CodeVerse organizes programming competitions that gather hundreds of domestic and foreign teams. Students have the opportunity to compete and gain experience after each competition.',
  },
  {
    image: '/landing-page/box-reason-main-3.png',
    title: 'Attractive job opportunities in the future',
    description:
      'Accessing the language of the 4.0 era helps students open up job opportunities with attractive salaries in the future.',
  },
];

const features = ['LEARNING', 'TRAINING', 'FIGHTS', 'EVALUATING', 'DISCUSSION', 'LEADERS'];

const stats = [
  { end: 1000000, suffix: '+', label: 'Students' },
  { end: 200000, suffix: '+', label: 'Certificate awarded' },
  { end: 300, suffix: '+', label: 'Programming contest' },
  { end: 25, suffix: '+', label: 'Country of use' },
];

const images = [
  '/landing-page/box-event-image-item-1.png',
  '/landing-page/box-event-image-item-2.png',
  '/landing-page/box-event-image-item-3.png',
  '/landing-page/box-event-image-item-4.png',
  '/landing-page/box-event-image-item-5.png',
];

const Home = () => {
  const dispatch = useDispatch();
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("login");
  const { fetchUserDetails } = useContext(Context);
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
    <div className="bg-white text-[#3b3c54] justify-items-center font-semibold">
      {/* section form login */}
      <section className="w-full flex items-center justify-center bg-[#0D2C53] text-white">
        <div className="flex flex-col md:flex-row p-8 md:gap-8 max-w-7xl">
          {/* Left side */}
          <ScrollFadeIn className="flex flex-col justify-center space-y-6">
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
              <p className="text-lg">Our partners</p>
              <div className="flex gap-6 mt-2 items-center">
                <img src="/logo192.png" alt="FPT" className="w-auto h-10 md:h-[50px]" />
                <img src="/logo192.png" alt="FPT Polytechnic" className="w-auto h-10 md:h-[50px]" />
                <img src="/logo192.png" alt="MOET" className="w-auto h-10 md:h-[50px]" />
                <img src="/logo192.png" alt="FUNiX" className="w-auto h-10 md:h-[50px]" />
              </div>
            </div>
          </ScrollFadeIn>
          {/* Right side */}
          <ScrollFadeIn >
            <div className="relative flex justify-center items-center md:min-w-[470px]">
              <div className="block absolute md:w-[400px] md:h-[550px] w-[500px] h-[500px] mt-10 md:mt-0 bg-blue-500 rotate-[8deg] rounded-3xl shadow-2xl"></div>
              <div className="mt-10 md:mt-0  bg-white text-black rounded-xl p-8 shadow-lg relative md:w-[388px] font-semibold">
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

                <div className="mt-4 mb-4 text-center text-sm">Or continue with</div>
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
                    className="flex items-center justify-center gap-2 border hover:border-[#4d96ff] min-w-[150px] h-[40px]"
                  >
                    GitHub
                  </Button>
                </div>

                <div className="mt-4 text-sm text-center">
                  If you do not already have an account, please
                  <Link to="/register">
                    <div className="text-blue-600 font-medium ml-1">Sign up</div>
                  </Link>
                </div>
              </div>
            </div>
          </ScrollFadeIn>
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
                    className="flex items-center justify-center gap-2 border hover:border-[#4d96ff] min-w-[150px] h-[40px]"
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

      {/* section why learn */}
      <section className="py-20 max-w-7xl justify-items-center p-8">
        <ScrollFadeIn>
          <h2 className="text-center w-full max-w-[550px] m-auto text-5xl leading-20 gmd:text-[48px] gmd:leading-[60px] font-semibold text-[#0E2643] mb-8 sm:mb-[32px]">
            Why should students learn programming early?
          </h2>
        </ScrollFadeIn>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mx-auto ">
          {itemsWhy.map((item, index) => (
            <WhyCard key={index} {...item} />
          ))}
        </div>
      </section>

      {/* section show special function of web */}
      <section className="py-20 justify-items-center bg-[#0D2C53] text-white w-full">
        <div className="flex flex-col text-white max-w-7xl p-8">
          <ScrollFadeIn>
            <h2 className="text-4xl font-semibold mb-4">Why is CodeVerse</h2>
            <h3 className="text-6xl font-semibold text-[#34E8C5] mb-4">THE NUMBER 1 PROGRAMMING LEARNING PLATFORM</h3>
            <h2 className="text-4xl font-semibold mb-4">for students?</h2>
          </ScrollFadeIn>

        </div>

        <FeatureSection
          title="The lecture system closely follows the international programming program"
          content="Variety of programming courses: Python, Java Script, C++, SQL,...
Students are coded and scored directly on the web, accurately assessing their current abilities."
          buttonText="Start learning"
          image="/landing-page/box-top-reason-main-1.png"
          reverse={false}
        />
        <FeatureSection
          title="Highly qualified faculty"
          content="Leading IT engineers of FPT Corporation & Lecturers with many years of experience compiling curriculum, ensuring knowledge is conveyed accurately and attractively to learners."
          buttonText="Explore Courses"
          image="/landing-page/box-top-reason-main-2.png"
          listContent={[
            "The way of conveying knowledge is close and easy to understand.",
            "Practice exercises at many levels from easy to difficult.",
            "Regular live streams to answer students' questions."
          ]}
          reverse={true}
        />
        <FeatureSection
          title="Organize many large-scale programming competitions."
          content="CodeVerse is a leader in organizing programming competitions for diverse ages, helping students have the opportunity to compete and accumulate experience, and supporting their learning to achieve high results."
          buttonText="Start Tracking"
          image="/landing-page/box-top-reason-main-3.png"
          reverse={false}
        />
      </section>

      {/* section show feature */}
      <section className="bg-[#EDF0FD] text-white w-full relative overflow-hidden justify-items-center">
        {/* Nền chéo */}
        <div className="w-full h-[-webkit-fill-available] bg-[linear-gradient(169deg,_#0D2C53_50%,_#EDF0FD_50%)] absolute top-0 left-0 z-0" />

        {/* Nội dung nằm trên nền */}
        <div className="relative w-full max-w-7xl py-20 p-8">
          <ScrollFadeIn>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Platform with <span className="text-[#3BE0C2]">diverse features</span>
            </h2>
            <p className="max-w-[525px] text-base md:text-lg opacity-90">
              Programming is a complex language, CodeVerse focuses on <br />
              "learning by doing" to help students develop comprehensive formulas and skills.
            </p>
          </ScrollFadeIn>

          <div className="mt-12 grid grid-cols-3 md:grid-cols-6 gap-4" onMouseLeave={() => setHoveredIndex(null)}>
            {features.map((feature, index) => (
              <div
                key={index}
                onMouseEnter={() => setHoveredIndex(index)}
                className={`
        bg-white text-black py-4 rounded-lg shadow-md border-b-4 border-[#506CF0]
        h-[100px] text-center content-center
        transition-transform duration-300 ease-in-out
        ${hoveredIndex === index ? 'scale-110 z-10 bg-[#506CF0]' : hoveredIndex !== null ? 'scale-90' : ''}
      `}
              >
                {feature}
              </div>
            ))}
          </div>


        </div>
      </section>

      {/* section show report sys */}
      <section className="bg-[#EDF0FD] py-20  w-full justify-items-center">
        <div className="max-w-7xl px-8 flex flex-col w-full">
          <div className="flex flex-wrap gap-10 mb-6 ">
            {/* Left */}
            <div className="w-full max-w-[620px] flex-1">
              <ScrollFadeIn>
                <h2 className="text-4xl md:text-5xl text-[#506CF0] mb-6">
                  Number of students <br /> worldwide
                </h2>
                <p className="text-base text-black mb-8 max-w-[600px]">
                  CodeVerse, with its multi-featured online learning platform, has attracted more than 600.000 students
                  worldwide, nearly 200.000 certificates have been awarded, and this number is increasing daily, affirming the
                  value that our learning program brings.
                </p>
              </ScrollFadeIn>
            </div>

            {/* Right */}
            <div className="w-full max-w-[550px] grid grid-cols-2 gap-8">
              {stats.map((item, index) => (
                <CounterCard key={index} {...item} />
              ))}
            </div>
          </div>
          <Button type="primary" icon={<FaArrowRight />} size="large" iconPosition="end" className="bg-[#506CF0] hover:bg-blue-600 font-semibold max-w-[200px]">
            Start learning
          </Button>
        </div>
      </section>

      {/* section show feature final */}
      <section className="items-center">
        <div className={`max-w-7xl p-8 flex flex-col md:flex-row items-center gap-20`}>
          <ScrollFadeIn className="md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">A grand & exciting event</h2>
            <p className="mb-6">CodeVerse is the organizer of many national and international programming competitions, aiming to create a useful playground for those who are passionate about technology.</p>
            <p className="mb-6">In particular, we cooperate with FPT Technology Group to organize the Codewar contest periodically, hoping to find and honor outstanding young programmers. The contest is held nationwide, with a grand prize of up to 1 billion VND.</p>
          </ScrollFadeIn>
          <ScrollFadeIn className="md:w-1/2">
            <img src="/landing-page/box-event-main.png" alt="Feature" className="rounded-lg w-full" />
          </ScrollFadeIn>
        </div>
      </section>

      {/* section show list image */}
      <section>
        <Marquee pauseOnHover speed={50}>
          {images.map((src, index) => (
            <img
              key={index}
              src={src}
              className="aspect-[8/10] h-[280px] sm:h-[400px]"
              alt={`event-image-${index}`}
            />
          ))}
        </Marquee>
      </section>

      {/* section show reviews */}
      <section className="py-20 bg-[#EDF0FD] w-full">
        <div className="max-w-7xl mx-auto text-center px-8">
          <ScrollFadeIn>
            <h2 className="text-3xl font-semibold mb-12">What students say about us</h2>
          </ScrollFadeIn>
          <Carousel autoplay dots className="w-full">
            {/* Chia reviews thành nhóm 1 slide = 3 reviews */}
            {Array.from({ length: Math.ceil(reviews.length / 3) }, (_, i) => (
              <div key={i}>
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  {reviews.slice(i * 3, i * 3 + 3).map((review, idx) => (
                    <div key={idx} className="flex-1 min-w-0">
                      <div className="p-6 h-full bg-white shadow rounded-lg flex flex-col text-center">
                        <FaQuoteLeft className="text-xl text-[#4d96ff] mb-4" />
                        <p className="italic mb-4">"{review.comment}"</p>
                        <div className="flex items-center justify-center gap-3 mt-auto">
                          <Avatar src={review.avatar} size={48} />
                          <p className="font-semibold">{review.name}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
    </div >
  );
};

export default Home;

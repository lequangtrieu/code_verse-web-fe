import React from "react";
import { Carousel } from "antd";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { FaBookOpen } from "react-icons/fa";
import { GiPlanetCore } from "react-icons/gi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiSendPlaneLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

const carouselItems = [
    {
        title: "Welcome to CodeVerse",
        subtitle: "Your Learning Journey Starts Here",
        description:
            "Discover a world of programming knowledge with our comprehensive courses. Whether you're a beginner or an experienced developer, we have the perfect learning path for you.",
        image: "boy.png",
        buttonText: "Explore Courses",
        buttonLink: "/course",
    },
    {
        title: "Learn from Industry Experts",
        subtitle: "Hands-on Learning Experience",
        description:
            "Our courses are designed and taught by industry professionals. Get practical, real-world experience through our project-based learning approach.",
        image: "robot.png",
        buttonText: "View Instructors",
        buttonLink: "/course",
    },
    {
        title: "Join Our Community",
        subtitle: "Connect with Fellow Learners",
        description:
            "Become part of our growing community of developers. Share knowledge, collaborate on projects, and grow together in your coding journey.",
        image: "robot.png",
        buttonText: "Join Community",
        buttonLink: "/course",
    },
];

const CourseCarousel = () => {
    const navigate = useNavigate();

    const onChange = (currentSlide) => {
        // Optional: Handle slide changes
    };

    return (
        <section className="slider_section relative">
            {/* Floating icons */}
            <FaBookOpen className="absolute bottom-4 left-20 text-pink-300 text-8xl opacity-30 rotate-[-10deg] animate-float-slow" />
            <GiPlanetCore className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300 text-[150px] opacity-10 animate-spin-slow" />
            <HiOutlineLightBulb className="absolute top-6 right-40 text-yellow-300 text-7xl opacity-20 animate-pulse" />
            <RiSendPlaneLine className="absolute bottom-10 right-10 text-blue-300 text-7xl opacity-20 rotate-12 animate-fly-slow" />

            <div className="slider_container">
                <Carousel
                    autoplay={{ dotDuration: true }}
                    autoplaySpeed={5000}
                    effect="fade"
                    arrows
                    prevArrow={<LeftOutlined />}
                    nextArrow={<RightOutlined />}
                    afterChange={onChange}
                    className="custom-carousel"
                >
                    {carouselItems.map((item, index) => (
                        <div key={index} className="carousel-item">
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-7">
                                        <div className="detail-box">
                                            <h1>
                                                {item.title}
                                                <br />
                                                <span className="text-2xl font-normal">
                          {item.subtitle}
                        </span>
                                            </h1>
                                            <p className="text-gray-600">{item.description}</p>
                                            <a
                                                href={item.buttonLink}
                                                className="mt-4 inline-block"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    navigate(item.buttonLink);
                                                }}
                                            >
                                                {item.buttonText}
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-md-5">
                                        <div className="img-box">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-auto rounded-lg shadow-lg"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </section>
    );
};

export default CourseCarousel;

import {FaBookOpen,} from "react-icons/fa";
import {Collapse, message, Skeleton, Tabs} from "antd";
import {HiOutlineLightBulb} from "react-icons/hi";
import {RiSendPlaneLine} from "react-icons/ri";
import {GiPlanetCore} from "react-icons/gi";
import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import commonApi from "../../../../common/api";
import {useParams} from "react-router-dom";
import CourseDetailInfo from "./CourseDetailInfo";
import CurriculumTabs from "./CurriculumTabs";
import AuthorCourses from "./AuthorCourses";
import CoursePurchaseInfo from "./CoursePurchaseInfo";
import PopularCourses from "./PopularCourses";
import {useSelector} from "react-redux";
import Context from "../../../../config/context/context";
import useAddToCart from "../../../../hooks/useAddToCart";

const {Panel} = Collapse;

const {TabPane} = Tabs;

const CourseDetail = () => {
    const [initialLoading, setInitialLoading] = useState(true);
    const {courseId} = useParams();
    const [courseDetail, setCourseDetail] = useState(null);
    const user = useSelector((state) => state?.user?.user);
    const [cartCourseIds, setCartCourseIds] = useState([]);
    const { fetchCartDetail, fetchCartItems } = useContext(Context);

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 450);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(commonApi.courseDetail.url(courseId));
                setCourseDetail(response.data.result);
            } catch (error) {
                message.error("Failed to fetch course detail");
            } finally {
                setInitialLoading(false);
            }
        };

        fetchData();
    }, [courseId]);

    const { handleAddToCart } = useAddToCart({
        user,
        cartCourseIds,
        setCartCourseIds,
        fetchCartDetail,
        fetchCartItems,
    });

    const curriculumData = [
        {
            title: "Intro Course content",
            duration: "02hr 35min",
            items: ["Lesson 01", "Lesson 02"],
        },
        {
            title: "Course Conclusion",
            duration: "02hr 10min",
            items: [
                {
                    type: "video",
                    title: "Lorem ipsum dolor sit amet",
                    duration: "26 min",
                },
                {type: "quiz", title: "Lesson 03 Exam", questionCount: 20},
            ],
        },
        {
            title: "Course Fundamentals",
            duration: "01hr 35min",
            items: ["Lesson 01", "Lesson 02"],
        },
    ];

    const popularCourses = [
        {
            img: "/images/popular-1.jpg",
            title: "Making Music with Other People",
            price: "$32.00",
        },
        {
            img: "/images/popular-2.jpg",
            title: "Making Music with Other People",
            price: "$32.00",
        },
        {
            img: "/images/popular-3.jpg",
            title: "Making Music with Other People",
            price: "$32.00",
        },
    ];

    const authorCourses = [
        {
            title: "Introduction to Programming",
            image: "https://via.placeholder.com/200x150",
            price: "$20.00",
        },
        {
            title: "Advanced JavaScript",
            image: "https://via.placeholder.com/200x150",
            price: "$30.00",
        },
        {
            title: "React for Beginners",
            image: "https://via.placeholder.com/200x150",
            price: "$25.00",
        },
        {
            title: "Node.js and Express",
            image: "https://via.placeholder.com/200x150",
            price: "$35.00",
        },
    ];

    return (
        <>
            {initialLoading ? (
                <Skeleton active paragraph={{rows: 10}}/>
            ) : courseDetail ? (
                <>
                    <section
                        className="relative bg-gradient-to-br from-[#eef2f7] to-[#fefefe] py-40 overflow-hidden shadow-inner">
                        <FaBookOpen
                            className="absolute bottom-4 left-20 text-pink-300 text-8xl opacity-30 rotate-[-10deg] animate-float-slow"/>
                        <GiPlanetCore
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300 text-[150px] opacity-10 animate-spin-slow"/>
                        <HiOutlineLightBulb
                            className="absolute top-6 right-40 text-yellow-300 text-7xl opacity-20 animate-pulse"/>
                        <RiSendPlaneLine
                            className="absolute bottom-10 right-10 text-blue-300 text-7xl opacity-20 rotate-12 animate-fly-slow"/>
                        <div className="relative z-10 text-center max-w-2xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight drop-shadow-sm font-heading tracking-tight">
                                Course Details
                            </h1>
                            <p className="text-sm text-gray-500 mt-3">
                                <span className="text-gray-400">Home</span> &gt; Course Details
                            </p>
                        </div>
                    </section>
                    <section className="bg-white py-10 text-black">
                        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
                            <div className="lg:col-span-2">
                                <CourseDetailInfo courseDetail={courseDetail}/>

                                <CurriculumTabs curriculumData={curriculumData}/>
                                <AuthorCourses authorCourses={authorCourses}/>
                            </div>


                            <div>
                                <CoursePurchaseInfo course={courseDetail} handleAddToCart={handleAddToCart} />
                                <PopularCourses popularCourses={popularCourses}/>
                            </div>
                        </div>
                    </section>
                </>
            ): (
                <div className="text-center text-red-500 py-12">Failed to load course details.</div>
            )
            }
        </>
    );
};

export default CourseDetail;

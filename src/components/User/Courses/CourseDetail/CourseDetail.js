import {FaBookOpen,} from "react-icons/fa";
import {message} from "antd";
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
import LoadingOverlay from "../../../../common/LoadingOverlay";

const CourseDetail = () => {
    const {courseId} = useParams();
    const [initialLoading, setInitialLoading] = useState(true);
    const [loadingCourseDetail, setLoadingCourseDetail] = useState(false);

    const [courseDetail, setCourseDetail] = useState(null);
    const user = useSelector((state) => state?.user?.user);
    const [cartCourseIds, setCartCourseIds] = useState([]);
    const {fetchCartDetail, fetchCartItems} = useContext(Context);
    const [authorCourses, setAuthorCourses] = useState([]);
    const [popularCourses, setPopularCourses] = useState([]);

    const [enrollmentStatus, setEnrollmentStatus] = useState({
        enrolled: false,
        completionPercentage: 0,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setInitialLoading(false);
        }, 450);

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoadingCourseDetail(true);
            try {
                const response = await axios.get(commonApi.courseDetail.url(courseId));
                setCourseDetail(response.data.result);
            } catch (error) {
                console.error("Failed to fetch course detail");
            } finally {
                setLoadingCourseDetail(false);
            }
        };

        fetchData();
    }, [courseId]);

    useEffect(() => {
        const fetchEnrollmentStatus = async () => {
            if (!user?.id || !courseId) return;
            try {
                const response = await axios.get(
                    `${commonApi.course.url}/${courseId}/enrollment-status?userId=${user.id}`
                );
                setEnrollmentStatus(response.data);
            } catch (error) {
                console.error("Failed to fetch enrollment status:", error);
            }
        };

        fetchEnrollmentStatus();
    }, [user?.id, courseId]);

    const {handleAddToCart} = useAddToCart({
        user,
        cartCourseIds,
        setCartCourseIds,
        fetchCartDetail,
        fetchCartItems,
    });

    useEffect(() => {
        const fetchSidebarData = async () => {
            if (!courseDetail?.course?.id || !courseDetail?.courseMoreInfo?.instructorId) return;

            try {
                const authorRes = await axios.get(
                    commonApi.authorCourses.url(
                        courseDetail.courseMoreInfo?.instructorId,
                        courseDetail.course.id
                    )
                );
                setAuthorCourses(authorRes.data);

                const popularRes = await axios.get(commonApi.popularCourses.url());
                setPopularCourses(popularRes.data);
            } catch (err) {
                console.error("Failed to load author or popular courses", err);
            }
        };

        fetchSidebarData();
    }, [courseDetail?.course?.id, courseDetail?.courseMoreInfo?.instructorId]);

    return (
        <>
            {(initialLoading || loadingCourseDetail) && <LoadingOverlay />}

            {courseDetail && (
                <>
                    <section className="relative bg-gradient-to-br from-[#eef2f7] to-[#fefefe] py-40 overflow-hidden shadow-inner">
                        <FaBookOpen className="absolute bottom-4 left-20 text-pink-300 text-8xl opacity-30 rotate-[-10deg] animate-float-slow" />
                        <GiPlanetCore className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300 text-[150px] opacity-10 animate-spin-slow" />
                        <HiOutlineLightBulb className="absolute top-6 right-40 text-yellow-300 text-7xl opacity-20 animate-pulse" />
                        <RiSendPlaneLine className="absolute bottom-10 right-10 text-blue-300 text-7xl opacity-20 rotate-12 animate-fly-slow" />
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
                                <CourseDetailInfo
                                    courseDetail={courseDetail}
                                    enrollmentStatus={enrollmentStatus}
                                />
                                <CurriculumTabs
                                    curriculumData={courseDetail?.courseModuleMoreInfoDTOList}
                                    courseDetailData={courseDetail?.course}
                                    enrollmentStatus={enrollmentStatus}
                                />
                                <AuthorCourses authorCourses={authorCourses} />
                            </div>

                            <div>
                                <CoursePurchaseInfo
                                    course={courseDetail}
                                    handleAddToCart={handleAddToCart}
                                    enrollmentStatus={enrollmentStatus}
                                />
                                <PopularCourses popularCourses={popularCourses} />
                            </div>
                        </div>
                    </section>
                </>
            )}
        </>
    );
};

export default CourseDetail;

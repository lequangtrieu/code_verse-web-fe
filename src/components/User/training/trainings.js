import React, { useEffect, useState, useMemo, useContext } from "react";
import { Pagination, notification } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import commonApi from "../../../common/api";
import { formatDuration, getDiscountedPrice } from "../../../common/helper";
import Context from "../../../config/context/context";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../config/store/userSlice";
import axiosInstance from "../../../config/axiosInstance";

const Trainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [filteredTrainings, setFilteredTrainings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loading, setLoading] = useState(false);
  const pageSize = 6;

  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchCartDetail, fetchCartItems } = useContext(Context);

  useEffect(() => {
    const fetchTrainings = async () => {
      try {
        const res = await axios.get(commonApi.getPublishedTrainings.url);
        const list = res?.data || [];
        setTrainings(list);
        setFilteredTrainings(list);
      } catch (error) {
        console.error("Failed to fetch trainings", error);
      } finally {
        setTimeout(() => setInitialLoading(false), 500);
      }
    };

    fetchTrainings();
  }, []);

  const displayedTrainings = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;
    return filteredTrainings.slice(start, end);
  }, [filteredTrainings, currentPage]);

  const onPageChange = (page) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCurrentPage(page);
      const section = document.getElementById("training-section");
      if (section) {
        const offset = section.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
    }, 300);
  };

  const handleTrainingClick = (id) => {
    navigate(`/course/${id}`);
  };

  const handleAddToCart = async (course) => {
    if (!user) {
      return notification.warning({
        message: "Login Required",
        description: "Please log in to add trainings to your cart.",
      });
    }

    const discounted = getDiscountedPrice(course.price, course.discount);
    if (discounted === 0) {
      return handleEnrollFree(course);
    }

    try {
      const res = await axiosInstance.post(commonApi.addToCart.url, {
        username: user.username,
        courseId: course.id,
      });

      const result = res?.data?.result;
      if (result === "Added to cart successfully") {
        notification.success({
          message: "Training Added",
          description: `"${course.title}" has been added to your cart.`,
        });
        fetchCartDetail();
        fetchCartItems();
      } else {
        notification.info({ message: result });
      }
    } catch (err) {
      if (err?.response?.data?.code === 1010) {
        dispatch(logoutUser());
        navigate("/");
      } else {
        notification.error({ message: "Failed to add to cart" });
      }
    }
  };

  const handleEnrollFree = async (course) => {
    try {
      await axiosInstance.post(commonApi.addToCartFree.url, {
        username: user?.username,
        courseId: course.id,
      });
      notification.success({
        message: "Enrollment Successful",
        description: `You are enrolled in "${course.title}".`,
      });
    } catch (err) {
      if (err?.response?.data?.code === 1010) {
        dispatch(logoutUser());
        navigate("/");
      } else {
        notification.error({ message: "Enrollment Failed" });
      }
    }
  };

  return (
    <>
      {(initialLoading || loading) && <LoadingOverlay />}

      {!initialLoading && (
        <div id="training-section" className="bg-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Available Training Courses
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedTrainings.map((course) => {
                const isFree =
                  getDiscountedPrice(course.price, course.discount) === 0;

                return (
                  <div
                    key={course.id}
                    className="bg-white shadow rounded-xl overflow-hidden border hover:shadow-lg transition duration-300 flex flex-col"
                  >
                    <div
                      className="cursor-pointer"
                      onClick={() => handleTrainingClick(course.id)}
                    >
                      <img
                        src={course.thumbnailUrl}
                        alt={course.title}
                        className="h-40 w-full object-cover"
                      />
                    </div>

                    <div className="flex-1 p-4 flex flex-col justify-between">
                      <div
                        onClick={() => handleTrainingClick(course.id)}
                        className="cursor-pointer"
                      >
                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 mb-1">
                          {course.title}
                        </h3>
                        <div className="text-sm text-gray-500 mb-2">
                          {course.category}
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded">
                            {course.level}
                          </span>
                          <span className="uppercase font-medium text-gray-600">
                            {course.language}
                          </span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>{course.totalLessons || 0} lessons</span>
                          <span>{formatDuration(course.totalDurations)}</span>
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {course.totalStudents || 0} learners
                        </div>
                      </div>

                      <div className="mt-4">
                        {isFree ? (
                          <button
                            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 text-sm"
                            onClick={() => handleEnrollFree(course)}
                          >
                            Enroll Free
                          </button>
                        ) : (
                          <button
                            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 text-sm"
                            onClick={() => handleAddToCart(course)}
                          >
                            Add to Cart – $
                            {getDiscountedPrice(course.price, course.discount)}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="bg-gray-50 text-xs text-gray-500 px-4 py-2 border-t">
                      Instructor: {course.instructor || "Unknown"}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center mt-8">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredTrainings.length}
                onChange={onPageChange}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Trainings;

import React from "react";
import { FaPlay } from "react-icons/fa";
import {
  formatCurrency,
  formatDate,
  formatDuration,
  getDiscountedPrice,
} from "../../../../common/helper";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import axiosInstance from "../../../../config/axiosInstance";
import commonApi from "../../../../common/api";
import { logoutUser } from "../../../../config/store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const CoursePurchaseInfo = ({ course, handleAddToCart, enrollmentStatus }) => {
  const navigate = useNavigate();
  const { enrolled, completionPercentage } = enrollmentStatus;
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);

  const handleAddToCartFree = async (course) => {
    if (!user) {
      return notification.warning({
        message: "Login Required",
        description: "Please log in to add courses to your cart.",
        placement: "topLeft",
      });
    }

    try {
      await axiosInstance.post(commonApi.addToCartFree.url, {
        username: user.username,
        courseId: course.id,
      });

      notification.success({
        message: "Enrollment Successful",
        description: `You have successfully enrolled in "${course.title}". Enjoy learning!`,
        placement: "bottomLeft",
      });
    } catch (error) {
      notification.error({
        message: "Enrollment Failed",
        description: error?.response?.data?.message,
        placement: "bottomLeft",
      });

      if (error?.response?.data?.code === 1010) {
        dispatch(logoutUser());
        navigate("/");
      }
    }
  };

  const enrollFreeCourse = (course) => {
    try {
      handleAddToCartFree(course);
      setTimeout(() => {
        navigate(`/course/${course.id}/learn`);
      }, 300);
    } catch (e) {
      console.log(e);
    }
  };

  const renderActionButton = () => {
    const isFree =
      getDiscountedPrice(course?.course.price, course?.course.discount) === 0;

    if (!user) {
      return (
        <button
          className="mt-3 w-full bg-yellow-500 text-white py-2 rounded"
          onClick={() => window.openLoginModal()}
        >
          Login Now
        </button>
      );
    }

    if (!enrolled) {
      return (
        <>
          {isFree ? (
            <button
              className="mt-3 w-full bg-green-600 text-white py-2 rounded"
              onClick={() => enrollFreeCourse(course?.course)}
            >
              Learning Now
            </button>
          ) : (
            <div className="flex justify-between">
              <button
                className="mt-3 w-full bg-purple-600 text-white py-2 rounded"
                onClick={() => handleAddToCart(course?.course)}
              >
                Add To Cart
              </button>
            </div>
          )}
        </>
      );
    }

    // if (completionPercentage < 100) {
      return (
        <button
          className="mt-3 w-full bg-green-600 text-white py-2 rounded"
          onClick={() => navigate(`/course/${course?.course.id}/learn`)}
        >
          Learning Now
        </button>
      );
    // }

    // return (
    //   <button
    //     className="mt-3 w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed"
    //     disabled
    //   >
    //     Completed
    //   </button>
    // );
  };

  return (
    <div className="rounded-xl border border-gray-200 p-5">
      <div className="relative">
        <img
          src={
            course?.course.thumbnailUrl ||
            "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
          }
          alt="Thumbnail"
          className="rounded-xl"
        />
        <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-purple-600 rounded-full p-3">
          <FaPlay />
        </button>
      </div>
      {enrolled ? 
      <div className="mt-4">
        <span className="text-green-600 font-semibold text-lg">Enrolled</span>
      </div>
       : <div className="mt-4">
        {getDiscountedPrice(course?.course.price, course?.course.discount) ===
        0 ? (
          <span className="text-green-600 font-semibold text-lg">Free</span>
        ) : (
          <>
            <p className="text-xl font-bold text-purple-600">
              {formatCurrency(
                getDiscountedPrice(
                  course?.course.price,
                  course?.course.discount
                )
              )}
            </p>
            {course?.course.discount > 0 && (
              <>
              <p className="line-through text-sm text-gray-400">
              {formatCurrency(course?.course.price)}
            </p>

            <p className="text-right text-xs text-red-500">
              {course?.course.discount}% OFF
            </p>
            </>
          )}
          </>
        )}
      </div>}

      {renderActionButton()}

      <p className="text-xs mt-1 text-center text-gray-500">
        {course?.course.description}
      </p>

      <div className="mt-4 space-y-2 text-sm text-gray-600">
        <p>Instructor: {course?.courseMoreInfo.instructor}</p>
        <p>Start Date: {formatDate(course?.course.createdAt)}</p>
        <p>
          Total Duration:{" "}
          {formatDuration(course?.courseMoreInfo.totalDurations)}
        </p>
        {/* <p>Enrolled: Enrolled</p> */}
        <p>Skill Level: {course?.course.level}</p>
        <p>Language: {course?.course.language}</p>
        {/*<p>Quiz: {course.quiz ? "Yes" : "No"}</p>*/}
        {/*<p>Certificate: {course.certificate ? "Yes" : "No"}</p>*/}
      </div>

      <div className="mt-4 text-center text-sm">
        <p className="text-gray-600">More inquiry about course</p>
        <p className="text-purple-600 font-bold">+47 333 78 901</p>
      </div>
    </div>
  );
};

export default CoursePurchaseInfo;

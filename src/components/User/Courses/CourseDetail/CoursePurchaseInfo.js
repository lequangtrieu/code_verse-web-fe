import React from "react";
import { FaPlay } from "react-icons/fa";
import {formatCurrency, formatDuration, getDiscountedPrice} from "../../../../common/helper";

const CoursePurchaseInfo = ({ course, handleAddToCart  }) => {
    return (
        <div className="rounded-xl border border-gray-200 p-5">
            <div className="relative">
                <img
                    src={course?.course.thumbnailUrl || "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"}
                    alt="Thumbnail"
                    className="rounded-xl"
                />
                <button
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-purple-600 rounded-full p-3"
                >
                    <FaPlay />
                </button>
            </div>
            <div className="mt-4">
                <p className="text-xl font-bold text-purple-600">{formatCurrency(getDiscountedPrice(course?.course.price, course?.course.discount))}</p>
                <p className="line-through text-sm text-gray-400">{formatCurrency(course?.course.price)}</p>
                <p className="text-right text-xs text-red-500">{course?.course.discount}% OFF</p>
            </div>
            <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded"
                    onClick={() => handleAddToCart(course?.course)}>
                Add To Cart
            </button>
            <p className="text-xs mt-1 text-center text-gray-500">{course?.course.description}</p>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>Instructor: {course?.courseMoreInfo.instructor}</p>
                <p>Start Date: {course?.course.createdAt}</p>
                <p>Total Duration: {formatDuration(course?.courseMoreInfo.totalDurations)}</p>
                <p>Enrolled: Enrolled</p>
                <p>Skill Level: {course?.course.level}</p>
                <p>Language: {course?.course.language}</p>
                <p>Quiz: {course.quiz ? "Yes" : "No"}</p>
                <p>Certificate: {course.certificate ? "Yes" : "No"}</p>
            </div>

            <div className="mt-4 text-center text-sm">
                <p className="text-gray-600">More inquiry about course</p>
                <p className="text-purple-600 font-bold">+47 333 78 901</p>
            </div>
        </div>
    );
};

export default CoursePurchaseInfo;

import React from "react";
import { FaPlay } from "react-icons/fa";

const CoursePurchaseInfo = ({ course }) => {
    return (
        <div className="rounded-xl border border-gray-200 p-5">
            <div className="relative">
                <img
                    src={course.thumbnailUrl || "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"}
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
                <p className="text-xl font-bold text-purple-600">{course.price}</p>
                <p className="line-through text-sm text-gray-400">{course.originalPrice}</p>
                <p className="text-right text-xs text-red-500">{course.discount} OFF</p>
            </div>
            <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded">
                Add To Cart
            </button>
            <button className="mt-2 w-full border border-purple-600 text-purple-600 py-2 rounded">
                Buy Now
            </button>
            <p className="text-xs mt-1 text-center text-gray-500">45-Days Money-Back Guarantee</p>

            <div className="mt-4 space-y-2 text-sm text-gray-600">
                <p>Instructor: {course.instructor}</p>
                <p>Start Date: {course.startDate}</p>
                <p>Total Duration: {course.duration}</p>
                <p>Enrolled: {course.enrolled}</p>
                <p>Lectures: {course.lectures}</p>
                <p>Skill Level: {course.skillLevel}</p>
                <p>Language: {course.language}</p>
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

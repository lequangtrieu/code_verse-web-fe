import React from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { Rate } from "antd";
import {formatCurrency, formatDuration, formatDate, getDiscountedPrice} from "../../../../common/helper";

const CourseDetailInfo = ({ courseDetail }) => {
    return (
        <div>
            {/* Course Image */}
            <img
                src={courseDetail?.course.thumbnailUrl}
                alt="Course Banner"
                className="rounded-xl w-full object-cover h-96"
            />

            {/* Course Info: Category, Last Update */}
            <div className="mt-5 flex items-center gap-2 text-sm">
        <span className="bg-pink-600 text-white px-2 py-1 rounded">
          {courseDetail?.courseMoreInfo.category}
        </span>
                <span className="ml-auto text-xs text-gray-400">
          Last Update: {formatDate(courseDetail?.course.updatedAt)}
        </span>
            </div>

            {/* Course Title */}
            <h2 className="mt-4 text-2xl font-bold">
                {courseDetail?.course.title || "Untitled Course"}
            </h2>

            {/* Price and Course Info */}
            <div className="flex items-center gap-8 mt-4">
                {/* Price */}
                <div className="flex items-center gap-2">
                    {getDiscountedPrice(courseDetail?.course.price, courseDetail?.course.discount) === 0 ? (
                        <span className="text-green-600 font-semibold text-lg">Free</span>
                    ) : (
                        <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-indigo-600 transition-colors duration-300">
                {formatCurrency(getDiscountedPrice(courseDetail?.course.price, courseDetail?.course.discount))}
              </span>
                            {courseDetail?.course.discount > 0 && courseDetail?.course.price > 0 && (
                                <span className="line-through text-gray-500 text-sm">
                  {formatCurrency(courseDetail?.course.price)}
                </span>
                            )}
                        </div>
                    )}
                </div>

                {/* Course Details */}
                <div className="flex items-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <BsFileEarmarkText className="text-purple-600" />
              {courseDetail?.courseMoreInfo.totalLessons} Lessons
          </span>
                    <div className="flex items-center gap-2">
            <span className="font-semibold text-gray-900">
              {courseDetail?.courseMoreInfo.rating}
            </span>
                        <Rate
                            style={{
                                fontSize: "14px",
                                color: "#f4b400",
                            }}
                            disabled
                            defaultValue={courseDetail?.courseMoreInfo.rating}
                            allowHalf
                        />
                        <span className="text-xs text-gray-500">
              ({courseDetail?.courseMoreInfo.ratingCount})
            </span>
                    </div>
                </div>

                {/* Category and Instructor */}
                <div className="flex items-center gap-6 text-sm text-gray-500">
                    <span className="font-semibold">{courseDetail?.course.category}</span>
                    <span className="font-semibold">{courseDetail?.course.instructor}</span>
                </div>
            </div>

            {/* Course Description */}
            <p className="mt-4 text-gray-600">{courseDetail?.course.description}</p>

            {/* Additional Information */}
            <div className="mt-6 border border-gray-200 rounded-xl p-6 text-sm grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-400">Instructor:</p>
                    <p className="font-medium">{courseDetail?.courseMoreInfo.instructor}</p>
                </div>
                <div>
                    <p className="text-gray-400">Course level:</p>
                    <p className="font-medium">{courseDetail?.course.level}</p>
                </div>
                <div>
                    <p className="text-gray-400">Language:</p>
                    <p className="font-medium">{courseDetail?.course.language}</p>
                </div>
                <div>
                    <p className="text-gray-400">Duration:</p>
                    <p className="font-medium">{formatDuration(courseDetail?.courseMoreInfo.totalDurations)}</p>
                </div>
                <div>
                    <p className="text-gray-400">Price Discount:</p>
                    <p className="font-medium">-{courseDetail?.course.discount}%</p>
                </div>
                <div>
                    <p className="text-gray-400">Enrolled:</p>
                    <p className="font-medium">{courseDetail?.courseMoreInfo.totalStudents} students</p>
                </div>
                <div>
                    <p className="text-gray-400">Course Status:</p>
                    <p className="font-medium">{courseDetail?.course.status}</p>
                </div>
                <div>
                    <p className="text-gray-400">Certificate:</p>
                    <p className="font-medium">Yes</p>
                </div>
            </div>
        </div>
    );
};

export default CourseDetailInfo;

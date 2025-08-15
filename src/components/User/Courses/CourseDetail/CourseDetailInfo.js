import React from "react";
import { BsFileEarmarkText } from "react-icons/bs";
import { Rate } from "antd";
import {
    formatCurrency,
    formatDuration,
    formatDate,
    getDiscountedPrice,
} from "../../../../common/helper";

const CourseDetailInfo = ({ courseDetail, enrollmentStatus }) => {
    return (
        <div>
            {/* Course Image */}
            <img
                src={courseDetail?.course.thumbnailUrl}
                alt="Course Banner"
                className="rounded-xl w-full object-cover h-96"
            />

            {/* Category and Last Update */}
            <div className="mt-5 flex items-center gap-2 text-sm">
        <span className="bg-pink-600 text-white px-2 py-1 rounded">
          {courseDetail?.courseMoreInfo.category}
        </span>
                <span className="ml-auto text-xs text-gray-400">
          Last Update: {formatDate(courseDetail?.course.updatedAt)}
        </span>
            </div>

            {/* Title */}
            <h2 className="mt-4 text-2xl font-bold">
                {courseDetail?.course.title || "Untitled Course"}
            </h2>

            {/* Pricing, Lessons, Rating - Progress */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-y-3 gap-x-8 mt-4 text-base">
            {/* LEFT SIDE - PRICE, LESSONS, RATING (all inline) */}
                <div className="flex flex-wrap md:flex-nowrap items-center gap-x-8 gap-y-2 text-[15px] text-gray-700">
                {/* Price */}
                    {!enrollmentStatus.enrolled && <div className="flex items-center gap-2">
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
                    </div>}

                    {/* Lessons */}
                    <div className="flex items-center gap-1">
                        <BsFileEarmarkText className="text-purple-600" />
                        {courseDetail?.courseMoreInfo.totalLessons} Lessons
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2">
                        <span className="font-semibold text-gray-900">{courseDetail?.courseMoreInfo.rating}</span>
                        <Rate
                            style={{ fontSize: "14px", color: "#f4b400" }}
                            disabled
                            defaultValue={courseDetail?.courseMoreInfo.rating}
                            allowHalf
                        />
                        <span className="text-xs text-gray-500">
        ({courseDetail?.courseMoreInfo.ratingCount})
      </span>
                    </div>
                </div>

                {/* RIGHT SIDE - Progress */}
                {enrollmentStatus.enrolled && (
                    <div className="md:w-64 w-full">
                        <div className="flex justify-between text-xs text-gray-600 mb-1 px-1">
                            <span>Progress</span>
                            <span>{Math.round(enrollmentStatus.completionPercentage)}%</span>
                        </div>
                        <div className="w-full">
                            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="h-2 rounded-full transition-all duration-300"
                                    style={{
                                        width: `${enrollmentStatus.completionPercentage}%`,
                                        backgroundColor:
                                            enrollmentStatus.completionPercentage >= 80
                                                ? "#52c41a"
                                                : enrollmentStatus.completionPercentage >= 50
                                                    ? "#faad14"
                                                    : "#1890ff"
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Description */}
            <p className="mt-4 text-gray-600">{courseDetail?.course.description}</p>

            {/* Info Grid */}
            <div className="mt-6 border border-gray-200 rounded-xl p-6 text-sm grid grid-cols-2 gap-4">
                <div>
                    <p className="text-gray-400">Instructor:</p>
                    <p className="font-medium">
                        {courseDetail?.courseMoreInfo.instructor}
                    </p>
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
                    <p className="font-medium">
                        {formatDuration(courseDetail?.courseMoreInfo.totalDurations)}
                    </p>
                </div>
                <div>
                    <p className="text-gray-400">Price Discount:</p>
                    <p className="font-medium">-{courseDetail?.course.discount}%</p>
                </div>
                <div>
                    <p className="text-gray-400">Enrolled:</p>
                    <p className="font-medium">
                        {courseDetail?.courseMoreInfo.totalStudents} students
                    </p>
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

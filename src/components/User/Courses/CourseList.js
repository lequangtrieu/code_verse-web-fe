import React from "react";
import {Card, Popover, Rate, Tag} from "antd";
import {formatCurrency, formatDuration, getDiscountedPrice} from "../../../common/helper";

const CourseList = ({
                        courses = [], renderCoursePopover, handleCourseClick,
                    }) => {
    return (
        <main className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {courses.map((course) => (<Popover
            key={course.id}
            content={renderCoursePopover(course)}
            placement="rightTop"
            trigger="hover"
        >
            <Card
                onClick={() => handleCourseClick(course.id)}
                className="rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                cover={<img
                    onClick={() => handleCourseClick(course.id)}
                    alt={course.title}
                    src={course.thumbnailUrl}
                    className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                />}
            >
                <div className="p-4">
                    <Tag
                        color="processing"
                        className="mb-2 transition-all duration-300 hover:opacity-80"
                    >
                        {course.category}
                    </Tag>

                    <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-indigo-600 transition-colors duration-300">
                        {course.title}
                    </h3>

                    <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span>{course.totalLessons} Lessons</span>
                        <span className="mx-2">•</span>
                        <span>{formatDuration(course.totalDurations)}</span>
                    </div>

                    <div className="flex items-center justify-between mb-2">
                        <div>
                            {getDiscountedPrice(course.price, course.discount) === 0 ? (
                                <span className="text-green-600 font-semibold">Free</span>) : (<>
                      <span className="text-lg font-bold text-indigo-600 transition-colors duration-300">
                        {formatCurrency(getDiscountedPrice(course.price, course.discount))}
                      </span>
                                {course.discount > 0 && course.price > 0 && (
                                    <span className="line-through text-gray-500 ml-2">
                          {formatCurrency(course.price)}
                        </span>)}
                            </>)}
                        </div>
                    </div>

                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                            <div
                                className="w-7 h-7 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-white font-semibold transition-all duration-300 hover:bg-indigo-500">
                                {course.instructor?.charAt(0)?.toUpperCase() || "?"}
                            </div>
                            <span className="hover:text-indigo-600 transition-colors duration-300">
                    {course.instructor || "Unknown"}
                  </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-1 my-2 pl-1">
                <span className="font-semibold text-gray-900">
                  {course.rating}
                </span>
                        <Rate
                            style={{
                                fontSize: "14px", color: "#f4b400", padding: "2px 4px",
                            }}
                            disabled
                            defaultValue={course.rating}
                            allowHalf
                        />
                        <span className="text-s text-gray-500">
                  ({course.ratingCount})
                </span>
                    </div>
                </div>
            </Card>
        </Popover>))}
    </main>);
};

export default CourseList;

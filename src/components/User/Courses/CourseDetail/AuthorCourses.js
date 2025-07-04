import React from "react";
import { Carousel } from "antd";
import { formatCurrency, getDiscountedPrice } from "../../../../common/helper";

const AuthorCourses = ({ authorCourses }) => {
    return (
        <div className="bg-white rounded-xl border p-4 mt-10">
            <h3 className="text-lg font-bold border-b pb-2 mb-4">Author's More Courses</h3>
            <Carousel
                autoplay
                dots={false}
                infinite
                draggable
                swipeToSlide
                slidesToShow={3}
                slidesToScroll={1}
                speed={600}
            >
                {authorCourses.map((course, idx) => {
                    const discounted = getDiscountedPrice(course.price, course.discount);

                    return (
                        <div key={idx} className="px-1">
                            <div className="flex flex-col h-full rounded-lg overflow-hidden border shadow-sm bg-white hover:shadow transition-all duration-300">
                                <img
                                    src={
                                        course.thumbnailUrl ||
                                        "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
                                    }
                                    alt={course.title}
                                    className="w-full h-32 object-cover"
                                />
                                <div className="flex flex-col justify-between flex-1 p-3">
                                    <h4 className="text-sm font-semibold text-gray-800 leading-snug line-clamp-2 min-h-[3.25rem]">
                                        {course.title}
                                    </h4>
                                    <div className="mt-2">
                                        {discounted === 0 ? (
                                            <p className="text-sm text-green-600 font-semibold">Free</p>
                                        ) : (
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-indigo-600">
                                                    {formatCurrency(discounted)}
                                                </span>
                                                {course.discount > 0 && course.price > 0 && (
                                                    <span className="line-through text-xs text-gray-400">
                                                        {formatCurrency(course.price)}
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </Carousel>
        </div>
    );
};

export default AuthorCourses;

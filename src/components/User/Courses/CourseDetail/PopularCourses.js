import React from "react";
import {formatCurrency, getDiscountedPrice} from "../../../../common/helper";
import scrollTop from "../../../../config/scrollTop";
import {useNavigate} from "react-router-dom";

const PopularCourses = ({ popularCourses }) => {
    const navigate = useNavigate();
    const handleCourseClick = (id) => {
        console.log("Clicked course id:", id);
        navigate(`/course/${id}`);
    };
    return (
        <div className="bg-white rounded-xl border p-4 mt-10">
            <h3 className="text-lg font-bold border-b pb-2 mb-4">🔥 Popular Courses</h3>
            <div className="space-y-4">
                {popularCourses.map((course, idx) => {
                    const discounted = getDiscountedPrice(course.price, course.discount);

                    return (
                        <div key={idx}
                             className="flex gap-3 items-center rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                             onClick={() => handleCourseClick(course.id)}>
                            <img
                                src={
                                    course.thumbnailUrl ||
                                    "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
                                }
                                alt="popular"
                                className="w-14 h-14 rounded-md object-cover"
                            />
                            <div className="flex-1">
                                <p className="text-sm font-semibold leading-snug line-clamp-2">
                                    {course.title}
                                </p>

                                {discounted === 0 ? (
                                    <span className="text-green-600 text-xs font-semibold">Free</span>
                                ) : (
                                    <div className="flex gap-2 items-center">
                                        <span className="text-xs font-bold text-indigo-600">
                                            {formatCurrency(discounted)}
                                        </span>
                                        {course.discount > 0 && course.price > 0 && (
                                            <span className="text-xs text-gray-400 line-through">
                                                {formatCurrency(course.price)}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PopularCourses;

import React from "react";

const PopularCourses = ({ popularCourses }) => {
    return (
        <div className="bg-white rounded-xl border p-4 mt-10">
            <h3 className="text-lg font-bold border-b pb-2 mb-4">🔥 Popular Course</h3>
            <div className="space-y-4">
                {popularCourses.map((course, idx) => (
                    <div key={idx} className="flex gap-3 items-center">
                        <img
                            src={course.imageUrl || "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"}
                            alt="popular"
                            className="w-14 h-14 rounded-md object-cover"
                        />
                        <div>
                            <p className="text-sm font-semibold leading-snug">{course.title}</p>
                            <span className="text-xs text-purple-600 font-bold">{course.price}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PopularCourses;

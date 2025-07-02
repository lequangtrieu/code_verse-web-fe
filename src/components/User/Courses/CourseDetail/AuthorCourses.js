import React from "react";
import { Carousel } from "antd";

const AuthorCourses = ({ authorCourses }) => {
    return (
        <div className="bg-white rounded-xl border p-4 mt-10">
            <h3 className="text-lg font-bold border-b pb-2 mb-4">Author's More Courses</h3>
            <Carousel
                autoplay
                slidesToShow={2}
                centerMode={true}
                dots={false}
                infinite={true}
                draggable={true}
                swipeToSlide={true}
            >
                {authorCourses.map((course, idx) => (
                    <div key={idx} className="flex justify-center">
                        <div className="w-50 mx-2">
                            <img
                                src={course.imageUrl || "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"}
                                alt="Author Course"
                                className="w-full rounded-xl"
                            />
                            <h4 className="text-sm font-semibold mt-2">{course.title}</h4>
                            <p className="text-xs text-purple-600">{course.price}</p>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default AuthorCourses;

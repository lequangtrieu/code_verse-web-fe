import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewInstructorCourseDetailMockup() {
    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-6">
            {/* Outer Frame */}
            <div className="w-full max-w-[1400px] border-4 border-black">
                <div className="flex bg-white text-black font-mockup">
                    {/* Sidebar */}
                    <div className="w-60 border-r-2 border-black p-4">
                        <p className="mb-6">WELCOME, USER@EMAIL.COM</p>
                        <ul className="space-y-3">
                            <li>My Profile</li>
                            <li>Dashboard</li>
                            <li>Notifications</li>
                            <li>
                                <RoughNotation type="underline" show={true} color="black">
                                    Management Courses
                                </RoughNotation>
                            </li>
                            <li>Management Trainings</li>
                            <li>Manage Balance</li>
                        </ul>
                        <hr className="my-4 border-black" />
                        <ul className="space-y-3">
                            <li>Change Password</li>
                            <li>Logout</li>
                        </ul>
                    </div>

                    {/* Main Content */}
                    <div className="flex-1 p-6">
                        {/* Course Info */}
                        <div className="border-2 border-black p-6 mb-6">
                            <h2 className="text-xl mb-2">Java Programming for Beginners</h2>
                            <p className="mb-2">
                                Learn Java from scratch with hands-on examples and step-by-step
                                explanations.
                            </p>
                            <div className="gap-4 text-sm">
                                <p>Category: Web Development</p>
                                <p>Level: Beginner</p>
                                <p>Language: Java</p>
                                <p>Price: 30.000 đ</p>
                                <p>Status: Published</p>
                            </div>
                        </div>

                        {/* Course Modules */}
                        <div className="border-2 border-black">
                            <div className="border-b-2 border-black p-2 font-bold">
                                Course Modules
                            </div>
                            <div className="flex">
                                {/* Modules List */}
                                <div className="w-1/3 border-r-2 border-black">
                                    {[
                                        "Variables and Data Types",
                                        "Variables and Declaration in Java",
                                        "Basic Java Exercise: Declare Variables",
                                        "Operators in Java",
                                        "Conditional Statements",
                                        "Loops in Java",
                                        "Arrays in Java",
                                        "Methods and Functions",
                                        "OOP Concepts",
                                    ].map((title, idx) => (
                                        <div
                                            key={idx}
                                            className={`p-2 border-b border-black ${idx === 1 ? "bg-gray-100" : ""
                                                }`}
                                        >
                                            {title}
                                        </div>
                                    ))}
                                </div>

                                {/* Lesson Detail */}
                                <div className="flex-1 p-4">
                                    <h3 className="font-bold mb-2">
                                        Lesson: Variables and Declaration in Java
                                    </h3>
                                    <div className="flex gap-4 mb-3">
                                        <span>
                                            <RoughNotation type="underline" show={true} color="black">
                                                Theory
                                            </RoughNotation>
                                        </span>
                                        <span>Exercise</span>
                                    </div>
                                    <p className="text-sm leading-relaxed">
                                        Variables and Declaration in Java <br />
                                        In Java, variables must be declared with a specific type before
                                        use. Common types include int, double, String, etc. <br />
                                        <br />
                                        Example:
                                        <br /> int age = 25;
                                        <br /> String name = "John";
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

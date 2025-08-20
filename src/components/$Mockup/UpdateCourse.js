import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function UpdateCourse() {
    return (
        <div className="flex w-full h-screen border font-mockup bg-white">
            {/* Sidebar */}
            <div className="w-1/5 border-r p-4">
                <div className="mb-6">
                    <p>WELCOME,</p>
                    <p>USER@EMAIL.COM</p>
                </div>
                <ul className="space-y-2">
                    <li>My Profile</li>
                    <li>Dashboard</li>
                    <li>Notifications</li>
                    <li>
                        <RoughNotation type="box" show color="black">
                            Management Courses
                        </RoughNotation>
                    </li>
                    <li>Management Trainings</li>
                    <li>Manage Balance</li>
                </ul>
                <div className="mt-10">
                    <p>Change Password</p>
                    <p>Logout</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 space-y-6">
                {/* Course Header */}
                <div className="border p-4">
                    <div className="flex gap-6">
                        <div className="w-40 h-28 border flex items-center justify-center">
                            [Cover Image]
                        </div>
                        <div className="flex-1">
                            <h2 className="font-bold text-lg">
                                React JS Mastery: From Zero to Production-Ready Apps
                            </h2>
                            <p className="mt-2">
                                Dive into the world of modern web development with React JS...
                            </p>
                            <div className="mt-2 space-y-1">
                                <p>Category: Web Development</p>
                                <p>Level: Beginner</p>
                                <p>Language: JavaScript</p>
                                <p>Price: Free</p>
                                <p>Status: Draft</p>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2">
                            <button className="border px-4 py-1">Submit</button>
                            <button className="border px-4 py-1">Edit</button>
                        </div>
                    </div>
                </div>

                {/* Course Modules */}
                <div className="border p-4">
                    <h3 className="font-bold mb-2">Course Modules</h3>
                    <div className="flex">
                        {/* Module List */}
                        <div className="w-1/3 border-r p-2">
                            <button className="border px-2 py-1 mb-2 w-full">+ Add Module</button>
                            <div className="border p-2 mb-2">
                                <p className="font-bold">Module 1 — Introduction to React</p>
                                <ul className="mt-2 space-y-1">
                                    <li className="border px-2 py-1 bg-gray-100">
                                        Introduction to React
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Lesson Form */}
                        <div className="flex-1 p-4">
                            <h4 className="font-bold mb-2">Lesson Form: Introduction to React</h4>
                            <div className="flex gap-4 mb-4">
                                <p>Theory</p>
                                <p>Exercise</p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="font-bold">* Theory Title</label>
                                    <input
                                        type="text"
                                        className="border w-full p-2 mt-1"
                                        defaultValue="What is React?"
                                    />
                                </div>
                                <div>
                                    <label className="font-bold">* Theory Content</label>
                                    <textarea
                                        className="border w-full p-2 mt-1"
                                        rows={6}
                                        defaultValue="React is a JavaScript library for building user interfaces..."
                                    ></textarea>
                                </div>
                                <button className="border px-4 py-2">Save Theory</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

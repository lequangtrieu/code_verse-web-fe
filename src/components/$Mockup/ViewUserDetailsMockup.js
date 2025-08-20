import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewUserDetailsMockup() {
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center font-mockup">
            {/* Outer Frame */}
            <div className="w-[95%] h-[95%] border-4 border-black flex">
                {/* Sidebar */}
                <div className="w-1/5 border-r-4 border-black p-4">
                    <div className="mb-6">
                        <p>WELCOME,</p>
                        <p>ADMIN@EMAIL.COM</p>
                    </div>
                    <ul className="space-y-2">
                        <li>My Profile</li>
                        <li>System Statistics</li>
                        <RoughNotation type="underline" show color="black">
                            <li>User Management</li>
                        </RoughNotation>
                        <li>Approve Instructor Requests</li>
                        <li>Category Management</li>
                        <li>Course Management</li>
                        <li>Report Reason Management</li>
                        <li>Violation Management</li>
                        <li>Send Notifications</li>
                        <li>Withdrawal Requests</li>
                    </ul>
                    <div className="mt-10">
                        <p>Settings</p>
                        <p>Logout</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-xl font-bold mb-4">Learner’s Information</h2>

                    {/* User Info Box */}
                    <div className="border-2 border-black p-4 mb-6 flex gap-6 items-center">
                        {/* Avatar */}
                        <div className="w-24 h-24 border-2 border-black flex items-center justify-center">
                            IMG
                        </div>
                        {/* Info */}
                        <div>
                            <p>Name: <span className="font-bold">Nguyen Van A</span></p>
                            <p>Email: a@gmail.com</p>
                            <p>Phone: 0123456789</p>
                            <p>Role: LEARNER</p>
                            <p>Bio: …</p>
                            <p>Verified: Yes</p>
                        </div>
                    </div>

                    {/* Learner's Courses */}
                    <h2 className="text-xl font-bold mb-4">Learner’s Courses</h2>
                    <div className="space-y-4">
                        {/* Example Course */}
                        <div className="border-2 border-black p-4">
                            <p className="font-bold">Java Programming for Beginners</p>
                            <p>Description: Learn Java from scratch with examples...</p>
                            <p>Category: Web Development | Instructor: Tien Nguyen</p>
                            <p>Rating: ★★★★☆ (1)</p>
                            <p>Lessons: 14</p>
                            <p>Progress: 20%</p>
                        </div>

                        <div className="border-2 border-black p-4">
                            <p className="font-bold">Python Fundamentals</p>
                            <p>Description: Learn the basics of Python programming...</p>
                            <p>Category: Web Development | Instructor: Tien Nguyen</p>
                            <p>Rating: ★☆☆☆☆ (0)</p>
                            <p>Lessons: 14</p>
                            <p>Progress: 7%</p>
                        </div>

                        <div className="border-2 border-black p-4">
                            <p className="font-bold">JavaScript Basics</p>
                            <p>Description: Learn how JS adds interactivity to websites...</p>
                            <p>Category: Web Development | Instructor: Tien Nguyen</p>
                            <p>Rating: ★★★★☆ (2)</p>
                            <p>Lessons: 4</p>
                            <p>Progress: 100%</p>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-4 mt-6">
                        <button className="border-2 border-black px-3 py-1">Prev</button>
                        <button className="border-2 border-black px-3 py-1">1</button>
                        <button className="border-2 border-black px-3 py-1">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

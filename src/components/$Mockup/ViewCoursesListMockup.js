import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewCoursesListMockup() {
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
                        <li>User Management</li>
                        <li>Approve Instructor Requests</li>
                        <li>Category Management</li>
                        <RoughNotation type="underline" show color="black">
                            <li>Course Management</li>
                        </RoughNotation>
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
                <div className="flex-1 p-6">
                    <h2 className="text-xl font-bold mb-4">Courses</h2>

                    {/* Top Bar */}
                    <div className="flex gap-2 mb-4">
                        <input
                            placeholder="Search by title or description"
                            className="border-2 border-black px-2 py-1 flex-1"
                        />
                        <select className="border-2 border-black px-2 py-1">
                            <option>All Categories</option>
                        </select>
                        <select className="border-2 border-black px-2 py-1">
                            <option>All Status</option>
                        </select>
                    </div>

                    {/* Table */}
                    <div className="border-2 border-black">
                        {/* Header Row */}
                        <div className="grid grid-cols-[1fr_2fr_4fr_2fr_1fr_1fr_2fr] border-b-2 border-black font-bold">
                            <div className="p-2 border-r-2 border-black">Image</div>
                            <div className="p-2 border-r-2 border-black">Title</div>
                            <div className="p-2 border-r-2 border-black">Description</div>
                            <div className="p-2 border-r-2 border-black">Category</div>
                            <div className="p-2 border-r-2 border-black">Price</div>
                            <div className="p-2 border-r-2 border-black">Status</div>
                            <div className="p-2">Actions</div>
                        </div>

                        {/* Example Row */}
                        <div className="grid grid-cols-[1fr_2fr_4fr_2fr_1fr_1fr_2fr] border-b border-black">
                            <div className="p-2 border-r border-black flex items-center justify-center">
                                <div className="w-12 h-12 bg-gray-300 flex items-center justify-center">
                                    IMG
                                </div>
                            </div>
                            <div className="p-2 border-r border-black">
                                Java Programming for Beginners
                            </div>
                            <div className="p-2 border-r border-black">
                                Learn Java from scratch with hands-on examples and step-by-step
                                explanations.
                            </div>
                            <div className="p-2 border-r border-black">Web Development</div>
                            <div className="p-2 border-r border-black">30.000 đ</div>
                            <div className="p-2 border-r border-black text-green-600">
                                Published
                            </div>
                            <div className="p-2 flex gap-2">
                                <button className="border-2 border-black px-2">View Detail</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-[1fr_2fr_4fr_2fr_1fr_1fr_2fr] border-b border-black">
                            <div className="p-2 border-r border-black flex items-center justify-center">
                                <div className="w-12 h-12 bg-gray-300 flex items-center justify-center">
                                    IMG
                                </div>
                            </div>
                            <div className="p-2 border-r border-black">Python Fundamentals</div>
                            <div className="p-2 border-r border-black">
                                Learn the basics of Python programming including variables,
                                loops, conditionals, and operators.
                            </div>
                            <div className="p-2 border-r border-black">Web Development</div>
                            <div className="p-2 border-r border-black">42.000 đ</div>
                            <div className="p-2 border-r border-black text-green-600">
                                Published
                            </div>
                            <div className="p-2 flex gap-2">
                                <button className="border-2 border-black px-2">View Detail</button>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-4 mt-4">
                        <button className="border-2 border-black px-3 py-1">Prev</button>
                        <button className="border-2 border-black px-3 py-1">1</button>
                        <button className="border-2 border-black px-3 py-1">2</button>
                        <button className="border-2 border-black px-3 py-1">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

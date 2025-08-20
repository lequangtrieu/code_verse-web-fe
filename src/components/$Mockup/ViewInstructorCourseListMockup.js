import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewInstructorCourseListMockup() {
    return (
        <div className="bg-white flex items-center justify-center p-6">
            {/* Outer Frame */}
            <div className="w-full max-w-[1400px] border-4 border-black">
                <div className="flex min-h-screen bg-white text-black font-mockup">
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
                        {/* Header */}
                        <div className="mb-4">
                            <h2 className="text-xl mb-2">Courses</h2>
                            <button className="px-4 py-2 border-2 border-black">
                                Create Course
                            </button>
                        </div>

                        {/* Filters */}
                        <div className="flex gap-4 mb-4">
                            <input
                                className="border-2 border-black px-3 py-1 flex-1"
                                placeholder="Search by title or description"
                            />
                            <div className="border-2 border-black px-3 py-1">All Categories ▼</div>
                            <div className="border-2 border-black px-3 py-1">All Status ▼</div>
                            <div className="border-2 border-black px-3 py-1 w-16 text-center">%</div>
                            <button className="px-3 py-1 border-2 border-black">Apply Discount</button>
                            <button className="px-3 py-1 border-2 border-black">Remove Discount</button>
                        </div>

                        {/* Table */}
                        <div className="border-2 border-black">
                            {/* Header Row */}
                            <div className="grid grid-cols-7 border-b-2 border-black font-bold text-center">
                                <div className="p-2 border-r-2 border-black">Discount</div>
                                <div className="p-2 border-r-2 border-black">Image</div>
                                <div className="p-2 border-r-2 border-black">Title</div>
                                <div className="p-2 border-r-2 border-black">Category</div>
                                <div className="p-2 border-r-2 border-black">Price</div>
                                <div className="p-2 border-r-2 border-black">Status</div>
                                <div className="p-2">Actions</div>
                            </div>

                            {/* Sample Rows */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="grid grid-cols-7 border-b border-black text-center">
                                    <div className="p-2 border-r border-black">50%</div>
                                    <div className="p-2 border-r border-black">[img]</div>
                                    <div className="p-2 border-r border-black">Course Title {i}</div>
                                    <div className="p-2 border-r border-black">Web Development</div>
                                    <div className="p-2 border-r border-black">{30000 + i * 10000} đ</div>
                                    <div className="p-2 border-r border-black">
                                        {i === 3 ? "Draft" : "Published"}
                                    </div>
                                    <div className="p-2 flex gap-2 justify-center">
                                        <button className="px-2 py-1 border-2 border-black text-xs">
                                            View Detail
                                        </button>
                                        {i !== 3 && (
                                            <button className="px-2 py-1 border-2 border-black text-xs">
                                                View Learners
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-4 mt-6">
                            <button className="px-3 py-1 border-2 border-black">Prev</button>
                            <button className="px-3 py-1 border-2 border-black">1</button>
                            <button className="px-3 py-1 border-2 border-black">2</button>
                            <button className="px-3 py-1 border-2 border-black">3</button>
                            <button className="px-3 py-1 border-2 border-black">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

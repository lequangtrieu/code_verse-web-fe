import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewUserListMockup() {
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
                <div className="flex-1 p-6">
                    <h2 className="text-xl font-bold mb-4">Accounts</h2>

                    {/* Top Bar */}
                    <div className="flex justify-between mb-4">
                        <button className="border-2 border-black px-4 py-2">
                            Create Learners from Excel
                        </button>
                        <div className="flex gap-2">
                            <input
                                placeholder="Search by name, email or role"
                                className="border-2 border-black px-2 py-1"
                            />
                            <select className="border-2 border-black px-2 py-1">
                                <option>Filter by Role</option>
                            </select>
                            <select className="border-2 border-black px-2 py-1">
                                <option>Filter by Status</option>
                            </select>
                        </div>
                    </div>

                    {/* Table */}
                    <div className="border-2 border-black">
                        {/* Header Row */}
                        <div className="grid grid-cols-5 border-b-2 border-black font-bold">
                            <div className="p-2 border-r-2 border-black">ID</div>
                            <div className="p-2 border-r-2 border-black">Full Name</div>
                            <div className="p-2 border-r-2 border-black">Email</div>
                            <div className="p-2 border-r-2 border-black">Role</div>
                            <div className="p-2">Actions</div>
                        </div>

                        {/* Example Row */}
                        <div className="grid grid-cols-5 border-b border-black">
                            <div className="p-2 border-r border-black">1</div>
                            <div className="p-2 border-r border-black">Nguyen Van A</div>
                            <div className="p-2 border-r border-black">a@gmail.com</div>
                            <div className="p-2 border-r border-black">LEARNER</div>
                            <div className="p-2 flex gap-2">
                                <button className="border-2 border-black px-2">Ban</button>
                                <button className="border-2 border-black px-2">View Detail</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-5 border-b border-black">
                            <div className="p-2 border-r border-black">2</div>
                            <div className="p-2 border-r border-black">Tran Van B</div>
                            <div className="p-2 border-r border-black">b@gmail.com</div>
                            <div className="p-2 border-r border-black">INSTRUCTOR</div>
                            <div className="p-2 flex gap-2">
                                <button className="border-2 border-black px-2">Ban</button>
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

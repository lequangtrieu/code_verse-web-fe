import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function UnlockUserMockupWithConfirm() {
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

                    {/* Table */}
                    <div className="border-2 border-black relative">
                        {/* Header Row */}
                        <div className="grid grid-cols-5 border-b-2 border-black font-bold">
                            <div className="p-2 border-r-2 border-black">ID</div>
                            <div className="p-2 border-r-2 border-black">Full Name</div>
                            <div className="p-2 border-r-2 border-black">Email</div>
                            <div className="p-2 border-r-2 border-black">Role</div>
                            <div className="p-2">Actions</div>
                        </div>

                        {/* Example Row with Confirm Popup */}
                        <div className="grid grid-cols-5 border-b border-black relative">
                            <div className="p-2 border-r border-black">7</div>
                            <div className="p-2 border-r border-black">Tran Van C</div>
                            <div className="p-2 border-r border-black">c@gmail.com</div>
                            <div className="p-2 border-r border-black">LEARNER</div>
                            <div className="p-2 flex gap-2 relative">
                                {/* Unban button */}
                                <button className="border-2 border-black px-2 bg-green-200">
                                    Unban
                                </button>
                                <button className="border-2 border-black px-2">View Detail</button>

                                {/* Confirmation Popup */}
                                <div className="absolute -top-16 left-0 border-2 border-black bg-white p-2 w-44 text-center shadow-lg">
                                    <p className="text-sm mb-2">Unban this user?</p>
                                    <div className="flex justify-center gap-2">
                                        <button className="border-2 border-black px-2">No</button>
                                        <button className="border-2 border-black px-2">Yes</button>
                                    </div>
                                </div>
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

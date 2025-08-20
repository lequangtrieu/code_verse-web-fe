import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewNotificationHistoryMockup() {
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center">
            {/* Outer Frame */}
            <div className="w-[95%] h-[95%] border-2 border-black flex font-mockup">
                {/* Sidebar */}
                <div className="w-1/5 border-r-2 border-black p-4">
                    <div className="mb-6">
                        <p>WELCOME,</p>
                        <p>USER@EMAIL.COM</p>
                    </div>
                    <ul className="space-y-2">
                        <li>My Profile</li>
                        <li>Dashboard</li>
                        <RoughNotation type="underline" show color="black">
                            <li>Notifications</li>
                        </RoughNotation>
                        <li>Management Courses</li>
                        <li>Management Trainings</li>
                        <li>Manage Balance</li>
                    </ul>
                    <div className="mt-10">
                        <p>Change Password</p>
                        <p>Logout</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6">
                    <h2 className="text-lg font-bold mb-4">Notification</h2>

                    {/* Table */}
                    <div className="border-2 border-black">
                        {/* Header Row */}
                        <div className="grid grid-cols-4 border-b-2 border-black font-bold">
                            <div className="p-2 border-r-2 border-black">Title</div>
                            <div className="p-2 border-r-2 border-black">Content</div>
                            <div className="p-2 border-r-2 border-black">Sender</div>
                            <div className="p-2">Created At</div>
                        </div>

                        {/* Example Row */}
                        <div className="grid grid-cols-4 border-b border-black">
                            <div className="p-2 border-r border-black">System Maintenance</div>
                            <div className="p-2 border-r border-black">
                                Our system will be undergoing maintenance on August 20th...
                            </div>
                            <div className="p-2 border-r border-black">Administrator</div>
                            <div className="p-2">11/08/2025, 13:28</div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="flex justify-center gap-4 mt-4">
                        <button className="border-2 border-black px-3 py-1">Prev</button>
                        <button className="border-2 border-black px-3 py-1">1</button>
                        <button className="border-2 border-black px-3 py-1">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

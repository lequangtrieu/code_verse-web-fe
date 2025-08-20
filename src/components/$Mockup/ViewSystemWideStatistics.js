import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewSystemStatisticsMockup() {
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center font-mockup">
            {/* Outer Frame */}
            <div className="w-[95%] h-[95%] border-4 border-black flex">
                {/* Sidebar */}
                <div className="w-1/5 border-r-4 border-black p-4">
                    <ul className="space-y-2">
                        <li>My Profile</li>
                        <RoughNotation type="underline" show color="black">
                            <li>System Statistics</li>
                        </RoughNotation>
                        <li>User Management</li>
                        <li>Approve Instructor Requests</li>
                        <li>Category Management</li>
                        <li>Course Management</li>
                        <li>Withdrawal Requests</li>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    <h2 className="font-bold text-xl mb-4">Dashboard</h2>

                    {/* Summary Cards */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="border-2 border-black p-4">
                            <p className="text-lg font-bold">18</p>
                            <p>Total Users</p>
                        </div>
                        <div className="border-2 border-black p-4">
                            <p className="text-lg font-bold">14</p>
                            <p>Total Courses</p>
                        </div>
                        <div className="border-2 border-black p-4">
                            <p className="text-lg font-bold">17</p>
                            <p>Total Enrollments</p>
                        </div>
                        <div className="border-2 border-black p-4">
                            <p className="text-lg font-bold">18</p>
                            <p>Total Orders</p>
                        </div>
                        <div className="border-2 border-black p-4">
                            <p className="text-lg font-bold">126.000 đ</p>
                            <p>Total Revenue</p>
                        </div>
                        <div className="border-2 border-black p-4">
                            <p className="text-lg font-bold">8</p>
                            <p>User Reports</p>
                        </div>
                    </div>

                    {/* User Role Distribution */}
                    <div className="border-2 border-black p-4 mb-6">
                        <h3 className="font-bold mb-2">User Role Distribution</h3>
                        <div className="w-full h-60 bg-gray-100 flex items-center justify-center">
                            <div>
                                <p>Pie Chart (Sample Data)</p>
                                <ul className="text-sm mt-2">
                                    <li>Admin: 5.6%</li>
                                    <li>Instructor: 16.7%</li>
                                    <li>Learner: 77.8%</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* Revenue Analysis */}
                    <div>
                        <h3 className="font-bold mb-2">Revenue Analysis</h3>
                        <div className="grid grid-cols-3 gap-4">
                            {/* Year */}
                            <div className="border-2 border-black p-4">
                                <p className="font-bold mb-2">Revenue by Year</p>
                                <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                                    Line Chart (2025: 126k)
                                </div>
                            </div>
                            {/* Month */}
                            <div className="border-2 border-black p-4">
                                <p className="font-bold mb-2">Revenue by Month</p>
                                <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                                    Line Chart (Jul: 66k → Aug: 60k)
                                </div>
                            </div>
                            {/* Quarter */}
                            <div className="border-2 border-black p-4">
                                <p className="font-bold mb-2">Revenue by Quarter</p>
                                <div className="w-full h-40 bg-gray-100 flex items-center justify-center">
                                    Line Chart (Q3-2025: 126k)
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

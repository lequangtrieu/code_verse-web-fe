import React from "react";
import { RoughNotation } from "react-rough-notation";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    BarChart,
    Bar,
    ResponsiveContainer,
} from "recharts";

export default function ViewCourseAnalyticsMockup() {
    // Sample data
    const enrollmentData = [
        { month: "Jan", Java: 0, Python: 0, JS: 0 },
        { month: "Jun", Java: 1, Python: 1, JS: 1 },
        { month: "Jul", Java: 2, Python: 3, JS: 3 },
        { month: "Aug", Java: 2, Python: 1, JS: 5 },
        { month: "Sep", Java: 0, Python: 0, JS: 0 },
    ];

    const ratingData = [
        { course: "Java Programming", avg: 4.7, total: 2 },
        { course: "Python Fundamentals", avg: 0, total: 0 },
        { course: "JavaScript Basics", avg: 4, total: 3 },
    ];

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
                        <RoughNotation type="underline" show color="black">
                            <li>Dashboard</li>
                        </RoughNotation>
                        <li>Notifications</li>
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
                <div className="flex-1 p-6 overflow-y-auto">
                    <h2 className="text-lg font-bold mb-4">Dashboard</h2>

                    {/* Filters */}
                    <div className="flex gap-6 mb-6">
                        <div className="border-2 border-black p-2 w-1/3">Select Courses</div>
                        <div className="border-2 border-black p-2 w-1/3">Select Year</div>
                    </div>

                    {/* Enrollment Statistics */}
                    <div className="border-2 border-black mb-8">
                        <h3 className="font-bold p-2 border-b-2 border-black">
                            Monthly Enrollment Statistics 2025
                        </h3>
                        <div className="h-64 p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={enrollmentData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Line type="monotone" dataKey="Java" stroke="green" />
                                    <Line type="monotone" dataKey="Python" stroke="blue" />
                                    <Line type="monotone" dataKey="JS" stroke="orange" />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* Rating Statistics */}
                    <div className="border-2 border-black">
                        <h3 className="font-bold p-2 border-b-2 border-black">
                            Course Rating Statistics 2025
                        </h3>
                        <div className="h-64 p-4">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={ratingData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="course" />
                                    <YAxis />
                                    <Tooltip />
                                    <Legend />
                                    <Bar dataKey="avg" fill="green" name="Average Rating" />
                                    <Bar dataKey="total" fill="blue" name="Total Ratings" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

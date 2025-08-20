import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewLearnerListMockup() {
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
                        <li>Notifications</li>
                        <RoughNotation type="underline" show color="black">
                            <li>Management Courses</li>
                        </RoughNotation>
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
                    <h2 className="text-lg font-bold mb-4">Courses</h2>
                    {/* Popup Frame */}
                    <div className="border-2 border-black p-4 w-[80%] mx-auto relative">
                        <h3 className="font-bold mb-4">Java Programming for Beginners</h3>

                        {/* Table */}
                        <div className="border-2 border-black">
                            {/* Header Row */}
                            <div className="grid grid-cols-6 border-b-2 border-black font-bold">
                                <div className="p-2 border-r-2 border-black">Learner</div>
                                <div className="p-2 border-r-2 border-black">Completion</div>
                                <div className="p-2 border-r-2 border-black">Exp Gained</div>
                                <div className="p-2 border-r-2 border-black">Enrolled at</div>
                                <div className="p-2 border-r-2 border-black">Last studied at</div>
                                <div className="p-2">Completed at</div>
                            </div>

                            {/* Example Rows */}
                            {[
                                {
                                    learner: "Nguyen Van A",
                                    completion: "14%",
                                    exp: "200",
                                    enrolled: "2025-08-07",
                                    lastStudied: "2025-08-16",
                                    completed: "In Progress",
                                },
                                {
                                    learner: "Tran Thi B",
                                    completion: "36%",
                                    exp: "500",
                                    enrolled: "2025-08-02",
                                    lastStudied: "2025-08-15",
                                    completed: "In Progress",
                                },
                                {
                                    learner: "Le Van C",
                                    completion: "20%",
                                    exp: "300",
                                    enrolled: "2025-07-05",
                                    lastStudied: "2025-07-20",
                                    completed: "In Progress",
                                },
                                {
                                    learner: "Pham Thi D",
                                    completion: "0%",
                                    exp: "0",
                                    enrolled: "2025-07-01",
                                    lastStudied: "-",
                                    completed: "Not Started",
                                },
                                {
                                    learner: "Hoang Van E",
                                    completion: "100%",
                                    exp: "1200",
                                    enrolled: "2025-06-10",
                                    lastStudied: "2025-07-30",
                                    completed: "Completed",
                                },
                            ].map((row, idx) => (
                                <div
                                    key={idx}
                                    className="grid grid-cols-6 border-b border-black"
                                >
                                    <div className="p-2 border-r border-black">{row.learner}</div>
                                    <div className="p-2 border-r border-black">{row.completion}</div>
                                    <div className="p-2 border-r border-black">{row.exp}</div>
                                    <div className="p-2 border-r border-black">{row.enrolled}</div>
                                    <div className="p-2 border-r border-black">{row.lastStudied}</div>
                                    <div className="p-2">{row.completed}</div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-4 mt-4">
                            <button className="border-2 border-black px-3 py-1">Prev</button>
                            <button className="border-2 border-black px-3 py-1">1</button>
                            <button className="border-2 border-black px-3 py-1">Next</button>
                        </div>

                        {/* Annotation */}
                        <div className="absolute -right-24 top-8 text-sm">
                            <RoughNotation type="underline" show color="black">
                                ← Popup
                            </RoughNotation>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

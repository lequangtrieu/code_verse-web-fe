import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewUserViolationMockup() {
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
                        <li>Course Management</li>
                        <li>Report Reason Management</li>
                        <RoughNotation type="underline" show color="black">
                            <li>Violation Management</li>
                        </RoughNotation>
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
                    <h2 className="text-xl font-bold mb-4">User Reports</h2>

                    {/* Search and Filter */}
                    <div className="flex gap-4 mb-4">
                        <div className="border-2 border-black px-4 py-2 w-1/3">
                            Search by username or reason
                        </div>
                        <div className="border-2 border-black px-4 py-2 w-1/6">All Status ▼</div>
                    </div>

                    {/* Table */}
                    <table className="w-full border-2 border-black text-left">
                        <thead>
                            <tr className="border-b-2 border-black">
                                <th className="p-2 border-r-2 border-black">#</th>
                                <th className="p-2 border-r-2 border-black">Reported User</th>
                                <th className="p-2 border-r-2 border-black">Reason</th>
                                <th className="p-2 border-r-2 border-black">Evidence</th>
                                <th className="p-2 border-r-2 border-black">Status</th>
                                <th className="p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
                                <tr key={id} className="border-b-2 border-black">
                                    <td className="p-2 border-r-2 border-black">{id}</td>
                                    <td className="p-2 border-r-2 border-black">user{id}@mail.com</td>
                                    <td className="p-2 border-r-2 border-black">
                                        {id % 3 === 0 ? "Other" : id % 2 === 0 ? "Sharing Info" : "Spam"}
                                    </td>
                                    <td className="p-2 border-r-2 border-black">{id % 2 === 0 ? "View" : "N/A"}</td>
                                    <td className="p-2 border-r-2 border-black">PENDING</td>
                                    <td className="p-2">
                                        <button className="border-2 border-black px-2 py-1">View Detail</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

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

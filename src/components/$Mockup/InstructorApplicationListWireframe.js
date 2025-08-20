import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function InstructorApplicationListWireframe() {
    return (
        <div className="flex min-h-screen bg-white text-black font-mono">
            {/* Sidebar */}
            <div className="w-64 border-r border-black p-4">
                <h3 className="font-bold mb-6">[ ADMIN PANEL ]</h3>
                <ul className="space-y-3 text-sm">
                    <li>▢ Dashboard</li>
                    <li>▢ System Statistics</li>
                    <li>▢ User Management</li>
                    <li>
                        <RoughNotation type="box" show={true} color="black" strokeWidth={2}>
                            View Instructor Applications
                        </RoughNotation>
                    </li>
                    <li>▢ Course Management</li>
                    <li>▢ Withdrawal Requests</li>
                    <li>▢ Settings</li>
                </ul>
            </div>

            {/* Main */}
            <div className="flex-1 p-8">
                <h2 className="text-2xl font-bold mb-4">
                    <RoughNotation type="underline" show={true} color="black" strokeWidth={2}>
                        Instructor Application List
                    </RoughNotation>
                </h2>

                {/* Search Bar */}
                <input
                    placeholder="Search by name, email, or background..."
                    className="border border-black w-full p-2 mb-6"
                />

                {/* Table */}
                <div className="border border-black">
                    <div className="grid grid-cols-5 border-b border-black font-bold p-2 text-sm">
                        <div>Full Name</div>
                        <div>Email</div>
                        <div>Background</div>
                        <div>Credentials</div>
                        <div>Actions</div>
                    </div>

                    {[1, 2].map((i) => (
                        <div
                            key={i}
                            className="grid grid-cols-5 border-b border-black p-2 text-xs"
                        >
                            <div>Applicant {i}</div>
                            <div>applicant{i}@gmail.com</div>
                            <div>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
                                vitae.
                            </div>
                            <div>[View Credentials]</div>
                            <div>
                                <button className="border-2 border-black px-2 py-1">
                                    View Detail
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center mt-4 space-x-2">
                    <button className="border border-black px-2">{"<"}</button>
                    <button className="border border-black px-2">1</button>
                    <button className="border border-black px-2">{">"}</button>
                </div>
            </div>
        </div>
    );
}

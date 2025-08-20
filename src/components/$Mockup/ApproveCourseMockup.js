import React, { useState } from "react";
import { RoughNotation } from "react-rough-notation";

export default function ApproveCourseMockup() {
    const [showApproveModal, setShowApproveModal] = useState(false);
    const [showRejectModal, setShowRejectModal] = useState(false);

    return (
        <div className="w-full h-screen bg-white flex justify-center items-center font-mockup">
            {/* Outer Frame */}
            <div className="w-[95%] h-[95%] border-4 border-black flex">
                {/* Sidebar */}
                <div className="w-1/5 border-r-4 border-black p-4">
                    <ul className="space-y-2">
                        <li>My Profile</li>
                        <li>System Statistics</li>
                        <li>User Management</li>
                        <li>Approve Instructor Requests</li>
                        <li>Category Management</li>
                        <RoughNotation type="underline" show color="black">
                            <li>Course Management</li>
                        </RoughNotation>
                    </ul>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {/* Course Info */}
                    <div className="border-2 border-black p-4 mb-4 flex gap-4">
                        <div className="w-32 h-32 bg-gray-200 flex items-center justify-center">
                            IMG
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Java Programming for Beginners</h2>
                            <p>
                                Learn Java from scratch with hands-on examples and step-by-step
                                explanations.
                            </p>
                            <p>Category: Web Development</p>
                            <p>Level: INTERMEDIATE</p>
                            <p>Language: JAVA</p>
                            <p>Price: 50.000 đ</p>
                            <p>Status: <span className="text-yellow-600">Pending</span></p>
                        </div>
                    </div>

                    {/* Modules & Lessons */}
                    <div className="border-2 border-black p-4">
                        <h3 className="font-bold mb-2">Course Modules</h3>
                        <div className="flex gap-4">
                            {/* Left: Modules */}
                            <div className="w-1/3 border-2 border-black">
                                <div className="p-2 font-bold border-b-2 border-black">Modules</div>
                                <div className="p-2 bg-gray-200">Variables and Data Types</div>
                                <div className="p-2">Variables and Declaration in Java</div>
                                <div className="p-2">Control Structures</div>
                            </div>

                            {/* Right: Lesson Detail */}
                            <div className="flex-1 border-2 border-black p-4">
                                <h4 className="font-bold mb-2">Lesson: Variables and Declaration in Java</h4>
                                <div className="flex gap-4 mb-2">
                                    <button className="underline">Theory</button>
                                    <button>Exercise</button>
                                </div>
                                <p className="mb-2">
                                    In Java, variables must be declared with a specific type before use.
                                    Common types include int, double, String, etc.
                                </p>
                                <div className="w-full h-40 bg-black text-white flex items-center justify-center">
                                    VIDEO
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Buttons */}
                    <div className="flex justify-end gap-4 mt-4">
                        <button
                            onClick={() => setShowApproveModal(true)}
                            className="border-2 border-black bg-green-300 px-4 py-1"
                        >
                            Accept
                        </button>
                        <button
                            onClick={() => setShowRejectModal(true)}
                            className="border-2 border-black bg-red-300 px-4 py-1"
                        >
                            Reject
                        </button>
                    </div>
                </div>
            </div>

            {/* Modal Confirm Accept */}
            {showApproveModal && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70">
                    <div className="border-4 border-black bg-white p-6 w-80">
                        <p className="mb-4">Approve this course?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowApproveModal(false)}
                                className="border-2 border-black px-4 py-1"
                            >
                                No
                            </button>
                            <button className="border-2 border-black bg-green-300 px-4 py-1">
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal Confirm Reject */}
            {showRejectModal && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-70">
                    <div className="border-4 border-black bg-white p-6 w-80">
                        <p className="mb-4">Reject this course?</p>
                        <div className="flex justify-end gap-4">
                            <button
                                onClick={() => setShowRejectModal(false)}
                                className="border-2 border-black px-4 py-1"
                            >
                                No
                            </button>
                            <button className="border-2 border-black bg-red-300 px-4 py-1">
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

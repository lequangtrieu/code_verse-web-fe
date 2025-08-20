import React, { useState } from "react";
import { RoughNotation } from "react-rough-notation";

export default function InstructorApprovalWireframe() {
    const [modal, setModal] = useState(null); // "approve" | "reject"

    return (
        <div className="p-6 bg-white text-black font-mono max-w-2xl mx-auto">
            <h2 className="text-xl font-bold mb-4">
                <RoughNotation type="underline" show={true} color="black">
                    Instructor Details - Tu Nguyen Minh Tien
                </RoughNotation>
            </h2>

            {/* Info box */}
            <div className="border border-black p-4 mb-6 text-sm space-y-2">
                <p><b>Name:</b> Tu Nguyen Minh Tien</p>
                <p><b>Email:</b> tutien29042003@gmail.com.vn</p>
                <p><b>Phone Number:</b> 0943541869</p>
                <p><b>Bio:</b> N/A</p>
                <p><b>Teaching Credentials:</b></p>

                {/* Fake credential image */}
                <div className="border border-dashed border-gray-500 h-40 flex items-center justify-center my-2">
                    <span>[ Teaching Credential Image ]</span>
                </div>

                <p><b>QR Code:</b> N/A</p>
                <p>
                    <b>Educational Background:</b> Inspiring a Passion for Programming!
                    Hello! My name is Tu Nguyen Minh Tien, and I am currently a Software
                    Engineer with over 10 years of experience in software development and
                    teaching. 🌟 Highlights: 📘 Proficient in multiple programming
                    languages: Java, C#, Python, JavaScript... 📚 Teaching experience at
                    FPT University, having guided hundreds of students from absolute
                    beginners to successfully building real-world projects. 🚀 “Learning
                    by Doing” approach – hands-on practice through projects simulating
                    real business scenarios. 🎯 Always staying up-to-date with the latest
                    technologies to help students keep pace with IT trends.
                </p>
                <p><b>Account Created:</b> 8/11/2025, 1:47:19 PM</p>
                <p><b>Account Updated:</b> 8/11/2025, 1:47:19 PM</p>
            </div>

            {/* Action buttons */}
            <div className="flex gap-4 justify-end">
                <button
                    onClick={() => setModal("reject")}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Reject
                </button>
                <button
                    onClick={() => setModal("approve")}
                    className="bg-black text-white px-4 py-2 rounded"
                >
                    Accept
                </button>
            </div>

            {/* Confirm Modal */}
            {modal && (
                <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
                    <div className="bg-white border-4 border-black p-6 w-96 space-y-4 rounded">
                        <h3 className="font-bold text-lg">
                            {modal === "approve"
                                ? "Approve this instructor?"
                                : "Reject this instructor?"}
                        </h3>
                        <p>Are you sure you want to continue?</p>
                        <div className="flex justify-end gap-3">
                            <button
                                className="border border-black px-3 py-1 "
                                onClick={() => setModal(null)}
                            >
                                No
                            </button>
                            <button
                                className="border-2 border-black px-3 py-1"
                                onClick={() => {
                                    alert(`${modal} confirmed!`);
                                    setModal(null);
                                }}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

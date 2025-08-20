import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ReportViolationMockup() {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-20">
            <div className="bg-white text-black font-mockup w-[500px] border-2 border-black rounded p-6 relative">
                {/* Title */}
                <p className="text-lg mb-4">
                    <RoughNotation type="underline" show={true} color="black">
                        Report Comment
                    </RoughNotation>
                </p>

                {/* Reason */}
                <div className="mb-4">
                    <p className="mb-1">Reason</p>
                    <div className="border-2 border-black px-3 py-2 flex justify-between">
                        <span>Select a reason</span>
                        <span>▼</span>
                    </div>
                    {/* Giả lập danh sách reason */}
                    <div className="border-2 border-black mt-2 p-2">
                        <p>Spam</p>
                        <p>Harassment</p>
                        <p>Inappropriate Content</p>
                    </div>
                </div>

                {/* Evidence */}
                <div className="mb-4">
                    <p className="mb-1">Evidence (optional) <button className="px-3 py-1 border-2 border-black">Upload</button></p>
                    <div className="flex items-center gap-2">

                        <div className="w-32 h-32 border-2 border-black flex items-center justify-center">
                            img
                        </div>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4 mt-6">
                    <button className="px-4 py-1 border-2 border-black">Cancel</button>
                    <button className="px-4 py-1 border-2 border-black">
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
}

import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ImportUsersFromExcelMockup() {
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center font-mockup">
            {/* Outer Frame */}
            <div className="w-[95%] h-[95%] border-4 border-black flex">
                {/* Background blur to simulate modal */}
                <div className="absolute inset-0 bg-gray-200 opacity-70"></div>

                {/* Popup */}
                <div className="relative z-10 w-[700px] border-4 border-black bg-white p-6 mx-auto my-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <RoughNotation type="underline" show color="black">
                            <h2 className="font-bold text-lg">Import Learners from Excel</h2>
                        </RoughNotation>
                        <button className="border-2 border-black px-2">X</button>
                    </div>

                    {/* Buttons */}
                    <div className="flex gap-2 mb-4">
                        <button className="border-2 border-black px-4 py-1">
                            Download Excel Template
                        </button>
                        <button className="border-2 border-black px-4 py-1">
                            Upload Excel File
                        </button>
                    </div>

                    {/* Table */}
                    <div className="border-2 border-black">
                        {/* Header row */}
                        <div className="grid grid-cols-[2fr_3fr_1fr] border-b-2 border-black font-bold">
                            <div className="p-2 border-r-2 border-black">Full Name</div>
                            <div className="p-2 border-r-2 border-black">Email</div>
                            <div className="p-2">Role</div>
                        </div>

                        {/* Row with error */}
                        <div className="grid grid-cols-[2fr_3fr_1fr] border-b border-black">
                            <div className="p-2 border-r border-black">Tien Tu Nguyen Minh</div>
                            <div className="p-2 border-r border-black text-red-500">
                                tientmde170657@fpt.edu.vn{" "}
                                <span className="ml-2">[Email exists]</span>
                            </div>
                            <div className="p-2">LEARNER</div>
                        </div>

                        {/* Row with error */}
                        <div className="grid grid-cols-[2fr_3fr_1fr] border-b border-black">
                            <div className="p-2 border-r border-black">Do Le Van</div>
                            <div className="p-2 border-r border-black text-red-500">
                                dolvde160538@fpt.edu.vn{" "}
                                <span className="ml-2">[Email exists]</span>
                            </div>
                            <div className="p-2">LEARNER</div>
                        </div>

                        {/* Row with error */}
                        <div className="grid grid-cols-[2fr_3fr_1fr] border-b border-black">
                            <div className="p-2 border-r border-black">Tinh Tu Minh</div>
                            <div className="p-2 border-r border-black text-red-500">
                                minhtinhtu28@gmail.com{" "}
                                <span className="ml-2">[Email exists]</span>
                            </div>
                            <div className="p-2">LEARNER</div>
                        </div>

                        {/* Valid row */}
                        <div className="grid grid-cols-[2fr_3fr_1fr] border-b border-black">
                            <div className="p-2 border-r border-black">Truc Tu Nguyen Minh</div>
                            <div className="p-2 border-r border-black">
                                tienganh1804@gmail.com
                            </div>
                            <div className="p-2">LEARNER</div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-4 mt-4">
                        <button className="border-2 border-black px-4 py-1">Cancel</button>
                        <button className="border-2 border-black px-4 py-1">Import</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

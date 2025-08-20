import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewEarningsBalanceMockup() {
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
                        <li>Management Courses</li>
                        <li>Management Trainings</li>
                        <RoughNotation type="underline" show color="black">
                            <li>Manage Balance</li>
                        </RoughNotation>
                    </ul>
                    <div className="mt-10">
                        <p>Change Password</p>
                        <p>Logout</p>
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 p-6 overflow-y-auto">
                    {/* Header with button */}
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-bold">Earnings Dashboard</h2>
                        <button className="border-2 border-black px-4 py-2">
                            Request Withdrawal
                        </button>
                    </div>

                    {/* Summary Section */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="border-2 border-black p-4 text-center">
                            <p className="font-bold">Total Course Revenue</p>
                            <p>96.000 đ</p>
                        </div>
                        <div className="border-2 border-black p-4 text-center">
                            <p className="font-bold">Instructor’s Income (70%)</p>
                            <p>67.200 đ</p>
                        </div>
                        <div className="border-2 border-black p-4 text-center">
                            <p className="font-bold">Current Available Balance</p>
                            <p>34.200 đ</p>
                        </div>
                    </div>

                    {/* Withdrawal History */}
                    <div className="border-2 border-black mb-6">
                        <h3 className="font-bold p-2 border-b-2 border-black">
                            Withdrawal History
                        </h3>
                        <div className="grid grid-cols-4 font-bold border-b-2 border-black">
                            <div className="p-2 border-r-2 border-black">Date</div>
                            <div className="p-2 border-r-2 border-black">Amount (đ)</div>
                            <div className="p-2 border-r-2 border-black">Status</div>
                            <div className="p-2">Note</div>
                        </div>

                        {/* Rows */}
                        <div className="grid grid-cols-4 border-b border-black">
                            <div className="p-2 border-r border-black">2025-08-07</div>
                            <div className="p-2 border-r border-black">20.000</div>
                            <div className="p-2 border-r border-black">CANCELLED</div>
                            <div className="p-2">Cancelled by instructor</div>
                        </div>
                        <div className="grid grid-cols-4 border-b border-black">
                            <div className="p-2 border-r border-black">2025-08-10</div>
                            <div className="p-2 border-r border-black">33.000</div>
                            <div className="p-2 border-r border-black">APPROVED</div>
                            <div className="p-2">Processed successfully</div>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-4 p-2">
                            <button className="border-2 border-black px-3 py-1">Prev</button>
                            <button className="border-2 border-black px-3 py-1">1</button>
                            <button className="border-2 border-black px-3 py-1">Next</button>
                        </div>
                    </div>

                    {/* Course Income Detail */}
                    <div className="border-2 border-black">
                        <h3 className="font-bold p-2 border-b-2 border-black">
                            Course Income Detail
                        </h3>
                        <div className="grid grid-cols-4 font-bold border-b-2 border-black">
                            <div className="p-2 border-r-2 border-black">Date</div>
                            <div className="p-2 border-r-2 border-black">Course</div>
                            <div className="p-2 border-r-2 border-black">Learner</div>
                            <div className="p-2">Amount (đ)</div>
                        </div>

                        <div className="grid grid-cols-4 border-b border-black">
                            <div className="p-2 border-r border-black">2025-07-05</div>
                            <div className="p-2 border-r border-black">
                                Java Programming for Beginners
                            </div>
                            <div className="p-2 border-r border-black">Quang Triệu Lê</div>
                            <div className="p-2">10.500</div>
                        </div>
                        <div className="grid grid-cols-4 border-b border-black">
                            <div className="p-2 border-r border-black">2025-07-15</div>
                            <div className="p-2 border-r border-black">Python Fundamentals</div>
                            <div className="p-2 border-r border-black">Lê Văn Độ</div>
                            <div className="p-2">14.700</div>
                        </div>

                        {/* Pagination */}
                        <div className="flex justify-center gap-4 p-2">
                            <button className="border-2 border-black px-3 py-1">Prev</button>
                            <button className="border-2 border-black px-3 py-1">1</button>
                            <button className="border-2 border-black px-3 py-1">Next</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

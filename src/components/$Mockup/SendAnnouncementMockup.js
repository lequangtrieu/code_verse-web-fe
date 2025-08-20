import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function SendAnnouncementMockup() {
    return (
        <div className="w-full h-screen bg-white flex justify-center items-center font-mockup">
            {/* Outer Frame */}
            <div className="w-[95%] h-[95%] border-4 border-black flex">
                {/* Background blur */}
                <div className="absolute inset-0 bg-gray-200 opacity-70"></div>

                {/* Popup */}
                <div className="relative z-10 w-[700px] border-4 border-black bg-white p-6 mx-auto my-auto">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <RoughNotation type="underline" show color="black">
                            <h2 className="font-bold text-lg">Send Announcement</h2>
                        </RoughNotation>
                        <button className="border-2 border-black px-2">X</button>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        <div>
                            <label className="block font-bold">* Title</label>
                            <input
                                type="text"
                                className="w-full border-2 border-black p-2"
                                placeholder="Enter announcement title"
                            />
                        </div>

                        <div>
                            <label className="block font-bold">* Content</label>
                            <textarea
                                className="w-full border-2 border-black p-2"
                                rows="4"
                                placeholder="Write announcement content..."
                            ></textarea>
                        </div>

                        {/* Audience */}
                        <div>
                            <label className="block font-bold mb-2">Select Audience</label>
                            <div className="flex gap-2 flex-wrap">
                                <button className="border-2 border-black px-3 py-1">ALL</button>
                                <button className="border-2 border-black px-3 py-1">ADMIN</button>
                                <button className="border-2 border-black px-3 py-1">INSTRUCTOR</button>
                                <button className="border-2 border-black px-3 py-1">LEARNER</button>
                            </div>
                        </div>

                        {/* Schedule Time */}
                        <div>
                            <label className="block font-bold">Schedule (Optional)</label>
                            <input
                                type="datetime-local"
                                className="w-full border-2 border-black p-2"
                            />
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-4 mt-6">
                        <button className="border-2 border-black px-4 py-1">Cancel</button>
                        <button className="border-2 border-black px-4 py-1">Send Now</button>
                        <button className="border-2 border-black px-4 py-1">Schedule</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

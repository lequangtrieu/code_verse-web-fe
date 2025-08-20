import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ReviewCompletedCourseMockup() {
    return (
        <div className="min-h-screen bg-white text-black font-mockup p-8">
            {/* Tabs */}
            <div className="flex gap-6 border-b-2 border-black mb-6">
                <p>Curriculum</p>
                <p>
                    <RoughNotation type="underline" show={true} color="black">
                        Reviews
                    </RoughNotation>
                </p>
            </div>

            {/* Rating Summary */}
            <div className="border-2 border-black p-6 rounded mb-6">
                <div className="flex items-center gap-6">
                    <div className="text-center">
                        <p className="text-3xl font-bold">5.0</p>
                        <p>★★★★★</p>
                        <p>(2 Reviews)</p>
                    </div>
                    <div className="flex-1">
                        {[5, 4, 3, 2, 1].map((star, idx) => (
                            <div key={idx} className="flex items-center gap-2 mb-1">
                                <span>{star}★</span>
                                <div className="flex-1 border border-black h-3"></div>
                                <span>{star === 5 ? 2 : 0}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Customer Reviews */}
            <div className="mb-6">
                <p className="mb-2">
                    <RoughNotation type="box" show={true} color="black">
                        Customer Reviews
                    </RoughNotation>
                </p>

                {[1, 2].map((i) => (
                    <div key={i} className="border-b border-black py-3">
                        <div className="flex justify-between items-center mb-1">
                            <p>user{i}@gmail.com</p>
                            <div className="flex items-center gap-4">
                                <p>August {6 + i}, 2025</p>
                                <button className="px-2 py-1 border-2 border-black text-xs">
                                    Report
                                </button>
                            </div>
                        </div>
                        <p>★★★★★</p>
                        <p className="mt-1">
                            {i === 1 ? "Good" : "Khóa học oke khá ổn định nha"}
                        </p>
                    </div>
                ))}
            </div>

            {/* Submit Review */}
            <div>
                <p className="mb-3">
                    <RoughNotation type="highlight" show={true} color="lightgray">
                        Submit your review
                    </RoughNotation>
                </p>
                <div className="mb-3">
                    <p>* Your Rating</p>
                    <p>☆☆☆☆☆</p>
                </div>
                <div className="mb-3">
                    <p>Your Comment</p>
                    <textarea
                        className="w-full h-24 border-2 border-black p-2"
                        placeholder="Your thoughts about this course..."
                    />
                </div>
                <button className="px-4 py-2 border-2 border-black">
                    Submit Review
                </button>
            </div>
        </div>
    );
}

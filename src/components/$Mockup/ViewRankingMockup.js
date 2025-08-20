import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function ViewRankingMockup() {
    return (
        <div className="min-h-screen bg-white text-black font-mockup p-8">
            {/* Filter */}
            <div className="mb-6 flex items-center gap-4">
                <p>
                    <RoughNotation type="underline" show={true} color="black">
                        Select Period:
                    </RoughNotation>
                </p>
                <div className="border-2 border-black px-4 py-1 rounded">
                    All Time ▼
                </div>
            </div>

            {/* Top 3 Cards */}
            <div className="flex justify-center gap-6 mb-8">
                <div className="w-60 h-32 border-2 border-black flex flex-col items-center justify-center">
                    <p>#2 - user2@gmail.com</p>
                    <p>19999 EXP</p>
                </div>
                <div className="w-60 h-32 border-2 border-black flex flex-col items-center justify-center">
                    <p>
                        <RoughNotation type="box" show={true} color="black">
                            #1 - user1@gmail.com
                        </RoughNotation>
                    </p>
                    <div className="w-10 h-10 border border-black rounded-full my-2"></div>
                    <p>
                        <RoughNotation type="circle" show={true} color="black">
                            20829 EXP
                        </RoughNotation>
                    </p>
                </div>
                <div className="w-60 h-32 border-2 border-black flex flex-col items-center justify-center">
                    <p>#3 - user3@gmail.com</p>
                    <p>19347 EXP</p>
                </div>
            </div>

            {/* Table */}
            <div className="border-2 border-black">
                <div className="grid grid-cols-3 border-b-2 border-black font-bold text-center">
                    <div className="p-2 border-r-2 border-black">Rank</div>
                    <div className="p-2 border-r-2 border-black">User</div>
                    <div className="p-2">EXP</div>
                </div>

                {[4, 5, 6, 7, 8, 9, 10, 11, 12].map((rank, idx) => (
                    <div
                        key={rank}
                        className="grid grid-cols-3 border-b border-black text-center"
                    >
                        <div className="p-2 border-r border-black">{rank}</div>
                        <div className="p-2 border-r border-black">
                            user{idx}@gmail.com
                        </div>
                        <div className="p-2">18{80 - idx * 20}</div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-4 mt-6">
                <button className="px-3 py-1 border-2 border-black">Prev</button>
                <button className="px-3 py-1 border-2 border-black">1</button>
                <button className="px-3 py-1 border-2 border-black">2</button>
                <button className="px-3 py-1 border-2 border-black">3</button>
                <button className="px-3 py-1 border-2 border-black">Next</button>
            </div>
        </div>
    );
}

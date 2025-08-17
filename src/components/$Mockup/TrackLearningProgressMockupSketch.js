import { RoughNotation } from "react-rough-notation";

export default function TrackLearningProgressMockupSketch() {
    return (
        <div className="p-6 font-mockup">
            {/* Tabs */}
            <div className="flex gap-6 mb-6 border-b pb-2">
                <RoughNotation type="underline" show={true} strokeWidth={2} color="black">
                    <span className="font-semibold cursor-pointer">Suggested courses</span>
                </RoughNotation>
                <RoughNotation type="underline" show={true} strokeWidth={2} color="black">
                    <span className="font-semibold cursor-pointer">In progress</span>
                </RoughNotation>
                <RoughNotation type="underline" show={true} strokeWidth={2} color="black">
                    <span className="font-semibold cursor-pointer">Completed</span>
                </RoughNotation>
                <span className="ml-auto font-semibold">See all</span>
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-3 gap-6">
                {["Java", "Python", "JavaScript", "C++", "React", "Swift"].map(
                    (course, index) => (
                        <RoughNotation
                            key={index}
                            type="box"
                            show={true}
                            strokeWidth={2}
                            color="black"
                        >
                            <div className="p-4 border rounded-lg bg-white w-64">
                                <div className="h-24 bg-gray-200 flex items-center justify-center mb-4">
                                    <span>{course} Thumbnail</span>
                                </div>
                                <p className="text-sm mb-2">
                                    <span className="font-bold">{course} Programming</span>
                                </p>
                                <p className="text-xs text-gray-600 mb-1">
                                    14 Lessons • 2 hr 15 min
                                </p>
                                <p className="text-xs text-gray-600 mb-2">Instructor: Le Quang Trieu</p>
                                <p className="text-xs mb-2">⭐ 5.0 (1)</p>
                                <div className="h-2 bg-gray-200 rounded">
                                    <div className="h-2 bg-black rounded w-1/4"></div>
                                </div>
                                <p className="text-xs mt-1">Progress: 25%</p>
                            </div>
                        </RoughNotation>
                    )
                )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-3">
                {[1, 2, 3].map((page) => (
                    <RoughNotation
                        key={page}
                        type="circle"
                        show={true}
                        strokeWidth={2}
                        color="black"
                    >
                        <button className="w-8 h-8 flex items-center justify-center text-sm font-semibold bg-white">
                            {page}
                        </button>
                    </RoughNotation>
                ))}
            </div>
        </div>
    );
}

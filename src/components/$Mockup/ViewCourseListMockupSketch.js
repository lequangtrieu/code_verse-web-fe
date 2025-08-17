import { RoughNotation } from "react-rough-notation";

export default function ViewCourseListMockupSketch() {
    return (
        <div className="flex min-h-screen bg-white font-mockup">
            {/* Sidebar Filter */}
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <aside className="w-64 p-4">
                    <h3 className="font-bold mb-4">Filter Courses</h3>

                    {/* Category */}
                    <div className="mb-4">
                        <label className="block mb-2">Category</label>
                        <ul className="space-y-1">
                            <li><input type="checkbox" /> All</li>
                            <li><input type="checkbox" /> Web Development</li>
                            <li><input type="checkbox" /> Data Science</li>
                            <li><input type="checkbox" /> Machine Learning</li>
                        </ul>
                    </div>

                    {/* Ratings */}
                    <div className="mb-4">
                        <label className="block mb-2">Ratings</label>
                        <ul className="space-y-1">
                            <li><input type="checkbox" /> 4 ★ & up</li>
                            <li><input type="checkbox" /> 3 ★ & up</li>
                        </ul>
                    </div>

                    {/* Price */}
                    <div className="mb-4">
                        <label className="block mb-2">Price</label>
                        <ul>
                            <li><input type="checkbox" /> Free</li>
                            <li><input type="checkbox" /> Paid</li>
                        </ul>
                    </div>

                    {/* Duration */}
                    <div className="mb-4">
                        <label className="block mb-2">Duration</label>
                        <ul className="space-y-1">
                            <li><input type="checkbox" /> Less than 2 hours</li>
                            <li><input type="checkbox" /> 2–6 hours</li>
                            <li><input type="checkbox" /> 6–12 hours</li>
                        </ul>
                    </div>

                    {/* Level */}
                    <div className="mb-4">
                        <label className="block mb-2">Level</label>
                        <ul className="space-y-1">
                            <li><input type="checkbox" /> Beginner</li>
                            <li><input type="checkbox" /> Intermediate</li>
                            <li><input type="checkbox" /> Advanced</li>
                        </ul>
                    </div>

                    {/* Language */}
                    <div className="mb-4">
                        <label className="block mb-2">Language</label>
                        <ul className="space-y-1">
                            <li><input type="checkbox" /> Java</li>
                            <li><input type="checkbox" /> Python</li>
                        </ul>
                    </div>

                    <button className="mt-3 text-sm underline">Reset All</button>
                </aside>
            </RoughNotation>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Search + Sort */}
                <div className="flex items-center justify-between mb-6">
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="px-3 py-2 w-64 bg-white border-none outline-none"
                        />
                    </RoughNotation>
                    <div className="flex gap-4">
                        <span>Sort by Rating</span>
                        <span>Sort by Price</span>
                    </div>
                </div>

                {/* Course Grid */}
                <div className="grid grid-cols-3 gap-6">
                    {Array.from({ length: 6 }).map((_, i) => (
                        <RoughNotation
                            key={i}
                            type="box"
                            show={true}
                            strokeWidth={2}
                            color="black"
                        >
                            <div className="p-4 bg-white">
                                <div className="h-24 mb-2 bg-gray-100 flex items-center justify-center">
                                    [Thumbnail]
                                </div>
                                <h4 className="font-bold mb-1">Course Title</h4>
                                <p className="text-sm mb-1">Category: Web Development</p>
                                <p className="text-sm mb-1">Instructor: Le Thu Hien</p>
                                <p className="text-sm mb-1">Lessons: 12 | Duration: 3h</p>
                                <p className="text-sm mb-1">Language: Java</p>
                                <p className="text-sm mb-1">Rating: ★★★★☆</p>
                                <p className="font-semibold">Price: Free</p>
                            </div>
                        </RoughNotation>
                    ))}
                </div>

                {/* Pagination */}
                <div className="flex justify-center gap-2 mt-8">
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <span className="px-2">1</span>
                    </RoughNotation>
                    <span className="px-2">2</span>
                    <span className="px-2">3</span>
                </div>
            </div>
        </div>
    );
}

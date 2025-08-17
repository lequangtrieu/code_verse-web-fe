import { RoughNotation } from "react-rough-notation";

export default function ViewCourseDetailMockupSketch() {
    return (
        <div className="flex min-h-screen bg-white font-mockup">
            <div className="container mx-auto p-6 flex gap-6">
                {/* Main Content */}
                <div className="flex-1">
                    {/* Course Thumbnail */}
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="w-full h-56 bg-white mb-6 flex items-center justify-center">
                            <span>Course Thumbnail</span>
                        </div>
                    </RoughNotation>

                    {/* Course Title & Category */}
                    <h2 className="text-2xl font-bold mb-2">Java Programming for Beginners</h2>
                    <p className="mb-4 text-sm">Web Development</p>

                    {/* Course Info */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                        <p>Lessons: 14</p>
                        <p>Duration: 2 hr 15 min</p>
                        <p>Instructor: Từ Nguyễn Minh Tiến</p>
                        <p>Enrolled: 5 students</p>
                        <p>Price: 15.000₫</p>
                        <p>Rating: ★★★★☆ (24)</p>
                    </div>

                    {/* Description */}
                    <h3 className="font-semibold mb-2">Description</h3>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <p className="p-4 bg-white mb-6">
                            Learn Java from scratch with hands-on examples and explanations.
                        </p>
                    </RoughNotation>

                    {/* Curriculum */}
                    <h3 className="font-semibold mb-2">Curriculum</h3>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <ul className="p-4 space-y-2 bg-white mb-6">
                            <li>Variables and Data Types</li>
                            <li>Operators in Java</li>
                            <li>Control Flow Statements</li>
                            <li>Object-Oriented Programming</li>
                        </ul>
                    </RoughNotation>

                    {/* Comments */}
                    <h3 className="font-semibold mb-2">Reviews</h3>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="p-4 bg-white">
                            <p>Le Thu Hien: Great course!</p>
                            <p>Le Van Do: Very easy to follow.</p>
                        </div>
                    </RoughNotation>
                </div>

                {/* Sidebar */}
                <div className="w-80 space-y-6">
                    {/* Enrollment Box */}
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="p-4 bg-white">
                            <h3 className="font-bold mb-2">Enrolled</h3>
                            <button className="w-full py-2 bg-white font-semibold">Start Learning</button>
                        </div>
                    </RoughNotation>

                    {/* Popular Courses */}
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="p-4 bg-white">
                            <h3 className="font-bold mb-2">Popular Courses</h3>
                            <ul className="space-y-2">
                                <li>JavaScript Basics</li>
                                <li>Python Fundamentals</li>
                                <li>Java Advanced</li>
                            </ul>
                        </div>
                    </RoughNotation>
                </div>
            </div>
        </div>
    );
}

import { RoughNotation } from "react-rough-notation";

export default function ViewQuizResultMockupSketch() {
    return (
        <div className="flex min-h-screen bg-white font-mockup">
            {/* Lesson List Sidebar */}
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <aside className="w-64 p-4 border-r">
                    <h3 className="font-bold mb-4">Lesson List</h3>
                    <ul className="space-y-2">
                        <li>Overview, console.log and comments</li>
                        <li className="pl-4">- First Introduction</li>
                        <li className="pl-4">- String concatenation</li>
                        <li>Variable</li>
                        <li className="pl-4">- Variables</li>
                        <li className="pl-4">- Variables - Quiz</li>
                    </ul>
                </aside>
            </RoughNotation>

            {/* Quiz Result Content */}
            <div className="flex-1 p-6">
                {/* Quiz Status */}
                <h2 className="text-xl font-bold mb-2">Variables - Quiz</h2>
                <p className="mb-4">Quiz Status: <span className="font-semibold">Completed</span></p>

                {/* Summary Cards */}
                <div className="grid grid-cols-4 gap-4 mb-6">
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="p-4 text-center">Time Limit: 30 min</div>
                    </RoughNotation>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="p-4 text-center">Questions: 4</div>
                    </RoughNotation>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="p-4 text-center">Passing Score: 80%</div>
                    </RoughNotation>
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="p-4 text-center">Attempts: 3</div>
                    </RoughNotation>
                </div>

                {/* Attempt History */}
                <h3 className="font-bold mb-3">Attempt History</h3>
                <div className="space-y-4">
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="p-4">
                            <p>Status: Completed</p>
                            <p>Started: 7/29/2025, 11:54:30 PM</p>
                            <p>Completed: 7/29/2025, 11:54:40 PM</p>
                            <p>Exp Gained: 10</p>
                        </div>
                    </RoughNotation>

                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="p-4">
                            <p>Status: Failed</p>
                            <p>Started: 7/29/2025, 4:35:26 PM</p>
                            <p>Completed: 7/29/2025, 4:36:37 PM</p>
                            <p>Exp Gained: 0</p>
                        </div>
                    </RoughNotation>

                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <div className="p-4">
                            <p>Status: Failed</p>
                            <p>Started: 7/24/2025, 4:33:27 PM</p>
                            <p>Completed: 7/24/2025, 4:35:08 PM</p>
                            <p>Exp Gained: 0</p>
                        </div>
                    </RoughNotation>
                </div>
            </div>
        </div>
    );
}

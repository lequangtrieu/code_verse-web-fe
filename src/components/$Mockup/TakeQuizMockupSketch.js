import { RoughNotation } from "react-rough-notation";

export default function TakeQuizMockupSketch() {
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

            {/* Quiz Area */}
            <div className="flex-1 p-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Variables - Quiz</h2>
                    <span className="px-3 py-1 bg-green-100 text-green-600 rounded">
            Time Left: 29:50
          </span>
                </div>

                {/* Question Tabs */}
                <div className="flex gap-2 mb-4">
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <button className="px-3 py-1 bg-white">Q1</button>
                    </RoughNotation>
                    <button className="px-3 py-1 bg-white">Q2</button>
                    <button className="px-3 py-1 bg-white">Q3</button>
                    <button className="px-3 py-1 bg-white">Q4</button>
                </div>

                {/* Question Content */}
                <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                    <div className="p-4 mb-6">
                        <p className="font-semibold mb-3">
                            1. What is a variable in JavaScript?
                        </p>
                        <ul className="space-y-2">
                            <li>
                                <input type="radio" name="q1" /> A keyword used to perform
                                arithmetic operations.
                            </li>
                            <li>
                                <input type="radio" name="q1" /> A container for storing data
                                values.
                            </li>
                            <li>
                                <input type="radio" name="q1" /> A built-in function for
                                displaying output on the screen.
                            </li>
                            <li>
                                <input type="radio" name="q1" /> A data type representing text
                                and characters.
                            </li>
                        </ul>
                    </div>
                </RoughNotation>

                {/* Submit Button */}
                <div className="flex justify-end">
                    <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                        <button className="px-4 py-2 bg-white font-semibold">Submit</button>
                    </RoughNotation>
                </div>
            </div>
        </div>
    );
}

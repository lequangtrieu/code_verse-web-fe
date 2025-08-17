import { RoughNotation } from "react-rough-notation";

export default function ViewLessonDetailMockupSketch() {
    return (
        <div className="flex min-h-screen bg-white font-mockup">
            {/* Lesson List Sidebar */}
            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                <aside className="w-64 p-4 border-r">
                    <h3 className="font-bold mb-4">Lesson List</h3>
                    <ul className="space-y-2">
                        <li>Variables and Data Types</li>
                        <li>Operators in Java</li>
                        <li>Conditional Statements</li>
                    </ul>
                </aside>
            </RoughNotation>

            {/* Main Content */}
            <div className="flex-1 p-6">
                {/* Tabs */}
                <div className="flex gap-6 mb-4 border-b pb-2">
                    <span className="font-semibold">Theory</span>
                    <span className="font-semibold">Exercise</span>
                    <span className="font-semibold">Discussion</span>
                    <span className="font-semibold">AI Summary</span>

                    {/* Buttons on right */}
                    <div className="ml-auto flex gap-4">
                        <span className="font-semibold">Run Test</span>
                        <span className="font-semibold">Submit</span>
                    </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                    {/* Left Panel: Lesson Theory / Exercise / Discussion */}
                    <div>
                        <h2 className="text-lg font-bold mb-2">Declare and Print Variables</h2>
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <div className="p-4 bg-white mb-4">
                                <p>- Declare a variable age with the value entered from keyboard</p>
                                <p>- Declare a variable name with the value entered from keyboard</p>
                                <p>- Assign values and print them</p>
                            </div>
                        </RoughNotation>
                    </div>

                    {/* Right Panel: Code Editor + Results */}
                    <div>
                        {/* Code Editor */}
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <div className="bg-white p-4 h-64 mb-4">
                                <p>// Code Editor Area</p>
                                <p>public class Main {"{"}</p>
                                <p className="ml-4">public static void main(String[] args) {"{"}</p>
                                <p className="ml-8">System.out.println("Hello World");</p>
                                <p className="ml-4">{"}"}</p>
                                <p>{"}"}</p>
                            </div>
                        </RoughNotation>

                        {/* Test Results */}
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <div className="bg-white p-4">
                                <h3 className="font-bold mb-2">Test Results</h3>
                                <ul className="space-y-2">
                                    <li>Test 1: Input → 12 TrieuLQ Expected → 12 TrieuLQ, Result: Pass</li>
                                    <li>Test 2: Input → 15 TienTNM, Expected → 15 TienTNM, Result: Pass</li>
                                </ul>
                            </div>
                        </RoughNotation>
                    </div>
                </div>
            </div>
        </div>
    );
}

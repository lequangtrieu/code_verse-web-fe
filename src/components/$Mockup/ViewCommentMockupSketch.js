import { RoughNotation } from "react-rough-notation";

export default function ViewCommentMockupSketch() {
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
                    {/* Left Panel: Discussion Comments */}
                    <div>
                        <h2 className="text-lg font-bold mb-2">Discussion</h2>

                        {/* Write new comment */}
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <div className="p-4 bg-white mb-4">
                                <textarea
                                    className="w-full border rounded p-2 text-sm"
                                    placeholder="Write a new comment..."
                                ></textarea>
                                <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                                    <button className="px-4 py-2 bg-white font-semibold">Discuss</button>
                                </RoughNotation>
                            </div>
                        </RoughNotation>

                        {/* Existing Comments */}
                        <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                            <div className="p-4 bg-white space-y-4">
                                {/* Comment 1 - Có Edit/Delete + Reply */}
                                <div className="border rounded p-3 bg-gray-50">
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm font-bold">trieulq@gmail.com</p>
                                        <div className="flex gap-2">
                                            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                                                <button className="text-xs px-2 py-1 ">Edit</button>
                                            </RoughNotation>
                                            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                                                <button className="text-xs px-2 py-1 ">Delete</button>
                                            </RoughNotation>
                                        </div>
                                    </div>

                                    <pre className="bg-gray-100 p-2 text-xs mt-2 rounded">
{`import java.util.Scanner;
public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        int age = sc.nextInt();
        sc.nextLine();
        String name = sc.nextLine();
        System.out.println(age + " " + name);
    }
}`}
    </pre>

                                    {/* Reply Section */}
                                    <div className="mt-3 ml-6">
    <textarea
        className="w-full border rounded p-2 text-xs"
        placeholder="Write a reply..."
    />
                                        <div className="flex justify-end gap-3 mt-2">
                                            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                                                <button className="px-3 py-1 text-xs  font-semibold">Cancel</button>
                                            </RoughNotation>
                                            <RoughNotation type="box" show={true} strokeWidth={2} color="black">
                                                <button className="px-3 py-1 text-xs  font-semibold">Reply</button>
                                            </RoughNotation>
                                        </div>
                                    </div>


                                </div>

                                {/* Comment 2 - Không có Edit/Delete */}
                                <div className="border rounded p-3 bg-gray-50">
                                    <p className="text-sm font-bold">tientnm@gmail.com</p>
                                    <p className="text-xs mt-2">Tuyệt vời quá bạn ơi!</p>
                                </div>

                                {/* Comment 3 - Không có Edit/Delete */}
                                <div className="border rounded p-3 bg-gray-50">
                                    <p className="text-sm font-bold">dolv@fpt.edu.vn</p>
                                    <p className="text-xs mt-2">Bài hay quá</p>
                                </div>
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
                                    <li>Test 1: Input → 12 kobanwa, Expected → 12 kobanwa, Result: Pass</li>
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

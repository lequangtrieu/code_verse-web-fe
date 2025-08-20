// import React from "react";
// import { RoughNotation } from "react-rough-notation";

// export default function CourseInfoMockup() {
//     return (
//         <div className="flex h-screen font-mockup text-black">
//             {/* Sidebar */}
//             <div className="w-64 border-r-2 border-black p-4 space-y-4 bg-white">
//                 <p className="text-xs mb-6">
//                     WELCOME, <br /> CODEVERSE.AD@GMAIL.COM
//                 </p>
//                 <ul className="space-y-3 text-sm">
//                     <li>Dashboard</li>
//                     <li>Notifications</li>
//                     <li>Management Courses</li>
//                     <li>Management Trainings</li>
//                     <li>Manage Balance</li>
//                 </ul>
//                 <div className="mt-6 text-xs">
//                     <p>Change Password</p>
//                     <p>Logout</p>
//                 </div>
//             </div>

//             {/* Main content */}
//             <div className="flex-1 p-8 bg-white overflow-auto">
//                 <h2 className="text-2xl font-bold mb-6">
//                     <RoughNotation type="underline" show={true} color="black">
//                         Create Course
//                     </RoughNotation>
//                 </h2>

//                 {/* Step indicator */}
//                 <div className="flex items-center gap-6 mb-8">
//                     <div className="flex items-center gap-2">
//                         <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
//                             1
//                         </div>
//                         <span>Course Info</span>
//                     </div>
//                     <div className="flex-1 border-t-2 border-black"></div>
//                     <div className="flex items-center gap-2 opacity-50">
//                         <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
//                             2
//                         </div>
//                         <span>Course Material</span>
//                     </div>
//                 </div>

//                 {/* Form */}
//                 <div className="space-y-5 text-sm">
//                     {/* Title */}
//                     <div>
//                         <label className="block font-bold mb-1">* Course Title</label>
//                         <div className="border-2 border-black px-3 py-2 w-full">
//                             e.g., Learn React from Scratch
//                         </div>
//                     </div>

//                     {/* Description */}
//                     <div>
//                         <label className="block font-bold mb-1">* Course Description</label>
//                         <div className="border-2 border-black px-3 py-6 w-full">
//                             Write a short overview about the course
//                         </div>
//                     </div>

//                     {/* Category */}
//                     <div>
//                         <label className="block font-bold mb-1">* Category</label>
//                         <div className="border-2 border-black px-3 py-2 w-64">Web Development</div>
//                     </div>

//                     {/* Cover image */}
//                     <div>
//                         <label className="block font-bold mb-1">* Course Cover Image</label>
//                         <div className="border-2 border-dashed border-black px-3 py-6 w-40 text-center">
//                             Upload Cover
//                         </div>
//                     </div>

//                     {/* Paid or Free */}
//                     <div>
//                         <label className="block font-bold mb-1">* Is this course paid?</label>
//                         <div className="flex gap-4">
//                             <div className="border-2 border-black px-4 py-1">Free</div>
//                             <div className="border-2 border-black px-4 py-1">Paid</div>
//                         </div>
//                     </div>

//                     {/* Level */}
//                     <div>
//                         <label className="block font-bold mb-1">* Course Level</label>
//                         <div className="border-2 border-black px-3 py-2 w-64">Beginner</div>
//                     </div>

//                     {/* Language */}
//                     <div>
//                         <label className="block font-bold mb-1">* Course Language</label>
//                         <div className="border-2 border-black px-3 py-2 w-64">Java</div>
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex gap-4 pt-4">
//                         <div className="border-2 border-black px-6 py-2">Cancel</div>
//                         <div className="border-2 border-black px-6 py-2">Save</div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React from "react";
// import { RoughNotation } from "react-rough-notation";

// export default function CourseMaterialMockup() {
//     return (
//         <div className="flex h-screen font-mockup text-black">
//             {/* Sidebar */}
//             <div className="w-64 border-r-2 border-black p-4 space-y-4 bg-white">
//                 <p className="text-xs mb-6">
//                     WELCOME, <br /> TIENTNMDE170657@FPT.EDU.VN
//                 </p>
//                 <ul className="space-y-3 text-sm">
//                     <li>Dashboard</li>
//                     <li>Notifications</li>
//                     <li>Management Courses</li>
//                     <li>Management Trainings</li>
//                     <li>Manage Balance</li>
//                 </ul>
//                 <div className="mt-6 text-xs">
//                     <p>Change Password</p>
//                     <p>Logout</p>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-8 bg-white overflow-auto">
//                 {/* Step Indicator */}
//                 <div className="flex items-center gap-6 mb-8">
//                     <div className="flex items-center gap-2 opacity-50">
//                         <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
//                             1
//                         </div>
//                         <span>Course Info</span>
//                     </div>
//                     <div className="flex-1 border-t-2 border-black"></div>
//                     <div className="flex items-center gap-2">
//                         <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
//                             2
//                         </div>
//                         <span>Course Material</span>
//                     </div>
//                 </div>

//                 {/* Content Box */}
//                 <div className="border-2 border-black p-4 flex gap-6">
//                     {/* Modules Section */}
//                     <div className="w-1/3 border-r-2 border-black pr-4">
//                         <h3 className="font-bold mb-4">Modules</h3>
//                         <div className="border-2 border-dashed border-black p-2 text-center mb-4">
//                             + Add Module
//                         </div>
//                         <div className="space-y-2">
//                             <div className="border-2 border-black px-3 py-2">Lesson 1</div>
//                             <div className="border-2 border-black px-3 py-2 bg-gray-100">
//                                 Lesson 2
//                             </div>
//                         </div>
//                     </div>

//                     {/* Lesson Form Section */}
//                     <div className="flex-1 space-y-4">
//                         <h3 className="font-bold">Lesson Form: Lesson 2</h3>

//                         {/* Tabs */}
//                         <div className="flex gap-6 border-b-2 border-black">
//                             <span className="font-bold">Theory</span>
//                             <span className="opacity-50">Exercise</span>
//                         </div>

//                         {/* Fields */}
//                         <div>
//                             <label className="block font-bold mb-1">* Theory Title</label>
//                             <div className="border-2 border-black px-3 py-2 w-full">
//                                 Enter theory title
//                             </div>
//                         </div>

//                         <div>
//                             <label className="block font-bold mb-1">* Theory Content</label>
//                             <div className="border-2 border-black px-3 py-16 w-full">
//                                 [editor mockup]
//                             </div>
//                         </div>

//                         <div>
//                             <div className="border-2 border-black px-6 py-2 w-32 text-center">
//                                 Save Theory
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Bottom Buttons */}
//                 <div className="flex justify-between mt-6">
//                     <div className="border-2 border-black px-6 py-2">Back</div>
//                     <div className="border-2 border-black px-6 py-2">Submit</div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React from "react";
import { RoughNotation } from "react-rough-notation";

export default function CourseMaterialExerciseMockup() {
    return (
        <div className="flex h-screen font-mockup text-black">
            {/* Sidebar */}
            <div className="w-64 border-r-2 border-black p-4 space-y-4 bg-white">
                <p className="text-xs mb-6">
                    WELCOME, <br /> TIENTNMDE170657@FPT.EDU.VN
                </p>
                <ul className="space-y-3 text-sm">
                    <li>Dashboard</li>
                    <li>Notifications</li>
                    <li>Management Courses</li>
                    <li>Management Trainings</li>
                    <li>Manage Balance</li>
                </ul>
                <div className="mt-6 text-xs">
                    <p>Change Password</p>
                    <p>Logout</p>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-8 bg-white overflow-auto">
                {/* Step Indicator */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="flex items-center gap-2 opacity-50">
                        <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                            1
                        </div>
                        <span>Course Info</span>
                    </div>
                    <div className="flex-1 border-t-2 border-black"></div>
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full border-2 border-black flex items-center justify-center">
                            2
                        </div>
                        <span>Course Material</span>
                    </div>
                </div>

                {/* Content Box */}
                <div className="border-2 border-black p-4 flex gap-6">
                    {/* Modules Section */}
                    <div className="w-1/3 border-r-2 border-black pr-4">
                        <h3 className="font-bold mb-4">Modules</h3>
                        <div className="border-2 border-dashed border-black p-2 text-center mb-4">
                            + Add Module
                        </div>
                        <div className="space-y-2">
                            <div className="border-2 border-black px-3 py-2">Lesson 1</div>
                            <div className="border-2 border-black px-3 py-2 bg-gray-100">
                                Lesson 2
                            </div>
                        </div>
                    </div>

                    {/* Lesson Form Section */}
                    <div className="flex-1 space-y-4">
                        <h3 className="font-bold">Lesson Form: Lesson 2</h3>

                        {/* Tabs */}
                        <div className="flex gap-6 border-b-2 border-black">
                            <span className="opacity-50">Theory</span>
                            <span className="font-bold">Exercise</span>
                        </div>

                        {/* Exercise Fields */}
                        <div className="grid grid-cols-2 gap-6">
                            {/* Left side */}
                            <div className="space-y-4">
                                <div>
                                    <label className="block font-bold mb-1">* Exercise Title</label>
                                    <div className="border-2 border-black px-3 py-2 w-full">
                                        Enter title
                                    </div>
                                </div>

                                <div>
                                    <label className="block font-bold mb-1">* Instruction</label>
                                    <div className="border-2 border-black px-3 py-10 w-full">
                                        Enter instruction
                                    </div>
                                </div>

                                <div className="border-2 border-black px-6 py-2 w-40 text-center">
                                    Save Exercise
                                </div>
                            </div>

                            {/* Right side */}
                            <div>
                                <label className="block font-bold mb-1">* Exercise Tasks</label>
                                <div className="border-2 border-dashed border-black p-2 text-center mb-2">
                                    + Add Task
                                </div>
                                <div className="border-2 border-black h-24 flex items-center justify-center">
                                    No data
                                </div>
                            </div>
                        </div>

                        {/* Test Cases */}
                        <div>
                            <label className="block font-bold mb-1">* Test Cases</label>
                            <div className="border-2 border-dashed border-black p-2 text-center mb-2">
                                + Add Test Case
                            </div>
                            <div className="border-2 border-black h-24 flex items-center justify-center">
                                No data
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Buttons */}
                <div className="flex justify-between mt-6">
                    <div className="border-2 border-black px-6 py-2">Back</div>
                    <div className="border-2 border-black px-6 py-2">Submit</div>
                </div>
            </div>
        </div>
    );
}



// import React from "react";
// import { RoughNotation } from "react-rough-notation";

// export default function ModuleMockup() {
//     return (
//         <div className="flex items-center justify-center w-full h-screen bg-gray-50">
//             <div className="border w-[400px] p-6 bg-white">
//                 <h3 className="font-bold mb-4">Module</h3>
//                 <div>
//                     <label>* Module Title</label>
//                     <RoughNotation type="box" show color="black">
//                         <input
//                             type="text"
//                             placeholder="e.g., Learn React from Scratch"
//                             className="border w-full p-2"
//                         />
//                     </RoughNotation>
//                 </div>

//                 <div className="flex justify-end gap-4 mt-4">
//                     <button className="border px-4 py-2">Cancel</button>
//                     <button className="border px-4 py-2">Save</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React from "react";
// import { RoughNotation } from "react-rough-notation";

// export default function LessonMockup() {
//   return (
//     <div className="flex items-center justify-center w-full h-screen bg-gray-50">
//       <div className="border w-[450px] p-6 bg-white">
//         <h3 className="font-bold mb-4">Lesson</h3>

//         <div className="space-y-3">
//           <div>
//             <label>* Lesson Title</label>
//             <RoughNotation type="underline" show color="black">
//               <input type="text" className="border w-full p-2" />
//             </RoughNotation>
//           </div>

//           <div>
//             <label>* Lesson Type</label>
//             <select className="border w-full p-2">
//               <option>Code</option>
//               <option>Theory</option>
//             </select>
//           </div>

//           <div>
//             <label>* Estimated Duration (mins)</label>
//             <input type="number" className="border w-full p-2" />
//           </div>

//           <div>
//             <label>* Exp Reward</label>
//             <input type="number" className="border w-full p-2" />
//           </div>
//         </div>

//         <div className="flex justify-end gap-4 mt-4">
//           <button className="border px-4 py-2">Cancel</button>
//           <button className="border px-4 py-2">Save</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// import React from "react";
// import { RoughNotation } from "react-rough-notation";

// export default function LessonTheoryMockup() {
//     return (
//         <div className="flex w-full h-screen border">
//             <div className="w-1/4 border-r p-4">
//                 <h3>Modules</h3>
//                 <div className="border p-2 mt-2">+ Add Module</div>
//                 <div className="border p-2 mt-2">Module 1</div>
//             </div>

//             <div className="flex-1 p-6">
//                 <h3 className="font-bold mb-4">Lesson Form: [ModuleName]</h3>

//                 <div className="flex gap-4 mb-4">
//                     <RoughNotation type="underline" show color="black">
//                         <button className="border px-4 py-2">Theory</button>
//                     </RoughNotation>
//                     <button className="border px-4 py-2">Exercise</button>
//                 </div>

//                 <div>
//                     <label>* Theory Title</label>
//                     <input type="text" className="border w-full p-2 mb-3" />
//                 </div>

//                 <div>
//                     <label>* Theory Content</label>
//                     <textarea className="border w-full p-20"></textarea>
//                 </div>

//                 <div className="flex gap-4 mt-4">
//                     <button className="border px-4 py-2">Save Theory</button>
//                     <button className="border px-4 py-2">Submit</button>
//                 </div>
//             </div>
//         </div>
//     );
// }

// import React from "react";
// import { RoughNotation } from "react-rough-notation";

// export default function LessonExerciseMockup() {
//     return (
//         <div className="flex w-full h-screen border">
//             <div className="w-1/4 border-r p-4">
//                 <h3>Modules</h3>
//                 <div className="border p-2 mt-2">+ Add Module</div>
//                 <div className="border p-2 mt-2">Module 1</div>
//             </div>

//             <div className="flex-1 p-6">
//                 <h3 className="font-bold mb-4">Lesson Form: [ModuleName]</h3>

//                 <div className="flex gap-4 mb-4">
//                     <button className="border px-4 py-2">Theory</button>
//                     <RoughNotation type="underline" show color="black">
//                         <button className="border px-4 py-2">Exercise</button>
//                     </RoughNotation>
//                 </div>

//                 <div className="grid grid-cols-2 gap-6">
//                     {/* Exercise Left */}
//                     <div>
//                         <h4 className="font-bold mb-2">Exercise</h4>
//                         <label>* Exercise Title</label>
//                         <input type="text" className="border w-full p-2 mb-2" />

//                         <label>* Instruction</label>
//                         <textarea className="border w-full p-16"></textarea>

//                         <button className="border px-4 py-2 mt-2">Save Exercise</button>
//                     </div>

//                     {/* Exercise Right */}
//                     <div>
//                         <h4 className="font-bold mb-2">Exercise Tasks *</h4>
//                         <button className="border px-4 py-2">+ Add Task</button>
//                         <div className="border h-32 mt-2 flex items-center justify-center">
//                             No data
//                         </div>
//                     </div>
//                 </div>

//                 {/* Test Cases */}
//                 <div className="mt-6">
//                     <h4 className="font-bold mb-2">Test Cases *</h4>
//                     <button className="border px-4 py-2 mb-2">+ Add Test Case</button>
//                     <div className="border h-32 flex items-center justify-center">
//                         No data
//                     </div>
//                 </div>

//                 <div className="flex gap-4 mt-4">
//                     <button className="border px-4 py-2">Submit</button>
//                 </div>
//             </div>
//         </div>
//     );
// }



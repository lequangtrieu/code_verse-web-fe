import React, { useState } from "react";
import LessonSidebar from "../Courses/lesson/LessonSidebar";
import LessonContent from "../Courses/lesson/LessonContent";
import CodeEditor from "./CodeEditor";

// export const lessons = [
//   {
//     id: "bien",
//     title: "Biến",
//     subLessons: [
//       {
//         id: "bien-khai-bao",
//         title: "Khai báo biến",
//         theory: {
//           title: "Biến là gì?",
//           content: "Biến là nơi lưu trữ dữ liệu trong chương trình.",
//           example: `let x = 10; const y = "Hello"; var z = true;`,
//         },
//         exercise: {
//           title: "Khai báo các biến cơ bản",
//           tasks: ["Tạo biến tên, tuổi và học sinh", "In ra chúng"],
//           instruction: "Sử dụng let, const hoặc var để khai báo.",
//         },
//         testCases: [{ input: "", expected: "done" }],
//       },
//       {
//         id: "bien-so-sanh",
//         title: "So sánh let và var",
//         theory: {
//           title: "So sánh let và var",
//           content:
//             "Cả hai đều dùng để khai báo biến nhưng khác nhau về phạm vi.",
//           example: `if (true) { var x = 5; let y = 10; }`,
//         },
//         exercise: {
//           title: "Phân biệt let và var trong block",
//           tasks: ["Tạo biến bằng cả hai và in thử ngoài block"],
//           instruction: "Kiểm tra biến nào tồn tại sau block.",
//         },
//         testCases: [{ input: "", expected: "done" }],
//       },
//     ],
//   },
//   {
//     id: "toan-tu",
//     title: "Toán tử",
//     subLessons: [
//       {
//         id: "toan-tu-so-hoc",
//         title: "Toán tử số học",
//         theory: {
//           title: "Các phép toán cơ bản",
//           content: "Gồm +, -, *, /, %",
//           example: `let a = 10 + 5;`,
//         },
//         exercise: {
//           title: "Tính toán với hai số",
//           tasks: ["Tính tổng, hiệu, tích, thương của a, b"],
//           instruction: "Trả về tất cả kết quả dưới dạng chuỗi nối nhau.",
//         },
//         testCases: [
//           { input: "2,3,5", expected: "5" },
//           { input: "10,5", expected: "15" },
//         ],
//       },
//     ],
//   },
//   {
//     id: "ham",
//     title: "Hàm",
//     subLessons: [
//       {
//         id: "ham-co-ban",
//         title: "Hàm cơ bản",
//         theory: {
//           title: "Hàm là gì?",
//           content: "Hàm là khối mã có thể tái sử dụng",
//           example: `function greet(name) { return "Hi " + name; }`,
//         },
//         exercise: {
//           title: "Viết hàm chào tên người",
//           tasks: ["Truyền vào tên", "Trả lại chuỗi 'Hi <name>'"],
//           instruction: "Trả về chuỗi",
//         },
//         testCases: [
//           { input: "'Tuan'", expected: "Hi Tuan" },
//           { input: "'Lan'", expected: "Hi Lan" },
//         ],
//       },
//     ],
//   },
//   {
//     id: "chuoi",
//     title: "Chuỗi",
//     subLessons: [
//       {
//         id: "chuoi-co-ban",
//         title: "Ghép chuỗi",
//         theory: {
//           title: "Chuỗi và toán tử +",
//           content: "Dùng + để nối chuỗi",
//           example: `let fullName = "Nguyen" + " " + "An";`,
//         },
//         exercise: {
//           title: "Ghép họ tên",
//           tasks: ["Truyền vào họ và tên", "Trả lại chuỗi họ + ' ' + tên"],
//           instruction: "Dùng toán tử + để ghép",
//         },
//         testCases: [
//           { input: "'Nguyen', 'An'", expected: "Nguyen An" },
//           { input: "'Le', 'Tuan'", expected: "Le Tuan" },
//         ],
//       },
//     ],
//   },
// ];

export const lessons = [
  {
    id: "java-co-ban",
    title: "Java Cơ Bản",
    subLessons: [
      {
        id: "java-bien",
        title: "Biến trong Java",
        theory: {
          title: "Biến là gì?",
          content:
            "Biến trong Java dùng để lưu trữ giá trị dữ liệu, ví dụ: int, double, String.",
          example: `int age = 20;\nString name = "An";\ndouble height = 1.75;`,
        },
        exercise: {
          title: "Bài tập: Khai báo biến",
          tasks: [
            "Khai báo một biến kiểu int tên là age và gán giá trị 25",
            "Khai báo một biến kiểu String tên là name và gán giá trị 'Minh'",
            "In ra giá trị cả hai biến",
          ],
          instruction: "Sử dụng System.out.println để in giá trị.",
        },
        testCases: [
          { input: "2,3", expected: "5" },
          { input: "10,5", expected: "15" },
          { input: "10,2", expected: "12" },
        ],
      },
      {
        id: "java-toan-tu",
        title: "Toán tử",
        theory: {
          title: "Toán tử số học",
          content:
            "Java hỗ trợ các toán tử như +, -, *, /, % để thực hiện các phép tính.",
          example: `int a = 5 + 3;\nSystem.out.println(a); // 8`,
        },
        exercise: {
          title: "Bài tập: Tính toán cơ bản",
          tasks: [
            "Tạo 2 biến int: a = 10, b = 4",
            "In tổng, hiệu, tích và thương của a và b",
          ],
          instruction: "Chỉ in kết quả từng dòng một.",
        },
        testCases: [{ input: "CodeVerse", expected: "Hello CodeVerse" }],
      },
    ],
  },
];

export default function LessonLayout() {
  const [selectedSubLesson, setSelectedSubLesson] = useState(
    lessons[0]?.subLessons[0] || null
  );

  return (
    <div className="flex min-h-[800px] overflow-y-auto py-6">
      <LessonSidebar
        lessons={lessons}
        selectedLessonId={selectedSubLesson?.id}
        onSelect={setSelectedSubLesson}
      />
      {selectedSubLesson && (
        <>
          <LessonContent lesson={selectedSubLesson} />
          <CodeEditor
            key={selectedSubLesson?.id}
            defaultCode={selectedSubLesson.defaultCode}
            testCases={selectedSubLesson.testCases || []}
            // language={"java"}
          />
        </>
      )}
    </div>
  );
}

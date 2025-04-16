import React, { useState } from "react";
import LessonSidebar from "../Courses/lession/LessonSidebar";
import LessonContent from "../Courses/lession/LessonContent";
import CodeEditor from "./CodeEditor";

export const lessons = [
  {
    id: "bien",
    title: "Biến",
    subLessons: [
      {
        id: "bien-khai-bao",
        title: "Khai báo biến",
        theory: {
          title: "Biến là gì?",
          content:
            "Biến là nơi lưu trữ dữ liệu trong chương trình. Bạn có thể khai báo bằng var, let hoặc const.",
          example: `var name = "Tuan";\nlet age = 20;\nconst isStudent = true;`,
        },
        exercise: {
          title: "Bài tập: Khai báo biến",
          tasks: [
            "Khai báo biến a và gán giá trị 15",
            "Khai báo biến b và gán giá trị 'javascript'",
            "Khai báo biến c và gán giá trị true",
          ],
          instruction: "In ra tất cả các biến trong chương trình.",
        },
        defaultCode: `function run() {\n  // Viết mã của bạn ở đây\n}`,
      },
      {
        id: "bien-const-let-var",
        title: "Sự khác nhau giữa const, let và var",
        theory: {
          title: "So sánh const, let và var",
          content:
            "const không thể thay đổi. let và var có thể thay đổi nhưng khác nhau về phạm vi.",
          example: `const x = 5;\nlet y = 10;\nvar z = 15;`,
        },
        exercise: {
          title: "Bài tập: Phân biệt let và var",
          tasks: [
            "Tạo một biến với var và kiểm tra phạm vi trong block",
            "Tạo một biến với let và kiểm tra phạm vi",
          ],
          instruction: "So sánh kết quả khi khai báo với var và let.",
        },
        defaultCode: `function run() {\n  // Viết mã ở đây\n}`,
      },
    ],
  },
  {
    id: "kieu-du-lieu",
    title: "Kiểu dữ liệu",
    subLessons: [
      {
        id: "kieu-so",
        title: "Số",
        theory: {
          title: "Kiểu dữ liệu số",
          content: "Dùng để lưu trữ số nguyên và số thực.",
          example: `let x = 5;\nlet y = 3.14;`,
        },
        exercise: {
          title: "Bài tập: Số",
          tasks: ["Khai báo 2 số và tính tổng, hiệu, tích, thương của chúng"],
          instruction: "In kết quả các phép toán ra màn hình.",
        },
        defaultCode: `function run() {\n  // Viết mã của bạn ở đây\n}`,
      },
      {
        id: "kieu-chuoi",
        title: "Chuỗi",
        theory: {
          title: "Chuỗi là gì?",
          content: "Là tập hợp các ký tự, ví dụ 'Hello World'",
          example: `let msg = "Hello";`,
        },
        exercise: {
          title: "Bài tập: Chuỗi",
          tasks: ["Tạo một chuỗi", "Nối thêm một chuỗi khác", "In ra kết quả"],
          instruction: "Sử dụng toán tử + để nối chuỗi.",
        },
        defaultCode: `function run() {\n  // Viết mã của bạn ở đây\n}`,
      },
    ],
  },
  {
    id: "toan-tu",
    title: "Toán tử",
    subLessons: [
      {
        id: "toan-tu-so-hoc",
        title: "Toán tử số học",
        theory: {
          title: "Toán tử số học",
          content: "Bao gồm +, -, *, /, %",
          example: `let a = 10 + 5;`,
        },
        exercise: {
          title: "Bài tập: Tính toán",
          tasks: ["Thực hiện các phép toán với 2 biến a và b"],
          instruction: "Tính tổng, hiệu, tích, thương, chia lấy dư.",
        },
        defaultCode: `function run() {\n  // Viết mã ở đây\n}`,
      },
      {
        id: "toan-tu-so-sanh",
        title: "Toán tử so sánh",
        theory: {
          title: "Toán tử so sánh",
          content: "Dùng để so sánh giá trị như >, <, ==, ===, !=, !==",
          example: `5 > 3; // true`,
        },
        exercise: {
          title: "Bài tập: So sánh",
          tasks: [
            "So sánh 2 biến và in kết quả",
            "Kiểm tra bằng == và === khác nhau thế nào",
          ],
          instruction: "Giải thích kết quả so sánh.",
        },
        defaultCode: `function run() {\n  // Viết mã ở đây\n}`,
      },
    ],
  },
  {
    id: "if-else",
    title: "Câu lệnh điều kiện",
    subLessons: [
      {
        id: "if-co-ban",
        title: "If cơ bản",
        theory: {
          title: "If else",
          content:
            "Cho phép chương trình rẽ nhánh theo điều kiện đúng hoặc sai.",
          example: `if (x > 5) {\n  console.log("Lớn hơn 5");\n}`,
        },
        exercise: {
          title: "Bài tập: If",
          tasks: ["Kiểm tra số chẵn lẻ", "Kiểm tra điểm thi đậu/rớt"],
          instruction: "Sử dụng if else để phân loại.",
        },
        defaultCode: `function run() {\n  // Viết mã ở đây\n}`,
      },
    ],
  },
  {
    id: "vong-lap",
    title: "Vòng lặp",
    subLessons: [
      {
        id: "for-loop",
        title: "Vòng lặp for",
        theory: {
          title: "Cú pháp for",
          content: "Lặp lại hành động với số lần xác định.",
          example: `for(let i = 0; i < 5; i++) {\n console.log(i);\n}`,
        },
        exercise: {
          title: "Bài tập: In số",
          tasks: ["In các số từ 1 đến 10", "Tính tổng từ 1 đến 100"],
          instruction: "Dùng vòng lặp for.",
        },
        defaultCode: `function run() {\n  // Viết mã ở đây\n}`,
      },
    ],
  },
  {
    id: "ham",
    title: "Hàm",
    subLessons: [
      {
        id: "ham-co-ban",
        title: "Khai báo hàm",
        theory: {
          title: "Hàm trong JS",
          content: "Hàm giúp đóng gói khối mã có thể tái sử dụng nhiều lần.",
          example: `function sayHello(name) {\n  return "Hello " + name;\n}`,
        },
        exercise: {
          title: "Bài tập: Viết hàm",
          tasks: ["Viết hàm tính tổng hai số", "Gọi hàm với đối số 5 và 7"],
          instruction: "In kết quả ra màn hình.",
        },
        defaultCode: `function run() {\n  // Viết mã của bạn ở đây\n}`,
      },
    ],
  },
  {
    id: "array",
    title: "Mảng",
    subLessons: [
      {
        id: "array-co-ban",
        title: "Mảng cơ bản",
        theory: {
          title: "Mảng là gì?",
          content: "Mảng là tập hợp các giá trị được lưu trong cùng một biến.",
          example: `let arr = [1, 2, 3, 4, 5];\nconsole.log(arr[0]);`,
        },
        exercise: {
          title: "Bài tập: Truy cập mảng",
          tasks: ["Khai báo mảng gồm 3 tên", "In ra phần tử đầu tiên"],
          instruction: "Sử dụng chỉ số mảng để truy cập phần tử.",
        },
        defaultCode: `function run() {\n  // Viết mã của bạn ở đây\n}`,
      },
    ],
  },
  {
    id: "object",
    title: "Đối tượng",
    subLessons: [
      {
        id: "object-co-ban",
        title: "Đối tượng cơ bản",
        theory: {
          title: "Object là gì?",
          content:
            "Đối tượng lưu trữ các cặp key-value, đại diện cho thực thể.",
          example: `let person = { name: "Tuan", age: 22 };\nconsole.log(person.name);`,
        },
        exercise: {
          title: "Bài tập: Đối tượng",
          tasks: ["Tạo đối tượng student có name, age", "In ra giá trị name"],
          instruction: "Sử dụng toán tử chấm để truy cập.",
        },
        defaultCode: `function run() {\n  // Viết mã của bạn ở đây\n}`,
      },
    ],
  },
  {
    id: "switch",
    title: "Switch Case",
    subLessons: [
      {
        id: "switch-co-ban",
        title: "Câu lệnh switch",
        theory: {
          title: "Switch là gì?",
          content:
            "Switch là cấu trúc điều kiện dùng thay cho if-else nhiều điều kiện.",
          example: `let day = 2;\nswitch(day) {\n  case 1: console.log("Mon"); break;\n  case 2: console.log("Tue"); break;\n}`,
        },
        exercise: {
          title: "Bài tập: Ngày trong tuần",
          tasks: [
            "Tạo biến day với giá trị 1-7",
            "Dùng switch in ra tên ngày tương ứng",
          ],
          instruction: "Dùng switch-case.",
        },
        defaultCode: `function run() {\n  // Viết mã của bạn ở đây\n}`,
      },
    ],
  },
  {
    id: "function-expression",
    title: "Biểu thức hàm",
    subLessons: [
      {
        id: "arrow-function",
        title: "Arrow Function",
        theory: {
          title: "Arrow function là gì?",
          content: "Arrow function là cú pháp ngắn gọn để định nghĩa hàm.",
          example: `const add = (a, b) => a + b;\nconsole.log(add(2, 3));`,
        },
        exercise: {
          title: "Bài tập: Dùng arrow function",
          tasks: [
            "Viết arrow function tính diện tích hình tròn",
            "Gọi hàm với bán kính 5",
          ],
          instruction: "In kết quả ra màn hình.",
        },
        defaultCode: `function run() {\n  // Viết mã của bạn ở đây\n}`,
      },
    ],
  },
];

export default function LessonLayout() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <div className="flex min-h-[800px] overflow-y-auto py-6">
      <LessonSidebar
        lessons={lessons}
        selectedLessonId={selectedLesson?.id}
        onSelect={setSelectedLesson}
      />
      <LessonContent lesson={selectedLesson} />
      {/* <CodeEditor defaultCode={selectedLesson?.defaultCode || ""} /> */}
      <CodeEditor
        defaultCode={`function add(a, b) {\n  return a + b;\n}`}
        testCases={[
          {
            input: "0",
            expected: "0",
            timeLimit: 500,
          },
          {
            input: "1",
            expected: "1",
            timeLimit: 500,
          },
        ]}
      />
    </div>
  );
}

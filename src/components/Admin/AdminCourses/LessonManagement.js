import React, { useState } from "react";
import LessonSidebarAdmin from "./LessonSidebarAdmin";
import LessonContentAdmin from "./LessonContentAdmin";

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
];

export default function LessonManagement() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  return (
    <div className="flex  overflow-y-auto py-6">
      <LessonSidebarAdmin
        lessons={lessons}
        selectedLessonId={selectedLesson?.id}
        onSelect={setSelectedLesson}
      />
      <LessonContentAdmin lesson={selectedLesson} />
    </div>
  );
}

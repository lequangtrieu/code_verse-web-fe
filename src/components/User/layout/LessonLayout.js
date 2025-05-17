import React, { useState } from "react";
import LessonSidebar from "../Courses/lesson/LessonSidebar";
import LessonContent from "../Courses/lesson/LessonContent";
import CodeEditor from "./CodeEditor";
import QuizComponent from "../Courses/lesson/QuizComponent";

export const lessons = [
  {
    id: "java-co-ban",
    title: "Java Cơ Bản",
    subLessons: [
      {
        id: "java-bien",
        title: "Biến trong Java",
        completed: true,
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
  {
    id: "bien2",
    title: "Biến2",
    subLessons: [
      {
        id: "bien-khai-bao",
        title: "Khai báo biến",
        theory: {
          title: "Biến là gì?",
          content: "Biến là nơi lưu trữ dữ liệu trong chương trình.",
          example: `let x = 10; const y = "Hello"; var z = true;`,
        },
        exercise: {
          title: "Khai báo các biến cơ bản",
          tasks: ["Tạo biến tên, tuổi và học sinh", "In ra chúng"],
          instruction: "Sử dụng let, const hoặc var để khai báo.",
        },
        testCases: [{ input: "", expected: "done" }],
      },
      {
        id: "bien-so-sanh",
        title: "So sánh let và var",
        theory: {
          title: "So sánh let và var",
          content:
            "Cả hai đều dùng để khai báo biến nhưng khác nhau về phạm vi.",
          example: `if (true) { var x = 5; let y = 10; }`,
        },
        exercise: {
          title: "Phân biệt let và var trong block",
          tasks: ["Tạo biến bằng cả hai và in thử ngoài block"],
          instruction: "Kiểm tra biến nào tồn tại sau block.",
        },
        testCases: [{ input: "", expected: "done" }],
      },
    ],
  },
  {
    id: "java-co-ban",
    title: "Java Cơ Bản",
    subLessons: [
      {
        id: "java-bien",
        title: "Biến trong Java",
        completed: true,
        theory: {
          title: "So sánh let và var",
          content:
            "Cả hai đều dùng để khai báo biến nhưng khác nhau về phạm vi.",
          example: `if (true) { var x = 5; let y = 10; }`,
        },
        exercise: {
          title: "Phân biệt let và var trong block",
          tasks: ["Tạo biến bằng cả hai và in thử ngoài block"],
          instruction: "Kiểm tra biến nào tồn tại sau block.",
        },
        testCases: [{ input: "", expected: "done" }],
      },
      {
        id: "quiz-java-01",
        title: "Quiz: Biến và Toán tử",
        type: "quiz",
        questions: [
          {
            id: "q1",
            question:
              "Which keyword is used to declare an integer variable in Java?",
            options: ["let", "int", "var", "define"],
            correct: "int",
          },
          {
            id: "q2",
            question: "Which symbol is used for addition in Java?",
            options: ["+", "-", "*", "%"],
            correct: "+",
          },
          {
            id: "q3",
            question:
              "Which of the following is a valid variable name in Java?",
            options: ["1number", "number_1", "number-1", "@number"],
            correct: "number_1",
          },
        ],
      },
    ],
  },
];

export default function LessonLayout() {
  const flatFirstLesson = (() => {
    const firstCourse = lessons.find((l) => l.subLessons?.length);
    return (
      firstCourse?.subLessons?.[0] || lessons.find((l) => l.type === "quiz")
    );
  })();

  const [selectedLesson, setSelectedLesson] = useState(flatFirstLesson || null);

  return (
    <div className="flex min-h-[800px] overflow-y-auto py-6">
      <LessonSidebar
        lessons={lessons}
        selectedLessonId={selectedLesson?.id}
        onSelect={setSelectedLesson}
      />
      {selectedLesson && (
        <>
          {selectedLesson.type === "quiz" ? (
            <QuizComponent quiz={selectedLesson} />
          ) : (
            <>
              <LessonContent lesson={selectedLesson} />
              <CodeEditor
                key={selectedLesson?.id}
                defaultCode={selectedLesson.defaultCode}
                testCases={selectedLesson.testCases || []}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

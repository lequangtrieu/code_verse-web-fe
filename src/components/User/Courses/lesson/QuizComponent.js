import React, { useState } from "react";
import { Card, Radio, Checkbox, Button, notification } from "antd";

const QuizComponent = ({ quiz }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];

  // Hàm xử lý khi người dùng chọn đáp án
  const handleSelect = (questionId, value) => {
    if (currentQuestion.quizType === "SINGLE") {
      // Với câu hỏi kiểu SINGLE, chỉ cho phép chọn 1 câu trả lời
      setAnswers({ ...answers, [questionId]: value });
    } else {
      // Với câu hỏi kiểu MULTIPLE, cho phép chọn nhiều câu trả lời
      setAnswers((prevAnswers) => {
        return {
          ...prevAnswers,
          [questionId]: value,
        };
      });
    }
  };

  // Hàm xử lý khi nộp bài
  const handleSubmit = () => {
    if (Object.keys(answers).length < totalQuestions) {
      notification.warning({
        message: "Incomplete Submission",
        description: "Please answer all questions before submitting the quiz.",
        placement: "bottomLeft",
      });
      return;
    }

    setSubmitted(true);

    const correctCount = quiz.questions.filter((q) => {
      const userAnswers = answers[q.id];
      if (q.quizType === "SINGLE") {
        // Kiểm tra cho câu hỏi loại SINGLE
        return userAnswers === q.answers.find((answer) => answer.isCorrect)?.id;
      } else {
        // Kiểm tra cho câu hỏi loại MULTIPLE
        return userAnswers.every((answerId) =>
          q.answers.some((answer) => answer.id === answerId && answer.isCorrect)
        );
      }
    }).length;

    notification.success({
      message: "Quiz Submitted Successfully",
      description: `You answered ${correctCount}/${totalQuestions} questions correctly.`,
      placement: "bottomLeft",
    });
  };

  // Hàm xác định kiểu hiển thị nút câu hỏi
  const getButtonStyle = (index) => {
    const questionId = quiz.questions[index].id;
    const userAnswer = answers[questionId];

    if (submitted) {
      if (!userAnswer) {
        return "border border-red-400 bg-red-50 text-red-600";
      }

      return userAnswer === quiz.questions[index].correct
        ? "border-green-500"
        : "border-red-500";
    }

    return "border-gray-300";
  };

  return (
    <div className="min-w-[600px] w-full p-6 bg-white rounded shadow max-h-[850px] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex flex-wrap gap-2">
          {quiz.questions.map((_, index) => (
            <Button
              key={index}
              type={index === currentIndex ? "primary" : "default"}
              onClick={() => setCurrentIndex(index)}
              className={`w-20 border ${getButtonStyle(index)}`}
            >
              Question {index + 1}
            </Button>
          ))}
        </div>

        <Button type="primary" onClick={handleSubmit} disabled={submitted}>
          Submit Quiz
        </Button>
      </div>

      <Card key={currentQuestion.id} className="mb-4">
        <p className="font-semibold">
          {currentIndex + 1}. {currentQuestion.question}
        </p>

        {currentQuestion.quizType === "SINGLE" ? (
          <Radio.Group
            onChange={(e) => handleSelect(currentQuestion.id, e.target.value)}
            value={answers[currentQuestion.id]}
            disabled={submitted}
          >
            {currentQuestion.answers.map((opt) => (
              <Radio key={opt.id} value={opt.id}>
                {opt.answer}
              </Radio>
            ))}
          </Radio.Group>
        ) : (
          <Checkbox.Group
            onChange={(checkedValues) => handleSelect(currentQuestion.id, checkedValues)}
            value={answers[currentQuestion.id] || []}  // Đảm bảo giá trị là mảng
            disabled={submitted}
          >
            {currentQuestion.answers.map((opt) => (
              <Checkbox key={opt.id} value={opt.id}>
                {opt.answer}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )}

        {submitted && (
          <p
            className={`mt-2 font-medium ${
              answers[currentQuestion.id] === currentQuestion.correct
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {answers[currentQuestion.id] === currentQuestion.correct
              ? "Correct!"
              : `Wrong. Correct answer: ${currentQuestion.correct}`}
          </p>
        )}
      </Card>
    </div>
  );
};

export default QuizComponent;

import React, { useState } from "react";
import { Card, Radio, Button, notification } from "antd";

const QuizComponent = ({ quiz }) => {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];

  const handleSelect = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

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

    const correctCount = quiz.questions.filter(
      (q) => answers[q.id] === q.correct
    ).length;

    notification.success({
      message: "Quiz Submitted Successfully",
      description: `You answered ${correctCount}/${totalQuestions} questions correctly.`,
      placement: "bottomLeft",
    });
  };

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
        <Radio.Group
          onChange={(e) => handleSelect(currentQuestion.id, e.target.value)}
          value={answers[currentQuestion.id]}
          disabled={submitted}
        >
          {currentQuestion.options.map((opt, i) => (
            <Radio key={i} value={opt}>
              {opt}
            </Radio>
          ))}
        </Radio.Group>

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

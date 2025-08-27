import React, { useEffect, useState } from "react";
import { Card, Radio, Checkbox, Button, notification, Modal } from "antd";
import axiosInstance from "../../../../config/axiosInstance";
import commonApi from "../../../../common/api";
import { useNavigate } from "react-router-dom";

const QuizComponent = ({
  quiz,
  lessonId = null,
  userId = null,
  onProgressUpdate,
  onRefreshLessonData,
}) => {
  const navigate = useNavigate();
  const [showCourseCompletionModal, setShowCourseCompletionModal] =
    useState(false);
  const [mode, setMode] = useState("info");
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [quizProgress, setQuizProgress] = useState(null);
  const [quizHistory, setQuizHistory] = useState([]);
  const [timeLeft, setTimeLeft] = useState(0);
  const [quizResult, setQuizResult] = useState([]);

  const mapLessonProgressStatus = (status) => {
    switch (status) {
      case "NOT_STARTED":
        return "Not Started";
      case "PENDING":
        return "In Progress";
      case "PASSED":
        return "Completed";
      case "FAILED":
        return "Failed";
      default:
        return "NOT_STARTED";
    }
  };

  useEffect(() => {
    if (mode === "attempt" && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timer);

            (async () => {
              try {
                const res = await axiosInstance.put(
                  commonApi.submitQuiz.url(userId, lessonId)
                );

                setTimeLeft(0);
                setMode("info");

                const statusDone = res?.data?.result?.statusDone;
                if (statusDone) {
                  setShowCourseCompletionModal(true);
                } else {
                  notification.warning({
                    message: "Time's up",
                    description: "Your time to complete the quiz has expired.",
                  });
                }

                await checkQuizProgress();
              } catch (err) {
                notification.error({
                  message: "Error",
                  description: "Failed to submit quiz after timeout.",
                });
              }
            })();

            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [mode, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const checkQuizProgress = async () => {
    try {
      const response = await axiosInstance.get(
        commonApi.quizProgress.url(userId, lessonId)
      );

      const progresses = response.data || [];
      setQuizHistory(progresses);

      const latestInProgress = progresses.find((p) => p.status === "PENDING");
      const latestPassed = progresses.find((p) => p.status === "PASSED");

      if (latestInProgress) {
        setQuizProgress(latestInProgress);
        const timeElapsed = Math.floor(
          (new Date() - new Date(latestInProgress.startedAt)) / 1000
        );
        const timeLeft = 30 * 60 - timeElapsed;
        if (timeLeft <= 0) {
          const res = await axiosInstance.put(
            commonApi.submitQuiz.url(userId, lessonId)
          );
          const statusDone = res?.data?.result?.statusDone;

          if (statusDone) {
            setShowCourseCompletionModal(true);
          } else {
            notification.warning({
              message: "Time's up",
              description: "Your time to complete the quiz has expired.",
            });
          }
          await checkQuizProgress();
          notification.warning({
            message: "Time's up",
            description: "Your time to complete the quiz has expired.",
          });
          await checkQuizProgress();
          return;
        } else {
          setTimeLeft(timeLeft);
          setMode("attempt");
        }
      } else if (
        latestPassed ||
        progresses.find((p) => p.status === "FAILED")
      ) {
        setQuizProgress(
          latestPassed || progresses.find((p) => p.status === "FAILED")
        );
        setTimeLeft(0);
        setMode("info");
      } else {
        setMode("info");
      }
    } catch (error) {
      console.error("Error checking quiz progress", error);
      notification.error({
        message: "Error",
        description: "Failed to check quiz progress.",
      });
    }
  };

  useEffect(() => {
    if (userId && lessonId) {
      checkQuizProgress();
    }
  }, [lessonId, userId]);

  const handleStartQuiz = async () => {
    try {
      await axiosInstance.put(commonApi.startQuiz.url(userId, lessonId));
      setAnswers({});
      setSubmitted(false);
      setCurrentIndex(0);
      setTimeLeft(30 * 60);
      setMode("attempt");
      await checkQuizProgress();
    } catch (error) {
      console.error("Error starting quiz:", error);
      notification.error({
        message: "Error",
        description: "Failed to start quiz.",
      });
    }
  };

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[currentIndex];

  const handleSelect = (questionId, value) => {
    if (currentQuestion.quizType === "SINGLE") {
      setAnswers({ ...answers, [questionId]: value });
    } else {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    }
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length < totalQuestions) {
      return notification.warning({
        message: "Incomplete Submission",
        description: "Please answer all questions before submitting.",
      });
    }

    setSubmitted(true);

    let results = quiz.questions.map((q) => {
      const userAnswer = answers[q.id];
      const correctAnswers = q.answers
        .filter((a) => a.isCorrect)
        .map((a) => a.id);

      const isCorrect =
        q.quizType === "SINGLE"
          ? userAnswer === correctAnswers[0]
          : Array.isArray(userAnswer) &&
            userAnswer.length === correctAnswers.length &&
            userAnswer.every((id) => correctAnswers.includes(id));

      return {
        questionId: q.id,
        question: q.question,
        isCorrect,
        userAnswer,
        correctAnswers,
        allOptions: q.answers,
        aiFeedback: null,
      };
    });

    setQuizResult(results);

    const correctCount = results.filter((r) => r.isCorrect).length;
    const scorePercent = Math.round((correctCount / totalQuestions) * 100);
    const passScore = quiz.passScore || 80;

    try {
      const response = await axiosInstance.put(
        commonApi.submitQuizPer.url(userId, lessonId),
        { score: scorePercent }
      );

      const statusDone = response?.data?.result?.statusDone;

      const wrongAnswers = results
        .filter((r) => !r.isCorrect)
        .map((r) => ({
          question: r.question,
          userAnswer: r.allOptions
            .filter((a) =>
              Array.isArray(r.userAnswer)
                ? r.userAnswer.includes(a.id)
                : r.userAnswer === a.id
            )
            .map((a) => a.answer),
          correctAnswers: r.allOptions
            .filter((a) => r.correctAnswers.includes(a.id))
            .map((a) => a.answer),
        }));

      if (wrongAnswers.length > 0) {
        try {
          const aiResp = await axiosInstance.post(
            commonApi.aiQuizFeedback.url,
            {
              quizTitle: quiz.title,
              wrongAnswers,
            }
          );

          const feedbackArray = aiResp.data.feedback || [];

          const updatedResults = results.map((r) => {
            const fb = feedbackArray.find((f) => f.question === r.question);
            return fb ? { ...r, aiFeedback: fb.explanation } : r;
          });

          setQuizResult(updatedResults);
        } catch (err) {
          console.error("AI feedback error", err);
        }
      }

      if (scorePercent >= passScore) {
        if (statusDone) {
          setShowCourseCompletionModal(true);

          setTimeout(() => {
            if (typeof onProgressUpdate === "function") {
              onProgressUpdate();
            }
            navigate("/user-panel/accomplishments");
          }, 2500);
        } else {
          notification.success({
            message: "Quiz Submitted",
            description: `You passed with ${correctCount}/${totalQuestions} correct (${scorePercent}%)`,
          });

          setTimeLeft(0);
          setMode("review");
        }
      } else {
        notification.warning({
          message: "Quiz Submitted",
          description: `You did not pass. Only ${correctCount}/${totalQuestions} correct (${scorePercent}%)`,
        });

        await checkQuizProgress();
        setTimeLeft(0);
        setMode("review");
      }
    } catch (error) {
      console.error("Error submitting quiz:", error);
      notification.error({
        message: "Error",
        description: "Failed to submit quiz.",
      });
    }
  };

  const getButtonStyle = (index) => {
    const questionId = quiz.questions[index].id;
    const userAnswer = answers[questionId];

    if (index === currentIndex) {
      return "bg-blue-600 text-white border-blue-600 shadow-md";
    }

    if (userAnswer) {
      return "bg-blue-100 text-blue-700 border-blue-400";
    }

    return "bg-white text-gray-700 border-gray-300";
  };

  if (mode === "info") {
    return (
      <div className="bg-white p-8 rounded-xl shadow-md w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">{quiz.title}</h2>
          {quizProgress?.status === "PENDING" && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded text-sm font-semibold">
              Time Left: {formatTime(timeLeft)}
            </div>
          )}
        </div>
        <div className="mb-4">
          <p className="text-lg font-semibold">Quiz Status: </p>
          <p className="text-gray-700">
            {mapLessonProgressStatus(quizProgress?.status)}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Time Limit</p>
            <p className="text-lg font-semibold text-blue-600">
              {quiz.timeLimit || 30} min
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Questions</p>
            <p className="text-lg font-semibold text-yellow-600">
              {quiz.questions.length}
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Passing Score</p>
            <p className="text-lg font-semibold text-green-600">
              {quiz.passScore || 80}%
            </p>
          </div>
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-500">Attempts</p>
            <p className="text-lg font-semibold text-purple-600">
              {quizHistory.length}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-gray-700 italic text-center">
            {quiz.description ||
              "Make sure you understand the concepts before starting this quiz."}
          </p>
        </div>

        {quizProgress?.status !== "PASSED" && (
          <div className="flex justify-end">
            <Button type="primary" onClick={handleStartQuiz} size="large">
              Start Quiz
            </Button>
          </div>
        )}

        <div className="mb-8">
          <h3 className="text-lg font-semibold mb-3">Attempt History</h3>
          {quizHistory.length === 0 ? (
            <p className="text-gray-500 italic">No attempts yet.</p>
          ) : (
            <ul className="space-y-2">
              {[...quizHistory]
                .sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt))
                .map((attempt) => (
                  <li
                    key={attempt.id}
                    className="bg-gray-50 border rounded-lg p-4 flex flex-col gap-1"
                  >
                    <div>
                      <span className="font-semibold">Status: </span>
                      <span
                        className={
                          attempt.status === "PASSED"
                            ? "text-green-600"
                            : attempt.status === "PENDING"
                            ? "text-yellow-600"
                            : "text-red-600"
                        }
                      >
                        {mapLessonProgressStatus(attempt.status)}
                      </span>
                    </div>
                    <div>
                      <span className="font-semibold">Started: </span>
                      {new Date(attempt.startedAt).toLocaleString()}
                    </div>
                    {attempt.completedAt && (
                      <div>
                        <span className="font-semibold">Completed: </span>
                        {new Date(attempt.completedAt).toLocaleString()}
                      </div>
                    )}
                    {typeof attempt.expGained === "number" && (
                      <div>
                        <span className="font-semibold">Exp Gained: </span>
                        {attempt.expGained}
                      </div>
                    )}
                  </li>
                ))}
            </ul>
          )}
        </div>
      </div>
    );
  }

  if (mode === "review") {
    const currentReview = quizResult[currentIndex];

    return (
      <div className="min-w-[600px] w-full p-6 bg-white rounded shadow max-h-[850px] overflow-y-auto space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">
            {quiz.title} - Review
          </h2>
          <div className="px-4 py-2 rounded text-sm font-semibold bg-blue-50 text-blue-700">
            Score: {quizResult.filter((r) => r.isCorrect).length}/
            {quizResult.length}
          </div>
        </div>

        <div className="flex justify-between items-center flex-wrap gap-2">
          <div className="flex flex-wrap gap-2">
            {quizResult.map((res, index) => (
              <Button
                key={index}
                type={index === currentIndex ? "primary" : "default"}
                onClick={() => setCurrentIndex(index)}
                className={`w-16 font-medium ${
                  res.isCorrect
                    ? "border-green-500 bg-green-50 text-green-700"
                    : "border-red-500 bg-red-50 text-red-700"
                }`}
              >
                Q{index + 1}
              </Button>
            ))}
          </div>
          <Button
            type="primary"
            onClick={async () => {
              setMode("info");
              await checkQuizProgress();
              onProgressUpdate();
            }}
            className="mt-2 sm:mt-0"
          >
            Back
          </Button>
        </div>

        {/* Question card */}
        <Card key={currentReview.questionId}>
          <p className="font-semibold text-lg mb-2">
            {currentIndex + 1}. {currentReview.question}
          </p>

          <ul className="space-y-2">
            {currentReview.allOptions.map((opt) => {
              const isUser = Array.isArray(currentReview.userAnswer)
                ? currentReview.userAnswer.includes(opt.id)
                : currentReview.userAnswer === opt.id;
              const isCorrect = currentReview.correctAnswers.includes(opt.id);

              return (
                <li
                  key={opt.id}
                  className={`px-3 py-2 rounded-lg border flex items-center justify-between ${
                    isCorrect
                      ? "bg-green-50 border-green-300 text-green-700"
                      : isUser
                      ? "bg-red-50 border-red-300 text-red-700"
                      : "bg-gray-50 border-gray-200 text-gray-700"
                  }`}
                >
                  <span>{opt.answer}</span>
                  {isCorrect && <span>✅</span>}
                  {isUser && !isCorrect && <span>❌</span>}
                </li>
              );
            })}
          </ul>

          {!currentReview.isCorrect && (
            <div className="mt-4">
              <p className="text-red-500 font-medium">
                ❌ Your answer is incorrect
              </p>

              <div className="mt-3">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-600 text-lg">🤖</span>
                  <span className="font-semibold text-blue-700">
                    AI Explanation
                  </span>
                </div>

                {currentReview.aiFeedback ? (
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-gray-800 whitespace-pre-line shadow-sm">
                    {currentReview.aiFeedback}
                  </div>
                ) : (
                  <p className="text-gray-400 italic mt-2">
                    Loading AI explanation...
                  </p>
                )}
              </div>
            </div>
          )}

          {currentReview.isCorrect && (
            <p className="mt-4 text-green-600 font-medium">✅ Correct</p>
          )}
        </Card>
      </div>
    );
  }

  return (
    <div className="min-w-[600px] w-full p-6 bg-white rounded shadow max-h-[850px] overflow-y-auto space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">{quiz.title}</h2>
        <div
          className={`px-4 py-2 rounded text-sm font-semibold ${
            timeLeft <= 600
              ? "bg-red-100 text-red-700"
              : timeLeft <= 1000
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="flex justify-between items-center flex-wrap gap-2">
        <div className="flex flex-wrap gap-2">
          {quiz.questions.map((_, index) => (
            <Button
              key={index}
              type={index === currentIndex ? "primary" : "default"}
              onClick={() => setCurrentIndex(index)}
              className={`w-16 ${getButtonStyle(index)}`}
            >
              Q{index + 1}
            </Button>
          ))}
        </div>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={submitted}
          className="mt-2 sm:mt-0"
        >
          Submit
        </Button>
      </div>

      <Card key={currentQuestion.id}>
        <p className="font-semibold text-lg mb-2">
          {currentIndex + 1}. {currentQuestion.question}
        </p>

        {currentQuestion.quizType === "SINGLE" ? (
          <Radio.Group
            onChange={(e) => handleSelect(currentQuestion.id, e.target.value)}
            value={answers[currentQuestion.id]}
            disabled={submitted}
            className="space-y-2 flex flex-col"
          >
            {currentQuestion.answers.map((opt) => (
              <Radio key={opt.id} value={opt.id}>
                {opt.answer}
              </Radio>
            ))}
          </Radio.Group>
        ) : (
          <Checkbox.Group
            onChange={(vals) => handleSelect(currentQuestion.id, vals)}
            value={answers[currentQuestion.id] || []}
            disabled={submitted}
            className="space-y-2 flex flex-col"
          >
            {currentQuestion.answers.map((opt) => (
              <Checkbox key={opt.id} value={opt.id}>
                {opt.answer}
              </Checkbox>
            ))}
          </Checkbox.Group>
        )}

        {submitted && (
          <p className="mt-4 text-sm text-green-600 font-medium">
            Submitted. See summary above.
          </p>
        )}
      </Card>

      <Modal
        title={null}
        getContainer={false}
        open={showCourseCompletionModal}
        onCancel={() => setShowCourseCompletionModal(false)}
        centered
        footer={[
          <Button
            key="close"
            type="primary"
            onClick={() => {
              setShowCourseCompletionModal(false);
              if (typeof onRefreshLessonData === "function") {
                onRefreshLessonData({ initialLoad: true });
              }
            }}
          >
            Back to My Courses
          </Button>,
        ]}
        className="custom-modal"
        width={640}
        styles={{
          body: {
            background: "linear-gradient(to right, #dbeafe, #f0fdf4)",
            color: "#0f172a",
            padding: "2rem",
            borderRadius: "1rem",
            textAlign: "center",
            boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
          },
        }}
      >
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🎓</div>
          <h2 className="text-2xl font-bold mb-2 text-green-700">
            Congratulations!
          </h2>
          <p className="text-lg text-gray-800 mb-4">
            You've successfully completed the entire course.
          </p>
          <p className="text-sm text-gray-600 italic">
            We're proud of your progress. Keep learning and growing! 🚀
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default QuizComponent;

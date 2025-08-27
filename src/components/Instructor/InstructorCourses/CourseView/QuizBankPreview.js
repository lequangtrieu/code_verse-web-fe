import React, { useEffect, useState } from "react";
import * as XLSX from "xlsx";
import { Button, message } from "antd";
import axiosInstance from "../../../../config/axiosInstance";
import commonApi from "../../../../common/api";
import LoadingContainer from "../../../../common/LoadingContainer";
import { Typography } from "antd";

const { Text } = Typography;

const QuizBankPreview = ({ lessonId }) => {
  const [quizData, setQuizData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingDownload, setLoadingDownload] = useState(false);

  useEffect(() => {
    if (lessonId) fetchQuizBank();
    // eslint-disable-next-line
  }, [lessonId]);

  const fetchQuizBank = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(commonApi.createQuizBank.url(lessonId));

      const normalized = res.data.result.map((quiz) => ({
        question: quiz.question,
        quizType: quiz.quizType,
        answers: quiz.answers.map((a) => ({
          answer: a.answer,
          correct: a.isCorrect,
        })),
      }));

      setQuizData(normalized);
    } catch (error) {
      message.error("Failed to get quiz bank.");
    } finally {
      setTimeout(() => setLoading(false), 400);
    }
  };

  const handleDownloadExcel = () => {
    let dataToDownload;
    if (quizData.length > 0) {
        setLoadingDownload(true);
        dataToDownload = quizData.map((quiz) => {
            const row = { Question: quiz.question };

            quiz.answers.forEach((a, idx) => {
                const colLetter = String.fromCharCode(65 + idx);
                row[colLetter] = a.answer;
            });

            row['CorrectAnswers'] = quiz.answers
                .map((a, idx) => (a.correct ? String.fromCharCode(65 + idx) : null))
                .filter(i => i !== null)
                .join(',');
            return row;
        });
    }

    const worksheet = XLSX.utils.json_to_sheet(dataToDownload);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Quizz Data");
    XLSX.writeFile(workbook, "quiz_data.xlsx");
    setLoadingDownload(false);
  };

  return (
    <div className="p-6 bg-white shadow space-y-4 w-full h-[calc(100vh-85px)] overflow-y-auto">
      {loading && <LoadingContainer />}

      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">{quizData.length} questions</h2>
        {quizData.length > 0 && <Button loading={loadingDownload} type="primary" onClick={handleDownloadExcel}>
          Download Excel
        </Button>}
      </div>

      {quizData.length === 0 ? (
        <></>
      ) : (
        <div className="space-y-6">
          {quizData.map((quiz, index) => (
            <div key={index} className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center gap-2 mb-2">
                <Text className="font-semibold">{index + 1}. {quiz.question}</Text>
                <Text className="text-sm text-gray-500">({quiz.quizType})</Text>
              </div>
              <ul className="space-y-1 ml-4">
                {quiz.answers.map((a, i) => (
                  <li
                    key={i}
                    className={`${
                      a.correct ? "text-green-600 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {a.correct ? "✔ " : "○ "} {a.answer}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuizBankPreview;
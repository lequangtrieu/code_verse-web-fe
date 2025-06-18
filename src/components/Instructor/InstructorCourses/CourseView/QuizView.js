import React, { useEffect, useState } from 'react';
import { Card, Checkbox, Radio, Space } from "antd";
import { CheckCircleTwoTone, CloseCircleTwoTone } from "@ant-design/icons";
import commonApi from "../../../../common/api";
import axiosInstance from "../../../../config/axiosInstance";
import LoadingContainer from "../../../../common/LoadingContainer";

const QuizViewer = ({ lessonId }) => {
    const [quizData, setQuizData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuiz = async () => {
            try {
                const res = await axiosInstance.get(commonApi.createQuizBank.url(lessonId));
                setQuizData(res.data.result);
            } catch (err) {
                console.error("Failed to fetch quiz", err);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 400)
            }
        };

        if (lessonId) fetchQuiz();
    }, [lessonId]);

    return (
        <div className="flex flex-col gap-6 max-h-[80vh] overflow-y-auto scrollbar-thin pr-2">
            {loading && <LoadingContainer />}
            {quizData?.map((quiz, index) => (
                <Card
                    key={quiz.id}
                    title={`Question ${index + 1}: ${quiz.question}`}
                    className="border rounded shadow"
                >
                    <Space direction="vertical" className="w-full">
                        {quiz.quizType === "SINGLE" ? (
                            <Space direction="vertical" className="w-full">
                                {quiz.answers.map((ans) => (
                                    <div className="flex gap-2 w-full">
                                        {ans.isCorrect ? (
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                        ) : (
                                            <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                                        )}
                                        <span>{ans.answer}</span>

                                    </div>
                                ))}
                            </Space>
                        ) : (

                            <Space direction="vertical" className="w-full">
                                {quiz.answers.map((ans) => (
                                    <div className="flex gap-2 w-full">
                                        {ans.isCorrect ? (
                                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                                        ) : (
                                            <CloseCircleTwoTone twoToneColor="#ff4d4f" />
                                        )}
                                        <span>{ans.answer}</span>
                                    </div>
                                ))}
                            </Space>
                        )}
                    </Space>
                </Card>
            ))}
        </div>
    );
};

export default QuizViewer;

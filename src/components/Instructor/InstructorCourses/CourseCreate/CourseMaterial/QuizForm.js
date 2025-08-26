import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Upload, Button, message, Table, Popconfirm, Typography } from 'antd';
import { UploadOutlined, DownloadOutlined } from '@ant-design/icons';
import axiosInstance from '../../../../../config/axiosInstance';
import commonApi from '../../../../../common/api';
import LoadingContainer from '../../../../../common/LoadingContainer';

const { Text } = Typography;

const QuizForm = ({ lessonId, hasChange, setHasChange }) => {
    const [quizData, setQuizData] = useState([]);
    const [savedQuizData, setSaveQuizData] = useState([]);
    const [initialLoading, setInitialLoading] = useState(false);
    const [loadingSave, setLoadingSave] = useState(false);

    useEffect(() => {
        if (lessonId) {
            fetchQuizBank();
        }
        // eslint-disable-next-line
    }, [lessonId]);

    const handleDownloadTemplate = async (isAIDrafted = false) => {
        let dataToDownload;
        if (savedQuizData.length > 0) {
            dataToDownload = savedQuizData.map((quiz) => {
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
        } else if (isAIDrafted) {
            try {
                message.loading({ content: "Generating quiz bank...", key: "download" });

                const res = await axiosInstance.post(commonApi.aiGenerateQuizBank.url(lessonId));

                dataToDownload = res.data.result.quizBank.map((quiz) => {
                    const row = { Question: quiz.question };

                    quiz.answers.forEach((a, idx) => {
                        const colLetter = String.fromCharCode(65 + idx);
                        row[colLetter] = a.answer;
                    });

                    row["CorrectAnswers"] = quiz.answers
                        .map((a, idx) => (a.isCorrect ? String.fromCharCode(65 + idx) : null))
                        .filter((i) => i !== null)
                        .join(",");

                    return row;
                });

                message.success({ content: "Quiz bank generated and downloaded!", key: "download" });
            } catch (error) {
                console.error(error);
                dataToDownload = [
                    {
                        Question: 'What is 2 + 2?',
                        A: '2',
                        B: '3',
                        C: '4',
                        D: '5',
                        CorrectAnswers: 'C',
                    },
                    {
                        Question: 'Pick primary colors',
                        A: 'Red',
                        B: 'Green',
                        C: 'Blue',
                        CorrectAnswers: 'A,C',
                    },
                ];

                message.error({ content: "AI generated failed. Sample data will be downloaded instead.", key: "download" });
            }
        } else {
            dataToDownload = [
                {
                    Question: 'What is 2 + 2?',
                    A: '2',
                    B: '3',
                    C: '4',
                    D: '5',
                    CorrectAnswers: 'C',
                },
                {
                    Question: 'Pick primary colors',
                    A: 'Red',
                    B: 'Green',
                    C: 'Blue',
                    CorrectAnswers: 'A,C',
                },
            ];
        }

        const worksheet = XLSX.utils.json_to_sheet(dataToDownload);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'QuizData');

        XLSX.writeFile(workbook, savedQuizData.length > 0 ? 'quiz_data.xlsx' : 'quiz_sample.xlsx');
    };

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            try {
                const grouped = groupByQuestion(jsonData);
                setQuizData(grouped);
                setHasChange(true);
                message.success('File parsed successfully!');
            } catch (err) {
                message.error(err.message);
            }
        };
        reader.readAsBinaryString(file);
        return false;
    };

    const groupByQuestion = (rows) => {
        return rows.map((row, rowIndex) => {
            const questionText = row['Question']?.trim();
            if (!questionText) return null;

            const answers = Object.keys(row)
                .filter(k => /^[A-Z]$/.test(k))
                .map(k => row[k])
                .filter(a => a && a.trim().length > 0);

            const validLetters = answers.map((_, idx) => String.fromCharCode(65 + idx));

            const inputLetters = String(row['CorrectAnswers'] || "")
                .split(',')
                .map(l => l.trim().toUpperCase())
                .filter(l => l.length > 0);

            const invalidLetters = inputLetters.filter(l => !validLetters.includes(l));
            if (invalidLetters.length > 0) {
                throw new Error(
                    `Invalid CorrectAnswers "${invalidLetters.join(",")}" in row ${rowIndex + 2} (Question: "${questionText}"). ` +
                    `Valid options are: ${validLetters.join(",")}`
                );
            }

            if (inputLetters.length === 0) {
                throw new Error(
                    `No CorrectAnswers provided for row ${rowIndex + 2} (Question: "${questionText}")`
                );
            }

            const correctIndexes = inputLetters.map(
                l => l.charCodeAt(0) - 65
            );

            const formattedAnswers = answers.map((a, idx) => ({
                answer: a,
                correct: correctIndexes.includes(idx),
            }));

            return {
                question: questionText,
                quizType: correctIndexes.length === 1 ? "SINGLE" : "MULTIPLE",
                answers: formattedAnswers,
            };
        }).filter(q => q !== null);
    };

    const fetchQuizBank = async () => {
        setInitialLoading(true);
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

            setSaveQuizData(normalized);
            setQuizData(normalized);

        } catch (error) {
            message.error("Failed to get quiz bank.");
        } finally {
            setTimeout(() => {
                setInitialLoading(false);
            }, 400);
        }
    };

    const handleSubmit = async () => {
        try {
            setLoadingSave(true);
            await axiosInstance.post(commonApi.createQuizBank.url(lessonId), quizData);
            setHasChange(false);
            message.success('Quiz imported successfully!');
            fetchQuizBank();
        } catch (error) {
            message.error('Failed to import quiz!');
        } finally {
            setLoadingSave(false);
        }
    };

    const columns = [
        {
            title: 'Question',
            dataIndex: 'question',
            key: 'question',
        },
        {
            title: 'Quiz Type',
            dataIndex: 'quizType',
            key: 'quizType',
        },
        {
            title: 'Answers',
            key: 'answers',
            render: (_, record) => (
                <ul className="list-disc ml-4">
                    {record.answers.map((a, i) => (
                        <li key={i}>
                            <span className={a.correct ? 'text-green-600 font-semibold' : ''}>
                                {a.answer} {a.correct ? '(Correct)' : ''}
                            </span>
                        </li>
                    ))}
                </ul>
            ),
        },
    ];

    return (
        <div className="p-6 bg-white rounded-xl shadow space-y-6">
            {initialLoading && <LoadingContainer />}
            <h2 className="text-xl font-bold">Import Quiz via Excel</h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {savedQuizData.length ? (
                    <Button icon={<DownloadOutlined />} onClick={() => handleDownloadTemplate()}>
                        Download Data Excel
                    </Button>
                ) : (
                    <Popconfirm
                        title="Download Excel"
                        description="Do you want to download a sample Excel or AI drafted Excel?"
                        okText="AI Drafted"
                        cancelText="Sample"
                        onConfirm={() => {
                            handleDownloadTemplate(true);
                        }}
                        onCancel={() => {
                            handleDownloadTemplate(false);
                        }}
                    >
                        <Button icon={<DownloadOutlined />}>Download Drafted Excel</Button>
                    </Popconfirm>
                )}


                <Upload
                    accept=".xlsx,.xls"
                    showUploadList={false}
                    beforeUpload={handleFileUpload}
                >
                    <Button icon={<UploadOutlined />}>Upload Excel</Button>
                </Upload>
            </div>

            {quizData.length > 0 && (
                <>
                    <Table
                        dataSource={quizData}
                        columns={columns}
                        rowKey={(record) => record.question}
                        scroll={{ y: 500 }}
                        pagination={false}
                    />

                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        className="mt-4"
                        loading={loadingSave}
                        disabled={!hasChange}
                    >
                        Submit Quiz
                    </Button>
                    {hasChange && <Text className="ml-4">Unsaved.</Text>}
                </>
            )}
        </div>
    );
};

export default QuizForm;

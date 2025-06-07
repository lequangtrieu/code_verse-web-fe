import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Upload, Button, message, Table } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axiosInstance from '../../../../../config/axiosInstance';
import commonApi from '../../../../../common/api';

const QuizForm = ({ lessonId }) => {
    const [quizData, setQuizData] = useState([]);

    const handleDownloadTemplate = () => {
        const sampleData = [
            { Question: 'What is 2 + 2?', Answer: '3', IsCorrect: false },
            { Question: 'What is 2 + 2?', Answer: '4', IsCorrect: true },
            { Question: 'Pick primary colors', Answer: 'Red', IsCorrect: true },
            { Question: 'Pick primary colors', Answer: 'Green', IsCorrect: false },
            { Question: 'Pick primary colors', Answer: 'Blue', IsCorrect: true },
        ];

        const worksheet = XLSX.utils.json_to_sheet(sampleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'QuizSample');

        XLSX.writeFile(workbook, 'quiz_sample.xlsx');
    };

    const handleFileUpload = (file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const workbook = XLSX.read(e.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            const grouped = groupByQuestion(jsonData);
            setQuizData(grouped);
            message.success('File parsed successfully!');
        };
        reader.readAsBinaryString(file);
        return false;
    };

    const groupByQuestion = (rows) => {
        const questionMap = {};

        rows.forEach(row => {
            const questionText = row['Question']?.trim();
            const answerText = row['Answer']?.trim();
            const correct = String(row['IsCorrect']).toLowerCase() === 'true';

            if (!questionText || !answerText) return;

            if (!questionMap[questionText]) {
                questionMap[questionText] = [];
            }

            questionMap[questionText].push({
                answer: answerText,
                correct,
            });
        });

        return Object.entries(questionMap).map(([question, answers]) => ({
            question,
            quizType: answers.filter(a => a.correct).length === 1 ? 'SINGLE' : 'MULTIPLE',
            answers,
        }));
    };

    const handleSubmit = async () => {
        try {
            await axiosInstance.post(commonApi.createQuizBank.url(lessonId), quizData);
            message.success('Quiz imported successfully!');
        } catch (error) {
            message.error('Failed to import quiz!');
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
            <h2 className="text-xl font-bold">Import Quiz via Excel</h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <Button onClick={handleDownloadTemplate}>
                    Download Sample Excel
                </Button>

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
                        pagination={false}
                    />

                    <Button
                        type="primary"
                        onClick={handleSubmit}
                        className="mt-4"
                    >
                        Submit Quiz
                    </Button>
                </>
            )}
        </div>
    );
};

export default QuizForm;

import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { Upload, Button, message, Modal, Popconfirm, Typography, Card, Space, Checkbox, Dropdown, Tooltip } from 'antd';
import { UploadOutlined, DownloadOutlined, MinusCircleOutlined, MoreOutlined, ThunderboltTwoTone, ReloadOutlined } from '@ant-design/icons';
import axiosInstance from '../../../../../config/axiosInstance';
import commonApi from '../../../../../common/api';
import LoadingContainer from '../../../../../common/LoadingContainer';

const { Text } = Typography;
const MAX_LENGTH = 500;

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

    useEffect(() => {
        if (quizData?.length === 0) {
            setHasChange(false);
        }
        // eslint-disable-next-line
    }, [quizData]);

    const truncate = (str, n = 30) =>
        str.length > n ? str.slice(0, n) + "..." : str;

    const handleDownloadData = () => {
        if (quizData.length > 0) {
            let dataToDownload = quizData.map((quiz) => {
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

            const worksheet = XLSX.utils.json_to_sheet(dataToDownload);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'QuizData');

            XLSX.writeFile(workbook, 'quiz_data.xlsx');
        }
    }

    const handleDownloadTemplate = async () => {
        let dataToDownload;

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

        const worksheet = XLSX.utils.json_to_sheet(dataToDownload);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'QuizData');

        XLSX.writeFile(workbook, 'quiz_template.xlsx');

    };

    const handleAIGenerated = async () => {
        let attempts = 0;
        const maxAttempts = 3;

        const fetchData = async () => {
            try {
                message.loading({ content: "Generating quiz bank...", key: "download" });

                const res = await axiosInstance.post(
                    commonApi.aiGenerateQuizBank.url(lessonId)
                );

                const normalized = res.data.result.quizBank.map((quiz) => ({
                    question: quiz.question,
                    quizType: quiz.quizType,
                    answers: quiz.answers.map((a) => ({
                        answer: a.answer,
                        correct: a.isCorrect,
                    })),
                }));

                setQuizData(normalized);
                setHasChange(true);

                message.success({ content: "Quiz bank generated!", key: "download" });
            } catch (error) {
                attempts++;
                if (attempts < maxAttempts) {
                    console.warn(`Retrying... attempt ${attempts}`);
                    
                    await new Promise((resolve) => setTimeout(resolve, 500 * 2 ** (attempts - 1)));
                    return fetchData();
                } else {
                    message.error({ content: "AI generation failed after 3 attempts.", key: "download" });
                }
            }
        };

        fetchData();
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
                if (hasChange) {
                    Modal.confirm({
                        title: "Override changes",
                        content: "Your current changes would be overwritten and cannot be restored. Do you want to continue?",
                        okText: "Override",
                        cancelText: "No",
                        onOk: () => {
                            if (grouped?.length) {
                                setQuizData(grouped);
                                setHasChange(true);
                                message.success('File parsed successfully!');
                            } else {
                                message.error("Nothing was parsed.");
                            }
                        }
                    });
                } else {
                    if (grouped?.length) {
                        setQuizData(grouped);
                        setHasChange(true);
                        message.success('File parsed successfully!');
                    } else {
                        message.error("Nothing was parsed.");
                    }
                }

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
                    `Invalid CorrectAnswers "${invalidLetters.join(",")}" in row ${rowIndex + 2} (Question: "${truncate(questionText)}"). ` +
                    `Valid options are: ${validLetters.join(",")}`
                );
            }

            if (inputLetters.length === 0) {
                throw new Error(
                    `No CorrectAnswers provided for row ${rowIndex + 2} (Question: "${truncate(questionText)}")`
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

            setSaveQuizData(structuredClone(normalized));
            setQuizData(structuredClone(normalized));

        } catch (error) {
            message.error("Failed to get quiz bank.");
        } finally {
            setTimeout(() => {
                setInitialLoading(false);
            }, 400);
        }
    };

    const handleSubmit = async () => {
        const isValid = quizData.every(q => validateQuestion(q));
        if (!isValid) {
            return;
        }
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

    const addQuestionAtTop = () => {
        setQuizData(prev => [
            {
                question: "New Question",
                quizType: "MULTIPLE",
                answers: [{ answer: "", correct: false }]
            },
            ...prev
        ]);
        setHasChange(true);
    };

    const addAnswer = (qIndex) => {
        setQuizData(prev => {
            const updated = [...prev];
            updated[qIndex].answers.push({ answer: "", correct: false });
            return updated;
        });
        setHasChange(true);
    };

    const updateQuestion = (qIndex, newText) => {
        const updated = [...quizData];
        updated[qIndex].question = newText;
        setQuizData(updated);
        setHasChange(true);
    };

    const updateAnswer = (qIndex, aIndex, newText) => {
        const updated = [...quizData];
        updated[qIndex].answers[aIndex].answer = newText;
        setQuizData(updated);
        setHasChange(true);
    };

    const updateCorrect = (qIndex, aIndex, checked) => {
        const updated = [...quizData];
        updated[qIndex].answers[aIndex].correct = checked;

        const correctCount = updated[qIndex].answers.filter(a => a.correct).length;
        updated[qIndex].quizType = correctCount === 1 ? "SINGLE" : "MULTIPLE";

        setQuizData(updated);
        setHasChange(true);
    };

    const removeQuestion = (qIndex) => {
        setQuizData(prev => prev.filter((_, i) => i !== qIndex));
        setHasChange(true);
    };

    const removeAnswer = (qIndex, aIndex) => {
        setQuizData(prev => {
            const updated = [...prev];
            if (updated[qIndex].answers.length > 1) {
                updated[qIndex].answers.splice(aIndex, 1);
            }
            return updated;
        });
        setHasChange(true);
    };

    const validateQuestion = (question) => {
        if (!question.question || question.question.trim() === "") {
            message.error("Question must not be empty!");
            return false;
        }

        if (!question.answers || question.answers.length === 0) {
            message.error("Each question must have answers!");
            return false;
        }

        for (const ans of question.answers) {
            if (!ans.answer || ans.answer.trim() === "") {
                message.error("Answer must not be empty!");
                return false;
            }
        }

        if (!question.answers.some(ans => ans.correct)) {
            message.error("Each question must have at least one correct answer!");
            return false;
        }
        return true;
    };

    const menu = (qIndex) =>
        [
            {
                key: 'remove',
                label: 'Remove Question',
                danger: true,
                onClick: () => removeQuestion(qIndex),
            },
            {
                key: 'add',
                label: 'Add Answer',
                onClick: () => addAnswer(qIndex),
            },
        ];

    const handleReload = () => {
        setQuizData(savedQuizData);
        setHasChange(false);
    };

    return (
        <div className="p-6 bg-white rounded-xl shadow space-y-6">
            {initialLoading && <LoadingContainer />}
            <h2 className="text-xl font-bold">Quiz Bank {`(${quizData?.length})`}</h2>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {quizData?.length > 0 && (
                    <Button icon={<DownloadOutlined />} onClick={() => handleDownloadData()}>
                        Download Excel
                    </Button>
                )}

                <Upload
                    accept=".xlsx,.xls"
                    showUploadList={false}
                    beforeUpload={handleFileUpload}
                >
                    <Popconfirm
                        title="Upload Excel"
                        description="You already have an Excel template?"
                        okText="Yes, just upload"
                        cancelText="No, download template first"
                        onCancel={(e) => {
                            e.stopPropagation();
                            handleDownloadTemplate(false);
                        }}
                    >
                        <Button
                            icon={<UploadOutlined />}
                            onClick={(e) => e.stopPropagation()}
                        >
                            Upload Excel
                        </Button>
                    </Popconfirm>
                </Upload>
                <Tooltip title={
                    <div>
                        <strong>Fast Generate</strong>
                        <br />
                        <span>Hints: AI will generate a set of quizzes based on the theory of previous lessons in the same module.</span>
                    </div>
                }>
                    <Button
                        type="primary"
                        icon={<ThunderboltTwoTone twoToneColor="#FFD666" />}
                        className="bg-gradient-to-r from-blue-500 to-purple-500"
                        onClick={() => {
                            if (hasChange) {
                                Modal.confirm({
                                    title: "Override changes",
                                    content: "Your current changes would be overwritten and cannot be restored. Do you want to continue?",
                                    okText: "Override",
                                    cancelText: "No",
                                    onOk: handleAIGenerated
                                });
                            } else handleAIGenerated();
                        }}
                    >
                    </Button>
                </Tooltip>
                <Popconfirm
                    title="Reload"
                    description="This will reload your last saved data. Do you ưant to continue?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={handleReload}
                >
                    <Button
                        icon={<ReloadOutlined />}
                        disabled={savedQuizData?.length === 0 || !hasChange}
                    />
                </Popconfirm>

            </div>

            <Button
                type="dashed"
                block
                className="mb-4 w-full"
                onClick={addQuestionAtTop}
            >
                + Add Question
            </Button>
            {quizData?.length > 0 && <div className='w-full'>
                <div className="pt-6 pb-6 max-h-[80vh] overflow-y-auto w-full">
                    {quizData.map((quiz, qIndex) => (
                        <Card
                            key={qIndex}
                            className="mb-4 shadow relative"
                            title={
                                <div className="flex items-center">
                                    <div
                                        contentEditable
                                        suppressContentEditableWarning
                                        className="w-full font-semibold outline-none border-b border-transparent hover:border-gray-300 focus:border-blue-500 px-1 break-words whitespace-pre-wrap"
                                        style={{ wordBreak: "break-word", minWidth: 0 }}
                                        onFocus={(e) => {
                                            e.currentTarget.dataset.originalText = e.currentTarget.innerText;
                                          }}
                                          onBlur={(e) => {
                                            const newText = e.currentTarget.innerText;
                                            const originalText = e.currentTarget.dataset.originalText;
                                        
                                            if (newText !== originalText) {
                                              updateQuestion(qIndex, newText);
                                            }
                                          }}
                                        onInput={(e) => {
                                            let text = e.currentTarget.innerText;

                                            if (text.length > MAX_LENGTH) {
                                                e.currentTarget.innerText = text.slice(0, MAX_LENGTH);

                                                const range = document.createRange();
                                                const sel = window.getSelection();
                                                range.selectNodeContents(e.currentTarget);
                                                range.collapse(false);
                                                sel.removeAllRanges();
                                                sel.addRange(range);
                                            }
                                        }}
                                    >
                                        {quiz.question}
                                    </div>

                                    <Dropdown menu={{
                                        items: menu(qIndex)
                                    }} trigger={['click']}>
                                        <Button type="text" size="small" icon={<MoreOutlined />} />
                                    </Dropdown>
                                </div>
                            }
                        >
                            <Space direction="vertical" className="mt-3 w-full">
                                {quiz.answers.map((ans, aIndex) => (
                                    <div className="flex items-center gap-2" key={aIndex}>
                                        <Checkbox
                                            checked={ans.correct}
                                            onChange={(e) => updateCorrect(qIndex, aIndex, e.target.checked)}
                                        />
                                        <div
                                            contentEditable
                                            suppressContentEditableWarning
                                            className={`w-full outline-none border-b border-transparent hover:border-gray-300 focus:border-blue-500 px-1 ${ans.correct ? " text-green-600 font-semibold" : ''}`}
                                            style={{ overflowWrap: "anywhere" }}
                                            onFocus={(e) => {
                                                e.currentTarget.dataset.originalText = e.currentTarget.innerText;
                                              }}
                                              onBlur={(e) => {
                                                const newText = e.currentTarget.innerText;
                                                const originalText = e.currentTarget.dataset.originalText;
                                            
                                                if (newText !== originalText) {
                                                    updateAnswer(qIndex, aIndex, newText);
                                                }
                                              }}
                                            onInput={(e) => {
                                                let text = e.currentTarget.innerText;
    
                                                if (text.length > MAX_LENGTH) {
                                                    e.currentTarget.innerText = text.slice(0, MAX_LENGTH);
    
                                                    const range = document.createRange();
                                                    const sel = window.getSelection();
                                                    range.selectNodeContents(e.currentTarget);
                                                    range.collapse(false);
                                                    sel.removeAllRanges();
                                                    sel.addRange(range);
                                                }
                                            }}
                                        >
                                            {ans.answer}
                                        </div>

                                        {quiz.answers.length > 1 && (
                                            <Button
                                                type="text"
                                                size="small"
                                                danger
                                                icon={<MinusCircleOutlined />}
                                                onClick={() => removeAnswer(qIndex, aIndex)}
                                            />
                                        )}
                                    </div>
                                ))}
                            </Space>

                            {quiz?.answers.filter(ans => ans.correct).length > 0 && (
                                <div className="text-xs text-gray-500 mt-2">
                                    Type: {quiz.quizType}
                                </div>
                            )}
                        </Card>
                    ))}


                </div>
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
            </div>}
        </div>
    );
};

export default QuizForm;

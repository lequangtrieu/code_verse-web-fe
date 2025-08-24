import React, { useEffect, useState } from 'react';
import { Card, Typography, List, Skeleton, Space, Tag } from 'antd';
import commonApi from '../../../../common/api';
import axiosInstance from '../../../../config/axiosInstance';

const { Title, Paragraph, Text } = Typography;

const ExerciseViewer = ({ lessonId }) => {
    const [loading, setLoading] = useState(true);
    const [exercise, setExercise] = useState(null);

    const parseInputStringToList = (inputString) => {
        if (!inputString) return [];
        const matches = [...inputString.matchAll(/#@ip!(.*?)#@ip!/g)];
        return matches.map(m => m[1]);
    };

    useEffect(() => {
        const fetchExercise = async () => {
            setLoading(true);
            try {

                const response = await axiosInstance.get(commonApi.getExerciseByLessonId.url(lessonId));
                setExercise(response.data.result);
            } catch (err) {
                console.error("Error loading exercise", err);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 400)
            }
        };

        fetchExercise();
    }, [lessonId]);

    if (loading || !exercise) return <Skeleton active />;

    return (
        <div className="flex flex-col gap-6 relative">
            {/* Exercise Info & Tasks */}
            <div className="flex gap-4">
                {/* Info */}
                <Card title="Exercise Info" className="flex-1">
                    <Title level={5}>{exercise.title}</Title>
                    <Paragraph>{exercise.instruction}</Paragraph>
                    <div className="space-y-1">
                        <div>
                            <Text strong>Duration:</Text>{" "}
                            {exercise.duration} mins
                        </div>
                        <div>
                            <Text strong>EXP Reward:</Text>{" "}
                            <Tag color="blue">{exercise.expReward} XP</Tag>
                        </div>
                    </div>
                </Card>

                {/* Tasks */}
                <Card title="Tasks" className="flex-1">
                    <div className='max-h-64 overflow-y-auto scrollbar-thin'>
                        <List
                            dataSource={exercise.tasks}
                            bordered
                            renderItem={(task) => <List.Item>{task.description}</List.Item>}
                        />
                    </div>
                </Card>
            </div>

            {/* Test Cases */}
            <Card title="Test Cases" className="border p-4 rounded shadow">
                <div className='max-h-64 overflow-y-auto scrollbar-thin'>
                    <List
                        dataSource={exercise.testCases}
                        bordered
                        renderItem={(test) => (
                            <List.Item>
                                <Space direction="vertical" className="w-full">
                                    <div>
                                        <Text strong>Input:</Text> {parseInputStringToList(test.input).join("\n")}
                                    </div>
                                    <div>
                                        <Text strong>Expected Output:</Text> {test.expectedOutput}
                                    </div>
                                    <div>
                                        <Text strong>Priority:</Text> <Tag color="purple">{test.priority}</Tag>
                                    </div>
                                    <div>
                                        <Text strong>Visibility:</Text>{' '}
                                        {test.isPublic ? (
                                            <Tag color="green">Public</Tag>
                                        ) : (
                                            <Tag color="red">Private</Tag>
                                        )}
                                    </div>
                                </Space>
                            </List.Item>
                        )}
                    />
                </div>
            </Card>
        </div>
    );
};

export default ExerciseViewer;

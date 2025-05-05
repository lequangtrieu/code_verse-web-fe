import React from "react";
import { Form, Input, Button, Space } from "antd";
import { PlusOutlined, MinusCircleOutlined } from "@ant-design/icons";
import AnswerItem from "./AnswerItem";

const QuizItem = React.memo(({
    form,
    moduleIndex,
    lessonIndex,
    qField,
    qIndex,
    removeQuestion, 
    suppressErrors
}) => {

    const localSuppressed = true;
    const finalSuppressErrors = suppressErrors && localSuppressed;

    return (
        <Space
            key={`module-${moduleIndex}-lesson-${lessonIndex}-question-${qField.name}`}
            direction="vertical"
            className="w-full border border-gray-200 rounded p-4 mb-3"
        >
            <Form.Item
                {...qField}
                name={[qField.name, "question"]}
                label={`Question ${qField.name + 1}`}
                rules={[{ required: true, message: "Question required" }]}
                validateStatus={finalSuppressErrors ? "" : undefined}
                help={finalSuppressErrors ? "" : undefined}
            >
                <Input placeholder="Type the question" />
            </Form.Item>

            <Form.List name={[qField.name, "answers"]}>
                {(answerFields, { add: addAnswer, remove: removeAnswer }) => (
                    <>
                        {answerFields.map((aField) => {
                            return (
                                <AnswerItem
                                    key={`module-${moduleIndex}-lesson-${lessonIndex}-question-${qIndex}-answer-${aField.name}`}
                                    moduleIndex={moduleIndex}
                                    lessonIndex={lessonIndex}
                                    questionIndex={qIndex}
                                    aField={aField}
                                    removeAnswer={removeAnswer}
                                    suppressErrors={suppressErrors}
                                />
                            )
                        })}

                        <Form.Item>
                            <Button
                                type="dashed"
                                onClick={() => addAnswer()}
                                icon={<PlusOutlined />}
                            >
                                Add Answer
                            </Button>
                        </Form.Item>
                    </>
                )}
            </Form.List>

            <Button
                danger
                type="dashed"
                icon={<MinusCircleOutlined />}
                onClick={() => removeQuestion(qField.name)}
            >
                Remove Question
            </Button>
        </Space>
    );
});

export default QuizItem;
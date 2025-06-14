import React, { useState, useEffect } from "react";
import { Card, Tabs, Input, Button, notification, Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";

dayjs.extend(relativeTime);
dayjs.locale("en");

const { TabPane } = Tabs;
const { TextArea } = Input;

const LessonContent = ({ lesson }) => {
  
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyInputs, setReplyInputs] = useState({});

  useEffect(() => {
    setComments(lesson?.comments || []);
    setActiveReplyId(null);
    setReplyInputs({});
  }, [lesson]);

  if (!lesson) {
    return (
      <div className="max-h-[850px] min-w-[400px] w-1/2 p-4 bg-white overflow-y-auto">
        Select a lesson to view the content.
      </div>
    );
  }

  const openNotification = (type, messageText) => {
    notification[type]({
      message: messageText,
      placement: "topLeft",
      duration: 4,
    });
  };

  const handleSubmitComment = () => {
    if (!commentInput.trim()) {
      openNotification("warning", "Please enter a comment.");
      return;
    }

    const newComment = {
      id: Date.now().toString(),
      author: "DOLV2@fpt.com",
      content: commentInput,
      createdAt: new Date().toISOString(),
      replies: [],
    };

    setComments([newComment, ...comments]);
    setCommentInput("");
    openNotification("success", "Comment submitted successfully!");
  };

  const handleSubmitReply = (commentId) => {
    const reply = replyInputs[commentId];
    if (!reply || !reply.trim()) {
      openNotification("warning", "Please enter a reply.");
      return;
    }

    const newReply = {
      id: Date.now().toString(),
      author: "DOLV2@fpt.com",
      content: reply,
      createdAt: new Date().toISOString(),
    };

    const updatedComments = comments.map((cmt) =>
      cmt.id === commentId
        ? { ...cmt, replies: [...(cmt.replies || []), newReply] }
        : cmt
    );

    setComments(updatedComments);
    setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
    setActiveReplyId(null);
    openNotification("success", "Reply submitted successfully!");
  };

  const handleKeyDown = (e, type, commentId = null) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (type === "comment") {
        handleSubmitComment();
      } else if (type === "reply") {
        handleSubmitReply(commentId);
      }
    }
  };

  return (
    <div className="max-h-[850px] min-w-[400px] w-1/2 p-4 bg-white overflow-y-auto">
      <Tabs defaultActiveKey="1" size="large">
        <TabPane tab="Theory" key="1">
          <Card bordered={false}>
            <h2 className="text-xl font-semibold mb-2">
              {lesson.theory.title}
            </h2>
            <p className="text-gray-700 mb-4">{lesson.theory.content}</p>
            <pre className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
              {lesson.theory.example}
            </pre>
          </Card>
        </TabPane>

        <TabPane tab="Exercise" key="2">
          <Card bordered={false}>
            <h2 className="text-xl font-semibold mb-2">
              {lesson.exercise.title}
            </h2>
            <ul className="list-disc ml-6 text-gray-700">
              {lesson.exercise.tasks.map((task, index) => (
                <li key={index}>{task}</li>
              ))}
            </ul>
            <p className="mt-4">{lesson.exercise.instruction}</p>
          </Card>
        </TabPane>

        <TabPane tab="Discussion" key="3">
          <Card bordered={false}>
            <h2 className="text-xl font-semibold mb-4">Discussion</h2>

            <TextArea
              rows={3}
              placeholder="Write a new comment..."
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, "comment")}
              style={{ resize: "none" }}
            />
            <div className="mt-2 text-right">
              <Button type="primary" onClick={handleSubmitComment}>
                Submit Comment
              </Button>
            </div>

            <div className="mt-6 space-y-6">
              {comments.length === 0 && (
                <p className="text-gray-500">
                  No comments yet for this lesson.
                </p>
              )}
              {comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-blue-50 p-4 rounded shadow-sm"
                >
                  <div className="flex items-start gap-3">
                    <Avatar icon={<UserOutlined />} />
                    <div>
                      <p className="font-semibold">{comment.author}</p>
                      <p className="text-xs text-gray-500">
                        {dayjs(comment.createdAt).fromNow()}
                      </p>
                      <p className="text-gray-800 mt-1">{comment.content}</p>
                    </div>
                  </div>

                  <div className="mt-3 space-y-2 pl-6 border-l border-gray-300">
                    {(comment.replies || []).map((rep) => (
                      <div key={rep.id} className="bg-gray-100 p-2 rounded">
                        <div className="flex items-start gap-2">
                          <Avatar size="small" icon={<UserOutlined />} />
                          <div>
                            <p className="font-semibold text-sm">
                              {rep.author}
                            </p>
                            <p className="text-xs text-gray-500">
                              {dayjs(rep.createdAt).fromNow()}
                            </p>
                            <p className="text-gray-800 text-sm mt-1">
                              {rep.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-2">
                    <Button
                      size="small"
                      onClick={() =>
                        setActiveReplyId(
                          activeReplyId === comment.id ? null : comment.id
                        )
                      }
                    >
                      {activeReplyId === comment.id ? "Cancel" : "Reply"}
                    </Button>
                  </div>

                  {activeReplyId === comment.id && (
                    <div className="mt-2">
                      <TextArea
                        rows={2}
                        value={replyInputs[comment.id] || ""}
                        onChange={(e) =>
                          setReplyInputs((prev) => ({
                            ...prev,
                            [comment.id]: e.target.value,
                          }))
                        }
                        onKeyDown={(e) => handleKeyDown(e, "reply", comment.id)}
                        placeholder="Write a reply..."
                      />
                      <div className="text-right mt-1">
                        <Button
                          size="small"
                          type="primary"
                          onClick={() => handleSubmitReply(comment.id)}
                        >
                          Submit Reply
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default LessonContent;

import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Tabs,
  Input,
  Button,
  notification,
  Avatar,
  Tooltip,
  Modal,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/en";
import axiosInstance from "../../../../config/axiosInstance";
import commonApi from "../../../../common/api";
import { useSelector } from "react-redux";
import CommentActions from "../../../../common/CommentActions";
import ReportCommentModal from "../../../../common/ReportCommentModal";

dayjs.extend(relativeTime);
dayjs.locale("en");

const { TabPane } = Tabs;
const { TextArea } = Input;

const LessonContent = ({ lesson }) => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [editingComment, setEditingComment] = useState(null);
  const [editingParentId, setEditingParentId] = useState(null);
  const [editText, setEditText] = useState("");
  const user = useSelector((state) => state?.user?.user);
  const [commentInput, setCommentInput] = useState("");
  const [comments, setComments] = useState([]);
  const [activeReplyId, setActiveReplyId] = useState(null);
  const [replyInputs, setReplyInputs] = useState({});
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportComment, setReportComment] = useState(null);
  const [activeKey, setActiveKey] = useState("1");
  const containerRef = useRef(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const commentId = params.get("commentId");
    if (commentId) {
      setActiveKey("3");
      setTimeout(() => {
        const el = document.getElementById(`comment-${commentId}`);
        const container = containerRef.current;
        if (el && container) {
          const containerRect = container.getBoundingClientRect();
          const commentRect = el.getBoundingClientRect();

          const currentScroll = el.scrollTop;

          const desiredScroll =
            currentScroll +
            (commentRect.top - containerRect.top) -
            container.clientHeight / 2 +
            el.clientHeight / 2;
          const maxScroll = container.scrollHeight - container.clientHeight;
          const clampedScroll = Math.max(0, Math.min(desiredScroll, maxScroll));

          container.scrollTo({
            top: clampedScroll,
            behavior: "smooth",
          });
        }
      }, 200);

    }
  }, []);

  useEffect(() => {
    if (!lesson) return;

    const fetchComments = async () => {
      try {
        const res = await axiosInstance.get(
          commonApi.discussion.getByLesson(lesson.id)
        );
        setComments(res.data);
      } catch (err) {
        console.error("Failed to load comments:", err);
      }
    };

    fetchComments();
    setActiveReplyId(null);
    setReplyInputs({});
  }, [lesson]);

  if (!lesson) {
    return (
      <div className=
        // "max-h-[850px] min-w-[400px] w-1/2
        "w-full p-4 bg-white overflow-y-auto">
        Select a lesson to view the content.
      </div>
    );
  }

  const openNotification = (type, message, description = "") => {
    notification[type]({
      message,
      description,
      placement: "topLeft",
      duration: 4,
    });
  };

  const confirmDeleteComment = (commentId) => {
    setCommentToDelete(commentId);
    setDeleteModalOpen(true);
  };

  const handleConfirmedDelete = async () => {
    try {
      await axiosInstance.delete(commonApi.discussion.delete(commentToDelete));
      setComments((prev) =>
        prev.map((c) =>
          c.id === commentToDelete
            ? { ...c, isDeleted: true }
            : {
              ...c,
              replies: c.replies?.map((r) =>
                r.id === commentToDelete ? { ...r, isDeleted: true } : r
              ),
            }
        )
      );
      openNotification(
        "success",
        "Comment Deleted",
        "Your comment has been deleted successfully."
      );
    } catch {
      openNotification(
        "error",
        "Deletion Failed",
        "An error occurred while deleting the comment."
      );
    } finally {
      setDeleteModalOpen(false);
      setCommentToDelete(null);
    }
  };

  const handleSubmitComment = async () => {
    if (!user?.username) return;
    if (!commentInput.trim()) {
      openNotification(
        "warning",
        "Comment Required",
        "Please enter your comment before submitting."
      );
      return;
    }

    try {
      const res = await axiosInstance.post(commonApi.discussion.create, {
        lessonId: lesson.id,
        userId: user?.id,
        messageText: commentInput,
      });
      setComments([res.data, ...comments]);
      setCommentInput("");
      openNotification(
        "success",
        "Comment Submitted",
        "Your comment has been posted successfully."
      );
    } catch (err) {
      openNotification(
        "error",
        "Failed to Submit",
        "We were unable to post your comment. Please try again."
      );
    }
  };

  const handleSubmitReply = async (commentId) => {
    if (!user?.username) return;
    const reply = replyInputs[commentId];
    if (!reply || !reply.trim()) {
      openNotification(
        "warning",
        "Reply Required",
        "Please enter your reply before submitting."
      );
      return;
    }

    try {
      const res = await axiosInstance.post(
        commonApi.discussion.reply(commentId),
        {
          lessonId: lesson.id,
          userId: user?.id,
          messageText: reply,
        }
      );

      const updatedComments = comments.map((cmt) =>
        cmt.id === commentId
          ? { ...cmt, replies: [...(cmt.replies || []), res.data] }
          : cmt
      );

      setComments(updatedComments);
      setReplyInputs((prev) => ({ ...prev, [commentId]: "" }));
      setActiveReplyId(null);
      openNotification(
        "success",
        "Reply Submitted",
        "Your reply has been posted successfully."
      );
    } catch (err) {
      openNotification(
        "error",
        "Failed to Submit Reply",
        "We were unable to post your reply. Please try again."
      );
    }
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

  const startEditComment = (comment, parentId = null) => {
    setEditingComment(comment.id);
    setEditingParentId(parentId);
    setEditText(comment.messageText);
  };

  const submitEditComment = async () => {
    try {
      await axiosInstance.put(commonApi.discussion.update(editingComment), {
        messageText: editText,
      });

      setComments((prev) =>
        prev.map((c) => {
          if (c.id === editingComment && editingParentId === null) {
            return {
              ...c,
              originalMessage: c.messageText,
              messageText: editText,
            };
          }

          if (c.id === editingParentId) {
            const updatedReplies = c.replies.map((rep) =>
              rep.id === editingComment
                ? {
                  ...rep,
                  originalMessage: rep.messageText,
                  messageText: editText,
                }
                : rep
            );
            return { ...c, replies: updatedReplies };
          }

          return c;
        })
      );

      setEditingComment(null);
      setEditingParentId(null);
      setEditText("");
      openNotification("success", "Comment updated");
    } catch {
      openNotification("error", "Failed to update comment");
    }
  };

  const handleReport = (commentId) => {
    const comment = comments
      .flatMap((c) => [c, ...(c.replies || [])])
      .find((c) => c.id === commentId);

    if (comment) {
      setReportComment({ messageId: comment.id, reportedUserId: comment.userId });
      setReportModalOpen(true);
    }
  };

  return (
    <div className="h-[calc(100vh-85px)] min-w-[400px] w-full p-4 bg-white">
      <Tabs activeKey={activeKey} onChange={(key) => setActiveKey(key)} size="large">
        <TabPane tab="Theory" key="1">
          <Card bordered={false} className="max-h-[calc(100vh-190px)] overflow-y-auto">
            {lesson.theory ? (
              <>
                <h2 className="text-xl font-semibold mb-2">
                  {lesson.theory.title}
                </h2>
                <div className="text-gray-700 mb-4 prose max-w-none" dangerouslySetInnerHTML={{ __html: lesson.theory.content }}></div>
                {lesson.theory.example && (
                  <pre className="bg-gray-100 p-2 rounded text-sm whitespace-pre-wrap">
                    {lesson.theory.example}
                  </pre>
                )}
              </>
            ) : (
              <p className="text-gray-500">No theory content available.</p>
            )}
          </Card>
        </TabPane>

        <TabPane tab="Exercise" key="2">
          <Card bordered={false} className="max-h-[calc(100vh-190px)] overflow-y-auto">
            {lesson.exercise ? (
              <>
                <h2 className="text-xl font-semibold mb-2">
                  {lesson.exercise.title}
                </h2>
                <ul className="list-disc ml-6 text-gray-700">
                  {(lesson.exercise.tasks || []).map((task, index) => (
                    <li key={index}>{task}</li>
                  ))}
                </ul>
                <p className="mt-4">{lesson.exercise.instruction}</p>
              </>
            ) : (
              <p className="text-gray-500">
                No exercise available for this lesson.
              </p>
            )}
          </Card>
        </TabPane>

        <TabPane tab="Discussion" key="3">
          <Card bordered={false} className="max-h-[calc(100vh-190px)] overflow-y-auto" ref={containerRef}>
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

              {comments.map((comment) =>
                comment.isDeleted ? null : (
                  <div
                    key={comment.id}
                    className="bg-blue-50 p-4 rounded shadow-sm"
                  >
                    <div
                      id={`comment-${comment.id}`}
                      className="flex items-start gap-3">
                      <Avatar
                        src={comment.avatar}
                        icon={!comment.avatar && <UserOutlined />}
                      />
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">
                              {comment.authorEmail}
                            </p>
                            <p className="text-xs text-gray-500">
                              {dayjs(comment.createdAt).fromNow()}
                            </p>
                          </div>
                          <CommentActions
                            isOwner={user?.id === comment.userId}
                            onEdit={() => startEditComment(comment)}
                            onDelete={() => confirmDeleteComment(comment.id)}
                            onReport={() => handleReport(comment.id)}
                          />
                        </div>

                        <ReportCommentModal
                          open={reportModalOpen}
                          onClose={() => setReportModalOpen(false)}
                          messageId={reportComment?.messageId}
                          reportedUserId={reportComment?.reportedUserId}
                        />

                        {editingComment === comment.id ? (
                          <div className="mt-2">
                            <TextArea
                              style={{ resize: "none" }}
                              rows={3}
                              value={editText}
                              onChange={(e) => setEditText(e.target.value)}
                            />
                            <div className="text-right mt-1">
                              <Button
                                size="small"
                                onClick={() => setEditingComment(null)}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="small"
                                type="primary"
                                className="ml-2"
                                onClick={submitEditComment}
                              >
                                Save
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="text-gray-800 mt-1 text-sm">
                            {comment.messageText}
                            {comment.originalMessage && (
                              <Tooltip
                                title={`Original: ${comment.originalMessage}`}
                              >
                                <span className="ml-2 text-blue-500 text-xs cursor-pointer">
                                  Edited
                                </span>
                              </Tooltip>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Replies */}
                    <div className="mt-3 space-y-2 pl-6 border-l border-gray-300">
                      {(comment.replies || []).map((rep) =>
                        rep?.isDeleted ? null : (
                          <div key={rep.id} id={`comment-${rep.id}`} className="bg-gray-100 p-2 rounded">
                            <div className="flex items-start gap-2">
                              <Avatar
                                src={rep.avatar}
                                icon={!rep.avatar && <UserOutlined />}
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-semibold text-sm">
                                      {rep.authorEmail}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                      {dayjs(rep.createdAt).fromNow()}
                                    </p>
                                  </div>
                                  <CommentActions
                                    isOwner={user?.id === rep.userId}
                                    onEdit={() =>
                                      startEditComment(rep, comment.id)
                                    }
                                    onDelete={() =>
                                      confirmDeleteComment(rep.id)
                                    }
                                    onReport={() => handleReport(rep.id)}
                                  />
                                </div>

                                {editingComment === rep.id ? (
                                  <div className="mt-1">
                                    <TextArea
                                      style={{ resize: "none" }}
                                      rows={3}
                                      value={editText}
                                      onChange={(e) =>
                                        setEditText(e.target.value)
                                      }
                                    />
                                    <div className="text-right mt-1">
                                      <Button
                                        size="small"
                                        onClick={() => setEditingComment(null)}
                                      >
                                        Cancel
                                      </Button>
                                      <Button
                                        size="small"
                                        type="primary"
                                        className="ml-2"
                                        onClick={submitEditComment}
                                      >
                                        Save
                                      </Button>
                                    </div>
                                  </div>
                                ) : (
                                  <p className="text-gray-800 text-sm mt-1">
                                    {rep.messageText}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                        )
                      )}
                    </div>

                    {/* Reply input */}
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
                          style={{ resize: "none" }}
                          rows={3}
                          value={replyInputs[comment.id] || ""}
                          onChange={(e) =>
                            setReplyInputs((prev) => ({
                              ...prev,
                              [comment.id]: e.target.value,
                            }))
                          }
                          onKeyDown={(e) =>
                            handleKeyDown(e, "reply", comment.id)
                          }
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
                )
              )}
            </div>
          </Card>
        </TabPane>
      </Tabs>
      <Modal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        footer={null}
        centered
        className="custom-modal"
        getContainer={false}
        width={400}
      >
        <div className="text-center">
          <h3 className="text-lg font-semibold mb-2">Are you sure?</h3>
          <p className="text-gray-600 mb-4">This action cannot be undone.</p>
          <div className="flex justify-end gap-2">
            <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
            <Button danger type="primary" onClick={handleConfirmedDelete}>
              Delete
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default LessonContent;

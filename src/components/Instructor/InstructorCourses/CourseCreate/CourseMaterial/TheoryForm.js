import React, { useRef, useState, useEffect } from "react";
import { Form, Input, Button, message, Typography, Modal } from "antd";
import RichTextEditor from "./RichTextEditor";
import axiosInstance from "../../../../../config/axiosInstance";
import commonApi from "../../../../../common/api";
import LoadingContainer from "../../../../../common/LoadingContainer";

const { Text } = Typography;

const TheoryForm = ({ lessonId, isActive, hasChange, setHasChange, isTraining = false }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const theoryTitle = Form.useWatch("title", form);
  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef();
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    fetchTheory();
    // eslint-disable-next-line
  }, [lessonId]);

  const fetchTheory = async () => {
    setInitialLoading(true);
    try {
      const res = await axiosInstance.get(commonApi.getTheory.url(lessonId));
      form.setFieldsValue({
        title: res.data?.result?.title,
      });
      setEditorContent(res.data?.result?.content || "");
    } catch (error) {
      console.log(error);
    } finally {
      setTimeout(() => {
        setInitialLoading(false);
      }, 400);
    }
  };

  const handleSaveTheory = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      const payload = {
        lessonId,
        title: values.title,
        content: editorContent,
      };

      await axiosInstance.post(commonApi.createTheory.url, payload);
      setHasChange(false);
      message.success("Theory saved successfully!");
    } catch (err) {
      message.error("Error saving theory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isActive || !hasChange) return;

    const handleKeySave = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSaveTheory();
      }
    }
    window.addEventListener("keydown", handleKeySave);
    return () => window.removeEventListener("keydown", handleKeySave);
  }, [isActive, handleSaveTheory]);

  return (
    <Form form={form} layout="vertical" className="relative">
      {initialLoading && <LoadingContainer />}

      <Form.Item
        name="title"
        label="Theory Title"
        rules={[{ required: true, message: "Please input the theory title" }]}
      >
        <Input placeholder="Enter theory title" onChange={() => setHasChange(true)} />
      </Form.Item>

      <Form.Item label="Theory Content" required>
        <RichTextEditor
          isTraining={isTraining}
          content={editorContent}
          onChange={(value) => {
            setHasChange(true);
            setEditorContent(value);
          }}
          lessonId={lessonId}
          ref={editorRef}
          theoryTitle={theoryTitle}
        />
      </Form.Item>

      <Button
        type="primary"
        className="mt-6 justify-end"
        onClick={handleSaveTheory}
        loading={loading}
        disabled={!hasChange}
      >
        Save Theory
      </Button>

      {hasChange && <Text className="ml-4">Unsaved.</Text>}
    </Form>
  );
};

export default TheoryForm;

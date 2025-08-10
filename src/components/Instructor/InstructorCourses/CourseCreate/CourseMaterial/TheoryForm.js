import React, { useRef, useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import RichTextEditor from "./RichTextEditor";
import axiosInstance from "../../../../../config/axiosInstance";
import commonApi from "../../../../../common/api";
import LoadingContainer from "../../../../../common/LoadingContainer";

const TheoryForm = ({ lessonId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
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
      message.error("Error fetching theory.");
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

      message.success("Theory saved successfully!");
    } catch (err) {
      message.error("Error saving theory.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" className="relative">
      {initialLoading && <LoadingContainer />}

      <Form.Item
        name="title"
        label="Theory Title"
        rules={[{ required: true, message: "Please input the theory title" }]}
      >
        <Input placeholder="Enter theory title" />
      </Form.Item>

      <Form.Item label="Theory Content" required>
        <RichTextEditor
          content={editorContent}
          onChange={(value) => setEditorContent(value)}
          lessonId={lessonId}
          ref={editorRef}
        />
      </Form.Item>

      <Button
        type="primary"
        className="mt-6 justify-end"
        onClick={handleSaveTheory}
        loading={loading}
      >
        Save Theory
      </Button>
    </Form>
  );
};

export default TheoryForm;

import React, { useRef, useState, useEffect } from "react";
import { Form, Input, Button, message } from "antd";
import RichTextEditor from "./RichTextEditor";
import axiosInstance from "../../../../../config/axiosInstance";
import commonApi from "../../../../../common/api";
import LoadingContainer from "../../../../../common/LoadingContainer";

function htmlToFile(htmlContent, fileName = "theory.html") {
  const blob = new Blob([htmlContent], { type: "text/html" });
  return new File([blob], fileName, { type: "text/html" });
}

const TheoryForm = ({ lessonId }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const editorRef = useRef();
  const [initialLoading, setInitialLoading] = useState(false);

  useEffect(() => {
    fetchTheory();
  }, [lessonId]);

  const fetchTheory = async () => {
    setInitialLoading(true);
    try {
      const res = await axiosInstance.get(commonApi.getTheory.url(lessonId));
      form.setFieldsValue({
        title: res.data.result.title
      });
      setEditorContent(res.data.result.content || "");
    } catch (error) {
      message.error("Error fetching theory.");
    }
    finally {
      setTimeout(() => {
        setInitialLoading(false);
      }, 400);
    }
  };

  const handleSaveTheory = async () => {
    setLoading(true);
    const htmlContent = editorContent;

    try {
      const values = await form.validateFields();
      const title = values.title;

      const htmlFile = htmlToFile(htmlContent, `${title}.html`);
      const formData = new FormData();
      formData.append("lessonId", lessonId);
      formData.append("title", title);
      formData.append("contentFile", htmlFile);

      await axiosInstance.post(commonApi.createTheory.url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

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

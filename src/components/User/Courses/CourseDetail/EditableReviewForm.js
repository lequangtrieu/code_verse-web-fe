import { Form, Input, Rate, Button, notification } from "antd";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../config/axiosInstance";
import commonApi from "../../../../common/api";

const EditableReviewForm = ({ review, courseId, onCancel, onSuccess }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (review) {
      form.setFieldsValue({
        rating: review.rating,
        comment: review.comment,
      });
    }
  }, [review, form]);

  const handleFinish = async (values) => {
    try {
      setLoading(true);
      const res = await axiosInstance.put(
        commonApi.courseRating.update(review.id),
        {
          courseId,
          rating: values.rating,
          comment: values.comment,
        }
      );

      notification.success({
        message: "Review Updated",
        description: res.data || "Your review has been updated successfully.",
        placement: "topLeft",
      });

      onSuccess?.();
      onCancel?.();
    } catch (err) {
      const errorMessage =
        err.response?.data ||
        "Failed to update your review. Please revise and try again.";
      notification.error({
        message: "Update Failed",
        description: errorMessage,
        placement: "topLeft",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border border-gray-300 rounded-xl p-5 mt-2 w-full">
      <Form layout="vertical" form={form} onFinish={handleFinish}>
        <Form.Item
          name="rating"
          label={<span className="font-medium text-gray-700">Rating</span>}
          rules={[{ required: true, message: "Please rate the course" }]}
        >
          <Rate className="text-yellow-400" />
        </Form.Item>
        <Form.Item
          name="comment"
          label={<span className="font-medium text-gray-700">Comment</span>}
        >
          <Input.TextArea
            rows={3}
            placeholder="Write your review..."
            className="resize-none"
          />
        </Form.Item>
        <Form.Item className="mb-0 text-right">
          <Button
            htmlType="submit"
            type="primary"
            size="small"
            className="px-5"
            loading={loading}
          >
            Save
          </Button>
          <Button onClick={onCancel} size="small" className="ml-2 px-5">
            Cancel
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditableReviewForm;

import { Form, Input, Rate, Button, message } from "antd";
import { useEffect } from "react";
import axiosInstance from "../../../../config/axiosInstance";
import commonApi from "../../../../common/api";

const EditableReviewForm = ({ review, courseId, onCancel, onSuccess }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (review) {
      form.setFieldsValue({
        rating: review.rating,
        comment: review.comment,
      });
    }
  }, [review]);

  const handleFinish = async (values) => {
    try {
      await axiosInstance.put(commonApi.courseRating.update(review.id), {
        courseId,
        rating: values.rating,
        comment: values.comment,
      });
      onSuccess?.();
    } catch (err) {
      message.error("Update failed");
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
          <Button htmlType="submit" type="primary" size="small" className="px-5">
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
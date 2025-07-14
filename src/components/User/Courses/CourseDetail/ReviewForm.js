import { Form, Input, Rate, Button, message } from "antd";
import { useSelector } from "react-redux";
import commonApi from "../../../../common/api";
import axiosInstance from "../../../../config/axiosInstance";

const ReviewForm = ({ courseId, onSuccess }) => {
  const [form] = Form.useForm();
  const user = useSelector((state) => state.user.user);

  const handleSubmit = async (values) => {
    try {
      await axiosInstance.post(
        commonApi.courseRating.submit,
        {
          courseId,
          rating: values.rating,
          comment: values.comment,
        },
        {
          params: { userId: user.id },
        }
      );
      message.success("Thank you for your feedback!");
      form.resetFields();
      if (typeof onSuccess === "function") onSuccess();
    } catch (err) {
      console.error(err);
      message.error("Failed to submit your review.");
    }
  };

  return (
    <Form layout="vertical" form={form} onFinish={handleSubmit}>
      <Form.Item
        name="rating"
        label="Your Rating"
        rules={[{ required: true, message: "Please rate the course" }]}
      >
        <Rate />
      </Form.Item>
      <Form.Item name="comment" label="Your Comment">
        <Input.TextArea rows={4} placeholder="Your thoughts about this course..." />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="bg-pink-500 hover:bg-pink-600">
          Submit Review
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ReviewForm;

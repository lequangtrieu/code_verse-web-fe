import { Button, Form, Input, Card, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import getAuthInfo from "../../../config/getAuthInfo";
import Context from "../../../config/context/context";
import { useContext } from "react";
import setAuthInfo from "../../../config/setAuthInfo";

const UserChangePassword = () => {
  const [form] = Form.useForm();
  const { fetchUserDetails } = useContext(Context);

  const onFinish = async (values) => {
    try {
      const { username } = getAuthInfo();

      const response = await axiosInstance.post(commonApi.changePassword.url, {
        username: username,
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      });

      const result = response.data?.result;

      if (result?.authenticated) {
        setAuthInfo({
          username: result.username,
          token: result.token,
          refreshToken: result.refreshToken,
        });

        await fetchUserDetails();

        notification.success({
          message: "Password Changed Successfully",
          description: "You can now continue using your new password.",
          placement: "topLeft",
        });

        form.resetFields();
      } else {
        notification.error({
          message: "Password Change Failed",
          description: "Please try again.",
          placement: "topLeft",
        });
      }

      form.resetFields();
      await fetchUserDetails();
    } catch (error) {
      if (error.response) {
        const data = error.response.data;

        notification.error({
          message: "Password Change Failed",
          description:
            data?.message || "Please check your inputs and try again.",
          placement: "topLeft",
        });
      } else {
        notification.error({
          message: "Network Error",
          description:
            "Unable to connect to the server. Please try again later.",
          placement: "topLeft",
        });
      }
    }
  };

  return (
    <div className="w-full h-full pt-2">
      <Card className="w-full shadow-lg" title="Change Password">
        <div className="max-w-xl">
          <Form
            layout="vertical"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Current Password"
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: "Please enter your current password.",
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Current password"
              />
            </Form.Item>

            <Form.Item
              label="New Password"
              name="newPassword"
              rules={[
                { required: true, message: "Please enter your new password." },
                { min: 8, message: "Password must be at least 8 characters." },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="New password"
              />
            </Form.Item>

            <Form.Item
              label="Confirm New Password"
              name="confirmPassword"
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                  message: "Please confirm your new password.",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Passwords do not match."));
                  },
                }),
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Confirm password"
              />
            </Form.Item>

            <Form.Item className="text-right">
              <Button
                type="primary"
                htmlType="submit"
                className="px-6 rounded-md shadow-sm hover:scale-[1.02] transition-transform"
              >
                Change Password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default UserChangePassword;

import React, {useState} from 'react';
import {Button, Form, Input, message, notification, Radio} from 'antd';
import {LockOutlined, MailOutlined, PhoneOutlined, UserOutlined} from '@ant-design/icons';
import {logoutUser} from "../../config/store/userSlice";
import axios from "axios";
import commonApi from "../../common/api";
import {useDispatch} from "react-redux";
import UploadImage from "../../common/UploadImage";

const RegisterPage = () => {
    const [userType, setUserType] = useState('learner');
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    const coverFileList = Form.useWatch("teachingCredentials", form) || [];

    const handleUserTypeChange = (e) => {
        setUserType(e.target.value);
    };

    const onFinish = async (values) => {
        setLoading(true);

        dispatch(logoutUser());
        try {
            const formData = new FormData();

            formData.append('username', values.email);
            formData.append('name', values.fullName);
            formData.append('password', values.password);
            formData.append('role', userType.toUpperCase());

            if (userType === 'instructor') {
                formData.append('phoneNumber', values.phone);
                formData.append('educationalBackground', values.educationBackground || '');

                // Lấy file đầu tiên trong fileList của teachingCredentials
                if (values.teachingCredentials && values.teachingCredentials.length > 0) {
                    const file = values.teachingCredentials[0].originFileObj;
                    if (file) {
                        formData.append('teachingCredentials', file);
                    }
                }
            }

            const response = await axios.post(commonApi.signUP.url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (response.status === 200) {
                setTimeout(() => {
                    notification.success({
                        message: "Registration Successful",
                        description:
                            "Your account has been created successfully. Please check your email to verify your account before logging in.",
                        placement: "topLeft",
                    });
                }, 1000);
            }
        } catch (error) {
            if (error.response) {
                const { data } = error.response;

                const errorMessage =
                    data?.message || "Registration failed. Please try again.";

                notification.error({
                    message: `Registration Failed.`,
                    description: errorMessage,
                    placement: "topLeft",
                });
            } else {
                notification.error({
                    message: "Network Error",
                    description: "Cannot connect to the server. Please try again later.",
                    placement: "topLeft",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo) => {
        message.error('Please check the form for errors and try again.');
    };

    const validatePassword = (_, value) => {
        if (!value || value.length < 8) {
            return Promise.reject('Password must be at least 8 characters');
        }
        if (!/[A-Z]/.test(value)) {
            return Promise.reject('Password must include at least one uppercase letter');
        }
        if (!/\d/.test(value)) {
            return Promise.reject('Password must include at least one number');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
            return Promise.reject('Password must include at least one special character');
        }
        return Promise.resolve();
    };

    return (
        <div className="max-w-lg mx-auto p-10 bg-white rounded-xl shadow-md py-6 mt-12 mb-12">
            <h2 className="text-center text-2xl font-bold mb-6">Create an Account</h2>

            <Radio.Group onChange={handleUserTypeChange} value={userType} className="w-full mb-4 flex justify-center space-x-8">
                <Radio value="learner" className="p-4 text-lg font-semibold">Learner</Radio>
                <Radio value="instructor" className="p-4 text-lg font-semibold">Instructor</Radio>
            </Radio.Group>

            <Form form={form} onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  layout="vertical" className="space-y-4">
                <Form.Item
                    name="email"
                    label="Email"
                    rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}
                >
                    <Input prefix={<MailOutlined />} placeholder="Enter your email" className="rounded-lg" />
                </Form.Item>

                <Form.Item
                    name="fullName"
                    label="Full Name"
                    rules={[{ required: true, message: 'Please input your full name!' }]}
                >
                    <Input prefix={<UserOutlined />} placeholder="Enter your full name" className="rounded-lg" />
                </Form.Item>

                <Form.Item
                    name="password"
                    label="Password"
                    rules={[{ required: true, message: 'Please input your password!' }, { validator: validatePassword }]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Enter your password" className="rounded-lg" />
                </Form.Item>

                <Form.Item
                    name="confirmPassword"
                    label="Confirm Password"
                    dependencies={['password']}
                    rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject('The two passwords that you entered do not match!');
                            },
                        }),
                    ]}
                >
                    <Input.Password prefix={<LockOutlined />} placeholder="Confirm your password" className="rounded-lg" />
                </Form.Item>

                {userType === 'instructor' && (
                    <>
                        <Form.Item
                            name="phone"
                            label="Phone Number"
                            rules={[{ required: true, message: 'Please input your phone number!' }]}
                        >
                            <Input prefix={<PhoneOutlined />} placeholder="Enter your phone number" className="rounded-lg" />
                        </Form.Item>

                        <Form.Item
                            name="teachingCredentials"
                            label="Teaching Credentials"
                            valuePropName="fileList"
                            getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
                            rules={[{ required: true, message: 'Please upload your teaching credentials!' }]}
                        >
                            <UploadImage
                                label="Upload Here"
                                maxCount={1}
                                accept=".jpg,.jpeg,.png"
                                value={coverFileList}
                            />
                        </Form.Item>

                        <Form.Item
                            name="educationBackground"
                            label="Educational Background (Optional)"
                        >
                            <Input.TextArea placeholder="Enter your educational background (optional)" className="rounded-lg" />
                        </Form.Item>
                    </>
                )}

                <Form.Item>
                    <Button type="primary" htmlType="submit"
                            className="w-full py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none"
                            loading={loading}
                            disabled={loading}
                    >
                        Register
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default RegisterPage;

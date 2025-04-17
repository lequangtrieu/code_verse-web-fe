import React, { useState } from "react";
import { Steps, Button, message, Form } from "antd";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";

import CourseDescription from "./CourseDescription";
import CourseMaterial from "./CourseMaterial";
import BonusInfo from "./BonusInfo";

const { Step } = Steps;

const steps = [
  { title: "Course Info", component: CourseDescription },
  { title: "Course Material", component: CourseMaterial },
  { title: "Bonus Info", component: BonusInfo },
  { title: "Submit & Review" },
];

export default function CourseForm() {
  const [form] = Form.useForm();
  const [current, setCurrent] = useState(0);
  const [completed, setCompleted] = useState({});

  const next = () => {
    setCurrent((prev) => Math.min(prev + 1, steps.length - 1));
  };

  const prev = () => {
    setCurrent((prev) => Math.max(prev - 1, 0));
  };

  const markComplete = (index) => {
    setCompleted((prev) => ({ ...prev, [index]: true }));
  };

  const CurrentComponent = steps[current]?.component;

  const handleSubmit = () => {
    form.validateFields()
      .then(values => {
        console.log("Submitted values:", values);
        message.success("Course submitted successfully!");
      })
      .catch(() => {
        message.error("Please complete all required fields.");
      });
  };

  return (
    <div className="bg-gray-100 py-10">
      <div className="animate-preloader opacity-0 invisible fixed top-0 left-0 -z-1 w-full transition-all duration-300">
        <div className="preloader flex h-screen w-full items-center justify-center bg-whiteColor transition-all duration-700">
          <div className="w-90px h-90px border-5px border-t-blue border-r-blue border-b-blue-light border-l-blue-light rounded-full animate-spin-infinit"></div>
          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
            <img
              alt="Preloader"
              loading="lazy"
              width="512"
              height="512"
              decoding="async"
              data-nimg="1"
              className="h-15 w-15 block r rounded"
              src="../../logoCodeVerse.png"
            />
          </div>
        </div>
      </div>

      <div className="flex min-h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r">
          <ul className="mt-10 space-y-4 p-4">
            {steps.map((step, index) => (
              <li
                key={index}
                onClick={() => setCurrent(index)}
                className={`cursor-pointer flex items-center justify-between px-4 py-2 rounded-lg transition ${current === index
                  ? "bg-blue-100 text-blue-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
                  }`}
              >
                <span>{step.title}</span>
                {completed[index] ? (
                  <CheckCircleOutlined className="text-green-500" />
                ) : (
                  <CloseCircleOutlined className="text-gray-300" />
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Main Form */}
        <div className="flex-1 p-10">
          <Steps current={current} className="mb-10">
            {steps.map((step, index) => (
              <Step
                key={index}
                title={step.title}
                status={
                  completed[index]
                    ? "finish"
                    : index === current
                      ? "process"
                      : "wait"
                }
              />
            ))}
          </Steps>

          <Form
            form={form}
            layout="vertical"
            className="bg-white p-6 rounded shadow"
          >
            {CurrentComponent ? (
              <CurrentComponent
                form={form}
                markComplete={() => markComplete(current)}
                next={next}
                prev={prev}
              />
            ) : (
              <div className="text-center">
                <h2 className="text-xl font-bold p-5">Ready to Submit!</h2>
                <Button type="primary" onClick={handleSubmit}>
                  Submit Course
                </Button>
              </div>
            )}
          </Form>

          {/* Navigation Buttons */}
          <div className="mt-8 flex justify-between">
            <Button disabled={current === 0} onClick={prev}>
              Previous
            </Button>
            {current < steps.length - 1 && (
              <Button type="primary" onClick={next}>
                Next
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

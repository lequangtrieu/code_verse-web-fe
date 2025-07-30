import React, { useEffect, useState, useRef } from "react";
import { Tabs, message, Card, Button } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import TrainingBasicInfo from "./TrainingBasicInfo";
import TheoryForm from "../InstructorCourses/CourseCreate/CourseMaterial/TheoryForm";
import ExerciseForm from "../InstructorCourses/CourseCreate/CourseMaterial/ExerciseForm";

const { TabPane } = Tabs;

export default function TrainingCreation() {
  const { id } = useParams();
  const [courseId, setCourseId] = useState(null);
  const [lessonId, setLessonId] = useState(null);
  const [initialValues, setInitialValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  const navigate = useNavigate();
  const tabsRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchTraining();
    }
  }, [id]);

  const fetchTraining = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(commonApi.instructorGetTraining.url(id));
      const data = res.data.result;
      setInitialValues({
        title: data.title,
        levelId: data.level,
        language: data.language,
        expReward: data.expReward,
      });
      setCourseId(data.courseId);
      setLessonId(data.lessonId);
    } catch (err) {
      message.error("Failed to load training data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveBasicInfo = async (form) => {
    try {
      const values = await form.validateFields();

      const formData = new FormData();
      formData.append("title", values.title);
      formData.append("level", values.levelId);
      formData.append("language", values.language);
      formData.append("expReward", values.expReward ?? 0);
      formData.append("status", "TRAINING_DRAFT");
      formData.append("categoryId", 1);
      formData.append("instructor", "");
      formData.append("price", "0");

      for (const pair of formData.entries()) {
        console.log(`${pair[0]}: ${pair[1]}`);
      }

      let response;

      if (id || lessonId) {
        // update
        response = await axiosInstance.put(commonApi.updateTraining.url(courseId), formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        message.success("Training updated successfully!");
      } else {
        // create
        response = await axiosInstance.post(commonApi.createTraining.url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        const { lessonId: newLessonId } = response.data.result;
        const { courseId: newCourseId } = response.data.result;
        setLessonId(newLessonId);
        setCourseId(newCourseId);
        message.success("Training lesson created successfully!");

        setTimeout(() => {
          if (tabsRef.current) {
            const element = tabsRef.current;
            const rect = element.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const offset = rect.top + scrollTop - window.innerHeight / 2 + rect.height / 2;
        
            window.scrollTo({
              top: offset,
              behavior: "smooth",
            });
          }
        }, 300);
      }
    } catch (err) {
      console.error("Create training failed:", err);
      message.error("Failed to create training lesson.");
    }
  };

  const handleSubmitForApproval = async () => {
    if (!courseId) {
      message.error("Training ID not found.");
      return;
    }

    setSubmitLoading(true);
    try {
      const res = await axiosInstance.get(commonApi.validateCourse.url(courseId));

      const { valid, errors } = res.data.result;

      if (valid) {
        await axiosInstance.patch(commonApi.updateCourseStatus.url(courseId), {
          status: "TRAINING_PUBLISHED",
        });

        message.success("Training has been published.");
        navigate("/instructor-panel/trainings");
      } else {
        errors.forEach(err => {
          message.error(err);
        });
      }
    } catch (error) {
      message.error("Failed to validate the training.");
    } finally {
      setSubmitLoading(false);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl w-full mx-auto">
        <div className="flex justify-between items-center mb-4">
          <Button onClick={() => navigate('/instructor-panel/trainings')}>Back</Button>
          {lessonId && (
            <Button type="primary" onClick={handleSubmitForApproval} loading={submitLoading}>
              Publish
            </Button>
          )}
        </div>

        <Card title="Basic Training Info" className="mb-6" loading={loading}>
          <TrainingBasicInfo onSave={handleSaveBasicInfo} initialValues={initialValues} />
        </Card>

        {lessonId && (
          <Card ref={tabsRef}>
            <Tabs defaultActiveKey="theory">
              <TabPane tab="Theory" key="theory">
                <TheoryForm lessonId={lessonId} />
              </TabPane>
              <TabPane tab="Exercise" key="exercise">
                <ExerciseForm lessonId={lessonId} />
              </TabPane>
            </Tabs>
          </Card>
        )}
      </div>
    </div>
  );
}

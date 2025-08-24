import React, { useState, useEffect, useCallback, useRef } from "react";
import LessonSidebar from "../../../User/Courses/lesson/LessonSidebar";
import LessonContent from "../../../User/Courses/lesson/LessonContent";
import CodeEditor from "../../../User/layout/CodeEditor";
import QuizBankPreview from "./QuizBankPreview";
import commonApi from "../../../../common/api";
import axiosInstance from "../../../../config/axiosInstance";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../../../common/LoadingOverlay";
import ResizableSplitLayout from "../../../../common/ResizableSplitLayout";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../../../common/useDocumentTitle";

export default function CourseDetailView() {
  useDocumentTitle("Course Detail");
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const user = useSelector((state) => state?.user?.user);
  const [isOwner, setIsOwner] = useState(null);
  const [lessonData, setLessonData] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [language, setLanguage] = useState(null);
  const [instructor, setInstructor] = useState(null);

  const selectedLessonIdRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
}, [selectedLesson]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const lesson_id = Number(params.get("lesson"));
    if (lesson_id) {
      selectedLessonIdRef.current = lesson_id;
      if (lessonData?.length > 0) {
        for (const lesson of lessonData) {
          const found = lesson?.subLessons.find(sub => sub.id === lesson_id);
          if (found) {
            setSelectedLesson(found);
          }
        }
      }
    }
  }, [lessonData]);

  const fetchCourseData = useCallback(
    async (options = { initialLoad: false }) => {
      try {
        const [response, courseRes] = await Promise.all([
          axiosInstance.get(commonApi.getCourseDetails.url(courseId, user?.id)),
          axiosInstance.get(commonApi.instructorGetCourse.url(courseId)),
        ]);

        setCourse(courseRes.data.result);
        setLanguage(response.data.result?.language.toLowerCase());
        setInstructor(response.data.result?.instructor);
        setLessonData(response.data.result.data);

        const allLessons = response.data.result.data.flatMap(
          (module) => module.subLessons || []
        );

        if (options.initialLoad) {
          const firstUnfinished = allLessons.find(
            (lesson) => lesson.status !== "PASSED"
          );
          const fallbackLesson =
            allLessons.find((l) => l.lessonType !== "EXAM") || allLessons[0];

          const selected = firstUnfinished || fallbackLesson || null;
          selectedLessonIdRef.current = selected?.id || null;
          setSelectedLesson(selected);
        } else {
          const updated = allLessons.find(
            (l) => l.id === selectedLessonIdRef.current
          );
          if (updated) {
            setSelectedLesson(updated);
          }
        }
      } catch (error) {
        console.error("Error fetching course details:", error);
      }
    },
    [courseId, user?.id]
  );

  useEffect(() => {
    const checkOwner = async () => {
      if (!user?.username || !user?.id) {
        setIsOwner(false);
        notification.warning({
          message: "Login Required",
          description: "Please log in to view this page.",
          placement: "topLeft",
        });
        navigate("/");
        return;
      }

      try {
        const res = await axiosInstance.get(
          commonApi.isCourseOwner.url(courseId));
        if (res.data.result === true) {
          setIsOwner(true);
        } else {
          setIsOwner(false);
          notification.destroy();
          notification.error({
            message: "Access Denied",
            description: "You don't have permission to view this page.",
            placement: "topLeft",
          });
          navigate("/instructor-panel/courses");
        }
      } catch (err) {
        console.error("Error checking permission", err);
        setIsOwner(false);
      }
    };

    checkOwner();
  }, [courseId, user, navigate]);

  useEffect(() => {
    if (isOwner && user?.id) {
      fetchCourseData({ initialLoad: true });
    }
  }, [fetchCourseData, isOwner, user?.id]);

  const handleSelectLesson = (lesson) => {
    selectedLessonIdRef.current = lesson?.id;
    setSelectedLesson(lesson);
  };

  if (!lessonData) {
    return <LoadingOverlay />;
  }

  if (!lessonData) {
    return <LoadingOverlay />;
  }

  if (isOwner === null || !isOwner) return <LoadingOverlay />;

  return (
    <div className="flex min-h-[calc(100vh-120px)] overflow-y-auto">
      <LessonSidebar
        lessons={lessonData}
        selectedLessonId={selectedLesson?.id}
        onSelect={setSelectedLesson}
      />
      {selectedLesson && (
        <>
          {selectedLesson.lessonType === "EXAM" ? (
            <QuizBankPreview lessonId={selectedLesson?.id}
            />
          ) : (
            <>
              <ResizableSplitLayout
                leftComponent={<LessonContent status={course?.status} instructor={instructor} lesson={selectedLesson} />}
                rightComponent={<CodeEditor
                  key={selectedLesson?.id}
                  lessonId={selectedLesson?.id}
                  userId={user?.id}
                  defaultCode={selectedLesson.code || selectedLesson.defaultCode}
                  testCases={selectedLesson.testCases || []}
                  language={language === "all" ? null : language}
                  onRefreshLessonData={(opts) => fetchCourseData(opts)}
                  exercise={selectedLesson?.exercise}
                  allLessons={lessonData.flatMap((m) => m.subLessons || [])}
                  onChangeLesson={handleSelectLesson}
                />}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}
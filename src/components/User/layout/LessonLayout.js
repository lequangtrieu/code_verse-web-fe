import React, { useState, useEffect, useCallback, useRef } from "react";
import LessonSidebar from "../Courses/lesson/LessonSidebar";
import LessonContent from "../Courses/lesson/LessonContent";
import CodeEditor from "./CodeEditor";
import QuizComponent from "../Courses/lesson/QuizComponent";
import commonApi from "../../../common/api";
import axiosInstance from "../../../config/axiosInstance";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../../common/LoadingOverlay";
import ResizableSplitLayout from "../../../common/ResizableSplitLayout";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../../../common/useDocumentTitle";

export default function LessonLayout() {
  useDocumentTitle("Study - CodeVerse");
  const navigate = useNavigate();
  const { courseId } = useParams();
  const user = useSelector((state) => state?.user?.user);
  const [isEnrolled, setIsEnrolled] = useState(null);
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
        const response = await axiosInstance.get(
          commonApi.getCourseDetails.url(courseId, user?.id)
        );

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
    const checkEnrollment = async () => {
      if (!user?.username || !user?.id) {
        setIsEnrolled(false);
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
          commonApi.checkEnrollment.url(courseId),
          {
            params: { username: user?.username },
          }
        );
        if (res.data === true) {
          setIsEnrolled(true);
        } else {
          setIsEnrolled(false);
          notification.destroy();
          notification.error({
            message: "Access Denied",
            description: "You must purchase this course to access its content.",
            placement: "topLeft",
          });
          navigate("/home");
        }
      } catch (err) {
        console.error("Error checking enrollment", err);
        setIsEnrolled(false);
      }
    };

    checkEnrollment();
  }, [courseId, user, navigate]);

  useEffect(() => {
    if (isEnrolled && user?.id) {
      fetchCourseData({ initialLoad: true });
    }
  }, [fetchCourseData, isEnrolled, user?.id]);

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

  if (isEnrolled === null || !isEnrolled) return <LoadingOverlay />;

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
            <QuizComponent
              quiz={selectedLesson}
              lessonId={selectedLesson?.id}
              userId={user?.id}
              onProgressUpdate={fetchCourseData}
              onRefreshLessonData={(opts) => fetchCourseData(opts)}
            />
          ) : (
            <>
              <ResizableSplitLayout
                leftComponent={<LessonContent instructor={instructor} lesson={selectedLesson} />}
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

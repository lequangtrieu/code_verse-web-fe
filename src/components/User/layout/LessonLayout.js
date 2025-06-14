import React, { useState, useEffect, useCallback } from "react";
import LessonSidebar from "../Courses/lesson/LessonSidebar";
import LessonContent from "../Courses/lesson/LessonContent";
import CodeEditor from "./CodeEditor";
import QuizComponent from "../Courses/lesson/QuizComponent";
import commonApi from "../../../common/api";
import axiosInstance from "../../../config/axiosInstance";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import LoadingOverlay from "../../../common/LoadingOverlay";

export default function LessonLayout() {
  const { courseId } = useParams();
  const user = useSelector((state) => state?.user?.user);

  const [lessonData, setLessonData] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [language, setLanguage] = useState(null);

  const fetchCourseData = useCallback(async () => {
    try {
      const response = await axiosInstance.get(
        commonApi.getCourseDetails.url(courseId, user?.id)
      );
      setLanguage(response.data.result?.language.toLowerCase());

      const allLessons = response.data.result.data.flatMap(
        (module) => module.subLessons || []
      );

      const firstUnfinished = allLessons.find(
        (lesson) => lesson.status !== "PASSED"
      );

      const fallbackLesson =
        allLessons.find((l) => l.lessonType !== "EXAM") || allLessons[0];

      setLessonData(response.data.result.data);
      setSelectedLesson(firstUnfinished || fallbackLesson || null);
    } catch (error) {
      console.error("Error fetching course details:", error);
    }
  }, [courseId, user?.id]);

  useEffect(() => {
    fetchCourseData();
  }, [courseId, user?.id]);

  if (!lessonData) {
    return <LoadingOverlay />;
  }

  return (
    <div className="flex min-h-[800px] overflow-y-auto py-6">
      <LessonSidebar
        lessons={lessonData}
        selectedLessonId={selectedLesson?.id}
        onSelect={setSelectedLesson}
      />
      {selectedLesson && (
        <>
          {selectedLesson.lessonType === "EXAM" ? (
            <QuizComponent quiz={selectedLesson} />
          ) : (
            <>
              <LessonContent lesson={selectedLesson} />
              <CodeEditor
                key={selectedLesson?.id}
                lessonId={selectedLesson?.id}
                userId={user?.id}
                defaultCode={selectedLesson.code || selectedLesson.defaultCode}
                testCases={selectedLesson.testCases || []}
                language={language === "all" ? null : language}
                onRefreshLessonData={fetchCourseData}
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

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

export default function LessonLayout() {
  const { courseId } = useParams();
  const user = useSelector((state) => state?.user?.user);

  const [lessonData, setLessonData] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [language, setLanguage] = useState(null);

  const selectedLessonIdRef = useRef(null);

  const fetchCourseData = useCallback(
    async (options = { initialLoad: false }) => {
      try {
        const response = await axiosInstance.get(
          commonApi.getCourseDetails.url(courseId, user?.id)
        );

        setLanguage(response.data.result?.language.toLowerCase());
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
    fetchCourseData({ initialLoad: true });
  }, [fetchCourseData]);

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

  return (
    <div className="flex min-h-[800px] overflow-y-auto">
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
              <LessonContent lesson={selectedLesson} />
              <CodeEditor
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
              />
            </>
          )}
        </>
      )}
    </div>
  );
}

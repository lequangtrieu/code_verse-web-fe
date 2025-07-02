import React, { useEffect, useState } from 'react';
import { Collapse, Typography, Tabs } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import axiosInstance from '../../../../config/axiosInstance';
import commonApi from '../../../../common/api';
import LoadingOverlay from '../../../../common/LoadingOverlay';
import TheoryViewer from './TheoryView';
import ExerciseViewer from './ExerciseView';
import QuizViewer from './QuizView';

const { Panel } = Collapse;
const { Title } = Typography;

const CourseModuleList = ({ courseId }) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [modules, setModules] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);

  useEffect(() => {
    // Simulate API call — replace with real API later
    const fetchModules = async () => {
      setInitialLoading(true);
      try {
        // Replace this with your real API
        const response = await axiosInstance.get(commonApi.getModules.url(courseId));

        setModules(response.data.result);
      } catch (err) {
        console.error('Failed to fetch modules', err);
      } finally {
        setTimeout(() => {
            setInitialLoading(false);
        }, 400);
      }
    };

    fetchModules();
  }, [courseId]);

  return (
    <div className="flex border border-gray-200 min-h-[500px] bg-gray-50">
      {initialLoading && <LoadingOverlay />}

      {/* Sidebar */}
      <div className="w-[300px] bg-white p-4 border-r">
        <Title level={4}>Modules</Title>

        <div className="mt-4">
          <Collapse accordion>
            {modules.map((mod) => (
              <Panel header={mod.title} key={mod.id}>
                {mod.lessons?.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer
                      ${selectedLesson?.id === lesson.id ? 'bg-blue-100' : 'hover:bg-gray-100'}`}
                    onClick={() => setSelectedLesson({ ...lesson, moduleId: mod.id })}
                  >
                    <span className="flex-1 truncate">{lesson.title}</span>
                  </div>
                ))}
              </Panel>
            ))}
          </Collapse>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        {selectedLesson ? (
          <>
            <Title level={4}>Lesson: {selectedLesson.title}</Title>

            {selectedLesson.lessonType === 'CODE' ? (
              <Tabs defaultActiveKey="theory">
                <Tabs.TabPane tab="Theory" key="theory">
                  <TheoryViewer lessonId={selectedLesson.id} />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Exercise" key="exercise">
                  <ExerciseViewer lessonId={selectedLesson.id} />
                </Tabs.TabPane>
              </Tabs>
            ) : (
              <QuizViewer lessonId={selectedLesson.id} />
            )}
          </>
        ) : (
          <Title level={4}>Select a lesson to view</Title>
        )}
      </div>
    </div>
  );
};

export default CourseModuleList;

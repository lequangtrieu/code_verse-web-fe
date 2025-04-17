import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../App";

import Courses from "../../components/User/Courses/courses";
import CourseDetail from "../../components/User/Courses/courseDetail";
import CourseForm from "../../components/User/Courses/CourseCreate/CourseForm";
import Home from "../../components/layout/Home";
import DashboardPage from "../../components/Admin/AdminDashBoard/DashboardPage";
import AdminPanel from "../../components/Admin/layout/AdminPanel";
import AdminCoursesPage from "../../components/Admin/AdminCourses/AdminCoursesPage";
import AdminReviewPage from "../../components/Admin/AdminReview/AdminReviewPage";
import AdminMessagePage from "../../components/Admin/AdminMessage/AdminMessagePage";
import AdminProfilePage from "../../components/Admin/AdminProfile/AdminProfilePage";
import AdminQuizPage from "../../components/Admin/AdminQuiz/AdminQuizPage";
import AdminAccountsPage from "../../components/Admin/AdminAccount/AdminAccountsPage";
import UserPanel from "../../components/User/layout/UserPanel";
import LessonLayout from "../../components/User/layout/LessonLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "course",
        element: <Courses />,
      },
      {
        path: "course/:id",
        element: <CourseDetail />,
      },
      {
        path: "practice",
        element: <Home />,
      },
      {
        path: "fights",
        element: <Home />,
      },
      {
        path: "challenges",
        element: <Home />,
      },

      // INSTRUCTOR
      {
        path: "courses/create",
        element: <CourseForm />
      },

      // USER
      {
        path: "test",
        element: <LessonLayout />,
      },
      {
        path: "user-panel",
        element: <UserPanel />,
        children: [
          {
            path: "settings",
            element: <DashboardPage />,
          },
        ],
      },

      // ADMIN
      {
        path: "admin-panel",
        element: <AdminPanel />,
        children: [
          {
            path: "profile",
            element: <AdminProfilePage />,
          },
          {
            path: "dashboard",
            element: <DashboardPage />,
          },
          {
            path: "accounts",
            element: <AdminAccountsPage />,
          },
          {
            path: "messages",
            element: <AdminMessagePage />,
          },
          {
            path: "courses",
            element: <AdminCoursesPage />,
          },
          {
            path: "reviews",
            element: <AdminReviewPage />,
          },
          {
            path: "quiz",
            element: <AdminQuizPage />,
          },
          {
            path: "settings",
            element: <DashboardPage />,
          },
          {
            path: "",
            element: <Navigate to="dashboard" />,
          },
        ],
      },
    ],
  },
]);

export default router;

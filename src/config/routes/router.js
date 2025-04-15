import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../App";

import Courses from "../../components/User/Courses/courses";
import CourseDetail from "../../components/User/Courses/courseDetail";
import Home from "../../components/layout/Home";
import DashboardPage from "../../components/Admin/AdminDashBoard/DashboardPage";
import AdminPanel from "../../components/Admin/layout/AdminPanel";
import AdminCoursesPage from "../../components/Admin/AdminCourses/AdminCoursesPage";
import AdminReviewPage from "../../components/Admin/AdminReview/AdminReviewPage";
import AdminMessagePage from "../../components/Admin/AdminMessage/AdminMessagePage";
import AdminProfilePage from "../../components/Admin/AdminProfile/AdminProfilePage";
import AdminQuizPage from "../../components/Admin/AdminQuiz/AdminQuizPage";
import AdminAccountsPage from "../../components/Admin/AdminAccount/AdminAccountsPage";

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

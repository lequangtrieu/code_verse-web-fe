import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../App";

import Courses from "../../components/User/Courses/Courses";
import CourseDetail from "../../components/User/Courses/CourseDetail";
// import CourseForm from "../../components/Instructor/InstructorCourses/CourseCreate/CourseForm";
import CourseForm from "../../components/Instructor/InstructorCourses/CourseCreate/CourseCreation";
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
import UserDashboardPage from "../../components/User/UserDashBoard/UserDashboardPage"
import UserProfilePage from "../../components/User/UserProfile/UserProfilePage";
import UserMessagePage from "../../components/User/UserMessage/UserMessagePage";
import UserReviewPage from "../../components/User/UserReview/UserReviewPage";
import UserQuizPage from "../../components/User/UserQuiz/UserQuizPage";
import UserCoursesPage from "../../components/User/Courses/UserCoursesPage";
import UserWishlistPage from "../../components/User/UserWishlist/UserWishlistPage";
import UserAssignmentPage from "../../components/User/UserAssignment/UserAssignmentPage";
import UserHome from "../../components/User/layout/UserHome"
import CartPage from "../../components/User/Cart/CartPage";
import CheckoutPage from "../../components/User/Cart/CheckoutPage";
import HandlePaymentFailure from "../../components/User/Cart/HandlePaymentFailure";
import HandlePaymentSuccess from "../../components/User/Cart/HandlePaymentSuccess";
import UserChangePassword from "../../components/User/UserChangePassword/UserChangePassword";
import HomeRedirect from "../../components/layout/HomeRedirect";
import InstructorPanel from "../../components/Instructor/layout/InstructorPanel";
import InstructorDashboardPage from "../../components/Instructor/InstructorDashboard/InstructorDashboardPage";
import InstructorCoursesPage from "../../components/Instructor/InstructorCourses/InstructorCoursePage";
import InstructorCourseDetailView from "../../components/Instructor/InstructorCourses/InstructorCourseDetail";
import RegisterPage from "../../components/Auth/RegisterPage";
import LearnerDetailPage from "../../components/Admin/AdminAccount/LearnerDetailPage";
import InstructorDetailPage from "../../components/Admin/AdminAccount/InstructorDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <HomeRedirect />,
      },
      {
        path: "home",
        element: <UserHome />,
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
      {
        path: "register",
        element: <RegisterPage />,
      },

      // USER
      {
        path: "/course/:courseId/learn",
        element: <LessonLayout />,
      },
      {
        path: "cart",
        element: <CartPage />,
      },
      {
        path: "/payment-success",
        element: <HandlePaymentSuccess />
      },
      {
        path: "/payment-failed",
        element: <HandlePaymentFailure />
      },
      {
        path: "checkout",
        element: <CheckoutPage />,
      },
      {
        path: "user-panel",
        element: <UserPanel />,
        children: [
          {
            path: "profile",
            element: <UserProfilePage />,
          },
          {
            path: "settings",
            element: <UserChangePassword />,
          },
          {
            path: "dashboard",
            element: <UserDashboardPage />,
          },
          {
            path: "messages",
            element: <UserMessagePage />,
          },
          {
            path: "courses",
            element: <UserCoursesPage />,
          },
          {
            path: "reviews",
            element: <UserReviewPage />,
          },
          {
            path: "quiz",
            element: <UserQuizPage />,
          },
          {
            path: "wishlist",
            element: <UserWishlistPage />,
          },
          {
            path: "assignment",
            element: <UserAssignmentPage />,
          },
          {
            path: "",
            element: <Navigate to="dashboard" />,
          },
        ],
      },
      {
        path: "instructor-panel",
        element: <InstructorPanel />,
        children: [
          {
            path: "dashboard",
            element: <InstructorDashboardPage />
          },
          {
            path: "courses",
            element: <InstructorCoursesPage />,
          },
          {
            path: "courses/create",
            element: <CourseForm />
          },
          {
            path: "courses/:id",
            element: <InstructorCourseDetailView />
          }
        ]
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
            path: "learner/:id",
            element: <LearnerDetailPage />
          },
          {
            path: "instructor/:id",
            element: <InstructorDetailPage />
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
          }
        ],
      },
    ],
  },
]);

export default router;

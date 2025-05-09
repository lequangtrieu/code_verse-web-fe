import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../App";

import Courses from "../../components/User/Courses/Courses";
import CourseDetail from "../../components/User/Courses/CourseDetail";
import CourseForm from "../../components/Admin/AdminCourses/CourseCreate/CourseForm";
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
import RankingPage from "../../components/User/RankingPage/RankingPage";
import AccountProfile from "../../components/User/AccountProfile/Profile";
import BlogPage from "../../components/User/BlogPage/BlogPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
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

      // USER
      {
        path: "test",
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
        path: "ranking",
        element: <RankingPage />,
      },
      {
        path: "account-profile",
        element: <AccountProfile />,
      },
      {
        path: "blogpage",
        element: <BlogPage />,
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

          // INSTRUCTOR
          {
            path: "courses/create",
            element: <CourseForm />
          },
        ],
      },
    ],
  },
]);

export default router;

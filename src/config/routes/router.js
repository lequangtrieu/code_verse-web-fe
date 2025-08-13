import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "../../App";

import Courses from "../../components/User/Courses/Courses";
import CourseDetail from "../../components/User/Courses/CourseDetail/CourseDetail";
import CourseForm from "../../components/Instructor/InstructorCourses/CourseCreate/CourseCreation";
import Home from "../../components/layout/Home";
import DashboardPage from "../../components/Admin/AdminDashBoard/DashboardPage";
import AdminPanel from "../../components/Admin/layout/AdminPanel";
import AdminCoursesPage from "../../components/Admin/AdminCourses/AdminCoursesPage";
import AdminReviewPage from "../../components/Admin/AdminReview/AdminReviewPage";
import AdminUserReportsPage from "../../components/Admin/AdminViolationManagement/AdminUserReportsPage";
import AdminAccountsPage from "../../components/Admin/AdminAccount/AdminAccountsPage";
import UserPanel from "../../components/User/layout/UserPanel";
import LessonLayout from "../../components/User/layout/LessonLayout";
import UserDashboardPage from "../../components/User/UserDashBoard/UserDashboardPage";
import UserProfilePage from "../../components/User/UserProfile/UserProfilePage";
import UserMessagePage from "../../components/User/UserMessage/UserMessagePage";
import UserReviewPage from "../../components/User/UserReview/UserReviewPage";
import UserQuizPage from "../../components/User/UserQuiz/UserQuizPage";
import UserWishlistPage from "../../components/User/UserWishlist/UserWishlistPage";
import UserAssignmentPage from "../../components/User/UserAssignment/UserAssignmentPage";
import UserHome from "../../components/User/layout/UserHome";
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
import InstructorNotificationPage from "../../components/Instructor/InstructorNotifications/InstructorNotificationPage";
import InstructorTrainingsPage from "../../components/Instructor/InstructorTraining/InstructorTrainingPage";
import TrainingCreation from "../../components/Instructor/InstructorTraining/TrainingCreation";
import RegisterPage from "../../components/Auth/RegisterPage";
import LearnerDetailPage from "../../components/Admin/AdminAccount/LearnerDetailPage";
import InstructorDetailPage from "../../components/Admin/AdminAccount/InstructorDetailPage";
import AdminApproveInstructorPage from "../../components/Admin/AdminApproveInstructor/AdminApproveInstructorPage";
import AdminNotificationPage from "../../components/Admin/AdminNotification/AdminNotificationPage";
import { ManageBalanceDashboard } from "../../components/Instructor/ManageBalance/ManageBalanceDashboard";
import { WithdrawalRequestList } from "../../components/Admin/WithdrawalRequests/WithdrawalRequestList";
import RankingPage from "../../components/layout/RankingPage";
import UserAccomplishmentsPage from "../../components/User/Courses/UserAccomplishmentsPage";
import CertificateDetailPage from "../../components/User/Certificate/CertificateDetailPage";
import CertificatePage from "../../components/User/Certificate/CertificatePage";
import Trainings from "../../components/User/training/trainings";
import AdminCourseDetailPage from "../../components/Admin/AdminCourses/AdminCourseDetailPage";
import InstructorRevenuePage from "../../components/Admin/AdminDashBoard/InstructorRevenuePage";
import AdminReportReasonsPage from "../../components/Admin/AdminReportReasons/AdminReportReasonsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "certificate/:courseId",
        element: <CertificatePage />,
      },
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
        path: "course/:courseId",
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
        path: "trainings",
        element: <Trainings />,
      },
      {
        path: "ranking",
        element: <RankingPage />,
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
        element: <HandlePaymentSuccess />,
      },
      {
        path: "/payment-failed",
        element: <HandlePaymentFailure />,
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
            path: "accomplishments",
            element: <UserAccomplishmentsPage />,
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
          {
            path: "certificate/:courseId",
            element: <CertificateDetailPage />,
          },
        ],
      },
      {
        path: "instructor-panel",
        element: <InstructorPanel />,
        children: [
          {
            path: "",
            element: <Navigate to="dashboard" />,
          },
          {
            path: "dashboard",
            element: <InstructorDashboardPage />,
          },
          {
            path: "courses",
            element: <InstructorCoursesPage />,
          },
          {
            path: "courses/create",
            element: <CourseForm />,
          },
          {
            path: "trainings",
            element: <InstructorTrainingsPage />,
          },
          {
            path: "trainings/create",
            element: <TrainingCreation />,
          },
          {
            path: "trainings/:id",
            element: <TrainingCreation />,
          },
          {
            path: "courses/:id",
            element: <InstructorCourseDetailView />,
          },
          {
            path: "notifications",
            element: <InstructorNotificationPage />,
          },
          {
            path: "manageBalance",
            element: <ManageBalanceDashboard />,
          },
          {
            path: "profile",
            element: <UserProfilePage />,
          },
          {
            path: "settings",
            element: <UserChangePassword />,
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
            element: <UserProfilePage />,
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
            element: <LearnerDetailPage />,
          },
          {
            path: "instructor/:id",
            element: <InstructorDetailPage />,
          },
          {
            path: "approveInstructor",
            element: <AdminApproveInstructorPage />,
          },
          {
            path: "courses",
            element: <AdminCoursesPage />,
          },
          {
            path: "courses/:id",
            element: <AdminCourseDetailPage />
          },
          {
            path: "reviews",
            element: <AdminReviewPage />,
          },
          {
            path: "reportReason",
            element: <AdminReportReasonsPage />,
          },
          {
            path: "violation",
            element: <AdminUserReportsPage />,
          },
          {
            path: "settings",
            element: <DashboardPage />,
          },
          {
            path: "sendNotifications",
            element: <AdminNotificationPage />,
          },
          {
            path: "",
            element: <Navigate to="dashboard" />,
          },
          {
            path: "withdrawalRequests",
            element: <WithdrawalRequestList />,
          },
          {
            path: "revenue",
            element: <InstructorRevenuePage />,
          },

        ],
      },
    ],
  },
]);

export default router;

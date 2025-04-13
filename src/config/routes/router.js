import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../components/layout/Home";
import CourseDetail from "../../components/Courses/courseDetail";
import Courses from "../../components/Courses/courses";

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
      // {
      //   path: "sign-up",
      //   element: <SignUp />,
      // },
      // {
      //   path: "login",
      //   element: <Login />,
      // },
      // {
      //   path: "forgot-password",
      //   element: <ForgotPassowrd />,
      // },
      // {
      //   path: "",
      //   element: <Home />,
      // },
      // {
      //   path: "admin-panel",
      //   element: <AdminPanel />,
      //   children: [
      //   ],
      // },
    ],
  },
]);

export default router;

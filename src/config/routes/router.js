import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Home from "../../components/layout/Home";
import CourseDetail from "../../components/Courses/courseDetail";

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
        element: <CourseDetail />,
      },
      {
        path: "courses",
        element: <Home />,
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

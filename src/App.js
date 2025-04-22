import "./App.css";
import { Outlet } from "react-router-dom";
import Context from "./config/context/context";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import commonApi from "./common/api";
import { message } from "antd";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./config/store/userSlice";
import { useCallback, useEffect } from "react";

function App() {
  const dispatch = useDispatch();

  const fetchUserDetails = useCallback(async () => {
    const username = localStorage.getItem("username");
    const password = localStorage.getItem("password");
    const token = localStorage.getItem("token");

    const dummyUserDetail = {
      id: 1,
      username: "admin@gmail.com",
      role: "STUDENT",
      email: "admin",
      isDeleted: false,
    };

    if (username && password && token) {
      try {
        // const response = await axios.post(commonApi.userDetail.url, {
        //   username,
        // });

        // dispatch(setUserDetails(response.data.result));
        dispatch(setUserDetails(dummyUserDetail));
      } catch (error) {
        if (error.response) {
          const { status, data } = error.response;

          message.error(`Error ${status}: ${data.message || "Login failed."}`);
        } else {
          message.error("Unable to connect to the server.");
        }
      }
    }
  }, [dispatch]);

  useEffect(() => {
    fetchUserDetails();
  }, []);

  return (
    <Context.Provider
      value={{
        fetchUserDetails,
      }}
    >
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-[82px]">
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
  );
}

export default App;

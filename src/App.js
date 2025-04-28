import "./App.css";
import { Outlet } from "react-router-dom";
import Context from "./config/context/context";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import commonApi from "./common/api";
import { message } from "antd";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./config/store/userSlice";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "./config/axiosInstance";
import getAuthInfo from "./config/getAuthInfo";

function App() {
  const dispatch = useDispatch();
  const [cartDetailCount, setCartDetailCount] = useState(0);
  const user = useSelector((state) => state?.user?.user);

  const fetchUserDetails = useCallback(async () => {
  const { username, token, refreshToken } = getAuthInfo();

    if (username) {
      try {
        const response = await axios.post(commonApi.userDetail.url, {
          username,
        });

        dispatch(
          setUserDetails({
            user: response.data.result,
            token: token,
            refreshToken: refreshToken
          })
        );
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

  const fetchCartDetail = async () => {
    try {
      const response = await axiosInstance.get(commonApi.countCartDetail.url, {
        params: {
          username: user?.username,
        },
      });

      if (response?.data?.result) {
        setCartDetailCount(response.data.result);
      } else {
        setCartDetailCount(0);
        console.log("No cart data found.");
      }
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        message.error(
          `Error ${status}: ${data.message || "Something went wrong."}`
        );
      }
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  useEffect(() => {
    if (user?.username) {
      fetchCartDetail();
    }
  }, [user]);

  return (
    <Context.Provider
      value={{
        fetchUserDetails,
        cartDetailCount,
        fetchCartDetail,
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

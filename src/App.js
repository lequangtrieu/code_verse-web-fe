import "./App.css";
import { Outlet } from "react-router-dom";
import Context from "./config/context/context";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import commonApi from "./common/api";
import { message, notification, ConfigProvider } from "antd";
import { themeConfig } from "./config/ThemeConfig";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "./config/store/userSlice";
import { useCallback, useEffect, useState } from "react";
import axiosInstance from "./config/axiosInstance";
import getAuthInfo from "./config/getAuthInfo";
import useNotificationSocket from "./config/notificationSocket";
import useDocumentTitle from "./common/useDocumentTitle";

function App() {
  useDocumentTitle("CodeVerse");
  const dispatch = useDispatch();
  const [cartDetailCount, setCartDetailCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
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
            refreshToken: refreshToken,
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
    const { username } = getAuthInfo();
    try {
      const response = await axiosInstance.get(commonApi.countCartDetail.url, {
        params: {
          username: username,
        },
      });

      if (response?.data?.result) {
        setCartDetailCount(response.data.result);
      } else {
        setCartDetailCount(0);
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

  const fetchCartItems = async () => {
    const { username } = getAuthInfo();
    try {
      const response = await axiosInstance.get(commonApi.detailCart.url, {
        params: { username: username },
      });

      const items = response.data.result || [];
      const formattedItems = items.map((item, index) => ({
        key: item.id.toString(),
        idCourse: item.course?.id,
        image:
          item.course?.thumbnailUrl ||
          "https://firebasestorage.googleapis.com/v0/b/sellglasses-13e72.appspot.com/o/avatar%2F67e050562ecb1fdae3fd3feb?alt=media&token=bfd4dcd5-b12c-48f3-a2eb-dbce8ae29325",
        product: item.course?.title || "Untitled",
        price: item.course.price || 0,
        discount: item.course?.discount,
        selected: false,
      }));

      setCartItems(formattedItems);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        message.error(
          `Error ${status}: ${data.message || "Something went wrong."}`
        );
      }
    }
  };

  useNotificationSocket((newNotif) => {
    if (newNotif) {
      function truncateHtml(html, maxLen) {
        const div = document.createElement("div");
        div.innerHTML = html;
        const text = div.textContent || div.innerText || "";
        const shortText = text.length > maxLen ? text.slice(0, maxLen) + "..." : text;
        return shortText.replace(/\n/g, "<br>");
      }

      notification.open({
        message: newNotif.title,
        description: (
          <div
            dangerouslySetInnerHTML={{ __html: truncateHtml(newNotif.content, 150) }}
            style={{ maxHeight: 100, overflow: "hidden" }}
          />
        ),
        duration: 5,
        placement: "topLeft",
      });

      fetchNotifications();
      fetchNotificationUnread();
    }
  });

  const fetchNotificationUnread = async () => {
    const { username } = getAuthInfo();
    try {
      const result = await axiosInstance.get(commonApi.notificationUreadCount.url, {
        params: { username: username },
      });
      setNotificationCount(result.data.result);
    } catch (error) {
      message.error("Fetch data error.");
    }
  }

  const fetchNotifications = async () => {
    const { username } = getAuthInfo();
    try {
      const res = await axiosInstance.get(commonApi.getNotifications.url, {
        params: { username: username },
      });
      setNotifications(res.data.result);
    } catch (error) {
      message.error("Fetch data error.");
    }
  }

  const handleMarkRead = async (notificationId) => {
    try {
      await axiosInstance.put(commonApi.markRead.url(notificationId));
      fetchNotifications();
      fetchNotificationUnread();
    } catch (error) {
      message.error("There is an error connecting with database.");
    }
  };  

  const handleMarkAllAsRead = async () => {
    const { username } = getAuthInfo();
    try {
      await axiosInstance.put(commonApi.markAllAsRead.url, {}, {
        params: { username: username },
      });
      fetchNotificationUnread();
      fetchNotifications();
    } catch (error) {
      message.error("There is an error connecting with database.");
    }
  };  

  useEffect(() => {
    const interval = setInterval(() => {
      console.clear();
    }, 60 * 150);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  useEffect(() => {
    if (user?.username) {
      fetchCartDetail();
      fetchCartItems();
      fetchNotificationUnread();
      fetchNotifications();
    }
  }, [user]);

  return (
    <ConfigProvider theme={themeConfig}>
    <Context.Provider
      value={{
        fetchUserDetails,
        cartDetailCount,
        cartItems,
        notificationCount,
        notifications,
        handleMarkAllAsRead,
        handleMarkRead,
        fetchCartDetail,
        fetchCartItems,
      }}
    >
      <Header />
      <main className="min-h-[calc(100vh-120px)] pt-[82px]">
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
    </ConfigProvider>
  );
}

export default App;

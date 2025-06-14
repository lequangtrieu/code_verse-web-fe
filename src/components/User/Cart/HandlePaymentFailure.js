/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import scrollTop from "../../../config/scrollTop";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../../config/store/userSlice";
import axios from "axios";
import Context from "../../../config/context/context";
import getAuthInfo from "../../../config/getAuthInfo";

const HandlePaymentFailure = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fetchCartDetail } = useContext(Context);
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");
  const { username, token, refreshToken } = getAuthInfo();

  useEffect(() => {
    const handlePaymentFailure = async () => {
      if (orderId) {
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

        try {
          await axiosInstance.post(commonApi.confirmPayment.url, {
            orderId,
            status: "failed",
          });
          fetchCartDetail();
          notification.warning({
            message: "Payment Canceled",
            description: "You canceled the payment. Your pending order has been cleared.",
          });

          scrollTop();
          navigate("/cart");
        } catch (error) {
          notification.error({ message: "Failed to cancel order" });
        }
      } else {
        notification.error({ message: "Order ID not found!" });
      }
    };

    handlePaymentFailure();
  }, [dispatch]);
  return <></>;
};

export default HandlePaymentFailure;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import scrollTop from "../../../config/scrollTop";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUserDetails } from "../../../config/store/userSlice";
import getAuthInfo from "../../../config/getAuthInfo";

const HandlePaymentSuccess = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("orderId");
  const { username, token, refreshToken } = getAuthInfo();

  useEffect(() => {
    const handlePaymentSuccess = async () => {
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
            status: "success",
            username,
          });

          notification.success({
            message: "Payment Successful",
            description:
              "Your payment was successful. Your order has been confirmed.",
          });

          scrollTop();
          navigate("/cart");
        } catch (error) {
          notification.error({
            message: "Failed to Confirm Payment",
            description: "Something went wrong. Please try again later.",
          });
        }
      } else {
        notification.error({
          message: "Order ID Not Found",
          description: "We couldn't find your order. Please try again.",
        });
      }
    };

    handlePaymentSuccess();
  }, []);

  return <></>;
};

export default HandlePaymentSuccess;

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import scrollTop from "../../../config/scrollTop";

const HandlePaymentSuccess = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const orderId = params.get("orderId");

    if (orderId) {
      axiosInstance
        .post(commonApi.confirmPayment.url, { orderId, status: "success" })
        .then((response) => {
          notification.success({
            message: "Payment successful! Order has been confirmed.",
          });
          scrollTop();
          navigate("/cart");
        })
        .catch((error) => {
          notification.error({ message: "Failed to confirm payment" });
        });
    } else {
      notification.error({ message: "Order ID not found!" });
    }
  }, []);

  return <></>;
};

export default HandlePaymentSuccess;

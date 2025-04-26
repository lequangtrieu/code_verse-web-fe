import React, { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { notification } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import scrollTop from "../../../config/scrollTop";
import { useSelector } from "react-redux";

const HandlePaymentFailure = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get("orderCode");
  const token = useSelector((state) => state?.user?.token);

  useEffect(() => {
    const handlePaymentFailure = async () => {
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get("orderId");
      
      if (orderId) {
        console.log("Vào xử lý thất bại, orderId =", orderId);
        console.log(token);
        
  
        try {
           await axiosInstance.post(commonApi.confirmPayment.url, { orderId, status: "failed" });
  
          notification.warning({
            message: "Payment failed. The order has been cleared.",
          });
  
          // Sau khi xong có thể scrollTop hoặc navigate
          // scrollTop();
          // navigate("/cart");
  
        } catch (error) {
          notification.error({ message: "Failed to cancel order" });
        }
      } else {
        notification.error({ message: "Order ID not found!" });
      }
    };
  
    handlePaymentFailure();
  }, [orderCode]);
  return <></>;
};

export default HandlePaymentFailure;

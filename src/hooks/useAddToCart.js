// hooks/useAddToCart.js
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import commonApi from "../common/api";
import { logoutUser } from "../config/store/userSlice";
import axiosInstance from "../config/axiosInstance";
import { getDiscountedPrice } from "../common/helper";

const useAddToCart = ({ user, cartCourseIds, setCartCourseIds, fetchCartDetail, fetchCartItems }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = async (course) => {
        if (!user) {
            return notification.warning({
                message: "Login Required",
                description: "Please log in to view this page.",
                placement: "topLeft",
            });
        }

        const finalPrice = getDiscountedPrice(course.price, course.discount);
        if (finalPrice === 0) {
            return notification.info({
                message: "Free Course",
                description: `"${course.title}" is free and does not need to be added to the cart.`,
                placement: "bottomLeft",
            });
        }

        if (cartCourseIds.includes(course.id)) {
            return notification.info({
                message: "Course Already in Cart",
                description: `"${course.title}" is already in your cart.`,
                placement: "bottomLeft",
            });
        }

        try {
            const response = await axiosInstance.post(commonApi.addToCart.url, {
                username: user.username,
                courseId: course.id,
            });

            const result = response.data?.result;

            if (result === "Course already in cart") {
                notification.info({
                    message: "Course Already in Cart",
                    description: `"${course.title}" is already in your cart.`,
                    placement: "bottomLeft",
                });
                setCartCourseIds((prev) => [...prev, course.id]);
            } else if (result === "You already own this course") {
                notification.warning({
                    message: "Already Purchased",
                    description: `You have already purchased "${course.title}".`,
                    placement: "bottomLeft",
                });
            } else if (result === "Added to cart successfully") {
                notification.success({
                    message: "Course Added Successfully",
                    description: `"${course.title}" has been added to your cart.`,
                    placement: "bottomLeft",
                });
                fetchCartDetail();
                fetchCartItems();
                setCartCourseIds((prev) => [...prev, course.id]);
            } else if (
                result === "This course is free and doesn't need to be added to cart"
            ) {
                notification.info({
                    message: "Free Course",
                    description: `"${course.title}" is free and doesn't need to be added to the cart.`,
                    placement: "bottomLeft",
                });
            } else {
                notification.error({
                    message: "Failed to Add Course",
                    description:
                        response.data?.message ||
                        "Unable to add course to cart. Please try again.",
                    placement: "bottomLeft",
                });
            }
        } catch (error) {
            notification.error({
                message: "Error Adding Course",
                description: error?.response?.data?.message,
                placement: "bottomLeft",
            });

            if (error?.response?.data?.code === 1010) {
                dispatch(logoutUser());
                navigate("/");
            }
        }
    };

    return { handleAddToCart };
};

export default useAddToCart;

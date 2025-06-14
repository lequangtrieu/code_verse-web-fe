import { useContext, useEffect, useState } from "react";
import { Table, Button, notification, Checkbox, Modal } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import LoadingOverlay from "../../../common/LoadingOverlay";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { useDispatch, useSelector } from "react-redux";
import Context from "../../../config/context/context";
import scrollTop from "../../../config/scrollTop";
import { useNavigate } from "react-router-dom";
import { formatCurrency, getDiscountedPrice } from "../../../common/helper";
import { logoutUser } from "../../../config/store/userSlice";

const CartPage = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [confirmClearVisible, setConfirmClearVisible] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.user?.user);
  const { fetchCartDetail, fetchCartItems } = useContext(Context);

  const fetchCartInItems = async () => {
    if (!user?.username) return;

    try {
      const response = await axiosInstance.get(commonApi.detailCart.url, {
        params: { username: user.username },
      });

      const items = response.data.result || [];
      const formattedItems = items.map((item, index) => ({
        key: item.id.toString(),
        image:
          item.course?.thumbnailUrl ||
          "https://firebasestorage.googleapis.com/v0/b/sellglasses-13e72.appspot.com/o/avatar%2F67e050562ecb1fdae3fd3feb?alt=media&token=bfd4dcd5-b12c-48f3-a2eb-dbce8ae29325",
        product: item.course?.title || "Untitled",
        price: item.course?.price || 0,
        discount: item.course?.discount || 0,
        idCourse: item.course?.id,
        selected: false,
      }));

      setCartItems(formattedItems);
    } catch (error) {
      notification.error({
        message: "Failed to load cart items",
        description: error?.response?.data?.message,
        placement: "bottomLeft",
      });

      if (error?.response?.data?.code === 1010) {
        dispatch(logoutUser());
        navigate("/");
      }
    } finally {
      setTimeout(() => {
        setInitialLoading(false);
      }, 400);
    }
  };

  const handleClearCart = async () => {
    try {
      await axiosInstance.delete(commonApi.clearCart.url, {
        params: { username: user.username },
      });

      setCartItems([]);
      fetchCartDetail();
      fetchCartItems();
      notification.success({
        message: "Cart Cleared Successfully",
        description: "All items have been removed from your cart.",
        placement: "bottomLeft",
      });
    } catch (error) {
      notification.error({
        message: "Failed to clear cart",
        description: error?.response?.data?.message,
        placement: "bottomLeft",
      });

      if (error?.response?.data?.code === 1010) {
        dispatch(logoutUser());
        navigate("/");
      }
    } finally {
      setConfirmClearVisible(false);
    }
  };

  const showClearConfirmModal = () => {
    if (!user?.username) return;
    setConfirmClearVisible(true);
  };

  const handleProceedToCheckout = async () => {
    const selectedItems = cartItems.filter((item) => item.selected);

    if (selectedItems.length === 0) {
      return notification.warning({
        message: "Please select at least one course.",
        placement: "bottomLeft",
      });
    }

    const hasFreeCourse = selectedItems.some((item) => {
      const finalPrice = getDiscountedPrice(item.price, item.discount);
      return finalPrice === 0;
    });

    if (hasFreeCourse) {
      return notification.warning({
        message: "Cannot proceed with free course",
        description:
          "Your selection contains a free course. Please enroll it directly without payment.",
        placement: "bottomLeft",
      });
    }

    try {
      const selectedCartItemIds = selectedItems.map((item) =>
        parseInt(item.key)
      );

      const response = await axiosInstance.post(commonApi.checkout.url, {
        username: user.username,
        selectedCartItemId: selectedCartItemIds,
      });

      const checkoutUrl = response.data.result.checkoutUrl;
      window.location.href = checkoutUrl;
    } catch (error) {
      const fallbackMessage =
        "Unable to proceed to checkout. Please try again.";

      const backendMessage =
        error?.response?.data?.message ||
        error?.response?.data?.error ||
        error?.response?.data?.detail ||
        fallbackMessage;

      notification.error({
        message: "Failed to initiate payment",
        description: backendMessage,
        placement: "bottomLeft",
      });

      if (error?.response?.data?.code === 1010) {
        dispatch(logoutUser());
        navigate("/");
      }

      fetchCartDetail();
      fetchCartItems();
      fetchCartInItems();
    }
  };

  const handleSelectItem = (key, checked) => {
    const updatedCartItems = cartItems.map((item) =>
      item.key === key ? { ...item, selected: checked } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = async (cartItemId) => {
    try {
      await axiosInstance.delete(commonApi.removeCartItem.url, {
        params: { cartItemId, username: user.username },
      });

      setCartItems((prev) => prev.filter((item) => item.key !== cartItemId));
      fetchCartDetail();
      fetchCartItems();
      notification.success({
        message: "Item Removed",
        description: "The item has been successfully removed from your cart.",
        placement: "bottomLeft",
      });
    } catch (error) {
      notification.error({
        message: "Failed to remove item from cart",
        description: error?.response?.data?.message,
        placement: "bottomLeft",
      });

      if (error?.response?.data?.code === 1010) {
        dispatch(logoutUser());
        navigate("/");
      }
    }
  };

  const isCartEmpty = cartItems.length === 0;

  const totalPrice = cartItems.reduce(
    (acc, item) =>
      item.selected ? acc + getDiscountedPrice(item.price, item.discount) : acc,
    0
  );

  const handleCourseClick = (id) => {
    scrollTop();
    navigate(`/course/${id}`);
  };

  const columns = [
    {
      title: "SELECT",
      dataIndex: "selected",
      render: (_, record) => (
        <Checkbox
          checked={record.selected}
          onChange={(e) => handleSelectItem(record.key, e.target.checked)}
          onClick={(e) => e.stopPropagation()}
        />
      ),
    },
    {
      title: "IMAGE",
      dataIndex: "image",
      render: (image, record) => (
        <img
          src={
            image
              ? image
              : "https://firebasestorage.googleapis.com/v0/b/sellglasses-13e72.appspot.com/o/avatar%2F67e050562ecb1fdae3fd3feb?alt=media&token=bfd4dcd5-b12c-48f3-a2eb-dbce8ae29325"
          }
          alt="product"
          className="w-12 h-12 rounded cursor-pointer transition-transform duration-300 hover:scale-110 hover:shadow-md"
          onClick={() => handleCourseClick(record.idCourse)}
        />
      ),
    },
    {
      title: "Course Name",
      dataIndex: "product",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      render: (_, record) => {
        const finalPrice = getDiscountedPrice(record.price, record.discount);
        return (
          <div>
            <span className="text-indigo-600 font-medium">
              {formatCurrency(finalPrice)}
            </span>
            {record.discount > 0 && (
              <span className="line-through text-gray-400 ml-2">
                {formatCurrency(record.price)}
              </span>
            )}
          </div>
        );
      },
    },
    {
      title: "REMOVE",
      dataIndex: "key",
      render: (key) => (
        <Button
          onClick={(e) => {
            e.stopPropagation();
            handleRemoveItem(key);
          }}
          className="px-3 py-2 text-red-600"
        >
          Remove
        </Button>
      ),
    },
  ];

  useEffect(() => {
    fetchCartDetail();
    fetchCartItems();
    fetchCartInItems();
  }, [user]);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {initialLoading && <LoadingOverlay />}

      <div className="mb-10 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3 mb-6">
          <ShoppingCartOutlined className="text-blue-500 text-4xl" />
          Course Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            {cartItems.length > 0 ? (
              <Table
                columns={columns}
                dataSource={cartItems}
                pagination={false}
                onRow={(record) => ({
                  onClick: () => handleSelectItem(record.key, !record.selected),
                })}
                footer={() => (
                  <div className="flex justify-between mt-6 border-t pt-4">
                    <span className="text-gray-500">
                      Total Items: {cartItems.length}
                    </span>
                    <Button
                      onClick={showClearConfirmModal}
                      danger
                      className="rounded-md"
                    >
                      Clear All
                    </Button>
                  </div>
                )}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-20">
                <img
                  src="../../logoCodeVerse.png"
                  alt="Empty Cart"
                  className="w-32 h-32 mb-6"
                />
                <h2 className="text-gray-500 text-lg">Your cart is empty</h2>
              </div>
            )}
          </div>

          {/* Payment Section */}
          <div className="bg-white shadow rounded-2xl p-6 h-fit sticky top-24">
            <h2 className="text-xl font-semibold mb-6 text-gray-800">
              Payment Method
            </h2>

            <div className="flex items-center gap-4 border border-gray-300 rounded-xl p-4 mb-6">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs9ULmmyJBs3PlqlSpI_pJTDenFeJFhi8UAQ&s"
                alt="PayOS"
                className="w-24 h-auto rounded shadow"
              />
              <span className="text-base font-medium text-gray-700">
                Pay via PayOS
              </span>
            </div>

            <div className="text-gray-600 flex justify-between items-center mb-2 text-lg">
              <span>Total Amount:</span>
              <span className="font-bold text-gray-900">
                {totalPrice.toLocaleString("vi-VN", {
                  style: "currency",
                  currency: "VND",
                })}{" "}
              </span>
            </div>

            <Button
              type="primary"
              block
              size="large"
              className="mt-4 rounded-xl text-base font-semibold"
              onClick={handleProceedToCheckout}
              disabled={isCartEmpty || totalPrice === 0}
              style={{
                cursor:
                  isCartEmpty || totalPrice === 0 ? "not-allowed" : "pointer",
                opacity: isCartEmpty || totalPrice === 0 ? 0.5 : 1,
                height: "48px",
              }}
            >
              Pay Now
            </Button>
          </div>
        </div>
      </div>

      <Modal
        open={confirmClearVisible}
        onCancel={() => setConfirmClearVisible(false)}
        onOk={handleClearCart}
        centered
        getContainer={false}
        okText="Yes, clear it"
        cancelText="Cancel"
        okType="danger"
        title="Are you sure?"
      >
        <p>This will remove all items from your cart.</p>
      </Modal>
    </div>
  );
};

export default CartPage;

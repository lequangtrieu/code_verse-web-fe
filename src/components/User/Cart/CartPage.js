import { useContext, useEffect, useState } from "react";
import { Table, Button, Row, Col, notification, Checkbox, Modal } from "antd";
import { ShoppingCartOutlined, CreditCardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../../common/LoadingOverlay";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { useSelector } from "react-redux";
import Context from "../../../config/context/context";

const CartPage = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [confirmClearVisible, setConfirmClearVisible] = useState(false);

  const navigate = useNavigate();
  const user = useSelector((state) => state?.user?.user);
  const { fetchCartDetail } = useContext(Context);

  const handleClearCart = async () => {
    try {
      await axiosInstance.delete(commonApi.clearCart.url, {
        params: { username: user.username },
      });

      setCartItems([]);
      fetchCartDetail();
      notification.success({
        message: "Cart cleared successfully",
      });
    } catch (error) {
      notification.error({
        message: "Failed to clear cart",
      });
    } finally {
      setConfirmClearVisible(false);
    }
  };

  const showClearConfirmModal = () => {
    if (!user?.username) return;
    setConfirmClearVisible(true);
  };

  const handleProceedToCheckout = () => {
    const selectedItems = cartItems.filter((item) => item.selected);
    navigate("/checkout", { state: { cartItems: selectedItems } });
    notification.success({
      message: "Proceeding to Checkout",
    });
  };

  const handleSelectItem = (key, checked) => {
    const updatedCartItems = cartItems.map((item) =>
      item.key === key ? { ...item, selected: checked } : item
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = async (orderDetailId) => {
    try {
      await axiosInstance.delete(commonApi.removeCartItem.url, {
        params: { orderDetailId },
      });

      setCartItems((prev) => prev.filter((item) => item.key !== orderDetailId));
      fetchCartDetail();
      notification.success({ message: "Item removed from cart" });
    } catch (error) {
      notification.error({ message: "Failed to remove item from cart" });
    }
  };

  const isCartEmpty = cartItems.length === 0;

  const totalPrice = cartItems
    .reduce((acc, item) => (item.selected ? acc + item.price : acc), 0)
    .toFixed(2);

  const columns = [
    {
      title: "SELECT",
      dataIndex: "selected",
      render: (_, record) => (
        <Checkbox
          checked={record.selected}
          onChange={(e) => handleSelectItem(record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "IMAGE",
      dataIndex: "image",
      render: (image) => <img src={image} alt="product" className="w-16" />,
    },
    {
      title: "Course name",
      dataIndex: "product",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      render: (price) => `$${price ? price.toFixed(2) : "0.00"}`,
    },
    {
      title: "REMOVE",
      dataIndex: "key",
      render: (key) => (
        <Button
          onClick={() => handleRemoveItem(key)}
          className="px-3 py-2 text-red-600"
        >
          Remove
        </Button>
      ),
    },
  ];

  useEffect(() => {
    const fetchCartItems = async () => {
      if (!user?.username) return;

      try {
        const response = await axiosInstance.get(commonApi.detailCart.url, {
          params: { username: user.username },
        });

        const items = response.data.result || [];
        const formattedItems = items.map((item, index) => ({
          key: item.id.toString(),
          image: item.course?.thumbnailUrl || "https://via.placeholder.com/150",
          product: item.course?.title || "Untitled",
          price: item.finalPrice || 0,
          selected: false,
        }));

        setCartItems(formattedItems);
      } catch (error) {
        notification.error({
          message: "Failed to load cart items",
        });
      } finally {
        setInitialLoading(false);
      }
    };

    fetchCartItems();
  }, [user]);

  return (
    <div className="p-6 text-center">
      {initialLoading && <LoadingOverlay />}
      <div className="mb-6 mt-10 flex justify-between items-center">
        <div className="flex items-center">
          <ShoppingCartOutlined className="text-4xl mr-2" />
          <span className="text-2xl font-semibold">Course Cart</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto">
        <Table
          columns={columns}
          dataSource={cartItems}
          pagination={false}
          footer={() => (
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <Button
                  onClick={showClearConfirmModal}
                  danger
                  className="w-auto mx-auto"
                >
                  Clear Cart
                </Button>
              </Col>

              <Col span={16} className="flex justify-end items-center">
                <div className="mr-4 flex justify-center gap-3 items-center">
                  <h3 className="text-xl font-semibold">Total: </h3>
                  <p className="text-lg font-semibold">${totalPrice}</p>
                </div>
                <Button
                  type="primary"
                  className="w-auto flex items-center"
                  onClick={handleProceedToCheckout}
                  disabled={isCartEmpty || totalPrice === "0.00"}
                  style={{
                    cursor:
                      isCartEmpty || totalPrice === "0.00"
                        ? "not-allowed"
                        : "pointer",
                    opacity: isCartEmpty || totalPrice === "0.00" ? 0.5 : 1,
                  }}
                >
                  <CreditCardOutlined className="mr-2" /> Proceed Checkout
                </Button>
              </Col>
            </Row>
          )}
        />
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

import { useEffect, useState } from "react";
import { Table, Button, Row, Col, notification, Checkbox } from "antd";
import { ShoppingCartOutlined, CreditCardOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import LoadingOverlay from "../../../common/LoadingOverlay";

const CartPage = () => {
  const [initialLoading, setInitialLoading] = useState(true);

  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState([
    {
      key: "1",
      image: "image1.jpg",
      product: "Book stand about Software",
      price: 32.0,
      selected: false, // Track whether the item is selected
    },
    {
      key: "2",
      image: "image2.jpg",
      product: "Nice stand about peek",
      price: 56.0,
      selected: false, // Track whether the item is selected
    },
  ]);

  const handleClearCart = () => {
    setCartItems([]);
    notification.success({
      message: "Cart cleared",
    });
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

  const handleRemoveItem = (key) => {
    const updatedCartItems = cartItems.filter((item) => item.key !== key);
    setCartItems(updatedCartItems);
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
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

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
                  onClick={handleClearCart}
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
                  disabled={isCartEmpty || totalPrice === "0.00"} // Disable if cart is empty or no items selected
                  style={{
                    cursor:
                      isCartEmpty || totalPrice === "0.00"
                        ? "not-allowed"
                        : "pointer", // Change cursor when disabled
                    opacity: isCartEmpty || totalPrice === "0.00" ? 0.5 : 1, // Make the button look disabled
                  }}
                >
                  <CreditCardOutlined className="mr-2" /> Proceed Checkout
                </Button>
              </Col>
            </Row>
          )}
        />
      </div>
    </div>
  );
};

export default CartPage;

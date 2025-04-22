import React from "react";
import { Table, Button, notification, Form, Input, Row, Col } from "antd";
import { useLocation } from "react-router-dom"; // Import useLocation hook

const CheckoutPage = () => {
  const location = useLocation();
  const cartItems = location.state?.cartItems || []; // Retrieve cart items from state

  const handlePlaceOrder = () => {
    notification.success({
      message: "Order placed successfully",
    });
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "product",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => `$${price.toFixed(2)}`, // Ensure price is displayed with 2 decimal places
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between mb-10">
        <div className="w-1/2 pr-4">
          <h2 className="text-2xl font-semibold mb-6">Billing Details</h2>
          <Form layout="vertical">
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label="First Name" name="firstName" required>
                  <Input placeholder="First Name" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Last Name" name="lastName" required>
                  <Input placeholder="Last Name" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label="Email Address" name="email" required>
                  <Input placeholder="Your email" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Phone Number" name="phone" required>
                  <Input placeholder="Phone Number" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Address" name="address" required>
              <Input placeholder="Address" />
            </Form.Item>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Form.Item label="Town/City" name="city" required>
                  <Input placeholder="Town/City" />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item label="Order Notes" name="orderNotes">
              <Input.TextArea placeholder="Order Notes" />
            </Form.Item>
          </Form>
        </div>

        <div className="w-1/2 pl-4">
          <h2 className="text-2xl font-semibold mb-6">Details Order</h2>
          <Table
            columns={columns}
            dataSource={cartItems}
            pagination={false}
            footer={() => (
              <div className="text-right">
                <div className="mt-4">
                  <strong>Total:</strong> $
                  {cartItems
                    .reduce((acc, item) => acc + item.price, 0)
                    .toFixed(2)}{" "}
                  {/* Display total with 2 decimal places */}
                </div>
                <Button
                  type="primary"
                  className="mt-6"
                  onClick={handlePlaceOrder}
                >
                  Place order
                </Button>
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;

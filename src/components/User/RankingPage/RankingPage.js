import React, { useState } from "react";
import {
  Table,
  Button,
  Row,
  Col,
  Input,
  notification,
  Card,
  Select,
  Avatar,
} from "antd";
import {
  SearchOutlined,
  TrophyOutlined,
  StarOutlined,
} from "@ant-design/icons"; // Importing icons

const { Option } = Select;

const RankingPage = () => {
  const [searchText, setSearchText] = useState("");
  const [rankings, setRankings] = useState([
    {
      key: "1",
      username: "Đinh Phúc",
      country: "Vietnam",
      exp: 7231,
      image: "image1.jpg",
    },
    {
      key: "2",
      username: "Trương Quốc Thuân",
      country: "Vietnam",
      exp: 6709,
      image: "image2.jpg",
    },
    {
      key: "3",
      username: "Andrew Nguyen",
      country: "Unknown",
      exp: 6546,
      image: "image3.jpg",
    },
    {
      key: "4",
      username: "Mã Thế Thành",
      country: "Vietnam",
      exp: 6442,
      image: "image4.jpg",
    },
  ]);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filter rankings based on search
  const filteredRankings = rankings.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Username",
      dataIndex: "username",
      render: (username, record) => (
        <div className="flex items-center">
          {/* Using Avatar component for users with and without images */}
          <Avatar
            src={record.image ? record.image : ""}
            style={{ marginRight: 10 }}
          />
          {username}
        </div>
      ),
    },
    {
      title: "Country",
      dataIndex: "country",
      render: (country) => (
        <span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2560px-Flag_of_Vietnam.svg.png"
            alt={country}
            style={{ width: 20, marginRight: 5 }}
          />
          {country}
        </span>
      ),
    },
    {
      title: "EXP",
      dataIndex: "exp",
      render: (exp) => <span>{exp}</span>,
    },
  ];

  // Handle the time filter change
  const handleTimeFilterChange = (value) => {
    console.log("Selected time filter: ", value);
    // Add the logic for filtering rankings by Week, Month, Year here
  };

  return (
    <div className="p-6">
      {/* Time filter dropdown */}
      <div className="mb-6 mt-10 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Ranking</h2>
        <Select
          defaultValue="all"
          style={{ width: 200 }}
          onChange={handleTimeFilterChange}
        >
          <Option value="all">All Time</Option>
          <Option value="week">This Week</Option>
          <Option value="month">This Month</Option>
          <Option value="year">This Year</Option>
        </Select>
      </div>

      {/* Top 3 Cards */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col span={8}>
          <Card
            title={
              <div>
                <TrophyOutlined style={{ color: "#FFD700" }} /> Top 1
              </div>
            }
            bordered={false}
            style={{
              borderRadius: 10,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)", // More prominent shadow
              padding: "20px",
              transition: "transform 0.3s, box-shadow 0.3s", // Adding smooth transitions
            }}
            hoverable // Make the card hoverable
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="flex items-center">
              <Avatar
                src="https://via.placeholder.com/50"
                style={{
                  marginRight: 15,
                  width: 80,
                  height: 80, // Increased avatar size for more prominence
                }}
              />
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Đinh Phúc
                </h3>
                <p style={{ fontSize: "1rem", color: "#777" }}>EXP: 7231</p>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            title={
              <div>
                <StarOutlined style={{ color: "#FFD700" }} /> Top 2
              </div>
            }
            bordered={false}
            style={{
              borderRadius: 10,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)", // More prominent shadow
              padding: "20px",
              transition: "transform 0.3s, box-shadow 0.3s", // Adding smooth transitions
            }}
            hoverable // Make the card hoverable
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="flex items-center">
              <Avatar
                src="https://via.placeholder.com/50"
                style={{
                  marginRight: 15,
                  width: 80,
                  height: 80, // Increased avatar size for more prominence
                }}
              />
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Trương Quốc Thuân
                </h3>
                <p style={{ fontSize: "1rem", color: "#777" }}>EXP: 6709</p>
              </div>
            </div>
          </Card>
        </Col>

        <Col span={8}>
          <Card
            title={
              <div>
                <StarOutlined style={{ color: "#CD7F32" }} /> Top 3
              </div>
            }
            bordered={false}
            style={{
              borderRadius: 10,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)", // More prominent shadow
              padding: "20px",
              transition: "transform 0.3s, box-shadow 0.3s", // Adding smooth transitions
            }}
            hoverable // Make the card hoverable
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="flex items-center">
              <Avatar
                src="https://via.placeholder.com/50"
                style={{
                  marginRight: 15,
                  width: 80,
                  height: 80, // Increased avatar size for more prominence
                }}
              />
              <div>
                <h3 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
                  Andrew Nguyen
                </h3>
                <p style={{ fontSize: "1rem", color: "#777" }}>EXP: 6546</p>
              </div>
            </div>
          </Card>
        </Col>
      </Row>

      {/* Search bar */}
      <Row gutter={[16, 16]}>
        <Col span={24} className="mb-4">
          <Input
            placeholder="Search by username"
            prefix={<SearchOutlined />}
            value={searchText}
            onChange={handleSearchChange}
            style={{ width: "auto" }} // Adjusting width of search bar
          />
        </Col>
      </Row>

      {/* Ranking Table */}
      <Table
        columns={columns}
        dataSource={filteredRankings}
        pagination={false}
        rowKey="key"
      />
    </div>
  );
};

export default RankingPage;

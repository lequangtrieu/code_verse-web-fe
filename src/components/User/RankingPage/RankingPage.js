import React, { useState, useEffect } from "react";
import axios from "axios"; // Import axios
import {
  Table,
  Row,
  Col,
  Input,
  Card,
  Select,
  Avatar,
  notification,
} from "antd";
import {
  SearchOutlined,
  TrophyOutlined,
  StarOutlined,
} from "@ant-design/icons";
import moment from "moment"; // Import Moment.js for date manipulation

const { Option } = Select;

const RankingPage = () => {
  const [searchText, setSearchText] = useState("");
  const [rankings, setRankings] = useState([]); // Store rankings
  const [loading, setLoading] = useState(false); // Track loading state
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("all");

  // Function to fetch mock data (as if it were from an API)
  const fetchMockData = async () => {
    setLoading(true);
    try {
      // Replace with the actual API endpoint when it's ready
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      ); // Mock API

      // For now, using hardcoded mock data:
      const mockData = [
        {
          key: "1",
          username: "Đinh Phúc",
          country: "Vietnam",
          exp: 7231,
          image: "https://via.placeholder.com/50/FF6347/FFFFFF?text=ĐP", // Fake image link
          joinDate: "2025-04-25",
        },
        {
          key: "2",
          username: "Trương Quốc Thuân",
          country: "Vietnam",
          exp: 6709,
          image:
            "https://unsplash.com/photos/brown-and-grey-trees-and-rock-formation-painting-wKlHsooRVbg", // Fake image link
          joinDate: "2025-02-15",
        },
        {
          key: "3",
          username: "Andrew Nguyen",
          country: "Unknown",
          exp: 6546,
          image: "https://via.placeholder.com/50/32CD32/FFFFFF?text=AN", // Fake image link
          joinDate: "2025-01-20",
        },
        {
          key: "4",
          username: "Mã Thế Thành",
          country: "Vietnam",
          exp: 6442,
          image: "https://via.placeholder.com/50/FFD700/FFFFFF?text=MTH", // Fake image link
          joinDate: "2025-03-10",
        },
      ];

      setRankings(mockData); // Set mock data
    } catch (error) {
      notification.error({
        message: "Failed to fetch data",
        description: error.message,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchMockData(); // Fetch data when component mounts
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  // Filter rankings based on search and selected time filter
  const filteredRankings = rankings
    .filter((user) =>
      user.username.toLowerCase().includes(searchText.toLowerCase())
    )
    .filter((user) => {
      const joinDate = moment(user.joinDate);
      const currentDate = moment();

      if (selectedTimeFilter === "week") {
        return joinDate.isSame(currentDate, "week");
      } else if (selectedTimeFilter === "month") {
        return joinDate.isSame(currentDate, "month");
      } else if (selectedTimeFilter === "year") {
        return joinDate.isSame(currentDate, "year");
      }
      return true; // For "all" filter, show all
    });

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
          <Avatar src={record.image} style={{ marginRight: 10 }} />
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

  const handleTimeFilterChange = (value) => {
    setSelectedTimeFilter(value);
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
      <Row gutter={[16, 16]} className="mb-6" justify="center">
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
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
              padding: "20px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            hoverable
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="flex items-center">
              <Avatar
                src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
                style={{
                  marginRight: 15,
                  width: 80,
                  height: 80,
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
                <TrophyOutlined style={{ color: "#FFD700" }} /> Top 1
              </div>
            }
            bordered={false}
            style={{
              borderRadius: 10,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
              padding: "20px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            hoverable
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="flex items-center">
              <Avatar
                src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
                style={{
                  marginRight: 15,
                  width: 80,
                  height: 80,
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
                <StarOutlined style={{ color: "#CD7F32" }} /> Top 3
              </div>
            }
            bordered={false}
            style={{
              borderRadius: 10,
              boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
              padding: "20px",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            hoverable
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <div className="flex items-center">
              <Avatar
                src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
                style={{
                  marginRight: 15,
                  width: 80,
                  height: 80,
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
            style={{ width: "auto" }}
          />
        </Col>
      </Row>

      {/* Ranking Table */}
      <Table
        columns={columns}
        dataSource={filteredRankings}
        pagination={false}
        rowKey="key"
        loading={loading} // Show loading spinner while data is being fetched
      />
    </div>
  );
};

export default RankingPage;

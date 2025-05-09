import React, { useState, useEffect } from "react";
import axios from "axios"; 
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
import moment from "moment";

const { Option } = Select;

const RankingPage = () => {
  const [searchText, setSearchText] = useState("");
  const [rankings, setRankings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("all");

  const fetchMockData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );

      const mockData = [
        {
          key: "1",
          username: "Đinh Phúc",
          country: "Vietnam",
          image: "https://placehold.co/50/FF6347/FFFFFF?text=ĐP",
          joinDate: "2022-04-25",
          expHistory: [
            { amount: 175, date: moment().format('YYYY-MM-DD') },
            { amount: 410, date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
            { amount: 385, date: moment().subtract(2, 'days').format('YYYY-MM-DD') },
            { amount: 390, date: moment().subtract(3, 'days').format('YYYY-MM-DD') },
            { amount: 405, date: moment().subtract(4, 'days').format('YYYY-MM-DD') },
            { amount: 420, date: moment().subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 395, date: moment().subtract(6, 'days').format('YYYY-MM-DD') },
            { amount: 380, date: moment().subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 365, date: moment().subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 375, date: moment().subtract(20, 'days').format('YYYY-MM-DD') },
            { amount: 190, date: moment().subtract(1, 'month').format('YYYY-MM-DD') },
            { amount: 185, date: moment().subtract(1, 'month').subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 180, date: moment().subtract(1, 'month').subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 175, date: moment().subtract(1, 'month').subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 120, date: moment().subtract(2, 'months').format('YYYY-MM-DD') },
            { amount: 135, date: moment().subtract(3, 'months').format('YYYY-MM-DD') },
          ]
        },
        {
          key: "2",
          username: "Trương Quốc Thuân",
          country: "Vietnam",
          image: "https://placehold.co/50/4169E1/FFFFFF?text=TQT",
          joinDate: "2022-02-15",
          expHistory: [
            { amount: 450, date: moment().format('YYYY-MM-DD') }, 
            { amount: 150, date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
            { amount: 165, date: moment().subtract(2, 'days').format('YYYY-MM-DD') },
            { amount: 160, date: moment().subtract(3, 'days').format('YYYY-MM-DD') },
            { amount: 170, date: moment().subtract(4, 'days').format('YYYY-MM-DD') },
            { amount: 155, date: moment().subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 165, date: moment().subtract(6, 'days').format('YYYY-MM-DD') },
            { amount: 180, date: moment().subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 175, date: moment().subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 170, date: moment().subtract(20, 'days').format('YYYY-MM-DD') },
            { amount: 380, date: moment().subtract(1, 'month').format('YYYY-MM-DD') },
            { amount: 390, date: moment().subtract(1, 'month').subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 395, date: moment().subtract(1, 'month').subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 385, date: moment().subtract(1, 'month').subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 210, date: moment().subtract(2, 'months').format('YYYY-MM-DD') },
            { amount: 225, date: moment().subtract(3, 'months').format('YYYY-MM-DD') },
          ]
        },
        {
          key: "3",
          username: "Andrew Nguyen",
          country: "USA",
          image: "https://placehold.co/50/32CD32/FFFFFF?text=AN",
          joinDate: "2022-01-20",
          expHistory: [
            { amount: 220, date: moment().format('YYYY-MM-DD') },
            { amount: 210, date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
            { amount: 215, date: moment().subtract(2, 'days').format('YYYY-MM-DD') },
            { amount: 230, date: moment().subtract(3, 'days').format('YYYY-MM-DD') },
            { amount: 235, date: moment().subtract(4, 'days').format('YYYY-MM-DD') },
            { amount: 240, date: moment().subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 425, date: moment().subtract(6, 'days').format('YYYY-MM-DD') }, 
            
            { amount: 190, date: moment().subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 185, date: moment().subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 195, date: moment().subtract(20, 'days').format('YYYY-MM-DD') },
            
            { amount: 130, date: moment().subtract(1, 'month').format('YYYY-MM-DD') },
            { amount: 125, date: moment().subtract(1, 'month').subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 135, date: moment().subtract(1, 'month').subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 130, date: moment().subtract(1, 'month').subtract(15, 'days').format('YYYY-MM-DD') },
            
            { amount: 350, date: moment().subtract(11, 'months').format('YYYY-MM-DD') },
            { amount: 365, date: moment().subtract(12, 'months').format('YYYY-MM-DD') },
          ]
        },
        {
          key: "4",
          username: "Mã Thế Thành",
          country: "Vietnam",
          image: "https://placehold.co/50/FFD700/FFFFFF?text=MTT",
          joinDate: "2022-03-10",
          expHistory: [
           
            { amount: 140, date: moment().format('YYYY-MM-DD') }, 
            { amount: 435, date: moment().subtract(1, 'days').format('YYYY-MM-DD') }, 
            { amount: 165, date: moment().subtract(2, 'days').format('YYYY-MM-DD') },
            { amount: 160, date: moment().subtract(3, 'days').format('YYYY-MM-DD') },
            { amount: 170, date: moment().subtract(4, 'days').format('YYYY-MM-DD') },
            { amount: 155, date: moment().subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 165, date: moment().subtract(6, 'days').format('YYYY-MM-DD') },

            { amount: 180, date: moment().subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 175, date: moment().subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 170, date: moment().subtract(20, 'days').format('YYYY-MM-DD') },

            { amount: 290, date: moment().subtract(1, 'month').format('YYYY-MM-DD') },
            { amount: 285, date: moment().subtract(1, 'month').subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 295, date: moment().subtract(1, 'month').subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 290, date: moment().subtract(1, 'month').subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 280, date: moment().subtract(2, 'months').format('YYYY-MM-DD') },
            { amount: 285, date: moment().subtract(3, 'months').format('YYYY-MM-DD') },
            { amount: 290, date: moment().subtract(4, 'months').format('YYYY-MM-DD') },
          ]
        },
        {
          key: "5",
          username: "Lisa Park",
          country: "South Korea",
          image: "https://placehold.co/50/4B0082/FFFFFF?text=LP",
          joinDate: "2022-12-05",
          expHistory: [

            { amount: 120, date: moment().format('YYYY-MM-DD') },
            { amount: 200, date: moment().subtract(1, 'days').format('YYYY-MM-DD') }, 
            { amount: 190, date: moment().subtract(2, 'days').format('YYYY-MM-DD') },
            { amount: 195, date: moment().subtract(3, 'days').format('YYYY-MM-DD') },
            { amount: 185, date: moment().subtract(4, 'days').format('YYYY-MM-DD') },
            { amount: 205, date: moment().subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 195, date: moment().subtract(6, 'days').format('YYYY-MM-DD') },
            { amount: 190, date: moment().subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 175, date: moment().subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 185, date: moment().subtract(20, 'days').format('YYYY-MM-DD') },
            { amount: 270, date: moment().subtract(1, 'month').format('YYYY-MM-DD') },
            { amount: 265, date: moment().subtract(1, 'month').subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 275, date: moment().subtract(1, 'month').subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 265, date: moment().subtract(1, 'month').subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 350, date: moment().subtract(2, 'months').format('YYYY-MM-DD') },
            { amount: 345, date: moment().subtract(3, 'months').format('YYYY-MM-DD') },
          ]
        },
        {
          key: "6",
          username: "Nguyễn Thành Long",
          country: "Vietnam",
          image: "https://placehold.co/50/008080/FFFFFF?text=NTL",
          joinDate: "2022-01-15",
          expHistory: [
            { amount: 380, date: moment().format('YYYY-MM-DD') }, 
            { amount: 370, date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
            { amount: 365, date: moment().subtract(2, 'days').format('YYYY-MM-DD') },
            { amount: 375, date: moment().subtract(3, 'days').format('YYYY-MM-DD') },
            { amount: 360, date: moment().subtract(4, 'days').format('YYYY-MM-DD') },
            { amount: 370, date: moment().subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 375, date: moment().subtract(6, 'days').format('YYYY-MM-DD') },
 
            { amount: 360, date: moment().subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 350, date: moment().subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 365, date: moment().subtract(20, 'days').format('YYYY-MM-DD') },
            
            { amount: 230, date: moment().subtract(1, 'month').format('YYYY-MM-DD') },
            { amount: 220, date: moment().subtract(1, 'month').subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 235, date: moment().subtract(1, 'month').subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 225, date: moment().subtract(1, 'month').subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 240, date: moment().subtract(2, 'months').format('YYYY-MM-DD') },
            { amount: 235, date: moment().subtract(3, 'months').format('YYYY-MM-DD') },
          ]
        },
        {
          key: "7",
          username: "Emma Watson",
          country: "UK",
          image: "https://placehold.co/50/FF69B4/FFFFFF?text=EW",
          joinDate: "2022-11-22",
          expHistory: [
     
            { amount: 160, date: moment().format('YYYY-MM-DD') }, 
            { amount: 365, date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
            { amount: 370, date: moment().subtract(2, 'days').format('YYYY-MM-DD') },
            { amount: 360, date: moment().subtract(3, 'days').format('YYYY-MM-DD') },
            { amount: 355, date: moment().subtract(4, 'days').format('YYYY-MM-DD') },
            { amount: 375, date: moment().subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 170, date: moment().subtract(6, 'days').format('YYYY-MM-DD') },
            
            { amount: 230, date: moment().subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 215, date: moment().subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 225, date: moment().subtract(20, 'days').format('YYYY-MM-DD') },
            
            { amount: 270, date: moment().subtract(1, 'month').format('YYYY-MM-DD') },
            { amount: 265, date: moment().subtract(1, 'month').subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 275, date: moment().subtract(1, 'month').subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 265, date: moment().subtract(1, 'month').subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 360, date: moment().subtract(11, 'months').format('YYYY-MM-DD') },
            { amount: 355, date: moment().subtract(12, 'months').format('YYYY-MM-DD') },
          ]
        },
        {
          key: "8",
          username: "Trần Minh Quân",
          country: "Vietnam",
          image: "https://placehold.co/50/20B2AA/FFFFFF?text=TMQ",
          joinDate: "2022-04-05",
          expHistory: [
            
            { amount: 200, date: moment().format('YYYY-MM-DD') }, 
            { amount: 185, date: moment().subtract(1, 'days').format('YYYY-MM-DD') }, 
            { amount: 195, date: moment().subtract(2, 'days').format('YYYY-MM-DD') },
            { amount: 190, date: moment().subtract(3, 'days').format('YYYY-MM-DD') },
            { amount: 180, date: moment().subtract(4, 'days').format('YYYY-MM-DD') },
            { amount: 205, date: moment().subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 195, date: moment().subtract(6, 'days').format('YYYY-MM-DD') },
            
            { amount: 190, date: moment().subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 185, date: moment().subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 195, date: moment().subtract(20, 'days').format('YYYY-MM-DD') },
            
            { amount: 355, date: moment().subtract(1, 'month').format('YYYY-MM-DD') },
            { amount: 350, date: moment().subtract(1, 'month').subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 360, date: moment().subtract(1, 'month').subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 345, date: moment().subtract(1, 'month').subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 240, date: moment().subtract(2, 'months').format('YYYY-MM-DD') },
            { amount: 235, date: moment().subtract(3, 'months').format('YYYY-MM-DD') },
          ]
        },
        {
          key: "9",
          username: "Carlos Rodriguez",
          country: "Spain",
          image: "https://placehold.co/50/8A2BE2/FFFFFF?text=CR",
          joinDate: "2022-03-30",
          expHistory: [
            
            { amount: 130, date: moment().format('YYYY-MM-DD') },
            { amount: 180, date: moment().subtract(1, 'days').format('YYYY-MM-DD') },
            { amount: 345, date: moment().subtract(2, 'days').format('YYYY-MM-DD') },
            { amount: 340, date: moment().subtract(3, 'days').format('YYYY-MM-DD') },
            { amount: 335, date: moment().subtract(4, 'days').format('YYYY-MM-DD') },
            { amount: 350, date: moment().subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 165, date: moment().subtract(6, 'days').format('YYYY-MM-DD') },
           
            { amount: 330, date: moment().subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 320, date: moment().subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 335, date: moment().subtract(20, 'days').format('YYYY-MM-DD') },
            
            { amount: 150, date: moment().subtract(1, 'month').format('YYYY-MM-DD') },
            { amount: 145, date: moment().subtract(1, 'month').subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 155, date: moment().subtract(1, 'month').subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 145, date: moment().subtract(1, 'month').subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 240, date: moment().subtract(2, 'months').format('YYYY-MM-DD') },
            { amount: 235, date: moment().subtract(3, 'months').format('YYYY-MM-DD') },
          ]
        },
        {
          key: "10",
          username: "Phạm Thị Mai",
          country: "Vietnam",
          image: "https://placehold.co/50/FF7F50/FFFFFF?text=PTM",
          joinDate: "2022-02-28",
          expHistory: [
            
            { amount: 195, date: moment().format('YYYY-MM-DD') },
            { amount: 190, date: moment().subtract(1, 'days').format('YYYY-MM-DD') }, 
            { amount: 185, date: moment().subtract(2, 'days').format('YYYY-MM-DD') },
            { amount: 195, date: moment().subtract(3, 'days').format('YYYY-MM-DD') },
            { amount: 180, date: moment().subtract(4, 'days').format('YYYY-MM-DD') },
            { amount: 200, date: moment().subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 190, date: moment().subtract(6, 'days').format('YYYY-MM-DD') },
            
            { amount: 150, date: moment().subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 145, date: moment().subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 155, date: moment().subtract(20, 'days').format('YYYY-MM-DD') },
            
            { amount: 180, date: moment().subtract(1, 'month').format('YYYY-MM-DD') },
            { amount: 175, date: moment().subtract(1, 'month').subtract(5, 'days').format('YYYY-MM-DD') },
            { amount: 185, date: moment().subtract(1, 'month').subtract(10, 'days').format('YYYY-MM-DD') },
            { amount: 175, date: moment().subtract(1, 'month').subtract(15, 'days').format('YYYY-MM-DD') },
            { amount: 400, date: moment().subtract(11, 'months').format('YYYY-MM-DD') },
            { amount: 395, date: moment().subtract(12, 'months').format('YYYY-MM-DD') },
          ]
        }
      ];

      setRankings(mockData); 
    } catch (error) {
      notification.error({
        message: "Failed to fetch data",
        description: error.message,
      });
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchMockData();
  }, []);


  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };


const filteredRankings = rankings
.filter((user) =>
  user.username.toLowerCase().includes(searchText.toLowerCase())
)
.map(user => {

  const userCopy = { ...user };
  
  switch(selectedTimeFilter) {
    case "today": {
      const today = moment().format('YYYY-MM-DD');
      const todayExp = user.expHistory.find(exp => exp.date === today);
      userCopy.exp = todayExp ? todayExp.amount : 0;
      break;
    }
    case "week": {

      const weekAgo = moment().subtract(6, 'days').startOf('day');
      userCopy.exp = user.expHistory
        .filter(exp => moment(exp.date).isSameOrAfter(weekAgo))
        .reduce((sum, exp) => sum + exp.amount, 0);
      break;
    }
    case "month": {
      const currentMonth = moment().format('YYYY-MM');
      userCopy.exp = user.expHistory
        .filter(exp => exp.date.startsWith(currentMonth))
        .reduce((sum, exp) => sum + exp.amount, 0);
      break;
    }
    case "year": {
      const currentYear = moment().format('YYYY');
      userCopy.exp = user.expHistory
        .filter(exp => exp.date.startsWith(currentYear))
        .reduce((sum, exp) => sum + exp.amount, 0);
      break;
    }
    default: {
      userCopy.exp = user.expHistory.reduce((sum, exp) => sum + exp.amount, 0);
      break;
    }
  }
  
  return userCopy;
})
.sort((a, b) => b.exp - a.exp);

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
      <div className="mb-6 mt-10 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Ranking</h2>
        <Select
          defaultValue="all"
          style={{ width: 200 }}
          onChange={handleTimeFilterChange}
        >
          <Option value="all">All Time</Option>
          <Option value="today">Day</Option>
          <Option value="week">Week</Option>
          <Option value="month">Month</Option>
          <Option value="year">Year</Option>
        </Select>
      </div>

<Row gutter={[16, 16]} className="mb-6" justify="center">
  {/* Top 2 */}
  <Col span={7}>
    <Card
      title={
        <div>
          <StarOutlined style={{ color: "#FFFFFF" }} /> Top 2
        </div>
      }
      bordered={false}
      style={{
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "15px",
        transition: "all 0.3s ease",
        backgroundColor: "#c0c0c0",
        height: "250px",
      }}
      hoverable
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      }}
    >
      {filteredRankings.length > 1 ? (
        <div className="flex items-center">
          <Avatar
            src={filteredRankings[1].image}
            style={{
              marginRight: 15,
              width: 80,
              height: 80,
            }}
          />
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
              {filteredRankings[1].username}
            </h3>
            <p style={{ fontSize: "1rem", color: "#FFFFFF" }}>
              EXP: {filteredRankings[1].exp}
            </p>
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </Card>
  </Col>

  {/* Top 1 */}
  <Col span={10}>
    <Card 
      title={
        <div style={{ fontSize: "1.2em", fontWeight: "bold" }}>
          <TrophyOutlined style={{ color: "#D7942D" }} /> Top 1 Champion
        </div>
      }
      bordered={false}
      style={{
        borderRadius: 15,
        boxShadow: "0 8px 24px rgba(255, 215, 0, 0.3)",
        padding: "25px",
        transition: "all 0.3s ease",
        backgroundColor: "#ffd700",
        height: "300px",
        marginTop: "-25px",
        cursor: "pointer",
      }}
      hoverable
      onClick={() => window.location.href = '/account-profile'}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-10px)";
        e.currentTarget.style.boxShadow = "0 12px 30px rgba(255, 215, 0, 0.4)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 8px 24px rgba(255, 215, 0, 0.3)";
      }}
    >
      {filteredRankings.length > 0 ? (
        <div className="flex items-center justify-center">
          <Avatar
            src={filteredRankings[0].image}
            style={{
              marginRight: 20,
              width: 100,
              height: 100,
              border: "3px solid #ffec00",
            }}
          />
          <div>
            <h3 style={{ fontSize: "1.5rem", fontWeight: "bold", color: "#333" }}>
              {filteredRankings[0].username}
            </h3>
            <p style={{ fontSize: "1.2rem", color: "#555", marginTop: "10px" }}>
              EXP: <strong>{filteredRankings[0].exp}</strong>
            </p>
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
    </Card>
  </Col>

  {/* Top 3 */}
  <Col span={7}>
    <Card
      title={
        <div>
          <StarOutlined style={{ color: "#FFFFFF" }} /> Top 3
        </div>
      }
      bordered={false}
      style={{
        borderRadius: 10,
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        padding: "15px",
        transition: "all 0.3s ease",
        backgroundColor: "#b87333",
        height: "250px",
      }}
      hoverable
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-5px)";
        e.currentTarget.style.boxShadow = "0 6px 16px rgba(0, 0, 0, 0.15)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.1)";
      }}
    >
      {filteredRankings.length > 2 ? (
        <div className="flex items-center">
          <Avatar
            src={filteredRankings[2].image}
            style={{
              marginRight: 15,
              width: 80,
              height: 80,
            }}
          />
          <div>
            <h3 style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
              {filteredRankings[2].username}
            </h3>
            <p style={{ fontSize: "1rem", color: "#FFFFFF" }}>
              EXP: {filteredRankings[2].exp}
            </p>
          </div>
        </div>
      ) : (
        <div>No data available</div>
      )}
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
        loading={loading}
      />
    </div>
  );
};

export default RankingPage;

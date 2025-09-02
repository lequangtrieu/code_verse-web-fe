import { useEffect, useState } from "react";
import {
  BookOutlined,
  UserOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import AdminDashboardCard from "./AdminDashboardCard";
import commonApi from "../../../common/api";
import { message, Select } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import RevenueChart from "../AdminDashBoard/RevenueChart";

const DashboardPage = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState("MONTH");
  const { Option } = Select;

  const fetchOverview = async () => {
    try {
      const res = await axiosInstance.get(
        `${commonApi.dashboardOverview.url}?period=${period}`
      );
      setOverview(res.data || {});
    } catch (err) {
      message.error("Failed to fetch dashboard overview.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, [period]);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      <Select
        value={period}
        onChange={(val) => setPeriod(val)}
        style={{ width: 150 }}
      >
        <Option value="WEEK">This Week</Option>
        <Option value="MONTH">This Month</Option>
        <Option value="QUARTER">This Quarter</Option>
        <Option value="YEAR">This Year</Option>
      </Select>

      {overview && (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-4">
          <AdminDashboardCard
            icon={<UserOutlined className="text-pink-500 text-3xl" />}
            title="Users"
            total={overview.totalUsers}
            newValue={overview.newUsers}
            growthPercent={overview.userGrowthPercent}
          />
          <AdminDashboardCard
            icon={<BookOutlined className="text-pink-500 text-3xl" />}
            title="Courses"
            total={overview.totalCourses}
            newValue={overview.newCourses}
            growthPercent={overview.courseGrowthPercent}
          />
          <AdminDashboardCard
            icon={<ShoppingCartOutlined className="text-pink-500 text-3xl" />}
            title="Orders"
            total={overview.totalOrders}
            newValue={overview.newOrders}
            growthPercent={overview.orderGrowthPercent}
          />
          <AdminDashboardCard
            icon={<DollarOutlined className="text-pink-500 text-3xl" />}
            title="Revenue"
            total={overview.totalRevenue.toLocaleString("vi-VN") + " đ"}
            newValue={overview.newRevenue.toLocaleString("vi-VN") + " đ"}
            growthPercent={overview.revenueGrowthPercent}
          />
        </div>
      )}

      <RevenueChart />
    </div>
  );
};

export default DashboardPage;

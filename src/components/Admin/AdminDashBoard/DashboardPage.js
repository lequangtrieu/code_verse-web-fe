import { useEffect, useState } from "react";
import {
  BookOutlined,
  UserOutlined,
  CheckCircleOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import DashboardCard from "./DashboardCard";
import commonApi from "../../../common/api";
import { message } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const DashboardPage = () => {
  const [overview, setOverview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [revenueYear, setRevenueYear] = useState([]);
  const [revenueMonth, setRevenueMonth] = useState([]);
  const [revenueQuarter, setRevenueQuarter] = useState([]);
  const [roleStats, setRoleStats] = useState([]);

  const fetchOverview = async () => {
    try {
      const res = await axiosInstance.get(commonApi.dashboardOverview.url);
      setOverview(res.data || {});
    } catch (err) {
      message.error("Failed to fetch dashboard overview.");
    } finally {
      setLoading(false);
    }
  };

  const fetchRevenueData = async () => {
    try {
      const [yearRes, monthRes, quarterRes] = await Promise.all([
        axiosInstance.get(commonApi.dashboardRevenueByYear.url),
        axiosInstance.get(commonApi.dashboardRevenueByMonth.url),
        axiosInstance.get(commonApi.dashboardRevenueByQuarter.url),
      ]);
      setRevenueYear(yearRes.data);
      setRevenueMonth(monthRes.data);
      setRevenueQuarter(quarterRes.data);
    } catch (err) {
      message.error("Failed to fetch revenue data.");
    }
  };


  useEffect(() => {
    fetchOverview();
    fetchRevenueData();
    fetchUserRoleStats();
  }, []);

  const getChartOptions = (title, data) => ({
    title: { text: title },
    xAxis: { categories: data.map((d) => d.label) },
    yAxis: { title: { text: "Revenue (VND)" } },
    series: [
      {
        name: title,
        data: data.map((d) => d.total),
      },
    ],
    credits: {
      enabled: false
    }
  });

  const fetchUserRoleStats = async () => {
    try {
      const res = await axiosInstance.get(commonApi.dashboardUserRole.url);
      setRoleStats(res.data || []);
    } catch (err) {
      message.error("Failed to fetch user role stats.");
    }
  };

  const getPieChartOptions = (title, data) => ({
    chart: { type: "pie" },
    title: { text: title },
    tooltip: {
      pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b> ({point.y} users)"
    },
    accessibility: {
      point: {
        valueSuffix: "%"
      }
    },
    plotOptions: {
      pie: {
        allowPointSelect: true,
        cursor: "pointer",
        dataLabels: {
          enabled: true,
          format: "<b>{point.name}</b>: {point.percentage:.1f} %"
        }
      }
    },
    series: [
      {
        name: "Users",
        colorByPoint: true,
        data: data.map((d) => ({
          name: d.role,
          y: d.count
        }))
      }
    ],
    credits: {
      enabled: false
    }
  });




  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      {overview && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            icon={<UserOutlined className="text-pink-500 text-3xl" />}
            title="Total Users"
            value={overview.totalUsers}
          />
          <DashboardCard
            icon={<BookOutlined className="text-pink-500 text-3xl" />}
            title="Total Courses"
            value={overview.totalCourses}
          />
          <DashboardCard
            icon={<ShoppingCartOutlined className="text-pink-500 text-3xl" />}
            title="Total Orders"
            value={overview.totalOrders}
          />
          <DashboardCard
            icon={<DollarOutlined className="text-pink-500 text-3xl" />}
            title="Total Revenue"
            value={overview.totalRevenue.toLocaleString("vi-VN") + " đ"}
          />
          <DashboardCard
            icon={<CheckCircleOutlined className="text-pink-500 text-3xl" />}
            title="Total Enrollments"
            value={overview.totalEnrollments}
          />
          <DashboardCard
            icon={<SolutionOutlined className="text-pink-500 text-3xl" />}
            title="User Reports"
            value={overview.totalReports}
          />
        </div>
      )}

      <div className="mt-10">
        <h3 className="text-xl font-semibold mt-12 mb-4">User Role Distribution</h3>
        <HighchartsReact
          highcharts={Highcharts}
          options={getPieChartOptions("User Distribution by Role", roleStats)}
        />
      </div>

      <h3 className="text-xl font-semibold mt-12 mb-4">Revenue Analysis</h3>
      <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <HighchartsReact highcharts={Highcharts} options={getChartOptions("Revenue by Year", revenueYear)} />
        <HighchartsReact highcharts={Highcharts} options={getChartOptions("Revenue by Month", revenueMonth)} />
        <HighchartsReact highcharts={Highcharts} options={getChartOptions("Revenue by Quarter", revenueQuarter)} />
      </div>

    </div>
  );
};

export default DashboardPage;

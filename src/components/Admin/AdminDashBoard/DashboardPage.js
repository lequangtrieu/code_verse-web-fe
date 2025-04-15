import {
  BookOutlined,
  UserOutlined,
  CheckCircleOutlined,
  GlobalOutlined,
  ReadOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import DashboardCard from "./DashboardCard";

const DashboardPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={<CheckCircleOutlined className="text-pink-500 text-3xl" />}
          title="Enrolled Courses"
          value="900+"
        />
        <DashboardCard
          icon={<ReadOutlined className="text-pink-500 text-3xl" />}
          title="Active Courses"
          value="500+"
        />
        <DashboardCard
          icon={<UserOutlined className="text-pink-500 text-3xl" />}
          title="Complete Courses"
          value="300k"
        />
        <DashboardCard
          icon={<BookOutlined className="text-pink-500 text-3xl" />}
          title="Total Courses"
          value="1,500+"
        />
        <DashboardCard
          icon={<TeamOutlined className="text-pink-500 text-3xl" />}
          title="Total Students"
          value="30k"
        />
        <DashboardCard
          icon={<GlobalOutlined className="text-pink-500 text-3xl" />}
          title="OVER THE WORLD"
          value="90,000k+"
        />
      </div>
    </div>
  );
};

export default DashboardPage;

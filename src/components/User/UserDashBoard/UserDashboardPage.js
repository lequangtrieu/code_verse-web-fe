import {
  CheckCircleOutlined,
  ReadOutlined
} from "@ant-design/icons";
import DashboardCard from "./DashboardCard";

const UserDashboardPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard
          icon={<CheckCircleOutlined className="text-pink-500 text-3xl" />}
          title="Completed Courses"
          value="9"
        />
        <DashboardCard
          icon={<ReadOutlined className="text-pink-500 text-3xl" />}
          title="Doing Courses"
          value="1"
        />
      </div>
    </div>
  );
};

export default UserDashboardPage;

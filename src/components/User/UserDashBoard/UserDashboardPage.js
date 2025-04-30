import {
  CheckCircleOutlined,
  ReadOutlined,
  StarOutlined,
  MessageOutlined,
  QuestionCircleOutlined,
  ScheduleOutlined,
} from "@ant-design/icons";
import { Card } from "antd";
import DashboardCard from "./DashboardCard";

const UserDashboardPage = () => {
  return (
    <div className="w-full h-full pt-2">
      <Card className="w-full shadow-lg" title="Dashboard">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            icon={<CheckCircleOutlined className="text-pink-500 text-3xl" />}
            title="Completed Courses"
            value="9"
          />
          <DashboardCard
            icon={<ReadOutlined className="text-pink-500 text-3xl" />}
            title="Ongoing Courses"
            value="1"
          />
          <DashboardCard
            icon={<StarOutlined className="text-yellow-500 text-3xl" />}
            title="My Reviews"
            value="3"
          />
          <DashboardCard
            icon={<MessageOutlined className="text-blue-500 text-3xl" />}
            title="Messages"
            value="5"
          />
          <DashboardCard
            icon={<ScheduleOutlined className="text-purple-500 text-3xl" />}
            title="Assignments"
            value="2"
          />
          <DashboardCard
            icon={<QuestionCircleOutlined className="text-red-500 text-3xl" />}
            title="Quiz Attempts"
            value="7"
          />
        </div>
      </Card>
    </div>
  );
};

export default UserDashboardPage;

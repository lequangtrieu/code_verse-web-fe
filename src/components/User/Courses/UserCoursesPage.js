import { Card } from "antd";

const UserCoursesPage = () => {
  return (
    <div className="w-full h-full pt-2">
      <Card className="w-full shadow-lg" title="My Courses">
        <p className="text-gray-500">
          You are not enrolled in any courses yet.
        </p>
      </Card>
    </div>
  );
};

export default UserCoursesPage;

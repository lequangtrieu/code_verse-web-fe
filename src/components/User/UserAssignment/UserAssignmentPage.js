import { Card } from "antd";

const UserAssignmentPage = () => {
  return (
    <div className="w-full h-full pt-2">
      <Card className="w-full shadow-lg" title="Assignments">
        <p className="text-gray-500">You have no assignments submitted yet.</p>
      </Card>
    </div>
  );
};

export default UserAssignmentPage;

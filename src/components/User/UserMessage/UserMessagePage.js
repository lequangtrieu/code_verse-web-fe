import { Card } from "antd";

const UserMessagePage = () => {
  return (
    <div className="w-full h-full pt-2">
      <Card className="w-full shadow-lg" title="Messages">

        <p className="text-gray-500">You have no new messages.</p>
      </Card>
    </div>
  );
};

export default UserMessagePage;

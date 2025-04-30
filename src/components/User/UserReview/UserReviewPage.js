import { Card } from "antd";

const UserReviewPage = () => {
  return (
    <div className="w-full h-full pt-2">
      <Card className="w-full shadow-lg" title="Reviews">
        <p className="text-gray-500">You haven’t written any reviews yet.</p>
      </Card>
    </div>
  );
};

export default UserReviewPage;

import { Card } from "antd";

const UserQuizPage = () => {
  return (
    <div className="w-full h-full pt-2">
      <Card className="w-full shadow-lg" title="My Quiz">

        <p className="text-gray-500">You haven't attempted any quizzes yet.</p>
      </Card>
    </div>
  );
};

export default UserQuizPage;

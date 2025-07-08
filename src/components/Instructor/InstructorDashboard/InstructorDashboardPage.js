import MonthlyEnrollmentChart from "./MonthlyEnrollmentChart";

const InstructorDashboardPage = () => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Dashboard</h2>
      <div className="w-full h-[2px] bg-pink-500 mb-6 rounded">
        <MonthlyEnrollmentChart />
      </div>

    </div>
  );
};

export default InstructorDashboardPage;

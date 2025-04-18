const DashboardCard = ({ icon, title, value }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          <div className="text-2xl font-bold">{value}</div>
          <div className="text-gray-500 text-sm">{title}</div>
        </div>
      </div>
    </div>
  );
};
export default DashboardCard;

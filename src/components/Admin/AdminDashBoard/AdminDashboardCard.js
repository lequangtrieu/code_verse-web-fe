import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";

const AdminDashboardCard = ({ icon, title, total, newValue, growthPercent }) => {
  const isPositive = growthPercent >= 0;

  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-md transition">
      <div className="flex items-center gap-4">
        {icon}
        <div>
          {/* Total */}
          <div className="text-2xl font-bold">{total}</div>
          <div className="text-gray-500 text-sm">{title}</div>

          {/* New + Growth */}
          <div className="flex items-center gap-2 mt-1 text-sm">
            <span className="text-gray-600">New: {newValue}</span>
            <span
              className={`flex items-center gap-1 ${isPositive ? "text-green-500" : "text-red-500"
                }`}
            >
              {isPositive ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
              {Math.abs(growthPercent).toFixed(1)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboardCard;

import { useEffect, useState } from "react";
import { Table, Select, message } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";

const { Option } = Select;

const RevenueTable = () => {
    const [data, setData] = useState([]);
    const [viewBy, setViewBy] = useState("MONTH"); // MONTH | QUARTER | YEAR
    const [year, setYear] = useState(new Date().getFullYear());

    const fetchData = async () => {
        try {
            let res;
            if (viewBy === "MONTH") {
                res = await axiosInstance.get(`${commonApi.dashboardRevenue.byMonth}?year=${year}`);
            } else if (viewBy === "QUARTER") {
                res = await axiosInstance.get(`${commonApi.dashboardRevenue.byQuarter}?year=${year}`);
            } else {
                res = await axiosInstance.get(commonApi.dashboardRevenue.byYear);
            }
            setData(res.data || []);
        } catch (err) {
            message.error("Failed to fetch revenue data.");
        }
    };

    useEffect(() => {
        fetchData();
    }, [viewBy, year]);

    const columns = [
        {
            title: viewBy === "MONTH" ? "Month" : viewBy === "QUARTER" ? "Quarter" : "Year",
            dataIndex: "label",
            key: "label",
        },
        {
            title: "Orders",
            dataIndex: "totalOrders",
            key: "totalOrders",
        },
        {
            title: "Revenue (VND)",
            dataIndex: "totalRevenue",
            key: "totalRevenue",
            render: (val) => Number(val).toLocaleString("vi-VN") + " đ",
        },
    ];

    return (
        <div className="bg-white p-6 rounded-xl shadow mt-8">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Revenue Analytics</h3>

                <div className="flex gap-3">
                    <Select value={viewBy} onChange={(val) => setViewBy(val)} style={{ width: 150 }}>
                        <Option value="MONTH">By Month</Option>
                        <Option value="QUARTER">By Quarter</Option>
                        <Option value="YEAR">By Year</Option>
                    </Select>

                    {(viewBy === "MONTH" || viewBy === "QUARTER") && (
                        <Select value={year} onChange={(val) => setYear(val)} style={{ width: 120 }}>
                            {Array.from({ length: 5 }, (_, i) => {
                                const y = new Date().getFullYear() - i;
                                return (
                                    <Option key={y} value={y}>
                                        {y}
                                    </Option>
                                );
                            })}
                        </Select>
                    )}
                </div>
            </div>

            <Table
                rowKey="label"
                dataSource={data}
                columns={columns}
                pagination={false}
            />
        </div>
    );
};

export default RevenueTable;

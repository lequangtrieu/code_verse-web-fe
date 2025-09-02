import { useEffect, useState } from "react";
import { Select, message } from "antd";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { useNavigate } from "react-router-dom";

const { Option } = Select;
const monthMap = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12,
};
const getQuarterFromLabel = (label) => {
    const m = /Q\s*(\d)/i.exec(label ?? "");
    return m ? Number(m[1]) : undefined;
};
const RevenueChart = () => {
    const [viewType, setViewType] = useState("MONTH"); // MONTH | QUARTER | YEAR
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [compareType, setCompareType] = useState("PREVIOUS_PERIOD");
    const [data, setData] = useState([]);
    const navigate = useNavigate();

    const fetchData = async () => {
        try {
            let url = "";
            if (viewType === "MONTH") {
                const res = await axiosInstance.get(
                    `${commonApi.dashboardRevenueByMonth.url}?year=${selectedYear}&compareType=${compareType}`
                );
                setData(
                    (res.data || []).map((d, idx) => ({
                        ...d,
                        year: selectedYear,
                        month: monthMap[d.label],
                    }))
                );
            } else if (viewType === "QUARTER") {
                const res = await axiosInstance.get(
                    `${commonApi.dashboardRevenueByQuarter.url}?year=${selectedYear}&compareType=${compareType}`
                );
                setData(
                    (res.data || []).map((d, idx) => ({
                        ...d,
                        year: selectedYear,
                        quarter: getQuarterFromLabel(d.label),
                    }))
                );
            } else {
                const res = await axiosInstance.get(
                    `${commonApi.dashboardRevenueByYear.url}?compareType=${compareType}`
                );
                setData(
                    (res.data || []).map((d) => ({
                        ...d,
                        year: parseInt(d.label),
                    }))
                );
            }

        } catch (err) {
            message.error("Failed to fetch revenue data.");
        }
    };

    useEffect(() => {
        fetchData();
    }, [viewType, selectedYear, compareType]);

    // Chart options
    const revenueChartOptions = {
        chart: { zoomType: "xy" },
        title: { text: `Revenue Statistics (${viewType}${viewType !== "YEAR" ? " " + selectedYear : ""})` },
        xAxis: { categories: data.map(d => d.label), crosshair: true },
        yAxis: [
            { labels: { format: "{value} đ" }, title: { text: "Revenue (VND)" } },
        ],
        tooltip: { shared: true },
        series: [
            {
                type: "column",
                name: "Revenue",
                data: data.map((d) => ({
                    y: Number(d.totalRevenue || 0),
                    year: d.year,
                    month: d.month,
                    quarter: d.quarter,
                })),
                tooltip: { valueSuffix: " đ" },
                color: "#f472b6",
            },
        ],
        plotOptions: {
            series: {
                cursor: "pointer",
                point: {
                    events: {
                        click: function () {
                            const params = new URLSearchParams();
                            params.append("year", this.year);
                            if (this.month) params.append("month", this.month);
                            if (this.quarter) params.append("quarter", this.quarter);

                            navigate(`/admin-panel/revenue?${params.toString()}`);
                        },
                    },
                },
            },
        },
        credits: { enabled: false },
    };

    const ordersChartOptions = {
        chart: { zoomType: "xy" },
        title: {
            text: `Orders Statistics (${viewType}${viewType !== "YEAR" ? " " + selectedYear : ""
                })`,
        },
        xAxis: { categories: data.map((d) => d.label), crosshair: true },
        yAxis: [{ title: { text: "Orders" } }],
        tooltip: { shared: true },
        series: [
            {
                type: "column",
                name: "Orders",
                data: data.map((d) => ({
                    y: Number(d.totalOrders || 0),
                    year: d.year,
                    month: d.month,
                    quarter: d.quarter,
                })),
                tooltip: { valueSuffix: " orders" },
                color: "#4ade80",
            },
        ],
        credits: { enabled: false },
    };

    return (
        <div className="bg-white p-6 rounded-xl shadow mt-8">
            <div className="flex flex-wrap gap-4 items-center mb-4">
                {/* <h3 className="text-xl font-semibold">Revenue Analytics</h3> */}

                {/* View type select */}
                <Select value={viewType} onChange={setViewType} style={{ width: 160 }}>
                    <Option value="MONTH">By Month</Option>
                    <Option value="QUARTER">By Quarter</Option>
                    <Option value="YEAR">By Year</Option>
                </Select>

                {/* Year select - chỉ hiển thị khi viewType = MONTH hoặc QUARTER */}
                {(viewType === "MONTH" || viewType === "QUARTER") && (
                    <Select
                        value={selectedYear}
                        onChange={setSelectedYear}
                        style={{ width: 120 }}
                    >
                        {[2023, 2024, 2025, 2026].map(y => (
                            <Option key={y} value={y}>{y}</Option>
                        ))}
                    </Select>
                )}

                {/* <Select value={compareType} onChange={setCompareType} style={{ width: 200 }}>
                    <Option value="PREVIOUS_PERIOD">Compare with Previous Period</Option>
                    <Option value="SAME_PERIOD_LAST_YEAR">Compare with Same Period Last Year</Option>
                </Select> */}

            </div>

            {/* Chart Revenue */}
            <HighchartsReact highcharts={Highcharts} options={revenueChartOptions} />

            {/* Chart Orders */}
            <div className="mt-10">
                <HighchartsReact highcharts={Highcharts} options={ordersChartOptions} />
            </div>
        </div>
    );
};

export default RevenueChart;

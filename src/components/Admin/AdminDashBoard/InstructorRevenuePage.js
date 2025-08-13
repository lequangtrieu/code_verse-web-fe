import { useEffect, useState } from "react";
import { Table, message, Drawer, Button, Space } from "antd";
import { useLocation } from "react-router-dom";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const InstructorRevenuePage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [courseData, setCourseData] = useState([]);
    const [selectedInstructor, setSelectedInstructor] = useState(null);

    const location = useLocation();

    const fetchInstructors = async () => {
        setLoading(true);
        try {
            const query = location.search.replace(/^\?/, "");
            const res = await axiosInstance.get(commonApi.adminRevenue.instructors.url(query));
            setData(res.data || []);
        } catch (err) {
            message.error("Failed to fetch instructor revenue data.");
        } finally {
            setLoading(false);
        }
    };

    const fetchCourses = async (instructorId) => {
        try {
            const query = location.search.replace(/^\?/, "");
            const url = `${commonApi.adminRevenue.instructorCourses.url(instructorId)}${query ? `?${query}` : ""}`;
            const res = await axiosInstance.get(url);
            setCourseData(res.data || []);
        } catch (err) {
            message.error("Failed to fetch course revenue data.");
        }
    };

    useEffect(() => {
        fetchInstructors();
    }, [location.search]);

    const exportToExcel = (rows, filename, type) => {
        if (!rows || rows.length === 0) {
            message.warning("No data to export.");
            return;
        }

        // Lấy param filter từ URL
        const params = new URLSearchParams(location.search);
        let filterSuffix = "";

        const typeParam = params.get("type");
        const year = params.get("year");
        const month = params.get("month");
        const quarter = params.get("quarter");

        if (typeParam) filterSuffix += `_${typeParam}`;
        if (year) filterSuffix += `_Y${year}`;
        if (month) filterSuffix += `_M${month}`;
        if (quarter) filterSuffix += `_Q${quarter}`;

        let formattedRows = [];

        if (type === "instructors") {
            formattedRows = rows.map(item => ({
                "Instructor ID": item.instructorId,
                "Name": item.instructorName,
                "Total Courses": item.totalCourses,
                "Total Learners": item.totalLearners,
                "Total Revenue (VND)": Number(item.totalRevenue || 0).toLocaleString("vi-VN"),
                "Platform Fee (VND)": Number(item.platformFee || 0).toLocaleString("vi-VN"),
                "Income (VND)": Number(item.instructorIncome || 0).toLocaleString("vi-VN"),
                "Total Withdrawn (VND)": Number(item.totalWithdrawn || 0).toLocaleString("vi-VN"),
                "Pending Withdrawals (VND)": Number(item.pendingWithdrawals || 0).toLocaleString("vi-VN"),
            }));
        } else if (type === "courses") {
            formattedRows = rows.map(item => ({
                "Course ID": item.courseId,
                "Course Title": item.courseTitle,
                "Total Learners": item.totalLearners,
                "Total Revenue (VND)": Number(item.totalRevenue || 0).toLocaleString("vi-VN"),
                "Platform Fee (VND)": Number(item.platformFee || 0).toLocaleString("vi-VN"),
                "Instructor Income (VND)": Number(item.instructorIncome || 0).toLocaleString("vi-VN"),
            }));
        }

        const worksheet = XLSX.utils.json_to_sheet(formattedRows);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const blob = new Blob([excelBuffer], { type: "application/octet-stream" });

        // Gắn filterSuffix vào tên file
        saveAs(blob, `${filename}${filterSuffix}.xlsx`);
    };

    const columns = [
        { title: "Instructor ID", dataIndex: "instructorId", key: "instructorId" },
        { title: "Name", dataIndex: "instructorName", key: "instructorName" },
        { title: "Courses", dataIndex: "totalCourses", key: "totalCourses" },
        { title: "Learners", dataIndex: "totalLearners", key: "totalLearners" },
        { title: "Revenue (VND)", dataIndex: "totalRevenue", key: "totalRevenue" },
        { title: "Platform Fee (VND)", dataIndex: "platformFee", key: "platformFee" },
        { title: "Income (VND)", dataIndex: "instructorIncome", key: "instructorIncome" },
        { title: "Total Withdrawn (VND)", dataIndex: "totalWithdrawn", key: "totalWithdrawn" },
        { title: "Pending Withdrawals (VND)", dataIndex: "pendingWithdrawals", key: "pendingWithdrawals" },
        {
            title: "Action",
            key: "action",
            render: (_, record) => (
                <a
                    onClick={() => {
                        setSelectedInstructor(record);
                        if (!location.search) {
                            message.error("Missing filter parameters. Please select chart period first.");
                            return;
                        }
                        fetchCourses(record.instructorId);
                        setDrawerOpen(true);
                    }}
                >
                    View Courses
                </a>
            ),
        }
    ];

    const courseColumns = [
        { title: "Course ID", dataIndex: "courseId", key: "courseId" },
        { title: "Title", dataIndex: "courseTitle", key: "courseTitle" },
        { title: "Learners", dataIndex: "totalLearners", key: "totalLearners" },
        { title: "Revenue (VND)", dataIndex: "totalRevenue", key: "totalRevenue" },
        { title: "Platform Fee (VND)", dataIndex: "platformFee", key: "platformFee" },
        { title: "Income (VND)", dataIndex: "instructorIncome", key: "instructorIncome" },
    ];

    const getChartOptions = () => ({
        chart: { type: "column" },
        title: { text: `Revenue by Course - ${selectedInstructor?.instructorName}` },
        xAxis: { categories: courseData.map((c) => c.courseTitle) },
        yAxis: { title: { text: "Revenue (VND)" } },
        series: [{ name: "Revenue", data: courseData.map((c) => c.totalRevenue) }],
        credits: { enabled: false },
    });

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-2">Instructor Revenue</h2>
            <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

            <Space style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={() => exportToExcel(data, "Instructor_Revenue", "instructors")}>
                    Export Instructors to Excel
                </Button>
            </Space>

            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                rowKey="instructorId"
                pagination={{ pageSize: 8 }}
            />

            <Drawer
                title={`Course Revenue - ${selectedInstructor?.instructorName}`}
                width={800}
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
                style={{ paddingTop: "82px" }}
            >
                <HighchartsReact highcharts={Highcharts} options={getChartOptions()} />

                <Space style={{ marginBottom: 16, marginTop: 16 }}>
                    <Button
                        type="primary"
                        onClick={() =>
                            exportToExcel(courseData, `${selectedInstructor?.instructorName || "courses"}`, "courses")
                        }
                    >
                        Export Courses to Excel
                    </Button>
                </Space>

                <Table
                    columns={courseColumns}
                    dataSource={courseData}
                    rowKey="courseId"
                    pagination={{ pageSize: 5 }}
                    style={{ marginTop: "20px" }}
                />
            </Drawer>
        </div>
    );
};

export default InstructorRevenuePage;

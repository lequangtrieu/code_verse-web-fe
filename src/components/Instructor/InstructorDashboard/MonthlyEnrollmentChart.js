import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Select, Spin, Card } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import LoadingContainer from "../../../common/LoadingContainer";

const COLORS = [
    "#4caf50",
    "#2196f3",
    "#ff9800",
    "#f44336",
    "#9c27b0",
    "#009688",
    "#3f51b5",
    "#795548",
    "#e91e63",
    "#00bcd4",
  ];

const MonthlyEnrollmentChart = () => {
    const user = useSelector((state) => state?.user?.user);
    const [stats, setStats] = useState([]);
    const [selectedCourses, setSelectedCourses] = useState([]);
    const [availableCourses, setAvailableCourses] = useState([]);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [loading, setLoading] = useState(true);

    const monthLabels = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    useEffect(() => {
        fetchStats();
    }, [user]);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get(commonApi.getMonthlyStats.url, {
                params: { username: user.username },
            });
            setStats(res.data.result);
        } catch (err) {
            console.error("Failed to fetch stats:", err);
        } finally {
            setLoading(false);
        }
    };

    const getAvailableCourses = () => {
        const courseMap = {};
        stats.forEach(s => {
            courseMap[s.courseId] = s.courseTitle;
        });
        return Object.entries(courseMap).map(([id, title]) => ({
            value: Number(id),
            label: title
        }));
    };

    const getAvailableYears = () => {
        const yearSet = new Set(stats.map(s => s.year));
        return [...yearSet].sort((a, b) => b - a);
    };

    const buildSeriesData = () => {
        return selectedCourses.map((courseId, index) => {
            const courseTitle = getAvailableCourses().find(c => c.value === courseId)?.label;
            const dataByMonth = Array(12).fill(0);

            stats
                .filter(s => s.courseId === courseId && s.year === selectedYear)
                .forEach(s => {
                    dataByMonth[s.month - 1] = s.totalEnrolled;
                });

            return {
                name: courseTitle,
                data: dataByMonth,
                color: COLORS[index % COLORS.length]
            };
        });
    };

    const chartOptions = {
        title: {
            text: "Monthly Enrollment Statistics"
        },
        xAxis: {
            categories: monthLabels
        },
        yAxis: {
            title: {
                text: "Total Enrolled Students"
            },
            allowDecimals: false
        },
        series: buildSeriesData(),
        credits: {
            enabled: false
       }
    };

    useEffect(() => {
        const courses = getAvailableCourses();
        setAvailableCourses(courses);
    
        const allCourseIds = courses.map(course => course.value);
        setSelectedCourses(allCourseIds);
      }, [stats]);

    return (
        <Card title="Enrollment Statistics" className="w-full shadow-md">
            {loading ? (
                <LoadingContainer />
            ) : (
                <>
                    <div className="flex flex-wrap gap-4 mb-6">
                        <div className="flex flex-col">
                            <span className="text-sm text-gray-600 mb-1">Select Courses</span>
                            <Select
                                mode="multiple"
                                allowClear
                                placeholder="Choose courses"
                                value={selectedCourses}
                                onChange={(values) => setSelectedCourses(values)}
                                style={{ minWidth: 400 }}
                                maxTagCount="responsive"
                                dropdownStyle={{ maxHeight: 300, overflowY: "auto" }}
                                options={availableCourses}
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm text-gray-600 mb-1">Select Year</span>
                            <Select
                                placeholder="Choose year"
                                value={selectedYear}
                                onChange={(year) => setSelectedYear(year)}
                                style={{ width: 150 }}
                                dropdownStyle={{ maxHeight: 300, overflowY: "auto" }}
                                options={getAvailableYears().map((y) => ({ value: y, label: y }))}
                            />
                        </div>
                    </div>

                    <HighchartsReact highcharts={Highcharts} options={chartOptions} />
                </>
            )}
        </Card>
    );
};

export default MonthlyEnrollmentChart;

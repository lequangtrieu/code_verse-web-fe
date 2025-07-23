import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card } from "antd";

const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

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

const MonthlyEnrollmentChart = ({ stats, selectedCourses, selectedYear }) => {

    const getAvailableCourses = () => {
        const courseMap = {};
        stats?.forEach(s => {
            courseMap[s.courseId] = s.courseTitle;
        });
        return Object.entries(courseMap).map(([id, title]) => ({
            value: Number(id),
            label: title
        }));
    };

    const buildSeriesData = () => {
        return selectedCourses?.map((courseId, index) => {
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
            text: "Monthly Enrollment Statistics " + selectedYear
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
        credits: { enabled: false }
    };

    return (
        <Card title="Enrollment Statistics" className="w-full shadow-md">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Card>
    );
};

export default MonthlyEnrollmentChart;

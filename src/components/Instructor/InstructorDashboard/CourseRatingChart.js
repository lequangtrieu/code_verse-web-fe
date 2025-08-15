import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card } from "antd";

const COLORS = ["#4caf50", "#2196f3"];

const CourseRatingChart = ({ stats, selectedCourses, selectedYear, availableCourses }) => {

    const filteredStats = stats?.filter(
        s => s.year === selectedYear && selectedCourses?.includes(s.courseId)
    );

    const courseMap = {};
    filteredStats?.forEach(s => {
        courseMap[s.courseId] = s.courseTitle;
    });

    const courseCategories = selectedCourses?.map(courseId => courseMap[courseId] || availableCourses.find(c => c.value === courseId).label);

    const averageRatings = selectedCourses?.map(courseId => {
        const courseData = filteredStats?.find(s => s.courseId === courseId);
        return courseData?.averageRating ? Number(courseData?.averageRating.toFixed(1)) : 0;
    });

    const totalRatings = selectedCourses?.map(courseId => {
        const courseData = filteredStats?.find(s => s.courseId === courseId);
        return courseData?.totalRating ?? 0;
    });

    const chartOptions = {
        chart: {
            type: "column"
        },
        title: {
            text: "Course Rating Statistics " + selectedYear
        },
        xAxis: {
            categories: courseCategories,
            crosshair: true
        },
        yAxis: [
            {
                title: { text: "Average Rating" },
                max: 5,
                min: 0,
                allowDecimals: true
            },
            {
                title: { text: "Total Ratings" },
                opposite: true,
                allowDecimals: false
            }
        ],
        tooltip: {
            shared: true
        },
        plotOptions: {
            column: {
                pointPadding: 0,
                borderWidth: 0,
                borderRadius: 0
            }
        },
        series: [
            {
                name: "Average Rating",
                data: averageRatings,
                color: COLORS[0],
                yAxis: 0
            },
            {
                name: "Total Ratings",
                data: totalRatings,
                color: COLORS[1],
                yAxis: 1
            }
        ],
        credits: { enabled: false }
    };

    return (
        <Card title="Course Rating Statistics" className="w-full shadow-md">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Card>
    );
};

export default CourseRatingChart;
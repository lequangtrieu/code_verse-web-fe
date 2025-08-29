import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { Card } from "antd";

const monthLabels = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

const MonthlyEnrollmentChart = ({ stats, selectedCourses, selectedYear }) => {

    const buildSeriesData = () => {
        const dataByMonth = Array(12).fill(0);

        stats
            .filter(s => selectedCourses.includes(s.courseId) && s.year === selectedYear)
            .forEach(s => {
                dataByMonth[s.month - 1] += s.totalEnrolled;
            });

        // return [
        //     {
        //         type: "areaspline",
        //         name: "Total Enrollment",
        //         data: dataByMonth,
        //         color: "#2196f3",
        //         lineWidth: 3,
        //         marker: {
        //             enabled: true,
        //             radius: 4,
        //             lineWidth: 2,
        //             lineColor: "#fff",
        //             fillColor: "#2196f3"
        //         },
        //         fillColor: {
        //             linearGradient: [0, 0, 0, 250],
        //             stops: [
        //                 [0, "rgba(169, 218, 253, 0.6)"],
        //                 [1, "rgba(169, 218, 253, 0)"]
        //             ]
        //         }
        //     }
        // ];

        return [
            {
                type: "column",
                name: "Total Enrollment",
                data: dataByMonth,
                color: "#2196f3",
                borderRadius: 5 // rounded top corners
            }
        ];
    };

    // const chartOptions = {
    //     chart: {
    //         type: "areaspline"
    //     },
    //     title: {
    //         text: "Monthly Enrollment Statistics " + selectedYear
    //     },
    //     xAxis: {
    //         categories: monthLabels
    //     },
    //     yAxis: {
    //         title: {
    //             text: "Total Enrolled Students"
    //         },
    //         allowDecimals: false
    //     },
    //     tooltip: {
    //         shared: true,
    //         valueSuffix: " learners"
    //     },
    //     credits: { enabled: false },
    //     series: buildSeriesData()
    // };

    const chartOptions = {
        chart: {
            type: "column"
        },
        title: {
            text: "Monthly Enrollment Statistics " + selectedYear
        },
        xAxis: {
            categories: monthLabels,
            crosshair: true
        },
        yAxis: {
            min: 0,
            title: {
                text: "Total Enrolled Students"
            },
            allowDecimals: false
        },
        tooltip: {
            shared: true,
            valueSuffix: " learners"
        },
        plotOptions: {
            column: {
                borderWidth: 0,
                pointPadding: 0.2,
                groupPadding: 0.1
            }
        },
        credits: { enabled: false },
        series: buildSeriesData()
    };

    return (
        <Card title="Enrollment Statistics" className="w-full shadow-md">
            <HighchartsReact highcharts={Highcharts} options={chartOptions} />
        </Card>
    );
};

export default MonthlyEnrollmentChart;

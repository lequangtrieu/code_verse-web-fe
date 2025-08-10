// ChartDashboard.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Select, Card } from "antd";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import LoadingContainer from "../../../common/LoadingContainer";
import MonthlyEnrollmentChart from "./MonthlyEnrollmentChart";
import CourseRatingChart from "./CourseRatingChart";

const ChartDashboard = () => {
  const user = useSelector((state) => state?.user?.user);
  const [stats, setStats] = useState([]);
  const [ratingStats, setRatingStats] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

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

  const fetchCourseRatingStats = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(commonApi.getCourseRatingStats.url);
      setRatingStats(res.data.result);
    } catch (err) {
      console.error("Failed to fetch stats:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    fetchCourseRatingStats();
  }, [user]);

  const getAvailableCourses = () => {
    const courseMap = {};
    stats.forEach((s) => {
      courseMap[s.courseId] = s.courseTitle;
    });
    return Object.entries(courseMap).map(([id, title]) => ({
      value: Number(id),
      label: title,
    }));
  };

  const getAvailableYears = () => {
    const yearSet = new Set(stats.map((s) => s.year));
    return [...yearSet].sort((a, b) => b - a);
  };

  useEffect(() => {
    const courses = getAvailableCourses();
    const allCourseIds = courses.map((c) => c.value);
    setSelectedCourses(allCourseIds);
  }, [stats]);

  const availableCourses = getAvailableCourses();
  const availableYears = getAvailableYears();

  return (
    <div className="space-y-6">
      <Card className="shadow-md">
        <div className="flex flex-wrap gap-4 mb-4">
          <div className="flex flex-col">
            <span className="text-sm text-gray-600 mb-1">Select Courses</span>
            <Select
              mode="multiple"
              allowClear
              placeholder="Choose courses"
              value={selectedCourses}
              onChange={setSelectedCourses}
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
              onChange={setSelectedYear}
              style={{ width: 150 }}
              dropdownStyle={{ maxHeight: 300, overflowY: "auto" }}
              options={availableYears.map((y) => ({ value: y, label: y }))}
            />
          </div>
        </div>
      </Card>

      {loading ? (
        <LoadingContainer />
      ) : (
        <>
          <MonthlyEnrollmentChart
            stats={stats}
            selectedCourses={selectedCourses}
            selectedYear={selectedYear}
          />
          <CourseRatingChart
            stats={ratingStats}
            selectedCourses={selectedCourses}
            selectedYear={selectedYear}
          />
        </>
      )}
    </div>
  );
};

export default ChartDashboard;

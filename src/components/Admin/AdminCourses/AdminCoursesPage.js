import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { formatCurrency } from "../../../common/helper";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { message, Pagination, Input, Select } from "antd";
import { useNavigate } from "react-router-dom";

const { Option } = Select;

const AdminCoursesPage = () => {
  const navigate = useNavigate();
  const [initialLoading, setInitialLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    fetchCourses();
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => {
      applyFilters();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory, selectedStatus, courses]);

  const fetchCourses = async () => {
    try {
      const result = await axiosInstance.get(commonApi.getAllCoursesByAdmin.url, {
        params: { username: user.username },
      });
      setCourses(result.data || []);
    } catch (error) {
      message.error("Error when fetching course data.");
      setCourses([]);
    } finally {
      setTimeout(() => {
        setInitialLoading(false);
      }, 400);
    }
  };

  const applyFilters = () => {
    let filtered = [...courses];

    // Search by title or description
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((course) =>
        ((course.title || "") + (course.description || "")).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by selected status (only PENDING and PUBLISHED when "all" is selected)
    if (selectedStatus === "all") {
      filtered = filtered.filter((course) =>
        course.status === "PENDING" || course.status === "PUBLISHED"
      );
    } else if (selectedStatus !== "all") {
      filtered = filtered.filter((course) =>
        selectedStatus === "published" ? course.status === "PUBLISHED" : course.status === "PENDING"
      );
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const uniqueCategories = [...new Set(courses.map((c) => c.category).filter(Boolean))];

  const handleViewDetail = (courseId) => {
    navigate(`/admin-panel/courses/${courseId}`);
  };

  const handleAccept = async (courseId) => {
    try {
      await axiosInstance.patch(commonApi.updateCourseStatus.url(courseId), { status: 'PUBLISHED' });
      message.success("Course has been accepted and published!");
      fetchCourses();
    } catch (error) {
      message.error("Error while updating course status.");
    }
  };

  const handleReject = async (courseId) => {
    try {
      await axiosInstance.patch(commonApi.updateCourseStatus.url(courseId), { status: 'DRAFT' });
      message.success("Course has been rejected and moved to draft.");
      fetchCourses();
    } catch (error) {
      message.error("Error while updating course status.");
    }
  };

  // Method for highlighting search term
  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, i) =>
      regex.test(part) ? (
        <mark key={i} style={{ backgroundColor: '#ffe58f', padding: 0 }}>{part}</mark>
      ) : (
        part
      )
    );
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Courses</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      {/* Search and Filters */}
      <div className="flex flex-wrap gap-4 mb-4">
        <Input
          placeholder="Search by title or description"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-64"
        />
        <Select
          placeholder="Filter by category"
          className="w-52"
          value={selectedCategory}
          onChange={setSelectedCategory}
        >
          <Option value="all">All Categories</Option>
          {uniqueCategories.map((cat) => (
            <Option key={cat} value={cat}>{cat}</Option>
          ))}
        </Select>
        <Select
          placeholder="Filter by status"
          className="w-52"
          value={selectedStatus}
          onChange={setSelectedStatus}
        >
          <Option value="all">All Status</Option>
          <Option value="published">Published</Option>
          <Option value="pending">Pending</Option>
        </Select>
      </div>

      {initialLoading && <LoadingOverlay />}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <colgroup>
            <col style={{ width: '8%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '25%' }} />
            <col style={{ width: '12%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
            <col style={{ width: '10%' }} />
          </colgroup>
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Image</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedCourses.length > 0 ? (
              paginatedCourses.map((course) => (
                <tr key={course.id} className="text-center">
                  <td className="border p-2">
                    <img
                      src={course.thumbnailUrl || "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"}
                      alt={course.title}
                      className="w-20 h-20 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="border p-2">{highlightText(course.title, searchQuery)}</td>
                  <td className="border p-2">{highlightText(course.description, searchQuery)}</td>
                  <td className="border p-2">{course.category}</td>
                  <td className="border p-2">{formatCurrency(course.price)}</td>
                  <td className="border p-2">
                    {course.status === "PENDING" ? (
                      <span className="text-yellow-500 font-semibold">Pending</span>
                    ) : course.status === "PUBLISHED" ? (
                      <span className="text-green-500 font-semibold">Published</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Draft</span>
                    )}
                  </td>
                  <td className="border p-2 space-x-2">
                    {course.status === "PENDING" && (
                      <>
                        <button
                          className="px-3 py-1 bg-green-500 text-white rounded"
                          onClick={() => handleAccept(course.id)}
                        >
                          Accept
                        </button>
                        <button
                          className="px-3 py-1 bg-red-500 text-white rounded"
                          onClick={() => handleReject(course.id)}
                        >
                          Reject
                        </button>
                      </>
                    )}
                    <button
                      className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded whitespace-nowrap min-w-[70px]"
                      onClick={() => handleViewDetail(course.id)}
                    >
                      View Detail
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <Pagination
          current={currentPage}
          total={filteredCourses.length}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default AdminCoursesPage;

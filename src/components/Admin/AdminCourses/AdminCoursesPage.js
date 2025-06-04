import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axiosInstance from "../../../config/axiosInstance";
import commonApi from "../../../common/api";
import { formatCurrency } from "../../../common/helper";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { Form, Modal, message, Pagination, Input, Select } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const { Option } = Select;

const AdminCoursesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirectToCreate = () => {
    navigate('/admin-panel/courses/create');
  };

  const isCreatePage = location.pathname === '/admin-panel/courses/create';
  const [initialLoading, setInitialLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const user = useSelector((state) => state?.user?.user);

  useEffect(() => {
    fetchCourses();
    // eslint-disable-next-line
  }, [user]);

  useEffect(() => {
    applyFilters();
    // eslint-disable-next-line
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

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((course) =>
        ((course.title || "") + (course.description || "")).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    if (selectedStatus !== "all") {
      // So sánh với trường status là chuỗi "PUBLISHED" hoặc "DRAFT"
      filtered = filtered.filter((course) =>
        selectedStatus === "published" ? course.status === "PUBLISHED" : course.status !== "PUBLISHED"
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

  const handleCancelModal = () => {
    setIsModalOpen(false);
    setSelectedCourse(null);
    form.resetFields();
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-2">Courses</h2>
      <div className="w-16 h-[2px] bg-pink-500 mb-6 rounded"></div>

      {!isCreatePage && (
        <div className="flex gap-4 mb-6">
          <button
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleRedirectToCreate}
          >
            Create Course
          </button>
        </div>
      )}

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
          <Option value="draft">Draft</Option>
        </Select>
      </div>

      {initialLoading && <LoadingOverlay />}

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
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
                  <td className="border p-2">{course.title}</td>
                  <td className="border p-2">{course.description}</td>
                  <td className="border p-2">{course.category}</td>
                  <td className="border p-2">{formatCurrency(course.price)}</td>
                  <td className="border p-2">
                    {course.status === "PUBLISHED" ? (
                      <span className="text-green-500 font-semibold">Published</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Draft</span>
                    )}
                  </td>
                  <td className="border p-2 space-x-2">
                    <button
                      className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
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

      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          total={filteredCourses.length}
          pageSize={pageSize}
          onChange={setCurrentPage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default AdminCoursesPage;

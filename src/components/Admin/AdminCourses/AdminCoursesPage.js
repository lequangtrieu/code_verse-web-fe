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
      const result = await axiosInstance.get(commonApi.adminCourses.url, {
        params: { username: user.username },
      });
      setCourses(result.data.result);
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
        (course.title + course.description).toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((course) => course.category === selectedCategory);
    }

    if (selectedStatus !== "all") {
      const isPublished = selectedStatus === "published";
      filtered = filtered.filter((course) => course.published === isPublished);
    }

    setFilteredCourses(filtered);
    setCurrentPage(1);
  };

  const paginatedCourses = filteredCourses.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const uniqueCategories = [...new Set(courses.map((c) => c.category))];

  // const toggleActive = (id) => {
  //   setCourses((prev) =>
  //     prev.map((course) =>
  //       course.id === id ? { ...course, isActive: !course.isActive } : course
  //     )
  //   );
  //   message.success("Course status updated successfully");
  // };

  const handleViewDetail = (courseId) => {
    // setSelectedCourse(course);
    // setIsModalOpen(true);
    // form.setFieldsValue(course);
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
                    <img src={course.thumbnailUrl || "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"}
                      alt={course.title} className="w-20 h-20 object-cover mx-auto rounded" />
                  </td>
                  <td className="border p-2">{course.title}</td>
                  <td className="border p-2">{course.description}</td>
                  <td className="border p-2">{course.category}</td>
                  <td className="border p-2">{formatCurrency(course.price)}</td>
                  <td className="border p-2">
                    {course.published ? (
                      <span className="text-green-500 font-semibold">Published</span>
                    ) : (
                      <span className="text-red-500 font-semibold">Draft</span>
                    )}
                  </td>
                  <td className="border p-2 space-x-2">
                    {/* <Popconfirm
                    title={course.published ? "Deactivate this course?" : "Activate this course?"}
                    description="Are you sure?"
                    onConfirm={() => toggleActive(course.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button
                      className={`w-24 px-3 py-1 rounded text-white ${course.published
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                      {course.published ? "Deactivate" : "Activate"}
                    </button>
                  </Popconfirm> */}

                    {/* <button
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                    onClick={() => handleViewDetail(course)}
                  >
                    View Detail
                  </button> */}
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
            )
            }
          </tbody>
        </table>
      </div>

      <div className="flex justify-end mt-4">
        <Pagination
          current={currentPage}
          total={filteredCourses.length}
          pageSize={pageSize}
          onChange={(page) => setCurrentPage(page)}
          showSizeChanger={false}
        />
      </div>

      {/* Modal Course Detail */}
      <Modal
        title="Course Details"
        open={isModalOpen}
        onCancel={handleCancelModal}
        footer={[
          <button
            key="cancel"
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
            onClick={handleCancelModal}
          >
            Cancel
          </button>,
          <button
            key="update"
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Update
          </button>,
        ]}
        getContainer={false}
      >
        {selectedCourse && (
          <Form
            form={form}
            initialValues={selectedCourse}
            layout="vertical"
          >
            <Form.Item label="Image">
              <img src={selectedCourse.description.image} alt={selectedCourse.description.title} className="w-full h-auto rounded" />
            </Form.Item>

            <Form.Item label="Name">
              <span>{selectedCourse.description.title}</span>
            </Form.Item>

            <Form.Item label="Description">
              <span>{selectedCourse.description.description}</span>
            </Form.Item>

            <Form.Item label="Category">
              <span>{selectedCourse.description.category}</span>
            </Form.Item>

            <Form.Item label="Price">
              <span>${selectedCourse.bonus.price}</span>
            </Form.Item>

            <Form.Item label="Bonus">
              {selectedCourse.bonus && (
                <div>
                  <p>Price: ${selectedCourse.bonus.price}</p>
                  <p>Level ID: {selectedCourse.bonus.levelId}</p>
                  <p>Notes: {selectedCourse.bonus.notes}</p>
                </div>
              )}
            </Form.Item>

            <Form.Item label="Status">
              <span>{selectedCourse.isActive ? "Active" : "Inactive"}</span>
            </Form.Item>
          </Form>
        )}
      </Modal>


    </div>
  );
};

export default AdminCoursesPage;

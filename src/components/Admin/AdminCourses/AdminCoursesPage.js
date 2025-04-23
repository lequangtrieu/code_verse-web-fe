import { useState } from "react";
import { Form, Modal, Popconfirm, message } from "antd";
import { useNavigate, useLocation } from "react-router-dom";

const AdminCoursesPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleRedirectToCreate = () => {
    navigate('/admin-panel/courses/create');
  };

  const isCreatePage = location.pathname === '/admin-panel/courses/create';

  const [courses, setCourses] = useState([
    {
      id: 1,
      image: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
      name: "React Basics",
      description: "Learn the basics of React.",
      category: "Web Development",
      price: 99,
      isActive: true,
    },
    {
      id: 2,
      image: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
      name: "Advanced JavaScript",
      description: "Deep dive into JS.",
      category: "Programming",
      price: 120,
      isActive: false,
    },
  ]);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);

  const toggleActive = (id) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === id ? { ...course, isActive: !course.isActive } : course
      )
    );
    message.success("Course status updated successfully");
  };

  const handleViewDetail = (course) => {
    setSelectedCourse(course);
    setIsModalOpen(true);
    form.setFieldsValue(course);
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

      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">Image</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price ($)</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="text-center">
                <td className="border p-2">
                  <img src={course.image} alt={course.name} className="w-20 h-20 object-cover mx-auto rounded" />
                </td>
                <td className="border p-2">{course.name}</td>
                <td className="border p-2">{course.description}</td>
                <td className="border p-2">{course.category}</td>
                <td className="border p-2">{course.price}</td>
                <td className="border p-2">
                  {course.isActive ? (
                    <span className="text-green-500 font-semibold">Active</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Inactive</span>
                  )}
                </td>
                <td className="border p-2 space-x-2">
                  <Popconfirm
                    title={course.isActive ? "Deactivate this course?" : "Activate this course?"}
                    description="Are you sure?"
                    onConfirm={() => toggleActive(course.id)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <button
                      className={`w-24 px-3 py-1 rounded text-white ${course.isActive
                        ? "bg-red-500 hover:bg-red-600"
                        : "bg-green-500 hover:bg-green-600"
                        }`}
                    >
                      {course.isActive ? "Deactivate" : "Activate"}
                    </button>
                  </Popconfirm>

                  <button
                    className="px-3 py-1 bg-yellow-400 hover:bg-yellow-500 text-white rounded"
                    onClick={() => handleViewDetail(course)}
                  >
                    View Detail
                  </button>
                </td>
              </tr>
            ))}
            {courses.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center p-4 text-gray-500">
                  No courses found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Course Detail */}
      <Modal
        title="Course Details"
        open={isModalOpen}
        onCancel={handleCancelModal}
        footer={null}
        getContainer={false}
      >
        {selectedCourse && (
          <Form
            form={form}
            initialValues={selectedCourse}
            layout="vertical"
          >
            <Form.Item label="Image">
              <img src={selectedCourse.image} alt={selectedCourse.name} className="w-full h-auto rounded" />
            </Form.Item>

            <Form.Item label="Name">
              <span>{selectedCourse.name}</span>
            </Form.Item>

            <Form.Item label="Description">
              <span>{selectedCourse.description}</span>
            </Form.Item>

            <Form.Item label="Category">
              <span>{selectedCourse.category}</span>
            </Form.Item>

            <Form.Item label="Price">
              <span>${selectedCourse.price}</span>
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

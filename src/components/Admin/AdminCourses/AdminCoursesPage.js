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
      isActive: true,
      description: {
        title: "Full Stack Development",
        description: "Learn full-stack development with Node.js, React, and MongoDB.",
        category: "Web Development",
        image: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
      },
      modules: [
        {
          title: "Module 1: Backend Development with Node.js",
          lessons: [
            {
              title: "Lesson 1: Introduction to Node.js",
              theory: {
                theoryType: "Video",
                previewVideo: "https://example.com/intro_to_node.mp4",
                video: ["https://example.com/node1.mp4", "https://example.com/node2.mp4"]
              },
              exercise: {
                exerciseType: "Code Challenge",
                taskDescription: "Build a basic Node.js server.",
                duration: 60
              }
            },
            {
              title: "Lesson 2: Working with MongoDB",
              theory: {
                theoryType: "Tutorial",
                previewVideo: "https://example.com/mongodb_intro.mp4",
                video: ["https://example.com/mongodb1.mp4", "https://example.com/mongodb2.mp4"]
              },
              exercise: {
                exerciseType: "Hands-on",
                taskDescription: "Create a MongoDB database and perform CRUD operations.",
                duration: 70
              }
            }
          ]
        },
        {
          title: "Module 2: Frontend Development with React",
          lessons: [
            {
              title: "Lesson 1: Setting up React",
              theory: {
                theoryType: "Video",
                previewVideo: "https://example.com/react_setup.mp4",
                video: ["https://example.com/react1.mp4", "https://example.com/react2.mp4"]
              },
              exercise: {
                exerciseType: "Hands-on",
                taskDescription: "Set up a basic React app and run it.",
                duration: 40
              }
            }
          ]
        }
      ],
      bonus: {
        isPaid: true,
        levelId: 3,
        notes: "Includes bonus materials on DevOps and CI/CD pipelines.",
        price: 1500
      },
    },
    {
      id: 2,
      isActive: true,
      description: {
        title: "Advanced JavaScript",
        description: "Master advanced JavaScript concepts and techniques.",
        category: "Programming",
        image: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
      },
      modules: [
        {
          title: "Module 1: Asynchronous JavaScript",
          lessons: [
            {
              title: "Lesson 1: Introduction to Asynchronous Programming",
              theory: {
                theoryType: "Video",
                previewVideo: "https://example.com/async_intro.mp4",
                video: ["https://example.com/async1.mp4", "https://example.com/async2.mp4"]
              },
              exercise: {
                exerciseType: "Code Challenge",
                taskDescription: "Write a function that fetches data asynchronously.",
                duration: 60
              }
            },
            {
              title: "Lesson 2: Promises and Async/Await",
              theory: {
                theoryType: "Tutorial",
                previewVideo: "https://example.com/promises_intro.mp4",
                video: ["https://example.com/promises1.mp4", "https://example.com/promises2.mp4"]
              },
              exercise: {
                exerciseType: "Hands-on",
                taskDescription: "Rewrite callback functions using Promises and Async/Await.",
                duration: 70
              }
            }
          ]
        },
        {
          title: "Module 2: Functional Programming in JavaScript",
          lessons: [
            {
              title: "Lesson 1: Introduction to Functional Programming",
              theory: {
                theoryType: "Video",
                previewVideo: "https://example.com/functional_intro.mp4",
                video: ["https://example.com/functional1.mp4", "https://example.com/functional2.mp4"]
              },
              exercise: {
                exerciseType: "Hands-on",
                taskDescription: "Implement basic functional programming techniques in JavaScript.",
                duration: 50
              }
            }
          ]
        }
      ],
      bonus: {
        isPaid: false,
        levelId: 2,
        notes: "Includes a bonus section on functional programming best practices.",
        price: 1200
      }
    },
    {
      id: 3,
      isActive: true,
      description: {
        title: "Python for Data Science",
        description: "Learn Python programming with a focus on data science and machine learning.",
        category: "Data Science",
        image: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
      },
      modules: [
        {
          title: "Module 1: Introduction to Python for Data Science",
          lessons: [
            {
              title: "Lesson 1: Setting Up Python for Data Science",
              theory: {
                theoryType: "Video",
                previewVideo: "https://example.com/python_setup.mp4",
                video: ["https://example.com/python1.mp4", "https://example.com/python2.mp4"]
              },
              exercise: {
                exerciseType: "Hands-on",
                taskDescription: "Set up Python, install necessary libraries, and run a sample script.",
                duration: 60
              }
            },
            {
              title: "Lesson 2: Introduction to Pandas and NumPy",
              theory: {
                theoryType: "Tutorial",
                previewVideo: "https://example.com/pandas_intro.mp4",
                video: ["https://example.com/pandas1.mp4", "https://example.com/pandas2.mp4"]
              },
              exercise: {
                exerciseType: "Code Challenge",
                taskDescription: "Perform basic data manipulation using Pandas and NumPy.",
                duration: 75
              }
            }
          ]
        },
        {
          title: "Module 2: Machine Learning with Python",
          lessons: [
            {
              title: "Lesson 1: Introduction to Machine Learning Algorithms",
              theory: {
                theoryType: "Video",
                previewVideo: "https://example.com/ml_intro.mp4",
                video: ["https://example.com/ml1.mp4", "https://example.com/ml2.mp4"]
              },
              exercise: {
                exerciseType: "Hands-on",
                taskDescription: "Implement a basic machine learning algorithm using scikit-learn.",
                duration: 80
              }
            }
          ]
        }
      ],
      bonus: {
        isPaid: true,
        levelId: 4,
        notes: "Includes bonus content on deep learning techniques.",
        price: 1800
      }
    }

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
                  <img src={course.description.image} alt={course.description.title} className="w-20 h-20 object-cover mx-auto rounded" />
                </td>
                <td className="border p-2">{course.description.title}</td>
                <td className="border p-2">{course.description.description}</td>
                <td className="border p-2">{course.description.category}</td>
                <td className="border p-2">{course.bonus.price}</td>
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

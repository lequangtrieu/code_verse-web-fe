import React, { useEffect, useState } from "react";
import { Input, Menu, Card, Pagination, Rate, Tag } from "antd";
import { SearchOutlined, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import scrollTop from "../../../config/scrollTop";
import { FaBookOpen } from "react-icons/fa";
import { GiPlanetCore } from "react-icons/gi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiSendPlaneLine } from "react-icons/ri";
import LoadingOverlay from "../../../common/LoadingOverlay";

const { Search } = Input;

const courseData = [
  {
    id: 1,
    category: "Art & Design",
    title: "Foundation course to understand about software",
    lessons: 23,
    duration: "1 hr 30 min",
    price: 32.0,
    discount: 0,
    instructor: "Micie Jhon",
    rating: 4.5,
    ratingCount: 48,
    imageUrl:
      "https://via.placeholder.com/300x180/FFC107/000000?Text=Art&Design",
  },
  {
    id: 2,
    category: "Development",
    title: "Nickles course to understand about software",
    lessons: 28,
    duration: "2 hr 10 min",
    price: 32.0,
    discount: 40.0,
    instructor: "Rinis Jhon",
    rating: 4.2,
    ratingCount: 35,
    imageUrl:
      "https://via.placeholder.com/300x180/2196F3/FFFFFF?Text=Development",
  },
  {
    id: 3,
    category: "Lifestyle",
    title: "Minws course to understand about solution",
    lessons: 25,
    duration: "1 hr 40 min",
    price: 40.0,
    discount: 0,
    instructor: "Jane Austen",
    rating: 4.9,
    ratingCount: 55,
    imageUrl:
      "https://via.placeholder.com/300x180/4CAF50/FFFFFF?Text=Lifestyle",
  },
  {
    id: 4,
    category: "Web Design",
    title: "Design course to understand about solution",
    lessons: 36,
    duration: "3 hr 40 min",
    price: 40.0,
    discount: 0,
    instructor: "Micie Robin",
    rating: 4.1,
    ratingCount: 44,
    imageUrl:
      "https://via.placeholder.com/300x180/9C27B0/FFFFFF?Text=WebDesign",
  },
  {
    id: 5,
    category: "Business",
    title: "Data course to understand about solution",
    lessons: 16,
    duration: "1 hr 40 min",
    price: 40.0,
    discount: 0,
    instructor: "Ch. Dickens",
    rating: 4.6,
    ratingCount: 62,
    imageUrl: "https://via.placeholder.com/300x180/FF9800/000000?Text=Business",
  },
  {
    id: 6,
    category: "Art & Design",
    title: "Big data to understand about solution pacage",
    lessons: 30,
    duration: "1 hr 40 min",
    price: 40.0,
    discount: 0,
    instructor: "Gc. Orwell",
    rating: 4.3,
    ratingCount: 38,
    imageUrl:
      "https://via.placeholder.com/300x180/E91E63/FFFFFF?Text=Art&Design",
  },
  {
    id: 7,
    category: "Development",
    title: "Advanced React Concepts",
    lessons: 45,
    duration: "4 hr 0 min",
    price: 55.0,
    discount: 10.0,
    instructor: "John Doe",
    rating: 4.7,
    ratingCount: 70,
    imageUrl:
      "https://via.placeholder.com/300x180/00BCD4/FFFFFF?Text=Development+",
  },
  {
    id: 8,
    category: "Lifestyle",
    title: "Mindfulness and Meditation",
    lessons: 12,
    duration: "1 hr 15 min",
    price: 25.0,
    discount: 0,
    instructor: "Sarah Lee",
    rating: 4.8,
    ratingCount: 40,
    imageUrl:
      "https://via.placeholder.com/300x180/8BC34A/FFFFFF?Text=Lifestyle+",
  },
  {
    id: 9,
    category: "Web Design",
    title: "UI/UX Design Fundamentals",
    lessons: 20,
    duration: "2 hr 30 min",
    price: 38.0,
    discount: 5.0,
    instructor: "David Smith",
    rating: 4.4,
    ratingCount: 52,
    imageUrl:
      "https://via.placeholder.com/300x180/673AB7/FFFFFF?Text=WebDesign+",
  },
  {
    id: 10,
    category: "Business",
    title: "Digital Marketing Strategy",
    lessons: 18,
    duration: "2 hr 0 min",
    price: 42.0,
    discount: 0,
    instructor: "Emily Brown",
    rating: 4.6,
    ratingCount: 68,
    imageUrl:
      "https://via.placeholder.com/300x180/FF5722/FFFFFF?Text=Business+",
  },
  {
    id: 11,
    category: "Finance",
    title: "Personal Finance Management",
    lessons: 10,
    duration: "1 hr 0 min",
    price: 20.0,
    discount: 0,
    instructor: "Michael Clark",
    rating: 4.3,
    ratingCount: 30,
    imageUrl: "https://via.placeholder.com/300x180/009688/FFFFFF?Text=Finance",
  },
  {
    id: 12,
    category: "Personal Development",
    title: "Effective Communication Skills",
    lessons: 15,
    duration: "1 hr 45 min",
    price: 30.0,
    discount: 2.0,
    instructor: "Jessica White",
    rating: 4.5,
    ratingCount: 45,
    imageUrl:
      "https://via.placeholder.com/300x180/795548/FFFFFF?Text=PersonalDev",
  },
  {
    id: 13,
    category: "Personal Development13",
    title: "Effective Communication Skills",
    lessons: 15,
    duration: "1 hr 45 min",
    price: 30.0,
    discount: 2.0,
    instructor: "Jessica White",
    rating: 4.5,
    ratingCount: 45,
    imageUrl:
      "https://via.placeholder.com/300x180/795548/FFFFFF?Text=PersonalDev",
  },
];

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState(courseData);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let results = courseData;

    if (searchQuery) {
      results = results.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      results = results.filter(
        (course) => course.category === selectedCategory
      );
    }

    setFilteredCourses(results);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const displayedCourses = filteredCourses.slice(startIndex, endIndex);

  const onPageChange = (page) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const courseSection = document.getElementById("course-section");
      if (courseSection) {
        const offset = courseSection.offsetTop - 80;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
      setCurrentPage(page);
    }, 400);
  };

  const handleCourseClick = (id) => {
    scrollTop();
    navigate(`/course/${id}`);
  };

  const handleSearch = (value) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSearchQuery(value);
    }, 500);
  };

  const handleCategoryClick = (key) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const courseSection = document.getElementById("course-section");
      if (courseSection) {
        const offset = courseSection.offsetTop - 100;
        window.scrollTo({ top: offset, behavior: "smooth" });
      }
      setSelectedCategory(key);
      setSelectedCategory(key === "all" ? null : key);
    }, 500);
  };

  const categories = [
    "all",
    ...new Set(courseData.map((course) => course.category)),
  ];

  return (
    <>
      {(initialLoading || loading) && <LoadingOverlay />}

      {!initialLoading && (
        <>
          <section className="relative bg-gradient-to-br from-[#eef2f7] to-[#fefefe] py-40 overflow-hidden shadow-inner">
            <FaBookOpen className="absolute bottom-4 left-20 text-pink-300 text-8xl opacity-30 rotate-[-10deg] animate-float-slow" />
            <GiPlanetCore className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300 text-[150px] opacity-10 animate-spin-slow" />
            <HiOutlineLightBulb className="absolute top-6 right-40 text-yellow-300 text-7xl opacity-20 animate-pulse" />
            <RiSendPlaneLine className="absolute bottom-10 right-10 text-blue-300 text-7xl opacity-20 rotate-12 animate-fly-slow" />

            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight drop-shadow-sm font-heading tracking-tight">
                Featured Courses
              </h1>
              <p className="text-sm text-gray-500 mt-3">
                <span className="text-gray-400">Home</span> &gt; Featured
                Courses
              </p>
            </div>
          </section>
          <div id="course-section" className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
              <aside className="bg-white rounded-xl shadow p-6 h-fit sticky top-[100px]">
                <div className="mb-6">
                  <Search
                    placeholder="Search Courses"
                    onSearch={handleSearch}
                    enterButton={<SearchOutlined />}
                    className="w-full"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold mb-4">Categories</h2>
                  <Menu
                    mode="inline"
                    defaultSelectedKeys={["all"]}
                    className="border-none bg-transparent"
                    onClick={({ key }) => handleCategoryClick(key)}
                    selectedKeys={[selectedCategory || "all"]}
                  >
                    <Menu.Item key="all">
                      All Categories{" "}
                      <span className="text-gray-500">
                        ({courseData.length})
                      </span>
                    </Menu.Item>
                    {categories.slice(1).map((category) => (
                      <Menu.Item key={category} className="capitalize">
                        {category}{" "}
                        <span className="text-gray-500">
                          (
                          {
                            courseData.filter((c) => c.category === category)
                              .length
                          }
                          )
                        </span>
                      </Menu.Item>
                    ))}
                  </Menu>
                </div>
              </aside>

              <main className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {displayedCourses.map((course) => (
                  <Card
                    onClick={() => handleCourseClick(course.id)}
                    key={course.id}
                    className="rounded-xl overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
                    cover={
                      <img
                        onClick={() => handleCourseClick(course.id)}
                        alt={course.title}
                        src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
                        className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                      />
                    }
                    actions={[<HeartOutlined key="like" />]}
                  >
                    <div className="p-4">
                      <Tag color="processing" className="mb-2">
                        {course.category}
                      </Tag>
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <span>{course.lessons} Lessons</span>
                        <span className="mx-2">•</span>
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="text-lg font-bold text-indigo-600">
                            ${course.price.toFixed(2)}
                          </span>
                          {course.discount > 0 && (
                            <span className="line-through text-gray-500 ml-2">
                              ${course.discount.toFixed(2)}
                            </span>
                          )}
                          {course.discount === 0 && (
                            <span className="ml-2 text-green-500">Free</span>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <div className="w-7 h-7 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-white font-semibold">
                            {course.instructor.charAt(0).toUpperCase()}
                          </div>
                          <span>{course.instructor}</span>
                        </div>
                        <Rate
                          style={{ fontSize: "12px" }}
                          disabled
                          defaultValue={course.rating}
                          size="small"
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </main>

              <div className="lg:col-span-4 flex justify-center mt-12">
                <Pagination
                  current={currentPage}
                  total={filteredCourses.length}
                  pageSize={pageSize}
                  onChange={onPageChange}
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Courses;

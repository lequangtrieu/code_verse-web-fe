import React, { useEffect, useState } from "react";
import { Input, Menu, Card, Pagination, Rate, Tag } from "antd";
import { SearchOutlined, HeartOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import scrollTop from "../../../config/scrollTop";


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
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState(courseData);
  const navigate = useNavigate();

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
    setCurrentPage(page);
  };

  const handleCourseClick = (id) => {
    scrollTop();
    navigate(`/course/${id}`);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);
  };

  const handleCategoryClick = (key) => {
    setSelectedCategory(key === "all" ? null : key);
  };

  const categories = [
    "all",
    ...new Set(courseData.map((course) => course.category)),
  ];

  return (
    <div className="bg-gray-100 py-10">
      <div className="container mx-auto px-4 mb-8">
        <img
          src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
          alt="Top Banner"
          className="w-full rounded-md shadow-md max-h-80 object-cover"
        />
      </div>

      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="bg-white rounded-md shadow-md p-6 h-fit">
          <div className="mb-4">
            <Search
              placeholder="Search Products"
              onSearch={handleSearch}
              enterButton={<SearchOutlined />}
            />
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-2">Categories</h2>
            <Menu
              mode="inline"
              defaultSelectedKeys={["all"]}
              className="border-none"
              onClick={({ key }) => handleCategoryClick(key)}
              selectedKeys={[selectedCategory || "all"]}
            >
              <Menu.Item key="all">
                All Categories{" "}
                <span className="text-gray-500">({courseData.length})</span>
              </Menu.Item>
              {categories.slice(1).map((category) => (
                <Menu.Item key={category} className="capitalize">
                  {category}{" "}
                  <span className="text-gray-500">
                    (
                    {
                      courseData.filter(
                        (course) => course.category === category
                      ).length
                    }
                    )
                  </span>
                </Menu.Item>
              ))}
            </Menu>
          </div>
        </div>

        {/* Course Grid */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedCourses.map((course) => (
            <Card
              onClick={() => handleCourseClick(course.id)}
              key={course.id}
              className="rounded-md shadow-md overflow-hidden cursor-pointer transition-shadow duration-300 hover:shadow-lg"
              cover={
                <img
                  onClick={() => handleCourseClick(course.id)}
                  alt={course.title}
                  src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
                  className="w-full h-40 object-cover transition-transform duration-300 hover:scale-105"
                />
              }
              actions={[<HeartOutlined key="like" />]}
            >
              <div className="p-4">
                <Tag color="processing" className="mb-2">
                  {course.category}
                </Tag>
                <h3 className="text-md font-semibold mb-2 line-clamp-2">
                  {course.title}
                </h3>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <span>{course.lessons} Lessons</span>
                  <span className="ml-2">•</span>
                  <span className="ml-2">{course.duration}</span>
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
                    <div className="w-6 h-6 rounded-full bg-gray-300 mr-2 flex items-center justify-center">
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
        </div>

        {/* Pagination */}
        <div className="lg:col-span-4 flex justify-center mt-8">
          <Pagination
            current={currentPage}
            total={filteredCourses.length}
            pageSize={pageSize}
            onChange={onPageChange}
          />
        </div>
      </div>
    </div>
  );
};

export default Courses;

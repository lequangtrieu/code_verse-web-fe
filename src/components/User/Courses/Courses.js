import React, { useContext, useEffect, useState } from "react";
import {
  Button,
  Card,
  Carousel,
  Input,
  Menu,
  message,
  notification,
  Pagination,
  Popover,
  Rate,
  Tag,
} from "antd";
import { LeftOutlined, RightOutlined, SearchOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import scrollTop from "../../../config/scrollTop";
import { FaBookOpen } from "react-icons/fa";
import { GiPlanetCore } from "react-icons/gi";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiSendPlaneLine } from "react-icons/ri";
import LoadingOverlay from "../../../common/LoadingOverlay";
import axios from "axios";
import commonApi from "../../../common/api";
import { useDispatch, useSelector } from "react-redux";
import axiosInstance from "../../../config/axiosInstance";
import Context from "../../../config/context/context";
import "../Courses/Courses.css";
import { formatCurrency, getDiscountedPrice } from "../../../common/helper";
import { logoutUser } from "../../../config/store/userSlice";

const { Search } = Input;

const Courses = () => {
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(6);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartCourseIds, setCartCourseIds] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.user);
  const { fetchCartDetail, fetchCartItems } = useContext(Context);

  const formatDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const hrStr = hrs > 0 ? `${hrs} hr` : "";
    const minStr = mins > 0 ? `${mins} min` : "";
    return `${hrStr}${hrs && mins ? " " : ""}${minStr}`.trim();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseCourse = await axios.get(commonApi.course.url);
        const responseCategory = await axios.get(commonApi.category.url);

        const courses = responseCourse.data.result || [];
        const cats = responseCategory.data.result || [];

        setAllCourses(courses);
        setCategories(["all", ...new Set(cats.map((cat) => cat.name))]);
        setFilteredCourses(courses);
      } catch (error) {
        message.error("Failed to fetch courses or categories");
      } finally {
        setTimeout(() => {
          setInitialLoading(false);
        }, 450);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    let results = allCourses;

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
  }, [searchQuery, selectedCategory, allCourses]);

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

  const handleAddToCart = async (course) => {
    if (!user) {
      return notification.warning({
        message: "Login Required",
        description: "Please log in to add courses to your cart.",
        placement: "topLeft",
      });
    }

    const finalPrice = getDiscountedPrice(course.price, course.discount);
    if (finalPrice === 0) {
      return notification.info({
        message: "Free Course",
        description: `"${course.title}" is free and does not need to be added to the cart.`,
        placement: "bottomLeft",
      });
    }

    if (cartCourseIds.includes(course.id)) {
      return notification.info({
        message: "Course Already in Cart",
        description: `"${course.title}" is already in your cart.`,
        placement: "bottomLeft",
      });
    }

    try {
      const response = await axiosInstance.post(commonApi.addToCart.url, {
        username: user.username,
        courseId: course.id,
      });

      const result = response.data?.result;

      if (result === "Course already in cart") {
        notification.info({
          message: "Course Already in Cart",
          description: `"${course.title}" is already in your cart.`,
          placement: "bottomLeft",
        });
        setCartCourseIds((prev) => [...prev, course.id]);
      } else if (result === "You already own this course") {
        notification.warning({
          message: "Already Purchased",
          description: `You have already purchased "${course.title}".`,
          placement: "bottomLeft",
        });
      } else if (result === "Added to cart successfully") {
        notification.success({
          message: "Course Added Successfully",
          description: `"${course.title}" has been added to your cart.`,
          placement: "bottomLeft",
        });
        fetchCartDetail();
        fetchCartItems();
        setCartCourseIds((prev) => [...prev, course.id]);
      } else if (
        result === "This course is free and doesn't need to be added to cart"
      ) {
        notification.info({
          message: "Free Course",
          description: `"${course.title}" is free and doesn't need to be added to the cart.`,
          placement: "bottomLeft",
        });
      } else {
        notification.error({
          message: "Failed to Add Course",
          description:
            response.data?.message ||
            "Unable to add course to cart. Please try again.",
          placement: "bottomLeft",
        });
      }
    } catch (error) {
      notification.error({
        message: "Error Adding Course",
        description: error?.response?.data?.message,
        placement: "bottomLeft",
      });

      if (error?.response?.data?.code === 1010) {
        dispatch(logoutUser());
        navigate("/");
      }
    }
  };

  const handleAddToCartFree = async (course) => {
    if (!user) {
      return notification.warning({
        message: "Login Required",
        description: "Please log in to add courses to your cart.",
        placement: "topLeft",
      });
    }

    try {
      await axiosInstance.post(commonApi.addToCartFree.url, {
        username: user.username,
        courseId: course.id,
      });

      notification.success({
        message: "Enrollment Successful",
        description: `You have successfully enrolled in "${course.title}". Enjoy learning!`,
        placement: "bottomLeft",
      });
    } catch (error) {
      notification.error({
        message: "Enrollment Failed",
        description: error?.response?.data?.message,
        placement: "bottomLeft",
      });

      if (error?.response?.data?.code === 1010) {
        dispatch(logoutUser());
        navigate("/");
      }
    }
  };

  const carouselItems = [
    {
      title: "Welcome to CodeVerse",
      subtitle: "Your Learning Journey Starts Here",
      description:
        "Discover a world of programming knowledge with our comprehensive courses. Whether you're a beginner or an experienced developer, we have the perfect learning path for you.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/codeverse-7830f.firebasestorage.app/o/images%2Fa53129ba-4965-4353-8bd2-6e917bdc9d3a_tutien.png?alt=media",
      buttonText: "Explore Courses",
      buttonLink: "/courses",
    },
    {
      title: "Learn from Industry Experts",
      subtitle: "Hands-on Learning Experience",
      description:
        "Our courses are designed and taught by industry professionals. Get practical, real-world experience through our project-based learning approach.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/codeverse-7830f.firebasestorage.app/o/images%2Fa53129ba-4965-4353-8bd2-6e917bdc9d3a_tutien.png?alt=media",
      buttonText: "View Instructors",
      buttonLink: "/instructors",
    },
    {
      title: "Join Our Community",
      subtitle: "Connect with Fellow Learners",
      description:
        "Become part of our growing community of developers. Share knowledge, collaborate on projects, and grow together in your coding journey.",
      image:
        "https://firebasestorage.googleapis.com/v0/b/codeverse-7830f.firebasestorage.app/o/images%2Fa53129ba-4965-4353-8bd2-6e917bdc9d3a_tutien.png?alt=media",
      buttonText: "Join Community",
      buttonLink: "/community",
    },
  ];

  const onChange = (currentSlide) => {
    // console.log(currentSlide);
  };

  const renderCoursePopover = (course) => {
    const isFree = getDiscountedPrice(course.price, course.discount) === 0;

    return (
      <div className="w-80">
        <Tag color="processing" className="mb-1">
          {course.category}
        </Tag>

        <h3 className="text-base font-bold text-gray-800 mb-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-600 mb-3 line-clamp-4">
          {course.description}
        </p>

        <div className="flex items-center justify-evenly text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <span className="font-medium">{course.totalLessons}</span>
            <span className="text-gray-500">Lessons</span>
          </div>
          <div className="w-px h-4 bg-gray-300 mx-2"></div>
          <div className="flex items-center gap-1">
            <span className="font-medium">
              {formatDuration(course.totalDurations)}
            </span>
          </div>
          <div className="w-px h-4 bg-gray-300 mx-2"></div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{course.totalStudents || 0}</span>
            <span className="text-gray-500">Students</span>
          </div>
        </div>

        <ul className="text-sm text-gray-700 list-inside list-disc mb-4 space-y-1">
          <li>Get familiar with Scratch</li>
          <li>Master basic programming thinking</li>
          <li>Create simple and fun projects</li>
          <li>Develop logical thinking and confidence</li>
        </ul>

        {isFree ? (
          <Button
            type="primary"
            size="small"
            block
            onClick={() => handleAddToCartFree(course)}
          >
            Free Enrollment
          </Button>
        ) : (
          <div className="flex justify-between">
            <Button
              size="small"
              type="primary"
              className="text-white hover:bg-gray-800"
              onClick={() => handleAddToCart(course)}
            >
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {(initialLoading || loading) && <LoadingOverlay />}

      {!initialLoading && (
        <>
          <section className="slider_section">
            <FaBookOpen className="absolute bottom-4 left-20 text-pink-300 text-8xl opacity-30 rotate-[-10deg] animate-float-slow" />
            <GiPlanetCore className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300 text-[150px] opacity-10 animate-spin-slow" />
            <HiOutlineLightBulb className="absolute top-6 right-40 text-yellow-300 text-7xl opacity-20 animate-pulse" />
            <RiSendPlaneLine className="absolute bottom-10 right-10 text-blue-300 text-7xl opacity-20 rotate-12 animate-fly-slow" />
            <div className="slider_container">
              <Carousel
                autoplay={{ dotDuration: true }}
                autoplaySpeed={5000}
                effect="fade"
                arrows={true}
                prevArrow={<LeftOutlined />}
                nextArrow={<RightOutlined />}
                afterChange={onChange}
                className="custom-carousel"
              >
                {carouselItems.map((item, index) => (
                  <div key={index} className="carousel-item">
                    <div className="container-fluid">
                      <div className="row">
                        <div className="col-md-7">
                          <div className="detail-box">
                            <h1>
                              {item.title}
                              <br />
                              <span className="text-2xl font-normal">
                                {item.subtitle}
                              </span>
                            </h1>
                            <p className="text-gray-600">{item.description}</p>
                            <a
                              href={item.buttonLink}
                              className="mt-4 inline-block"
                              onClick={(e) => {
                                e.preventDefault();
                                navigate(item.buttonLink);
                              }}
                            >
                              {item.buttonText}
                            </a>
                          </div>
                        </div>
                        <div className="col-md-5">
                          <div className="img-box">
                            <img
                              src={item.image}
                              alt={item.title}
                              className="w-full h-auto rounded-lg shadow-lg"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
          </section>

          <div id="course-section" className="bg-gray-50 py-16">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-4 gap-10">
              <aside className="bg-white rounded-xl shadow p-6 h-fit sticky top-[100px] transition-all duration-300 hover:shadow-lg">
                <div className="mb-6">
                  <Search
                    placeholder="Search Courses"
                    onSearch={handleSearch}
                    enterButton={<SearchOutlined />}
                    className="w-full transition-all duration-300 hover:shadow-md"
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
                    <Menu.Item
                      key="all"
                      className="transition-all duration-300 hover:bg-gray-100"
                    >
                      All Categories{" "}
                      <span className="text-gray-500">
                        ({allCourses.length})
                      </span>
                    </Menu.Item>
                    {categories.slice(1).map((category) => (
                      <Menu.Item
                        key={category}
                        className="capitalize transition-all duration-300 hover:bg-gray-100"
                      >
                        {category}{" "}
                        <span className="text-gray-500">
                          (
                          {
                            allCourses.filter((c) => c.category === category)
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
                  <Popover
                    content={renderCoursePopover(course)}
                    placement="rightTop"
                    trigger="hover"
                  >
                    <Card
                      onClick={() => handleCourseClick(course.id)}
                      key={course.id}
                      className="rounded-xl overflow-hidden shadow hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1"
                      cover={
                        <img
                          onClick={() => handleCourseClick(course.id)}
                          alt={course.title}
                          src={course.thumbnailUrl}
                          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300"
                        />
                      }
                    >
                      <div className="p-4">
                        <Tag
                          color="processing"
                          className="mb-2 transition-all duration-300 hover:opacity-80"
                        >
                          {course.category}
                        </Tag>

                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 hover:text-indigo-600 transition-colors duration-300">
                          {course.title}
                        </h3>

                        <div className="flex items-center text-sm text-gray-600 mb-2">
                          <span>{course.totalLessons} Lessons</span>
                          <span className="mx-2">•</span>
                          <span>{formatDuration(course.totalDurations)}</span>
                        </div>

                        <div className="flex items-center justify-between mb-2">
                          <div>
                            {getDiscountedPrice(
                              course.price,
                              course.discount
                            ) === 0 ? (
                              <span className="text-green-600 font-semibold">
                                Free
                              </span>
                            ) : (
                              <>
                                <span className="text-lg font-bold text-indigo-600 transition-colors duration-300">
                                  {formatCurrency(
                                    getDiscountedPrice(
                                      course.price,
                                      course.discount
                                    )
                                  )}
                                </span>
                                {course.discount > 0 && course.price > 0 && (
                                  <span className="line-through text-gray-500 ml-2">
                                    {formatCurrency(course.price)}
                                  </span>
                                )}
                              </>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center">
                            <div className="w-7 h-7 rounded-full bg-gray-300 mr-2 flex items-center justify-center text-white font-semibold transition-all duration-300 hover:bg-indigo-500">
                              {course.instructor?.charAt(0)?.toUpperCase() ||
                                "?"}
                            </div>
                            <span className="hover:text-indigo-600 transition-colors duration-300">
                              {course.instructor || "Unknown"}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 my-2 pl-1">
                          <span className="font-semibold text-gray-900">
                            {course.rating}
                          </span>
                          <Rate
                            style={{
                              fontSize: "14px",
                              color: "#f4b400",
                              padding: "2px 4px",
                            }}
                            disabled
                            defaultValue={course.rating}
                            allowHalf
                          />
                          <span className="text-s text-gray-500">
                            ({course.ratingCount})
                          </span>
                        </div>
                      </div>
                    </Card>
                  </Popover>
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

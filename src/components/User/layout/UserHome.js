import { Carousel, Avatar, Tabs, Button, Popover, notification } from "antd";
import ReusableProgress from "../layout/ReusableProgress";
import React, { useContext, useEffect, useState } from "react";
import { Card, Pagination, Rate, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import scrollTop from "../../../config/scrollTop";
import LoadingOverlay from "../../../common/LoadingOverlay";
import { useDispatch, useSelector } from "react-redux";
import commonApi from "../../../common/api";
import SkillCard from "./Molecule/SkillCard";
import ActivityGrid from "./Molecule/ActivityGrid";
import { formatCurrency, getDiscountedPrice } from "../../../common/helper";
import Context from "../../../config/context/context";
import axiosInstance from "../../../config/axiosInstance";
import { logoutUser } from "../../../config/store/userSlice";

const SKILL_META = {
  C: { iconSrc: "/icons/c.png", name: "C" },
  "C++": { iconSrc: "/icons/cpp.png", name: "C++" },
  JavaScript: { iconSrc: "/icons/javascript.png", name: "JavaScript" },
  Python2: { iconSrc: "/icons/python.jpg", name: "Python2" },
  Python3: { iconSrc: "/icons/python.jpg", name: "Python3" },
  Java: { iconSrc: "/icons/java.png", name: "Java" },
  Go: { iconSrc: "/icons/go.png", name: "Go" },
  MySql: { iconSrc: "/icons/mysql.jpg", name: "MySql" },
  "C#": { iconSrc: "/icons/csharp.png", name: "C#" },
  Html: { iconSrc: "/icons/html.png", name: "Html" },
  Postgresql: { iconSrc: "/icons/postgresql.jpg", name: "Postgresql" },
};

const skillRatings = {
  C: 5,
  "C++": 1,
  JavaScript: 1,
  Python2: 1,
  Python3: 1,
  Java: 5,
  Go: 1,
  MySql: 1,
  "C#": 0,
  Html: 1,
  Postgresql: 1,
};

const activityData = [
  { date: "2025-05-01", level: 2 },
  { date: "2025-05-02", level: 4 },
  { date: "2025-05-08", level: 1 },
];

const userInfo = {
  email: "tientnmde170657@fpt.edu.vn",
  avatar: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
  courseProgress: "562/801",
  certificates: "2",
  achievements: [
    "https://i.pinimg.com/736x/7a/3d/11/7a3d11956b3814d4f90df0ea28ebf07d.jpg",
    "https://i.pinimg.com/736x/7a/3d/11/7a3d11956b3814d4f90df0ea28ebf07d.jpg",
    "https://i.pinimg.com/736x/7a/3d/11/7a3d11956b3814d4f90df0ea28ebf07d.jpg",
    "https://i.pinimg.com/736x/7a/3d/11/7a3d11956b3814d4f90df0ea28ebf07d.jpg",
    "https://i.pinimg.com/736x/7a/3d/11/7a3d11956b3814d4f90df0ea28ebf07d.jpg",
    "https://i.pinimg.com/736x/7a/3d/11/7a3d11956b3814d4f90df0ea28ebf07d.jpg",
    "https://i.pinimg.com/736x/7a/3d/11/7a3d11956b3814d4f90df0ea28ebf07d.jpg",
    "https://i.pinimg.com/736x/7a/3d/11/7a3d11956b3814d4f90df0ea28ebf07d.jpg",
  ],
};
const banners = [
  { id: 1, image: "banerDemo.png", link: "https://example.com/page1" },
  { id: 2, image: "banerDemo.png", link: "https://example.com/page2" },
  { id: 3, image: "banerDemo.png", link: "https://example.com/page3" },
];
const completedLessons = 562;
const totalLessons = 801;

const UserHome = () => {
  const [cartCourseIds, setCartCourseIds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [searchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [allCourses, setAllCourses] = useState({}); // Store data for all tabs here
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("learning");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state?.user?.user);
  const { fetchCartDetail, fetchCartItems } = useContext(Context);
  const userId = user?.id;

  // Fetch data for all tabs at once
  const fetchCourses = async () => {
    if (!userId) return;

    setLoading(true);
    try {
      // Fetch data for all tabs
      const responses = await Promise.all([
        fetch(`${commonApi.course.url}/user/${userId}/in-progress`),
        fetch(`${commonApi.course.url}/user/${userId}/completed`),
        fetch(`${commonApi.course.url}/user/${userId}/suggested`),
      ]);

      const data = await Promise.all(responses.map((res) => res.json()));

      setAllCourses({
        learning: data[0],
        completed: data[1],
        suggested: data[2],
      });

      setFilteredCourses(data[0]); // Initially display 'learning' tab data
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
      setInitialLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses(); // Fetch all data on initial load
  }, [userId]);

  useEffect(() => {
    const updatePageSize = () => {
      if (window.innerWidth >= 1280) {
        setPageSize(8);
      } else if (window.innerWidth >= 1024) {
        setPageSize(6);
      } else {
        setPageSize(4);
      }
    };

    updatePageSize(); // Set lúc load trang
    window.addEventListener("resize", updatePageSize); // Update khi resize

    return () => window.removeEventListener("resize", updatePageSize);
  }, []);

  useEffect(() => {
    let results = allCourses[selectedTab] || [];

    if (searchQuery) {
      results = results.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredCourses(results);
    setCurrentPage(1);
  }, [searchQuery, selectedTab, allCourses]);

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

  const handleTabChange = (key) => {
    setSelectedTab(key);
    setFilteredCourses(allCourses[key]); // Set courses for selected tab directly
  };

  const formatDuration = (minutes) => {
    const hrs = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const hrStr = hrs > 0 ? `${hrs} hr` : "";
    const minStr = mins > 0 ? `${mins} min` : "";
    return `${hrStr}${hrs && mins ? " " : ""}${minStr}`.trim();
  };

  const handleAddToCart = async (course) => {
    if (!user) {
      return notification.warning({
        message: "Login Required",
        description: "Please log in to view this page.",
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

            const responses = await Promise.all([
        fetch(`${commonApi.course.url}/user/${userId}/in-progress`),
        fetch(`${commonApi.course.url}/user/${userId}/completed`),
        fetch(`${commonApi.course.url}/user/${userId}/suggested`),
      ]);

      const data = await Promise.all(responses.map((res) => res.json()));

      setAllCourses({
        learning: data[0],
        completed: data[1],
        suggested: data[2],
      });

      setFilteredCourses(data[0]);

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

  const renderCoursePopover = (course, selectedTab) => {
    const isFree = getDiscountedPrice(course.price, course.discount) === 0;

    if (selectedTab === "learning") {
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

          <Button
            type="primary"
            size="small"
            block
            onClick={() => handleStartLearning(course.id)}
          >
            Start Learning Now
          </Button>
        </div>
      );
    }

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
          <Button
            size="small"
            type="primary"
            className="text-white hover:bg-gray-800"
            onClick={() => handleAddToCart(course)}
          >
            Add to Cart
          </Button>
        )}
      </div>
    );
  };

  const handleStartLearning = async (courseId) => {
    if (!user) {
      return notification.warning({
        message: "Login Required",
        description: "Please log in to add courses to your cart.",
        placement: "topLeft",
      });
    }
    scrollTop();
    navigate(`/course/${courseId}/learn`);
  };

  return (
    <div className="bg-white text-[#3b3c54] justify-items-center">
      {/*User Infor Area */}
      <section className="bg-[#1b2559] p-8 w-full justify-items-center">
        <div className="bg-[#1b2559] text-white max-w-7xl w-full">
          {/* Meeting */}
          <div className="mb-4 text-lg">
            <span>Hello </span>
            <span className="text-red-500">{userInfo.email}</span>
            <span>
              . Welcome you to CodeVerse. Let's start to explore more!
            </span>
          </div>

          {/*User Infor */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* UserName Infor */}
            <div className="bg-[#2c3667] p-6 rounded-lg w-full lg:w-2/5 text-center  lg:h-[220px]">
              {/* avatar + username */}
              <div className="flex items-center gap-6 pb-6">
                <div>
                  <Avatar
                    size={80}
                    src={userInfo.avatar || "https://via.placeholder.com/80"}
                    className="border-2 border-yellow-400"
                  />
                </div>
                <div className="text-xl truncate">{userInfo.email}</div>
              </div>

              {/* Progress bar */}
              <ReusableProgress
                completed={completedLessons}
                total={totalLessons}
                showInfo={true}
              />
            </div>

            {/* Các chỉ số */}
            <div className=" w-full">
              <div className="grid lg:gap-5 gap-3 grid-cols-3 max-w-full overflow-hidden">
                {/* Khóa học */}
                <div>
                  <h4 className="my-0 font-semibold text-[13px] lg:text-base">
                    Course
                  </h4>
                  <div className="flex gap-5 justify-between items-baseline">
                    <div className="lg:text-[32px] font-semibold text-yellow-300">
                      4/39
                    </div>
                    <div className="text-sm mt-1">
                      {userInfo.certificates} certificates
                    </div>
                  </div>

                  <ReusableProgress
                    completed={completedLessons}
                    total={totalLessons}
                    size={[, 8]}
                  />
                </div>

                {/* Luyện tập */}
                <div>
                  <h4 className="my-0 font-semibold text-[13px] lg:text-base">
                    Training
                  </h4>
                  <div className="lg:text-[32px] font-semibold text-yellow-300">
                    0/1445
                  </div>
                  <ReusableProgress
                    completed={completedLessons}
                    total={totalLessons}
                    size={[, 8]}
                  />
                </div>

                {/* Thứ hạng */}
                <div>
                  <h4 className="my-0 font-semibold text-[13px] lg:text-base">
                    Your best position
                  </h4>
                  <div className="flex gap-3 items-baseline">
                    <div className="lg:text-[32px] font-semibold text-yellow-300">
                      0/0
                    </div>
                    <div class="lg:text-base text-[10px]">fights</div>
                  </div>

                  <ReusableProgress
                    completed={completedLessons}
                    total={totalLessons}
                    size={[, 8]}
                  />
                </div>
              </div>
              {/* Thành tích */}
              <div className=" mx-auto mt-8">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-semibold">Your badges</div>
                </div>
                <div className="flex items-center mt-4 gap-4 overflow-x-auto">
                  {userInfo.achievements.map((badge, index) => (
                    <img
                      key={index}
                      src={badge}
                      alt="badge"
                      className="w-12 h-12 object-cover rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="p-8 text-center max-w-7xl w-full">
        <Carousel autoplay dots>
          {banners.map((banner) => (
            <div key={banner.id}>
              <a href={banner.link} target="_blank" rel="noopener noreferrer">
                <img
                  src={banner.image}
                  alt={`Banner ${banner.id}`}
                  className="h-80 object-cover rounded-lg shadow-lg"
                  style={{ width: "-webkit-fill-available" }}
                />
              </a>
            </div>
          ))}
        </Carousel>
      </section>

      {/* List course of user */}
      <section className="p-8 w-full max-w-7xl">
        {(initialLoading || loading) && <LoadingOverlay />}

        {!initialLoading && (
          <>
            <div id="course-section" className="flex justify-center">
              <div className="max-w-[1440px] w-full">
                <div className="flex gap-5 justify-between mt-2 flex-wrap">
                  <Tabs
                    defaultActiveKey="learning"
                    onChange={handleTabChange}
                    activeKey={selectedTab} // Ensure selected tab persists on change
                  >
                    <Tabs.TabPane tab="Suggested courses" key="suggested" />
                    <Tabs.TabPane tab="In progress" key="learning" />
                    <Tabs.TabPane tab="Completed" key="completed" />
                  </Tabs>
                  <a className="leading-[46px]" href="/course">
                    See all
                  </a>
                </div>

                <div>
                  {filteredCourses.length === 0 ? (
                    <div className="text-center py-6 text-gray-600">
                      <h3>No courses available for this choice.</h3>
                    </div>
                  ) : (
                    <main className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
                      {(() => {
                        let filledCourses = [...displayedCourses];

                        let columns = 1;
                        if (window.innerWidth >= 1280) {
                          columns = 4;
                        } else if (window.innerWidth >= 1024) {
                          columns = 3;
                        } else if (window.innerWidth >= 768) {
                          columns = 2;
                        } else {
                          columns = 1;
                        }

                        const totalCourses = filteredCourses.length;
                        const totalPages = Math.ceil(totalCourses / pageSize);

                        const isLastPage = currentPage === totalPages;

                        if (isLastPage) {
                          const remainder = filledCourses.length % columns;
                          const placeholdersNeeded =
                            remainder === 0 ? 0 : columns - remainder;

                          for (let i = 0; i < placeholdersNeeded; i++) {
                            filledCourses.push({
                              placeholder: true,
                              id: `placeholder-${i}`,
                            });
                          }
                        }

                        return filledCourses.map((course) =>
                          course.placeholder ? (
                            <div
                              key={course.id}
                              className="rounded-xl overflow-hidden bg-gray-100 flex items-center justify-center"
                            >
                              <img
                                src="imgPlaceholderCousre.png"
                                alt="Placeholder"
                                className="w-full object-cover opacity-50"
                              />
                            </div>
                          ) : (
                            <Popover
                              key={course.id}
                              content={renderCoursePopover(course, selectedTab)}
                              placement="rightTop"
                              trigger="hover"
                            >
                              <Card
                                onClick={() => handleCourseClick(course.id)}
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
                                    <span>
                                      {formatDuration(course.totalDurations)}
                                    </span>
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
                                          {course.discount > 0 &&
                                            course.price > 0 && (
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
                                        {course.instructor
                                          ?.charAt(0)
                                          ?.toUpperCase() || "?"}
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
                          )
                        );
                      })()}
                    </main>
                  )}
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
            </div>
          </>
        )}
      </section>
      <section className="p-8 max-w-7xl w-full flex flex-wrap gap-10">
        <div className="bg-[#f3f4f6] p-4 rounded-xl flex-1">
          <h2 className="text-xl font-bold text-[#2f2fce] mb-4">Your skills</h2>
          <div className="flex flex-wrap gap-y-4 gap-x-8">
            {Object.entries(skillRatings).map(([key, level]) => {
              const { iconSrc, name } = SKILL_META[key];
              return (
                <SkillCard
                  key={key}
                  iconSrc={iconSrc}
                  name={name}
                  level={level}
                />
              );
            })}
          </div>
        </div>
        <ActivityGrid activityData={activityData} />
      </section>
    </div>
  );
};

export default UserHome;

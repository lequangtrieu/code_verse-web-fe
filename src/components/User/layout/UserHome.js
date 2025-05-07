import { Carousel, Avatar, Tabs } from "antd";
import ReusableProgress from "../layout/ReusableProgress"
import React, { useEffect, useState } from "react";
import { Card, Pagination, Rate, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import scrollTop from "../../../config/scrollTop";
import LoadingOverlay from "../../../common/LoadingOverlay";

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
    "https://i.pinimg.com/736x/7a/3d/11/7a3d11956b3814d4f90df0ea28ebf07d.jpg"
  ],
};

const banners = [
  { id: 1, image: 'banerDemo.png', link: 'https://example.com/page1' },
  { id: 2, image: 'banerDemo.png', link: 'https://example.com/page2' },
  { id: 3, image: 'banerDemo.png', link: 'https://example.com/page3' },
];

const completedLessons = 562;
const totalLessons = 801;

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
    status: "learning",
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
    status: "completed",
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
    status: "learning",
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
    status: "completed",
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
    status: "learning",
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
    status: "learning",
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
    status: "completed",
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
    status: "completed",
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
    status: "learning",
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
    status: "completed",
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
    status: "learning",
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
    status: "completed",
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
    status: "learning",
  },
  {
    id: 14,
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
    status: null,
  },
  {
    id: 15,
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
    status: "completed",
  },
  {
    id: 16,
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
    status: "learning",
  },
  {
    id: 17,
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
    status: null,
  },
  {
    id: 18,
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
    status: "learning",
  },
  {
    id: 19,
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
    status: "completed",
  },
  {
    id: 20,
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
    status: "learning",
  },
  {
    id: 21,
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
    status: "completed",
  },
  {
    id: 24,
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
    status: "completed",
  },
  {
    id: 25,
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
    status: "completed",
  },
  {
    id: 26,
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
    status: "learning",
  },
  {
    id: 27,
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
    status: "completed",
  },
  {
    id: 28,
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
    status: null,
  },
  {
    id: 29,
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
    status: "completed",
  },
];

const UserHome = () => {
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(8);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCourses, setFilteredCourses] = useState(courseData);
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState("learning");
  const navigate = useNavigate();

  // Update pageSize theo màn hình
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
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let results = courseData;

    // Apply search query filter
    if (searchQuery) {
      results = results.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter courses based on selected tab
    if (selectedTab === "learning" || selectedTab === "completed") {
      results = results.filter((course) => course.status === selectedTab);
    } else if (selectedTab === "suggested") {
      results = results.filter((course) => course.status === null);
    }

    setFilteredCourses(results);
    setCurrentPage(1);
  }, [searchQuery, selectedTab]);
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
            <span>. Welcome you to CodeVerse. Let's start to explore more!</span>
          </div>

          {/*User Infor */}
          <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* UserName Infor */}
            <div className="bg-[#2c3667] p-6 rounded-lg w-full lg:w-2/5 text-center  lg:h-[220px]">
              {/* avatar + username */}
              <div className="flex items-center gap-6 pb-6" >
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
                  <h4 className="my-0 font-semibold text-[13px] lg:text-base">Course</h4>
                  <div className="flex gap-5 justify-between items-baseline">
                    <div className="lg:text-[32px] font-semibold text-yellow-300">4/39</div>
                    <div className="text-sm mt-1">{userInfo.certificates} certificates</div>
                  </div>

                  <ReusableProgress
                    completed={completedLessons}
                    total={totalLessons}
                    size={[, 8]}
                  />
                </div>

                {/* Luyện tập */}
                <div>
                  <h4 className="my-0 font-semibold text-[13px] lg:text-base">Training</h4>
                  <div className="lg:text-[32px] font-semibold text-yellow-300">0/1445</div>
                  <ReusableProgress
                    completed={completedLessons}
                    total={totalLessons}
                    size={[, 8]}
                  />
                </div>

                {/* Thứ hạng */}
                <div>
                  <h4 className="my-0 font-semibold text-[13px] lg:text-base">Your best position</h4>
                  <div className="flex gap-3 items-baseline">
                    <div className="lg:text-[32px] font-semibold text-yellow-300">0/0</div>
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
                  <Tabs defaultActiveKey="learning" onChange={handleTabChange}>
                    <Tabs.TabPane tab="Suggested courses" key="suggested" />
                    <Tabs.TabPane tab="In progress" key="learning" />
                    <Tabs.TabPane tab="Completed" key="completed" />
                  </Tabs>
                  <a className="leading-[46px]" href="/course">See all</a>
                </div>


                <div >
                  <main className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-6">
                    {(() => {
                      let filledCourses = [...displayedCourses];

                      // Determine number of columns based on window width
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
                        const placeholdersNeeded = remainder === 0 ? 0 : columns - remainder;

                        for (let i = 0; i < placeholdersNeeded; i++) {
                          filledCourses.push({ placeholder: true, id: `placeholder-${i}` });
                        }
                      }

                      return filledCourses.map((course) => (
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
                                    {course.price.toFixed(2)} đ
                                  </span>
                                  {course.discount > 0 && (
                                    <span className="line-through text-gray-500 ml-2">
                                      {course.discount.toFixed(2)} đ
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
                        )
                      ));
                    })()}
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
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default UserHome;

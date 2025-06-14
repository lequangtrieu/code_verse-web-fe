import {
  FaLock,
  FaPlay,
  FaPlayCircle,
  FaStar,
  FaBookOpen,
} from "react-icons/fa";
import { BsFileEarmarkText } from "react-icons/bs";
import { Collapse, Tabs, Carousel, Rate } from "antd";
import { HiOutlineLightBulb } from "react-icons/hi";
import { RiSendPlaneLine } from "react-icons/ri";
import { GiPlanetCore } from "react-icons/gi";
import { useEffect, useState } from "react";
import LoadingOverlay from "../../../common/LoadingOverlay";

const { Panel } = Collapse;

const { TabPane } = Tabs;

const CourseDetail = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => {
      setInitialLoading(false);
    }, 450);

    return () => clearTimeout(timer);
  }, []);

  const curriculumData = [
    {
      title: "Intro Course content",
      duration: "02hr 35min",
      items: ["Lesson 01", "Lesson 02"],
    },
    {
      title: "Course Conclusion",
      duration: "02hr 10min",
      items: [
        {
          type: "video",
          title: "Lorem ipsum dolor sit amet",
          duration: "26 min",
        },
        { type: "quiz", title: "Lesson 03 Exam", questionCount: 20 },
      ],
    },
    {
      title: "Course Fundamentals",
      duration: "01hr 35min",
      items: ["Lesson 01", "Lesson 02"],
    },
  ];

  const popularCourses = [
    {
      img: "/images/popular-1.jpg",
      title: "Making Music with Other People",
      price: "$32.00",
    },
    {
      img: "/images/popular-2.jpg",
      title: "Making Music with Other People",
      price: "$32.00",
    },
    {
      img: "/images/popular-3.jpg",
      title: "Making Music with Other People",
      price: "$32.00",
    },
  ];

  const reviewsData = [
    {
      username: "John Doe",
      userAvatar: "https://via.placeholder.com/150",
      rating: 5,
      comment:
        "This course is amazing! Learned a lot about software development.",
    },
    {
      username: "Jane Smith",
      userAvatar: "https://via.placeholder.com/150",
      rating: 4,
      comment: "Great course, but I wish there were more examples.",
    },
    {
      username: "Alice Brown",
      userAvatar: "https://via.placeholder.com/150",
      rating: 4,
      comment: "Good content but the course could be a bit faster.",
    },
    {
      username: "Bob White",
      userAvatar: "https://via.placeholder.com/150",
      rating: 3,
      comment: "The course was helpful, but the explanations were too brief.",
    },
  ];

  const authorCourses = [
    {
      title: "Introduction to Programming",
      image: "https://via.placeholder.com/200x150",
      price: "$20.00",
    },
    {
      title: "Advanced JavaScript",
      image: "https://via.placeholder.com/200x150",
      price: "$30.00",
    },
    {
      title: "React for Beginners",
      image: "https://via.placeholder.com/200x150",
      price: "$25.00",
    },
    {
      title: "Node.js and Express",
      image: "https://via.placeholder.com/200x150",
      price: "$35.00",
    },
  ];
  return (
    <>
      {initialLoading ? (
        <LoadingOverlay />
      ) : (
        <>
          <section className="relative bg-gradient-to-br from-[#eef2f7] to-[#fefefe] py-40 overflow-hidden shadow-inner">
            <FaBookOpen className="absolute bottom-4 left-20 text-pink-300 text-8xl opacity-30 rotate-[-10deg] animate-float-slow" />
            <GiPlanetCore className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-purple-300 text-[150px] opacity-10 animate-spin-slow" />
            <HiOutlineLightBulb className="absolute top-6 right-40 text-yellow-300 text-7xl opacity-20 animate-pulse" />
            <RiSendPlaneLine className="absolute bottom-10 right-10 text-blue-300 text-7xl opacity-20 rotate-12 animate-fly-slow" />
            <div className="relative z-10 text-center max-w-2xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 leading-tight drop-shadow-sm font-heading tracking-tight">
                Course Details
              </h1>
              <p className="text-sm text-gray-500 mt-3">
                <span className="text-gray-400">Home</span> &gt; Course Details
              </p>
            </div>
          </section>
          <section className="bg-white py-10 text-black">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
              <div className="lg:col-span-2">
                <img
                  src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
                  alt="Course Banner"
                  className="rounded-xl w-full object-cover h-96"
                />

                <div className="mt-5 flex items-center gap-2 text-sm">
                  <span className="bg-purple-600 text-white px-2 py-1 rounded">
                    Featured
                  </span>
                  <span className="bg-pink-600 text-white px-2 py-1 rounded">
                    Art & Design
                  </span>
                  <span className="ml-auto text-xs text-gray-400">
                    Last Update: Sep 29, 2024
                  </span>
                </div>

                <h2 className="mt-4 text-2xl font-bold">
                  Foundation course to understand about software
                </h2>

                <div className="flex items-center gap-4 mt-2">
                  <span className="text-purple-600 font-bold text-xl">
                    $32.00
                  </span>
                  <span className="line-through text-gray-400 text-sm">
                    $68.00
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <BsFileEarmarkText className="text-purple-600" />
                    23 Lessons
                  </span>
                  <div className="flex items-center text-yellow-400 text-sm">
                    <FaStar /> <FaStar /> <FaStar /> <FaStar />
                    <FaStar /> <span className="text-gray-500 ml-1">(44)</span>
                  </div>
                </div>

                <p className="mt-4 text-gray-600">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Curabitur vulputate vestibulum rhoncus, dolor eget viverra
                  pretium, dolor tellus aliquet nunc.
                </p>

                <div className="mt-6 border border-gray-200 rounded-xl p-6 text-sm grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-gray-400">Instructor:</p>
                    <p className="font-medium">Micle Jhon</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Course level:</p>
                    <p className="font-medium">Intermediate</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Lectures:</p>
                    <p className="font-medium">120 sub</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Language:</p>
                    <p className="font-medium">English spanish</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Duration:</p>
                    <p className="font-medium">20h 41m 32s</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Price Discount:</p>
                    <p className="font-medium">-20%</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Enrolled:</p>
                    <p className="font-medium">2 students</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Regular Price:</p>
                    <p className="font-medium">$228/Mo</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Total:</p>
                    <p className="font-medium">222 students</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Course Status:</p>
                    <p className="font-medium">Available</p>
                  </div>
                </div>

                <Tabs defaultActiveKey="curriculum" className="mt-10">
                  <TabPane tab="Curriculum" key="curriculum">
                    <Collapse accordion className="mt-4">
                      {curriculumData.map((section, index) => (
                        <Panel
                          header={
                            <div className="flex justify-between font-semibold">
                              <span>{section.title}</span>
                              <span className="text-xs text-gray-400">
                                {section.duration}
                              </span>
                            </div>
                          }
                          key={index}
                        >
                          {section.items.map((item, idx) =>
                            typeof item === "string" ? (
                              <p
                                key={idx}
                                className="text-gray-600 mb-2 flex items-center gap-2"
                              >
                                <BsFileEarmarkText className="text-purple-600" />
                                {item}
                              </p>
                            ) : (
                              <div
                                key={idx}
                                className="flex items-center justify-between border-b py-2"
                              >
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  {item.type === "video" ? (
                                    <FaPlayCircle />
                                  ) : (
                                    <FaLock />
                                  )}
                                  <span>
                                    {item.type === "video"
                                      ? "Video: "
                                      : "Lesson: "}
                                    {item.title}
                                  </span>
                                </div>
                                <div className="text-xs text-gray-400">
                                  {item.duration
                                    ? item.duration
                                    : `${item.questionCount} Ques`}
                                </div>
                              </div>
                            )
                          )}
                        </Panel>
                      ))}
                    </Collapse>
                  </TabPane>

                  <TabPane tab="Description" key="description">
                    <div className="mt-6 text-gray-600">
                      This is a detailed description of the course.
                    </div>
                  </TabPane>
                  <TabPane tab="Reviews" key="reviews">
                    <div className="mt-6 text-gray-600">
                      Reviews section goes here.
                    </div>
                  </TabPane>
                  <TabPane tab="Instructor" key="instructor">
                    <div className="mt-6 text-gray-600">
                      Instructor details section goes here.
                    </div>
                  </TabPane>
                </Tabs>

                <div className="bg-white rounded-xl border p-4 mt-10">
                  <h3 className="text-lg font-bold border-b pb-2 mb-4">
                    Author's More Courses
                  </h3>

                  <Carousel
                    autoplay
                    slidesToShow={2}
                    centerMode={true}
                    dots={false}
                    infinite={true}
                    draggable={true}
                    swipeToSlide={true}
                  >
                    {authorCourses.map((course, idx) => (
                      <div key={idx} className="flex justify-center">
                        <div className="w-50 mx-2">
                          <img
                            src={
                              course.imageUrl ||
                              "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
                            }
                            alt="Author Course"
                            className="w-full rounded-xl"
                          />
                          <h4 className="text-sm font-semibold mt-2">
                            {course.title}
                          </h4>
                          <p className="text-xs text-purple-600">
                            {course.price}
                          </p>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>

                <div className="bg-white rounded-xl border p-4 mt-10">
                  <h3 className="text-lg font-bold border-b pb-2 mb-4">
                    Reviews
                  </h3>
                  <div className="space-y-4">
                    {reviewsData.map((review, idx) => (
                      <div key={idx} className="flex gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-300">
                          <img
                            src={
                              review.userAvatar ||
                              "https://via.placeholder.com/150"
                            }
                            alt={review.username}
                            className="w-full h-full rounded-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-semibold">{review.username}</h4>
                            <Rate disabled defaultValue={review.rating} />
                          </div>
                          <p className="text-gray-600 mt-2">{review.comment}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <div className="rounded-xl border border-gray-200 p-5">
                  <div className="relative">
                    <img
                      src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
                      alt="Thumbnail"
                      className="rounded-xl"
                    />
                    <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white bg-purple-600 rounded-full p-3">
                      <FaPlay />
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-xl font-bold text-purple-600">$32.00</p>
                    <p className="line-through text-sm text-gray-400">$68.00</p>
                    <p className="text-right text-xs text-red-500">85% OFF</p>
                  </div>
                  <button className="mt-3 w-full bg-purple-600 text-white py-2 rounded">
                    Add To Cart
                  </button>
                  <button className="mt-2 w-full border border-purple-600 text-purple-600 py-2 rounded">
                    Buy Now
                  </button>
                  <p className="text-xs mt-1 text-center text-gray-500">
                    45-Days Money-Back Guarantee
                  </p>

                  <div className="mt-4 space-y-2 text-sm text-gray-600">
                    <p>Instructor: Dr. William</p>
                    <p>Start Date: 05 Dec 2024</p>
                    <p>Total Duration: 08hrs 32min</p>
                    <p>Enrolled: 100</p>
                    <p>Lectures: 30</p>
                    <p>Skill Level: Basic</p>
                    <p>Language: Spanish</p>
                    <p>Quiz: Yes</p>
                    <p>Certificate: Yes</p>
                  </div>

                  <div className="mt-4 text-center text-sm">
                    <p className="text-gray-600">More inquiry about course</p>
                    <p className="text-purple-600 font-bold">+47 333 78 901</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl border p-4 mt-10">
                  <h3 className="text-lg font-bold border-b pb-2 mb-4">
                    🔥 Populer Course
                  </h3>
                  <div className="space-y-4">
                    {popularCourses.map((course, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <img
                          src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
                          alt="popular"
                          className="w-14 h-14 rounded-md object-cover"
                        />
                        <div>
                          <p className="text-sm font-semibold leading-snug">
                            {course.title}
                          </p>
                          <span className="text-xs text-purple-600 font-bold">
                            {course.price}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default CourseDetail;

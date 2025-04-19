import { Button, Carousel, Avatar, Card, Rate, Tag } from "antd";
import { Link } from "react-router-dom";
import {
  FaChalkboardTeacher,
  FaPuzzlePiece,
  FaRocket,
  FaUsers,
  FaQuoteLeft,
  FaTools,
  FaGraduationCap,
} from "react-icons/fa";
import { HeartOutlined } from "@ant-design/icons"; // Import HeartOutlined
const { Meta } = Card;

const reviews = [
  {
    name: "Alex, 14 years old",
    comment:
      "CodeVerse made coding exciting and easy to understand. I've built my first app at 14!",
    avatar: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
  },
  {
    name: "Sara, 13 years old",
    comment:
      "I love the challenges! They help me think critically and improve every day.",
    avatar: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
  },
  {
    name: "Minh, 15 tuổi",
    comment: "Bài giảng rất dễ hiểu, mình cảm thấy tự tin hơn khi lập trình!",
    avatar: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
  },
  {
    name: "Linh, 12 tuổi",
    comment:
      "Giao diện đẹp, dễ sử dụng và nội dung rất phù hợp cho người mới học.",
    avatar: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
  },
  {
    name: "David, 16 years old",
    comment: "Learning to code has never been this fun. CodeVerse rocks!",
    avatar: "https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg",
  },
];
const displayedCourses = [
  {
    id: 1,
    title: "Course 1",
    category: "Development",
    lessons: 10,
    duration: "5 hours",
    price: 100,
    discount: 20,
    instructor: "John Doe",
    rating: 4,
  },
  {
    id: 2,
    title: "Course 2",
    category: "Design",
    lessons: 8,
    duration: "3 hours",
    price: 50,
    discount: 0,
    instructor: "Jane Smith",
    rating: 5,
  },
  {
    id: 3,
    title: "Course 2",
    category: "Design",
    lessons: 8,
    duration: "3 hours",
    price: 50,
    discount: 0,
    instructor: "Jane Smith",
    rating: 5,
  },
];
const handleCourseClick = (id) => {
  console.log("Course clicked: ", id);
};
const Home = () => {
  return (
    <div className="bg-white text-[#3b3c54]">
      <section className="bg-[#f5f7fa] py-20 text-center">
        <Carousel autoplay className="max-w-6xl mx-auto mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-6 text-[#2c31cf]">
              Welcome to CodeVerse
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-700">
              The ultimate platform to learn, practice and compete in
              programming. Your journey starts here.
            </p>
            <img
              src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
              alt="Hero"
              className="mx-auto rounded-xl mt-4 w-full max-h-96 object-cover"
            />
          </div>
          <div>
            <h1 className="text-5xl font-bold mb-6 text-[#2c31cf]">
              Master Coding with Real Projects
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-8 text-gray-700">
              Build real-world skills through hands-on challenges and expert-led
              lessons.
            </p>
            <img
              src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
              alt="Hero"
              className="mx-auto rounded-xl mt-4 w-full max-h-96 object-cover"
            />
          </div>
        </Carousel>

        <div className="flex justify-center gap-4">
          <Link to="/courses">
            <Button
              type="primary"
              size="large"
              className="bg-[#4d96ff] hover:bg-[#2c31cf]"
            >
              Start Learning
            </Button>
          </Link>
          <Link to="/fights">
            <Button
              size="large"
              className="border-[#4d96ff] text-[#4d96ff] hover:border-[#2c31cf] hover:text-[#2c31cf]"
            >
              Join a Contest
            </Button>
          </Link>
        </div>
      </section>
      
      <section
        className="py-20 px-4 text-center"
        style={{ backgroundColor: "antiquewhite" }}
      >
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-[#2c31cf] mb-6">
            CodeVerse in Numbers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="text-4xl font-bold text-[#4d96ff]">120,000+</h3>
              <p className="text-lg mt-2 text-gray-700">Students</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[#4d96ff]">30+</h3>
              <p className="text-lg mt-2 text-gray-700">Countries</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[#4d96ff]">4.9/5</h3>
              <p className="text-lg mt-2 text-gray-700">Average Rating</p>
            </div>
          </div>
        </div>
      </section>
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
            alt="Kids Coding"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-semibold text-[#2c31cf]">
              Why Kids Should Learn Programming Early?
            </h2>
            <p className="text-lg mb-4 text-gray-700">
              Programming builds problem-solving, logical thinking, and
              creativity from an early age. It fosters confidence and prepares
              kids for a tech-driven future.
            </p>
            <p className="text-lg text-gray-700">
              Children who learn to code early often excel in math, science, and
              digital communication — making them future-ready and empowered.
            </p>
          </div>
        </div>
      </section>
      <section className="py-20 px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <FaChalkboardTeacher className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-[#2c31cf]">
              Expert Curriculum
            </h3>
            <p className="text-gray-700">
              Lessons designed by top developers and educators.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <FaPuzzlePiece className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-[#2c31cf]">
              Fun Challenges
            </h3>
            <p className="text-gray-700">
              Learn by doing with real problems and quizzes.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <FaRocket className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-[#2c31cf]">
              Fast Progress
            </h3>
            <p className="text-gray-700">
              Track your journey and unlock achievements.
            </p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg transition-all duration-300">
            <FaUsers className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2 text-[#2c31cf]">
              Peer Community
            </h3>
            <p className="text-gray-700">
              Share ideas, projects, and inspiration with others.
            </p>
          </div>
        </div>
      </section>
 
      <section className="bg-[#f5f7fa] py-10 px-4">
        <div className="max-w-6xl mx-auto text-left mb-12">
          <h2
            style={{
              background: "rgb(95 45 237 / var(--tw-text-opacity))",
              display: "inline-block",
              borderRadius: "9999px",
              padding: "5px 10px 5px 10px",
              fontSize: "0.875rem",
              lineHeight: "1.25rem",
              fontWeight: "600",
            }}
          >
            Course List
          </h2>
          <h2 className="text-3xl font-semibold text-[#2c31cf] mb-6 mt-2.5">
            Perfect Online <br></br> Courses for Your Career
          </h2>
        </div>
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
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
        </div>
      </section>

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">What Students Say</h2>
          <Carousel
            autoplay
            dots
            slidesToShow={3}
            slidesToScroll={1}
            className="mx-auto"
          >
            {reviews.map((review, idx) => (
              <div key={idx} className="px-4">
                <div className="p-6 rounded-lg shadow flex flex-col items-center text-center h-full bg-white">
                  <FaQuoteLeft className="text-2xl text-[#4d96ff] mb-4" />
                  <p className="italic mb-4">"{review.comment}"</p>
                  <div className="flex items-center gap-3 mt-auto">
                    <Avatar src={review.avatar} size={48} />
                    <p className="font-semibold">{review.name}</p>
                  </div>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </section>
      <section className="py-20 px-4 bg-[#f5f7fa]">
        <div className="max-w-6xl mx-auto mb-12">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-left mb-8 md:mb-0 md:w-1/2">
              <h2
                className="text-3xl font-semibold mb-6"
                style={{ marginBottom: "80px", fontSize: "40px" }}
              >
                Provide IT & Technology Subject For You
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Construction is a general term meaning the art and science to
                form systems organizations, and comes from Latin. Construction
                is a...
              </p>
              <p className="text-lg text-gray-600 mb-6">
                Construction is a general term meaning the art and science to
                form systems organizations, and comes from Latin Construction is
                a organizations, and comes from Latin construction and Old.
              </p>
              <Button
                style={{ height: "50px" }}
                type="primary"
                className="bg-[#ff6090] text-white px-6 py-3 rounded-xl shadow-lg hover:bg-[#ff4777] transition-all duration-300"
              >
                Explore More →
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:w-1/2">
              <Card className="hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl mt-[-10px]">
                <Meta
                  avatar={
                    <FaTools className="text-4xl text-[#2c31cf] mx-auto mb-4" />
                  }
                  title="Business Studies"
                  description="Construction is a general term that refers to the art and science of forming buildings and infrastructure."
                />
                <Button
                  type="link"
                  className="text-[#4d96ff] hover:text-[#2c31cf] mt-4"
                >
                  View Subject →
                </Button>
              </Card>

              <Card className="hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl mt-[10px]">
                <Meta
                  avatar={
                    <FaGraduationCap className="text-4xl text-[#2c31cf] mx-auto mb-4" />
                  }
                  title="Artist & Design"
                  description="Construction is a general term that refers to the art and science of forming buildings and infrastructure."
                />
                <Button
                  type="link"
                  className="text-[#4d96ff] hover:text-[#2c31cf] mt-4"
                >
                  View Subject →
                </Button>
              </Card>

              <Card className="hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl mt-[-10px]">
                <Meta
                  avatar={
                    <FaPuzzlePiece className="text-4xl text-[#2c31cf] mx-auto mb-4" />
                  }
                  title="Machine Learning"
                  description="Construction is a general term that refers to the art and science of forming buildings and infrastructure."
                />
                <Button
                  type="link"
                  className="text-[#4d96ff] hover:text-[#2c31cf] mt-4"
                >
                  View Subject →
                </Button>
              </Card>

              <Card className="hover:scale-105 hover:shadow-xl transition-all duration-300 rounded-2xl mt-[10px]">
                <Meta
                  avatar={
                    <FaPuzzlePiece className="text-4xl text-[#2c31cf] mx-auto mb-4" />
                  }
                  title="Artist & Design"
                  description="Construction is a general term that refers to the art and science of forming buildings and infrastructure."
                />
                <Button
                  type="link"
                  className="text-[#4d96ff] hover:text-[#2c31cf] mt-4"
                >
                  View Subject →
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-[#111827] text-white py-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Begin Your Coding Adventure?
          </h2>
          <p className="text-lg mb-8">
            Start learning, building, and competing today. Unlock your potential
            with CodeVerse.
          </p>
          <Link to="/register">
            <Button
              type="primary"
              size="large"
              className="bg-[#4d96ff] hover:bg-[#2c31cf]"
            >
              Get Started
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-[#f5f7fa] py-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">
            Frequently Asked Questions
          </h2>
          <div className="text-left max-w-3xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-bold">What is CodeVerse?</h3>
              <p>
                CodeVerse is an online learning platform where students can
                learn programming through interactive lessons, real projects,
                and coding contests.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Who can join CodeVerse?</h3>
              <p>
                Anyone with a passion for coding! Whether you're a beginner or
                an advanced learner, CodeVerse has something for everyone.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-bold">Is there a free trial?</h3>
              <p>
                Yes! CodeVerse offers a free trial with access to select courses
                and features to help you get started.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

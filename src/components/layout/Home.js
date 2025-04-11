import { Button, Carousel, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
  FaCode,
  FaTrophy,
  FaPuzzlePiece,
  FaUsers,
  FaChalkboardTeacher,
  FaRocket,
  FaLaptopCode,
  FaGraduationCap,
  FaQuoteLeft,
} from "react-icons/fa";

const reviews = [
  {
    name: "Alex, 14 years old",
    comment:
      "CodeVerse made coding exciting and easy to understand. I've built my first app at 14!",
    avatar: "/avatar1.png",
  },
  {
    name: "Sara, 13 years old",
    comment:
      "I love the challenges! They help me think critically and improve every day.",
    avatar: "/avatar2.png",
  },
  {
    name: "Minh, 15 tuổi",
    comment: "Bài giảng rất dễ hiểu, mình cảm thấy tự tin hơn khi lập trình!",
    avatar: "/avatar3.png",
  },
  {
    name: "Linh, 12 tuổi",
    comment:
      "Giao diện đẹp, dễ sử dụng và nội dung rất phù hợp cho người mới học.",
    avatar: "/avatar4.png",
  },
  {
    name: "David, 16 years old",
    comment: "Learning to code has never been this fun. CodeVerse rocks!",
    avatar: "/avatar5.png",
  },
];

const Home = () => {
  return (
    <div className="bg-white text-[#3b3c54]">
      <section className="bg-[#f5f7fa] py-20 text-center">
        <Carousel autoplay className="max-w-6xl mx-auto mb-12">
          <div>
            <h1 className="text-5xl font-bold mb-6">Welcome to CodeVerse</h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
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
            <h1 className="text-5xl font-bold mb-6">
              Master Coding with Real Projects
            </h1>
            <p className="text-lg max-w-2xl mx-auto mb-8">
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

      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <img
            src="https://techcrunch.com/wp-content/uploads/2015/04/codecode.jpg"
            alt="Kids Coding"
            className="rounded-xl shadow-lg"
          />
          <div>
            <h2 className="text-3xl font-semibold mb-4">
              Why Kids Should Learn Programming Early?
            </h2>
            <p className="text-lg mb-4">
              Programming builds problem-solving, logical thinking, and
              creativity from an early age. It fosters confidence and prepares
              kids for a tech-driven future.
            </p>
            <p className="text-lg">
              Children who learn to code early often excel in math, science, and
              digital communication — making them future-ready and empowered.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-[#fffdf5]">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-semibold">
            Why CodeVerse is the #1 Coding Platform for Students?
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="p-6 rounded-xl shadow hover:shadow-lg">
            <FaChalkboardTeacher className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Expert Curriculum</h3>
            <p>Lessons designed by top developers and educators.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg">
            <FaPuzzlePiece className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Fun Challenges</h3>
            <p>Learn by doing with real problems and quizzes.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg">
            <FaRocket className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Fast Progress</h3>
            <p>Track your journey and unlock achievements.</p>
          </div>
          <div className="p-6 rounded-xl shadow hover:shadow-lg">
            <FaUsers className="text-4xl text-[#4d96ff] mb-4 mx-auto" />
            <h3 className="text-xl font-bold mb-2">Peer Community</h3>
            <p>Share ideas, projects, and inspiration with others.</p>
          </div>
        </div>
      </section>

      <section className="bg-[#f5f7fa] py-20 px-4 text-center">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold mb-6">CodeVerse in Numbers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-12">
            <div>
              <h3 className="text-4xl font-bold text-[#4d96ff]">120,000+</h3>
              <p className="text-lg mt-2">Students</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[#4d96ff]">30+</h3>
              <p className="text-lg mt-2">Countries</p>
            </div>
            <div>
              <h3 className="text-4xl font-bold text-[#4d96ff]">4.9/5</h3>
              <p className="text-lg mt-2">Average Rating</p>
            </div>
          </div>
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

import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-white mt-10">
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-2">CodeVerse</h3>
          <p className="text-sm text-gray-300">
            Explore the universe of coding. Learn, code, and grow with
            CodeVerse.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Quick Links</h4>
          <ul className="space-y-1 text-sm text-gray-300">
            <li>
              <Link to="/courses" className="hover:text-white">
                Courses
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-white">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-white">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">CodeVerse</h4>
          <p className="text-sm text-gray-300">Email: supportCodeVerse@gmail.com</p>
          <p className="text-sm text-gray-300">Hotline: +123 456 789</p>
        </div>
      </div>
      <div className="bg-slate-900 text-center text-gray-400 text-sm py-3">
        © 2025 CodeVerse. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;

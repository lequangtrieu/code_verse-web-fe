import {
  FaFacebookF,
  FaYoutube,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
  FaBuilding,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white text-[#2f2fce]  border-t justify-items-center">
      <div className="max-w-7xl px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {/* Logo & social */}
        <div className="md:col-span-1 min-w-[195px]">
          <div className="mb-4">
            <img src="/logoCodeVerseNoBG.png" alt="CodeVerse" className="h-[60px] w-[195px]" />
          </div>
          <p className="text-black text-sm mb-4">
            CodeVerse is an online platform that helps users to learn, practice coding skills and join the online coding contests.
          </p>
          <div className="flex gap-3 text-[#2f2fce]">
            <FaFacebookF />
            <FaYoutube />
            <FaTwitter />
            <FaInstagram />
          </div>
        </div>

        {/* Customer Care */}
        <div className="min-w-[195px]">
          <h4 className="font-semibold mb-2">Customer care</h4>
          <ul className="space-y-1 text-sm text-black">
            <li><Link to="/">Payment instructions</Link></li>
            <li><Link to="/">General transaction conditions</Link></li>
            <li><Link to="/">Service usage procedure</Link></li>
            <li><Link to="/">Warranty policy</Link></li>
            <li><Link to="/">Return policy</Link></li>
            <li><Link to="/">Privacy policy</Link></li>
          </ul>
        </div>

        {/* Feature */}
        <div className="min-w-[195px]">
          <h4 className="font-semibold mb-2">Feature</h4>
          <ul className="space-y-1 text-sm text-black">
            <li><Link to="/">Learning</Link></li>
            <li><Link to="/">Training</Link></li>
            <li><Link to="/">Fights</Link></li>
            <li><Link to="/">Trainings</Link></li>
            <li><Link to="/">Leaders</Link></li>
          </ul>
        </div>

        {/* About Us */}
        <div className="min-w-[195px]">
          <h4 className="font-semibold mb-2">About Us</h4>
          <ul className="space-y-1 text-sm text-black">
            <li><Link to="/">Introduce</Link></li>
            <li><Link to="/">Terms of Use</Link></li>
            <li><Link to="/">Help</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="min-w-[195px]">
          <h4 className="font-semibold mb-2">Contact</h4>
          <ul className="space-y-2 text-sm text-black">
            <li className="flex items-start gap-2">
              <FaBuilding className="text-3xl" />
              <span>
                FPT Complex, Nam Ky Khoi Nghia Street, Da Nang, Vietnam
              </span>
            </li>
            <li className="flex items-start gap-2">
              <FaPhoneAlt className="mt-1 " />
              <span>
                <strong>0982009465</strong> or <strong>0976303651</strong><br />
                (8:00 a.m. - 5:00 p.m. Mon - Fri)
              </span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope />
              <a href="mailto:codeverse.ad@gmail.com">codeverse.ad@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-slate-900 text-center text-gray-400 text-sm py-3 w-full">
        © 2025 CodeVerse. All rights reserved.
      </div>
    </footer>
  );
}
export default Footer;

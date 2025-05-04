
import { Link } from "react-router-dom";
import { BookOpen, Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-12 pb-8 border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company info */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-r from-techblue to-techpurple rounded-md w-8 h-8 flex items-center justify-center">
                <BookOpen size={20} className="text-white" />
              </div>
              <span className="font-bold text-xl">TechPathways</span>
            </div>
            <p className="text-gray-600 mb-4">
              Connect with top mentors and courses to accelerate your tech career journey.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-2 text-techblue" />
                <span>São Paulo, Brasil</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Phone size={18} className="mr-2 text-techblue" />
                <span>+55 11 9999-9999</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Mail size={18} className="mr-2 text-techblue" />
                <span>contato@techpathways.com</span>
              </div>
            </div>
          </div>

          {/* Navigation links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses" className="text-gray-600 hover:text-techblue transition-colors">
                  Courses
                </Link>
              </li>
              <li>
                <Link to="/mentors" className="text-gray-600 hover:text-techblue transition-colors">
                  Find Mentors
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-gray-600 hover:text-techblue transition-colors">
                  Your Profile
                </Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-600 hover:text-techblue transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-techblue transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/courses?category=webdev" className="text-gray-600 hover:text-techblue transition-colors">
                  Web Development
                </Link>
              </li>
              <li>
                <Link to="/courses?category=datascience" className="text-gray-600 hover:text-techblue transition-colors">
                  Data Science
                </Link>
              </li>
              <li>
                <Link to="/courses?category=programming" className="text-gray-600 hover:text-techblue transition-colors">
                  Programming
                </Link>
              </li>
              <li>
                <Link to="/courses?category=devops" className="text-gray-600 hover:text-techblue transition-colors">
                  DevOps
                </Link>
              </li>
              <li>
                <Link to="/courses?category=design" className="text-gray-600 hover:text-techblue transition-colors">
                  UI/UX Design
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Subscribe</h3>
            <p className="text-gray-600 mb-4">Subscribe to our newsletter for updates on new courses and mentors.</p>
            <form className="space-y-2">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-techblue focus:border-transparent"
                required
              />
              <button 
                type="submit" 
                className="w-full bg-techblue hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        {/* Bottom footer */}
        <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} TechPathways. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link to="/terms" className="text-gray-600 hover:text-techblue text-sm">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-600 hover:text-techblue text-sm">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-600 hover:text-techblue text-sm">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

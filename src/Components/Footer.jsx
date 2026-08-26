import React from "react";
import { NavLink } from "react-router-dom";
import { FiMapPin, FiPhone, FiMail, FiClock, FiSend } from "react-icons/fi";
import { FaTwitter, FaYoutube, FaFacebookF } from "react-icons/fa";
import Logo from "./shared/Logo";

const Footer = () => {
  const getFooterLinkClass = ({ isActive }) => {
    const base =
      "text-xs font-bold   text-gray-500 hover:text-primaryBlue transition-colors duration-300 py-0.5 relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primaryBlue after:transition-all after:duration-300";
    return isActive
      ? `${base} text-primaryBlue after:w-full`
      : `${base} after:w-0 hover:after:w-full`;
  };

  return (
    <footer className="w-full bg-white border-t border-gray-100 select-none pt-16 pb-8">
      <div className="w-11/12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 pb-12 border-b border-gray-50">
        {/* Column 1: Brand Info Terminal */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <Logo />
          </div>

          {/* Contact Node Info Grid */}
          <div className="space-y-3.5 text-xs font-semibold text-gray-500 tracking-wide">
            <div className="flex items-start gap-3">
              <FiMapPin className="text-sm text-primaryBlue mt-0.5 flex-shrink-0" />
              <span>Location: av. Washington 165, NY CA 54003</span>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-sm text-primaryBlue flex-shrink-0" />
              <span>+31 85 964 47 25</span>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="text-sm text-primaryBlue flex-shrink-0" />
              <span className="lowercase">visorixofficial@gmail.com</span>
            </div>
            <div className="flex items-center gap-3">
              <FiClock className="text-sm text-primaryBlue flex-shrink-0" />
              <span>9.00 AM - 5.00 PM</span>
            </div>
          </div>

          {/* Social Network Terminal Nodes */}
          <div className="flex items-center gap-3 pt-2">
            <a
              href="#"
              className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-400 hover:text-primaryBlue hover:bg-primaryBlue/5 hover:border-primaryBlue/20 transition-all duration-300"
            >
              <FaTwitter className="text-sm" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-400 hover:text-primaryRed hover:bg-primaryRed/5 hover:border-primaryRed/20 transition-all duration-300"
            >
              <FaYoutube className="text-sm" />
            </a>
            <a
              href="#"
              className="p-2.5 rounded-xl border border-gray-100 bg-gray-50/50 text-gray-400 hover:text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-all duration-300"
            >
              <FaFacebookF className="text-xs" />
            </a>
          </div>
        </div>

        {/* Column 2: Useful Links Node Navigation */}
        <div className="md:pl-10 space-y-6">
          <h6 className="text-xs font-bold   text-gray-900 border-b border-gray-50 pb-3">
            Useful Links
          </h6>
          <nav className="flex flex-col gap-4 items-start">
            <NavLink to="/" className={getFooterLinkClass}>
              Home
            </NavLink>
            <NavLink to="/all-visas" className={getFooterLinkClass}>
              All Visas
            </NavLink>
            <NavLink to="/about-us" className={getFooterLinkClass}>
              About Us
            </NavLink>
            <NavLink to="/contact-us" className={getFooterLinkClass}>
              Contact
            </NavLink>
          </nav>
        </div>

        {/* Column 3: Newsletter Action Terminal */}
        <div className="space-y-6">
          <div className="space-y-1">
            <h6 className="text-xs font-bold   text-gray-900">
              Drop a Message
            </h6>
            <p className="text-[11px] text-gray-400 font-medium">
              Subscribe to receive regular updates.
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
            <div className="relative">
              <input
                type="email"
                required
                className="w-full px-4 py-3 text-xs font-semibold rounded-xl bg-gray-50 border border-gray-100 focus:border-primaryBlue focus:bg-white text-gray-800 transition-all duration-300 outline-none placeholder:text-gray-400"
                placeholder="Enter your email"
              />
            </div>
            <button className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold   text-white bg-gradient-to-r from-primaryBlue to-secondaryIndigo rounded-xl shadow-md shadow-primaryBlue/15 active:scale-[0.98] transition-all duration-300 cursor-pointer">
              <FiSend className="text-sm" />
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Copyright Base Node */}
      <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-bold tracking-wider text-gray-400">
        <p>&copy; {new Date().getFullYear()} Visorix. All Rights Reserved.</p>
        <div className="flex items-center gap-6">
          <a href="#" className="hover:text-primaryBlue transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primaryBlue transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </div>
  </footer>
  );
};

export default Footer;

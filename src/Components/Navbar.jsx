import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import { motion, AnimatePresence } from "framer-motion";
import Swal from "sweetalert2/dist/sweetalert2.js";
import "sweetalert2/src/sweetalert2.scss";

// React Icons
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoMdClose } from "react-icons/io";
import { TbLogout2 } from "react-icons/tb";
import {
  FiFolderPlus,
  FiBriefcase,
  FiChevronDown,
  FiHome,
  FiGlobe,
  FiPlusCircle,
  FiInfo,
  FiMail,
  FiLogIn,
} from "react-icons/fi";
import Logo from "./shared/Logo";

const Navbar = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, signOutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isTransparent = isHomePage && !scrolled;

  const sideNavRef = useRef(null);
  const dropdownRef = useRef(null);

  // স্ক্রোল করলে ব্যাকগ্রাউন্ড পরিবর্তন করার লজিক
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // বাইরে ক্লিক করলে মোবাইল সাইডবার এবং ইউজার ড্রপডাউন বন্ধ করার লজিক
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (sideNavRef.current && !sideNavRef.current.contains(event.target)) {
        setMobileSidebarOpen(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSignOut = () => {
    signOutUser()
      .then(() => {
        setMobileSidebarOpen(false);
        setUserDropdownOpen(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Successfully logged out",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      });
  };

  const getNavLinkClass = ({ isActive }) => {
    if (isActive) {
      return "relative font-semibold text-sm lg:text-base text-primaryBlue py-1 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:bg-primaryBlue before:w-full transition-colors duration-300";
    }

    return isTransparent
      ? "relative font-semibold text-sm lg:text-base text-white/90 hover:text-white py-1 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:bg-white before:w-0 hover:before:w-full transition-all duration-300"
      : "relative font-semibold text-sm lg:text-base text-gray-800 hover:text-primaryBlue py-1 before:absolute before:bottom-0 before:left-0 before:h-[2px] before:bg-primaryBlue before:w-0 hover:before:w-full transition-all duration-300";
  };

  // মূল ও মোবাইল মেনুর জন্য পাবলিক লিঙ্কসমূহ
  const publicLinks = (
    <>
      <NavLink to="/" className={getNavLinkClass}>
        Home
      </NavLink>
      <NavLink to="/all-visas" className={getNavLinkClass}>
        All Visas
      </NavLink>
      {user?.email && (
        <NavLink to="/add-visa" className={getNavLinkClass}>
          Add Visa
        </NavLink>
      )}
      <NavLink to="/about-us" className={getNavLinkClass}>
        About Us
      </NavLink>
      <NavLink to="/contact-us" className={getNavLinkClass}>
        Contact
      </NavLink>
    </>
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 select-none w-full transition-all duration-300 ${
        isTransparent
          ? "bg-transparent border-b border-transparent py-4"
          : "bg-white border-b border-gray-100 shadow-sm py-3"
      }`}
    >
      <div className="w-11/12 max-w-7xl mx-auto flex items-center justify-between">
        {/* Brand Logo Identity */}
        <Logo isDarkBg={isTransparent} />

        {/* Desktop Links Menu Terminal */}
        <div className="hidden lg:flex items-center gap-8">{publicLinks}</div>

        {/* Desktop Interface Controller Core */}
        <div className="flex items-center gap-2">
          {/* User Dropdown Structure */}
          {user?.email && (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className={`flex items-center gap-1.5 p-1 rounded-full transition-colors cursor-pointer focus:outline-none ${
                  isTransparent ? "hover:bg-white/10" : "hover:bg-gray-50"
                }`}
              >
                <figure className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-primaryBlue/20 shadow-inner">
                  <img
                    className="w-full h-full object-cover"
                    src={
                      user?.photoURL ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="User Terminal Profile"
                  />
                </figure>
                <FiChevronDown
                  className={`text-sm transition-transform duration-300 ${
                    isTransparent ? "text-white/80" : "text-gray-500"
                  } ${userDropdownOpen ? "rotate-180" : ""}`}
                />
              </button>

              {/* Animated Dropdown Wrapper */}
              <AnimatePresence>
                {userDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute right-0 mt-3 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 z-50 flex flex-col gap-0.5"
                  >
                    <div className="px-4 py-2.5 border-b border-gray-50 mb-1">
                      <p className="text-xs font-bold text-gray-900 truncate">
                        {user?.displayName || "Active User"}
                      </p>
                      <p className="text-[10px] font-medium text-gray-400 truncate mt-0.5">
                        {user?.email}
                      </p>
                    </div>

                    <Link
                      to="/my-added-visas"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-gray-700 hover:text-primaryBlue hover:bg-primaryBlue/5 rounded-xl transition-colors"
                    >
                      <FiFolderPlus className="text-sm" />
                      My Added Visas
                    </Link>

                    <Link
                      to="/my-visa-application"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2.5 text-xs font-bold text-gray-700 hover:text-primaryBlue hover:bg-primaryBlue/5 rounded-xl transition-colors"
                    >
                      <FiBriefcase className="text-sm" />
                      My Applications
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 text-xs font-bold text-primaryRed hover:bg-primaryRed/5 rounded-xl border-none cursor-pointer transition-colors mt-1 pt-2.5 border-t border-gray-50"
                    >
                      <TbLogout2 className="text-sm" />
                      Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Guest Action: Only Sign In if user does not exist */}
          {!user?.email && (
            <div className="hidden md:flex items-center gap-2">
              <Link
                to="/auth/sign-in"
                className={`px-5 py-2.5 text-xs lg:text-sm font-bold rounded-full transition-all duration-300 ${
                  isTransparent
                    ? "text-white bg-white/20 hover:bg-white/30"
                    : "text-primaryBlue bg-primaryBlue/5 hover:bg-primaryBlue/10"
                }`}
              >
                Login
              </Link>
            </div>
          )}

          {/* Responsive Mobile Drawer Trigger Menu */}
          <button
            onClick={() => setMobileSidebarOpen(true)}
            className={`lg:hidden p-2 transition-colors rounded-xl border border-transparent bg-transparent cursor-pointer ${
              isTransparent
                ? "text-white hover:bg-white/10"
                : "text-gray-700 hover:text-primaryBlue hover:border-gray-100"
            }`}
          >
            <HiOutlineMenuAlt3 className="text-2xl" />
          </button>
        </div>
      </div>

      {/* ==================== MOBILE DRAWER INTERFACE ==================== */}
      <AnimatePresence>
        {mobileSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileSidebarOpen(false)}
              className="fixed inset-0 h-screen bg-slate-950/40 backdrop-blur-xs z-50 lg:hidden"
            />

            <motion.aside
              ref={sideNavRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-screen w-[290px] sm:w-[330px] bg-white border-l border-gray-100 shadow-2xl p-6 flex flex-col justify-between z-50 lg:hidden"
            >
              <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                  <Logo />
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    className="p-2 text-gray-400 hover:text-gray-800 hover:bg-gray-100 transition-all rounded-full cursor-pointer border-none bg-transparent"
                  >
                    <IoMdClose className="text-xl" />
                  </button>
                </div>

                {/* User snippet in mobile drawer if logged in */}
                {user?.email && (
                  <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl border border-blue-100/60">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden ring-2 ring-primaryBlue/30 shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={
                          user?.photoURL ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="User Avatar"
                      />
                      <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-white rounded-full" />
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-gray-900 truncate">
                        {user?.displayName || "User"}
                      </p>
                      <p className="text-[10px] font-medium text-gray-500 truncate">
                        {user?.email}
                      </p>
                    </div>
                  </div>
                )}

                {/* Navigation Links */}
                <nav
                  className="flex flex-col gap-2 text-left"
                  onClick={() => setMobileSidebarOpen(false)}
                >
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-primaryBlue/10 text-primaryBlue border-l-4 border-primaryBlue font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primaryBlue"
                      }`
                    }
                  >
                    <FiHome className="text-lg" />
                    <span>Home</span>
                  </NavLink>

                  <NavLink
                    to="/all-visas"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-primaryBlue/10 text-primaryBlue border-l-4 border-primaryBlue font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primaryBlue"
                      }`
                    }
                  >
                    <FiGlobe className="text-lg" />
                    <span>All Visas</span>
                  </NavLink>

                  {user?.email && (
                    <NavLink
                      to="/add-visa"
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                          isActive
                            ? "bg-primaryBlue/10 text-primaryBlue border-l-4 border-primaryBlue font-bold"
                            : "text-gray-700 hover:bg-gray-50 hover:text-primaryBlue"
                        }`
                      }
                    >
                      <FiPlusCircle className="text-lg" />
                      <span>Add Visa</span>
                    </NavLink>
                  )}

                  <NavLink
                    to="/about-us"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-primaryBlue/10 text-primaryBlue border-l-4 border-primaryBlue font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primaryBlue"
                      }`
                    }
                  >
                    <FiInfo className="text-lg" />
                    <span>About Us</span>
                  </NavLink>

                  <NavLink
                    to="/contact-us"
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-primaryBlue/10 text-primaryBlue border-l-4 border-primaryBlue font-bold"
                          : "text-gray-700 hover:bg-gray-50 hover:text-primaryBlue"
                      }`
                    }
                  >
                    <FiMail className="text-lg" />
                    <span>Contact</span>
                  </NavLink>

                  {user?.email && (
                    <>
                      <div className="my-1 border-t border-gray-100" />
                      <p className="px-4 text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-1">
                        My Account
                      </p>
                      <NavLink
                        to="/my-added-visas"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-primaryBlue/10 text-primaryBlue border-l-4 border-primaryBlue font-bold"
                              : "text-gray-700 hover:bg-gray-50 hover:text-primaryBlue"
                          }`
                        }
                      >
                        <FiFolderPlus className="text-lg" />
                        <span>My Added Visas</span>
                      </NavLink>

                      <NavLink
                        to="/my-visa-application"
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                            isActive
                              ? "bg-primaryBlue/10 text-primaryBlue border-l-4 border-primaryBlue font-bold"
                              : "text-gray-700 hover:bg-gray-50 hover:text-primaryBlue"
                          }`
                        }
                      >
                        <FiBriefcase className="text-lg" />
                        <span>My Applications</span>
                      </NavLink>
                    </>
                  )}
                </nav>
              </div>

              {/* Bottom Action */}
              <div className="border-t border-gray-100 pt-4">
                {user?.email ? (
                  <button
                    onClick={handleSignOut}
                    className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-primaryRed bg-primaryRed/5 hover:bg-primaryRed/10 rounded-xl transition-all cursor-pointer border-none"
                  >
                    <TbLogout2 className="text-base" />
                    <span>Sign Out</span>
                  </button>
                ) : (
                  <Link
                    to="/auth/sign-in"
                    onClick={() => setMobileSidebarOpen(false)}
                    className="w-full flex items-center justify-center gap-2 py-3 text-xs font-bold text-white bg-primaryBlue hover:bg-primaryBlue/90 rounded-xl shadow-md transition-all"
                  >
                    <FiLogIn className="text-base" />
                    <span>Login</span>
                  </Link>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;



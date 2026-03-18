import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Sun, Moon, Menu, X, ChevronDown, Mail, BookOpen, Users, Phone, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [companyOpen, setCompanyOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav
      className={`sticky top-0 z-50 shadow-md transition-colors ${
        theme === "dark" ? "bg-[#0f172a] text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div
            className={`w-10 h-10 flex items-center justify-center font-bold rounded-md shadow-md ${
              theme === "dark" ? "bg-amber-400 text-gray-900" : "bg-gray-900 text-amber-400"
            }`}
          >
            SB
          </div>
          <div>
            <h1 className="font-extrabold text-lg tracking-tight">SHUTTER_BOX</h1>
            <p className="text-xs opacity-70 -mt-1">Dark gallery • Curated photos</p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center space-x-8 font-medium">
          <Link
            to="/"
            className="hover:text-amber-400 transition-colors duration-200"
          >
            Home
          </Link>
          <Link
            to="/favorites"
            className="hover:text-amber-400 transition-colors duration-200"
          >
            Favorites
          </Link>

          {/* Company Dropdown */}
          <div className="relative">
            <button
              onClick={() => setCompanyOpen(!companyOpen)}
              className="flex items-center space-x-1 hover:text-amber-400 transition-colors"
            >
              <span>Company</span>
              <ChevronDown
                size={16}
                className={`transition-transform ${companyOpen ? "rotate-180" : ""}`}
              />
            </button>

            <AnimatePresence>
              {companyOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className={`absolute right-0 mt-3 w-56 rounded-lg shadow-lg border ${
                    theme === "dark"
                      ? "bg-[#111827] border-gray-700"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <div className="p-3 space-y-2">
                    <Link
                      to="/about"
                      className="flex items-center space-x-2 hover:text-amber-400"
                    >
                      <Users size={16} /> <span>About</span>
                    </Link>
                    <Link
                      to="/blog"
                      className="flex items-center space-x-2 hover:text-amber-400"
                    >
                      <BookOpen size={16} /> <span>Blog</span>
                    </Link>
                    <Link
                      to="/contact"
                      className="flex items-center space-x-2 hover:text-amber-400"
                    >
                      <Phone size={16} /> <span>Contact</span>
                    </Link>
                    <Link
                      to="/help-center"
                      className="flex items-center space-x-2 hover:text-amber-400"
                    >
                      <HelpCircle size={16} /> <span>Help Center</span>
                    </Link>

                    <div className="flex justify-center space-x-3 pt-3 border-t border-gray-600/30">
                      <a
                        href="https://x.com/shutter_box"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-amber-400"
                      >
                        <i className="fa-brands fa-twitter"></i>
                      </a>
                      <a
                        href="https://instagram.com/shutter_box"
                        target="_blank"
                        rel="noreferrer"
                        className="hover:text-amber-400"
                      >
                        <i className="fa-brands fa-instagram"></i>
                      </a>
                      <a
                        href="mailto:hello@shutterbox.com"
                        className="hover:text-amber-400"
                      >
                        <Mail size={16} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full ${
              theme === "dark"
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-200 hover:bg-gray-300"
            } transition`}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`px-4 py-2 rounded-md font-semibold shadow ${
              theme === "dark"
                ? "bg-amber-400 text-gray-900 hover:bg-amber-300"
                : "bg-gray-900 text-amber-400 hover:bg-gray-800"
            }`}
          >
            Logout
          </button>
        </div>

        {/* Mobile menu toggle */}
        <button
          className="md:hidden p-2"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className={`md:hidden border-t ${
              theme === "dark"
                ? "bg-[#0f172a] border-gray-800"
                : "bg-white border-gray-200"
            }`}
          >
            <div className="flex flex-col space-y-3 px-6 py-4">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Home
              </Link>
              <Link
                to="/favorites"
                onClick={() => setMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Favorites
              </Link>
              <Link
                to="/about"
                onClick={() => setMenuOpen(false)}
                className="hover:text-amber-400"
              >
                About
              </Link>
              <Link
                to="/blog"
                onClick={() => setMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Blog
              </Link>
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Contact
              </Link>
              <Link
                to="/help-center"
                onClick={() => setMenuOpen(false)}
                className="hover:text-amber-400"
              >
                Help Center
              </Link>
              <button
                onClick={toggleTheme}
                className="flex items-center space-x-2 hover:text-amber-400"
              >
                {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                <span>Toggle Theme</span>
              </button>
              <button
                onClick={handleLogout}
                className={`px-4 py-2 rounded-md font-semibold shadow mt-2 ${
                  theme === "dark"
                    ? "bg-amber-400 text-gray-900 hover:bg-amber-300"
                    : "bg-gray-900 text-amber-400 hover:bg-gray-800"
                }`}
              >
                Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

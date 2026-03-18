import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  Newspaper,
  Briefcase,
  Phone,
  HelpCircle,
  Facebook,
  Instagram,
  Twitter,
  X,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function CompanyMenu({ isOpen, onClose }) {
  const { theme } = useTheme();

  const menuItems = [
    { icon: Building2, label: "About", link: "#" },
    { icon: Briefcase, label: "Advertise", link: "#" },
    { icon: Users, label: "Join the Team", link: "#" },
    { icon: Newspaper, label: "Blog", link: "#" },
    { icon: Phone, label: "Contact Us", link: "#" },
    { icon: HelpCircle, label: "Help Center", link: "#" },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className={`absolute right-6 top-14 w-80 rounded-2xl shadow-2xl border overflow-hidden z-50 backdrop-blur-md ${
            theme === "dark"
              ? "bg-[#111]/80 border-gray-800 text-gray-200"
              : "bg-white/80 border-gray-200 text-gray-800"
          }`}
        >
          {/* Header */}
          <div
            className={`px-5 py-3 font-semibold border-b ${
              theme === "dark" ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <Building2 className="w-5 h-5 text-amber-400" />
              <span>Company</span>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-3 flex flex-col">
            {menuItems.map((item, i) => (
              <a
                key={i}
                href={item.link}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                  theme === "dark"
                    ? "hover:bg-amber-400/10"
                    : "hover:bg-gray-100"
                }`}
              >
                <item.icon className="w-5 h-5 text-amber-400" />
                <span className="text-sm font-medium">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Footer / Socials */}
          <div
            className={`px-5 py-3 border-t flex items-center justify-between ${
              theme === "dark" ? "border-gray-800" : "border-gray-200"
            }`}
          >
            <div className="flex items-center gap-3">
              <a href="#" className="hover:opacity-80">
                <Twitter className="w-5 h-5 text-sky-400" />
              </a>
              <a href="#" className="hover:opacity-80">
                <Facebook className="w-5 h-5 text-blue-600" />
              </a>
              <a href="#" className="hover:opacity-80">
                <Instagram className="w-5 h-5 text-pink-500" />
              </a>
            </div>

            <button
              onClick={onClose}
              className={`text-xs font-medium ${
                theme === "dark"
                  ? "text-gray-400 hover:text-amber-300"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

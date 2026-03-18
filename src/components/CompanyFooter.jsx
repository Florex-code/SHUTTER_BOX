import React from "react";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { useTheme } from "../context/ThemeContext";

export default function CompanyFooter() {
  const { theme } = useTheme();

  return (
    <footer
      className={`w-full py-6 border-t text-center text-sm transition-colors ${
        theme === "dark"
          ? "bg-[#0a0a0a] border-gray-800 text-gray-400"
          : "bg-gray-100 border-gray-300 text-gray-600"
      }`}
    >
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 px-6">
        <p>© {new Date().getFullYear()} SHUTTER_BOX • Crafted with ❤️</p>
        <div className="flex gap-4">
          <a href="#" className="hover:text-amber-400 transition">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-amber-400 transition">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-amber-400 transition">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}

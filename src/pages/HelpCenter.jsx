import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";
import { ChevronDown } from "lucide-react";

export default function HelpCenter() {
  const { theme } = useTheme();
  const [openIndex, setOpenIndex] = useState(null);
  const [report, setReport] = useState({ name: "", email: "", issue: "" });
  const [sent, setSent] = useState(false);

  const faqs = [
    {
      q: "How do I download photos?",
      a: "Simply hover over any image and click the download icon. The photo will be saved to your device in its original quality.",
    },
    {
      q: "Can I like or favorite photos?",
      a: "Yes! Click the heart icon on any image to add it to your Favorites. You can view all favorites under the 'Favorites' page.",
    },
    {
      q: "Is SHUTTER_BOX free to use?",
      a: "Absolutely. SHUTTER_BOX is built on the Unsplash API and is completely free for users to browse, like, and download images.",
    },
    {
      q: "Can I upload my own photos?",
      a: "Currently, uploads are limited to admin users. However, user uploads will be available in an upcoming update.",
    },
    {
      q: "How do I switch between light and dark mode?",
      a: "Use the theme toggle in the navbar — the system will remember your preference automatically.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleChange = (key) => (e) =>
    setReport((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!report.name || !report.email || !report.issue) return;
    setSent(true);
    setTimeout(() => {
      setReport({ name: "", email: "", issue: "" });
      setSent(false);
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0f172a] via-[#1e293b] to-[#0f172a] text-gray-100"
          : "bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e2e8f0] text-gray-900"
      }`}
    >
      {/* Header */}
      <header
        className={`relative py-20 text-center border-b ${
          theme === "dark" ? "border-gray-800" : "border-gray-200"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
              : "bg-gradient-to-r from-[#c7d2fe] via-[#e0e7ff] to-[#f9fafb]"
          } opacity-90`}
        />
        <h1 className="relative text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">
          Help Center
        </h1>
        <p className="relative mt-3 text-gray-300 max-w-xl mx-auto">
          Need assistance? Browse FAQs, learn how to use SHUTTER_BOX, or reach
          out directly.
        </p>
      </header>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-amber-400">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-lg border ${
                theme === "dark"
                  ? "bg-[#111214]/70 border-gray-700"
                  : "bg-white border-gray-200"
              } shadow-sm`}
            >
              <button
                onClick={() => toggleFAQ(i)}
                className="w-full flex justify-between items-center px-4 py-3 text-left font-medium focus:outline-none"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`transition-transform ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                />
              </button>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="px-4 pb-4 text-sm opacity-80"
                >
                  {faq.a}
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Report an Issue */}
      <section className="max-w-3xl mx-auto py-12 px-6">
        <h2 className="text-2xl font-bold mb-6 text-amber-400">
          Report a Problem
        </h2>
        <motion.form
          onSubmit={handleSubmit}
          className={`rounded-xl p-6 shadow-lg ${
            theme === "dark"
              ? "bg-[#111214]/70 border border-gray-700"
              : "bg-white border border-gray-200"
          }`}
        >
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm mb-1">Name</label>
              <input
                type="text"
                value={report.name}
                onChange={handleChange("name")}
                className={`w-full px-4 py-2 rounded-lg focus:outline-none ${
                  theme === "dark"
                    ? "bg-[#0b0b0b] border border-gray-700 text-gray-100"
                    : "bg-gray-50 border border-gray-200 text-gray-900"
                }`}
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Email</label>
              <input
                type="email"
                value={report.email}
                onChange={handleChange("email")}
                className={`w-full px-4 py-2 rounded-lg focus:outline-none ${
                  theme === "dark"
                    ? "bg-[#0b0b0b] border border-gray-700 text-gray-100"
                    : "bg-gray-50 border border-gray-200 text-gray-900"
                }`}
                placeholder="you@domain.com"
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm mb-1">Describe the issue</label>
            <textarea
              rows="5"
              value={report.issue}
              onChange={handleChange("issue")}
              className={`w-full px-4 py-3 rounded-lg focus:outline-none resize-y ${
                theme === "dark"
                  ? "bg-[#0b0b0b] border border-gray-700 text-gray-100"
                  : "bg-gray-50 border border-gray-200 text-gray-900"
              }`}
              placeholder="Tell us what went wrong..."
            />
          </div>

          <button
            type="submit"
            className={`px-5 py-2 rounded-lg font-medium transition ${
              theme === "dark"
                ? "bg-amber-400 text-gray-900 hover:bg-amber-300"
                : "bg-gray-900 text-amber-400 hover:bg-gray-800"
            }`}
          >
            {sent ? "Report Sent ✅" : "Submit Report"}
          </button>
        </motion.form>
      </section>

      {/* Contact Info */}
      <footer className="text-center py-10 border-t border-gray-700 text-sm opacity-70">
        Need more help? Email{" "}
        <a href="mailto:support@shutterbox.com" className="text-amber-400">
          support@shutterbox.com
        </a>{" "}
        or join our{" "}
        <a
          href="https://twitter.com/shutter_box"
          target="_blank"
          rel="noreferrer"
          className="text-amber-400 hover:underline"
        >
          community page
        </a>
        .
      </footer>
    </motion.div>
  );
}

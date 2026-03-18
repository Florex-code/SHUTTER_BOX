import React, { useState } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemeContext";

export default function Contact() {
  const { theme } = useTheme();

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null); // null | "sending" | "sent" | "error"

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.email.trim()) e.email = "Please enter your email";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.message.trim()) e.message = "Please write a message";
    return e;
  };

  const handleChange = (key) => (ev) =>
    setForm((p) => ({ ...p, [key]: ev.target.value }));

  const handleSubmit = (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    // If you have no backend, fall back to mailto (opens user's email client)
    setStatus("sending");
    try {
      const subject = encodeURIComponent(`Contact from SHUTTER_BOX — ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`);
      const mailto = `mailto:hello@shutterbox.com?subject=${subject}&body=${body}`;

      // open mail client
      window.location.href = mailto;

      // Simulate success for UI feedback
      setTimeout(() => setStatus("sent"), 600);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`min-h-screen transition-colors duration-500 ${
        theme === "dark"
          ? "bg-gradient-to-b from-[#0a0a0a] via-[#0d0d0f] to-[#141416] text-gray-100"
          : "bg-gradient-to-b from-[#ffffff] via-[#f8fafc] to-[#e2e8f0] text-gray-900"
      }`}
    >
      <header
        className={`relative py-20 text-center border-b ${
          theme === "dark" ? "border-gray-800" : "border-gray-300"
        }`}
      >
        <div
          className={`absolute inset-0 ${
            theme === "dark"
              ? "bg-gradient-to-r from-[#1a1a2e] via-[#16213e] to-[#0f3460]"
              : "bg-gradient-to-r from-[#c7d2fe] via-[#e0e7ff] to-[#f9fafb]"
          } opacity-90`}
        />
        <h1 className="relative text-4xl sm:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-amber-400 to-yellow-300">
          Contact Us
        </h1>
        <p className="relative mt-3 text-gray-300 max-w-2xl mx-auto">
          Have a question, partnership inquiry, or feedback? Send us a message — we read everything.
        </p>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.45 }}
          className={`rounded-xl p-8 shadow-lg ${
            theme === "dark"
              ? "bg-[#111214]/70 border border-gray-800"
              : "bg-white border border-gray-200"
          }`}
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Name</label>
              <input
                value={form.name}
                onChange={handleChange("name")}
                className={`w-full px-4 py-2 rounded-lg focus:outline-none ${
                  theme === "dark"
                    ? "bg-[#0b0b0b] border border-gray-700 text-gray-100"
                    : "bg-gray-50 border border-gray-200 text-gray-900"
                }`}
                placeholder="Your name"
              />
              {errors.name && <p className="text-xs text-rose-400 mt-1">{errors.name}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                value={form.email}
                onChange={handleChange("email")}
                className={`w-full px-4 py-2 rounded-lg focus:outline-none ${
                  theme === "dark"
                    ? "bg-[#0b0b0b] border border-gray-700 text-gray-100"
                    : "bg-gray-50 border border-gray-200 text-gray-900"
                }`}
                placeholder="you@domain.com"
                type="email"
              />
              {errors.email && <p className="text-xs text-rose-400 mt-1">{errors.email}</p>}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Message</label>
              <textarea
                value={form.message}
                onChange={handleChange("message")}
                rows={6}
                className={`w-full px-4 py-3 rounded-lg focus:outline-none resize-y ${
                  theme === "dark"
                    ? "bg-[#0b0b0b] border border-gray-700 text-gray-100"
                    : "bg-gray-50 border border-gray-200 text-gray-900"
                }`}
                placeholder="Tell us what's on your mind..."
              />
              {errors.message && <p className="text-xs text-rose-400 mt-1">{errors.message}</p>}
            </div>

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                disabled={status === "sending"}
                className={`px-5 py-2 rounded-lg font-medium transition ${
                  status === "sending"
                    ? "opacity-70 cursor-wait"
                    : theme === "dark"
                    ? "bg-amber-400 text-gray-900 hover:bg-amber-300"
                    : "bg-gray-900 text-amber-400 hover:bg-gray-800"
                }`}
              >
                {status === "sending" ? "Opening mail..." : "Send Message"}
              </button>

              <div className="text-sm text-gray-400">
                Or email us at{" "}
                <a className="text-amber-300 hover:underline" href="mailto:hello@shutterbox.com">
                  hello@shutterbox.com
                </a>
              </div>
            </div>

            {status === "sent" && (
              <p className="mt-4 text-sm text-emerald-400">Mail client opened — thanks! ✨</p>
            )}
            {status === "error" && (
              <p className="mt-4 text-sm text-rose-400">Something went wrong — try again.</p>
            )}
          </form>
        </motion.div>
      </main>
    </motion.div>
  );
}

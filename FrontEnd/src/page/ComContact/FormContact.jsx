import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export default function FormContact({ motionType = "right" }) {
  const topics = [
    { id: "inquiry", label: "استفسار" },
    { id: "complaint", label: "شكوى" },
    { id: "collaboration", label: "تعاون" },
    { id: "suggestion", label: "اقتراح" },
  ];

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState(null);
  const [serverMessage, setServerMessage] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setServerMessage(null);

    if (form.name && form.email && form.message && selectedTopic) {
      try {
        const payload = {
          subject: selectedTopic,
          name: form.name,
          email: form.email,
          message: form.message,
        };

        const res = await axios.post(
          `${process.env.REACT_APP_API}/api/contact/send`,
          payload
        );

        console.log("API response:", res.data);
        setStatus("success");
        setServerMessage(res.data.message || "تم إرسال رسالتك بنجاح");

        // إعادة تعيين الفورم
        setForm({ name: "", email: "", message: "" });
        setSelectedTopic(null);
      } catch (error) {
        console.error("API error:", error.response?.data || error.message);
        setStatus("error");
        setServerMessage(
          error.response?.data?.message || "حدث خطأ أثناء إرسال الرسالة"
        );
      }
    } else {
      setStatus("error");
      setServerMessage("يرجى ملء جميع الحقول");
    }
  };

  const directionX = motionType === "right" ? 100 : -100;
  const variants = {
    hidden: { opacity: 0, x: directionX },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
    exit: { opacity: 0, x: -directionX, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen w-full p-4 md:p-8 flex items-center justify-center">
      <motion.div
        variants={variants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="relative w-full max-w-md md:max-w-lg lg:max-w-xl p-4 sm:p-6 md:p-10 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.08)] overflow-hidden"
      >
        <form onSubmit={handleSubmit} className="relative space-y-5 z-10 font-cairo">
          <div className="space-y-2">
            <label className="block text-black/80 text-sm md:text-base font-medium">
              اختر الموضوع
            </label>
            <div className="flex flex-wrap gap-3">
              {topics.map((topic) => (
                <motion.button
                  key={topic.id}
                  type="button"
                  onClick={() => setSelectedTopic(topic.id)}
                  whileHover={{ scale: motionType === "right" ? 1.03 : 1.06 }}
                  whileTap={{ scale: 0.95, x: motionType === "right" ? 4 : -4 }}
                  aria-pressed={selectedTopic === topic.id}
                  className={`px-3 py-2 min-w-[86px] sm:min-w-[110px] rounded-xl text-sm md:text-base font-medium transition-all backdrop-blur-md border shadow-sm ${
                    selectedTopic === topic.id
                      ? "bg-black text-white border-black/40"
                      : "bg-white/20 text-black border-white/30 hover:bg-white/30"
                  }`}
                >
                  {topic.label}
                </motion.button>
              ))}
            </div>
          </div>

          <Field label="الاسم" htmlFor="name">
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="اسمك الكامل"
              className="w-full rounded-xl border border-white/30 bg-white/30 px-4 py-3 text-black placeholder-black/60 outline-none focus:ring-2 focus:ring-white/40 transition"
              aria-label="الاسم"
            />
          </Field>

          <Field label="البريد الإلكتروني" htmlFor="email">
            <input
              id="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="example@mail.com"
              className="w-full rounded-xl border border-white/30 bg-white/30 px-4 py-3 text-black placeholder-black/60 outline-none focus:ring-2 focus:ring-white/40 transition"
              aria-label="البريد الإلكتروني"
            />
          </Field>

          <Field label="رسالتك" htmlFor="message">
            <textarea
              id="message"
              rows={4}
              value={form.message}
              onChange={handleChange}
              placeholder=" رسالتك "
              className="w-full resize-none rounded-xl border border-white/30 bg-white/30 px-4 py-3 text-black placeholder-black/60 outline-none focus:ring-2 focus:ring-white/40 transition"
              aria-label="الرسالة"
            />
          </Field>

          <div className="pt-2">
            <motion.button
              type="submit"
              disabled={status === "loading"}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97, x: motionType === "right" ? 4 : -4 }}
              className="w-full rounded-xl bg-black text-white font-semibold tracking-wide py-3 shadow-md hover:bg-black/80 transition disabled:opacity-50"
            >
              {status === "loading" ? "جارٍ الإرسال..." : "إرسال"}
            </motion.button>
          </div>

          {status && (
            <p
              className={`mt-2 text-sm ${
                status === "success"
                  ? "text-green-600"
                  : status === "error"
                  ? "text-red-600"
                  : "text-gray-600"
              }`}
            >
              {serverMessage}
            </p>
          )}
        </form>
      </motion.div>
    </div>
  );
}

function Field({ label, htmlFor, children }) {
  return (
    <label className="block space-y-2" htmlFor={htmlFor}>
      <span className="text-black/80 text-sm md:text-base">{label}</span>
      {children}
    </label>
  );
}
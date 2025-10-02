import React from "react";
import { motion } from "framer-motion";

export default function Footer() {
  const year = new Date().getFullYear();

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const icons = [
    { label: "Facebook", icon: "fab fa-facebook-f", url: "https://facebook.com" },
    { label: "Instagram", icon: "fab fa-instagram", url: "https://instagram.com" },
    { label: "WhatsApp", icon: "fab fa-whatsapp", url: "https://wa.me/201022598078" },
  ];

  return (
    <footer dir="rtl" className="px-4 py-8 sm:px-6 md:py-10 relative overflow-hidden">
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="relative max-w-6xl mx-auto
                   backdrop-blur-xl bg-white/10 border border-white/20
                   shadow-[0_4px_30px_rgba(0,0,0,0.1)]
                   rounded-2xl overflow-hidden
                   before:absolute before:inset-0 before:bg-gradient-to-tr 
                   before:from-white/20 before:to-transparent before:opacity-40 before:-z-10
                   after:absolute after:top-[-50%] after:left-[-50%] 
                   after:w-[200%] after:h-[200%] 
                   after:bg-[radial-gradient(circle,rgba(255,255,255,0.25),transparent_70%)] 
                   after:-z-10"
      >
        <div
          className="relative flex flex-col items-center text-center 
                     md:flex-row md:items-center md:justify-between md:text-right 
                     gap-6 md:gap-8 py-6 px-4"
        >
          {/* حقوق النشر */}
          <motion.div
            variants={fadeUp}
            className="order-3 md:order-1 flex-1 flex justify-center md:justify-start"
          >
            <p className="text-sm md:text-base text-black/80 font-medium">
              © {year} جميع الحقوق محفوظة
            </p>
          </motion.div>

          {/* أيقونات السوشيال */}
          <motion.nav
            variants={fadeUp}
            className="order-1 md:order-2 flex justify-center gap-4 md:gap-6"
          >
            {icons.map((item, i) => (
              <motion.a
                key={i}
                href={item.url}
                aria-label={item.label}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, rotate: 6 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 
                           rounded-full backdrop-blur-lg bg-white/20 
                           border border-white/30 shadow-md 
                           hover:bg-white/30 hover:shadow-lg transition"
              >
                <i className={`${item.icon} text-black text-base sm:text-lg md:text-xl`} />
              </motion.a>
            ))}
          </motion.nav>

          {/* Privacy */}
          <motion.div
            variants={fadeUp}
            className="order-2 md:order-3 flex-1 flex justify-center md:justify-end"
          >
            <a
              href="/privacy"
              className="text-sm md:text-base text-black/70 hover:text-black font-medium transition"
            >
              سياسة الخصوصية و الشروط
            </a>
          </motion.div>
        </div>
      </motion.div>
    </footer>
  );
}

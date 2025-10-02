import React from "react";
import { motion } from "framer-motion";

export default function NavbarAuthButtons({ buttons }) {
  return (
    <>
      {buttons.map(({ name, onClick }) => (
        <motion.button
          key={name}
          onClick={onClick}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 250, damping: 18 }}
          className="relative overflow-hidden py-3 px-6 rounded-xl font-semibold text-[1rem]
            text-black transition-all duration-300 ease-out
            backdrop-blur-xl bg-white/10 border border-white/20 
            shadow-[0_4px_20px_rgba(0,0,0,0.08)]"
        >
          <span className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/20 to-transparent opacity-50 transition-all duration-300" />

          <span className="absolute inset-0 rounded-xl border border-white/30 hover:border-white/60 transition-all duration-300" />

          <span className="relative z-10">{name}</span>
        </motion.button>
      ))}
    </>
  );
}

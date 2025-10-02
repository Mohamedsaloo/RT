import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavbarLinks({ links }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="hidden md:flex items-center gap-4 py-3 px-6 rounded-2xl
        backdrop-blur-xl bg-white/10 border border-white/20 
        shadow-[0_4px_30px_rgba(0,0,0,0.05)] relative overflow-hidden
        before:absolute before:inset-0 before:rounded-2xl 
        before:bg-gradient-to-tr before:from-white/20 before:to-transparent 
        before:opacity-40 before:-z-10
        after:absolute after:top-[-50%] after:left-[-50%] 
        after:w-[200%] after:h-[200%] 
        after:bg-[radial-gradient(circle,rgba(255,255,255,0.25),transparent_70%)] 
        after:-z-10"
    >
      {links.map(({ name, path }) => (
        <NavLink key={name} to={path} className="relative">
          {({ isActive }) => (
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 250, damping: 18 }}
              className={`relative px-4 py-2 rounded-xl font-medium text-[1rem]
                overflow-hidden transition-all duration-300 ease-out
                ${
                  isActive
                    ? "bg-gradient-to-tr from-white/30 to-white/10 text-black shadow-inner"
                    : "bg-white/10 text-black shadow-sm"
                }`}
            >
              <span className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/20 to-transparent opacity-50 transition-all duration-300" />
              <span className="absolute inset-0 rounded-xl border border-white/30 hover:border-white/60 transition-all duration-300" />
              <span className="relative z-10">{name}</span>
            </motion.div>
          )}
        </NavLink>
      ))}
    </motion.div>
  );
}

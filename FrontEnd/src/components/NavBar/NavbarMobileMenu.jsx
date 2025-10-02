import React from "react";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";

export default function NavbarMobileMenu({ links, buttons, onClose }) {
  return (
    <motion.div
      key="mobileMenu"
      initial={{ opacity: 0, y: -40, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.35, ease: [0.25, 0.8, 0.25, 1] }}
      className="md:hidden fixed top-[5rem] left-0 w-full z-50 
        backdrop-blur-xl bg-white/10 border-t border-white/20 shadow-[0_4px_30px_rgba(0,0,0,0.1)]"
    >
      <div
        className="relative overflow-hidden
          before:absolute before:inset-0 before:bg-gradient-to-tr before:from-white/20 before:to-transparent before:opacity-40 before:-z-10
          after:absolute after:top-[-50%] after:left-[-50%] after:w-[200%] after:h-[200%] after:bg-[radial-gradient(circle,rgba(255,255,255,0.25),transparent_70%)] after:-z-10"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ delay: 0.1, duration: 0.3 }}
          className="flex flex-col p-4 gap-3"
        >
          {links.map(({ name, path }) => (
            <NavLink
              key={name}
              to={path}
              onClick={onClose}
              className={({ isActive }) => `
                relative px-4 py-3 rounded-xl font-medium text-[1rem]
                transition-all duration-300 ease-out overflow-hidden
                ${
                  isActive
                    ? "bg-gradient-to-tr from-white/30 to-white/10 text-black shadow-inner"
                    : "bg-white/10 text-black shadow-sm hover:bg-white/20"
                }`}
            >
              <span className="absolute inset-0 rounded-xl backdrop-blur-md bg-gradient-to-br from-white/20 to-transparent opacity-40" />
              <span className="absolute inset-0 rounded-xl border border-white/30 hover:border-white/60 transition-all duration-300" />
              <span className="relative z-10">{name}</span>
            </NavLink>
          ))}

          {buttons.map(({ name, onClick }) => (
            <motion.button
              key={name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                onClick();
                onClose();
              }}
              className="relative px-4 py-3 rounded-xl font-semibold text-white
                bg-gradient-to-tr from-black/90 to-black/70 shadow-lg
                transition-all duration-300"
            >
              <span className="absolute inset-0 rounded-xl border border-white/20 opacity-50" />
              <span className="relative z-10">{name}</span>
            </motion.button>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
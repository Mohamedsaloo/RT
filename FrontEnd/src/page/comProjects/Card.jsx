import React, { useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Tag, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ project = {}, action = () => {} }) {
  const navigate = useNavigate();
  const {
    id = "",
    title = "",
    description = "",
    category = "",
    image = null,
    createdAt = "",
  } = project;

  // tilt effect
  const cardRef = useRef(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateY = useTransform(mouseX, [-100, 100], [9, -9]);
  const rotateX = useTransform(mouseY, [-100, 100], [-6, 6]);
  const translateZ = useTransform(mouseY, [-100, 100], [6, 12]);

  function handleMouse(e) {
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set((x / rect.width) * 200);
    mouseY.set((y / rect.height) * 200);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <motion.article
      ref={cardRef}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ rotateY, rotateX, translateZ, perspective: "1000px" }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 18 }}
      className="w-full max-w-sm h-[21rem] rounded-2xl overflow-hidden shadow-2xl
                 bg-white/8 backdrop-blur-lg border border-white/10 p-3
                 flex flex-col gap-3 transform-gpu will-change-transform relative"
    >
      {/* category badge */}
      <div
        className="absolute top-3 left-3 flex items-center space-x-2 space-x-reverse
                      bg-white/20 backdrop-blur-md rounded-full px-3 py-1 shadow-md"
      >
        <Tag className="w-4 h-4 text-black" />
        <span className="text-xs font-semibold text-black">{category}</span>
      </div>

      {/* image / thumbnail */}
      <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-white/6">
        {image ? (
          <img src={image} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            لا توجد صورة
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/10" />
      </div>

      {/* main content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-base font-bold text-gray-900 leading-tight break-words">
          {title}
        </h3>

        {/* الوصف محدود بسطرين */}
        <p className="text-sm text-gray-700 leading-relaxed line-clamp-2">
          {description}
        </p>

        <div className="flex items-center gap-2 text-sm text-gray-600 mt-auto">
          <Clock className="w-4 h-4" />
          <span>
            {new Date(createdAt).toLocaleDateString("ar-EG", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* action button */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        onClick={() => {
          navigate(`/projects?id=${id}`);
        }}
        className="mt-1 w-full py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/20
                   text-gray-900 font-semibold shadow-md hover:bg-white/30 transition-all"
      >
        عرض
      </motion.button>
    </motion.article>
  );
}

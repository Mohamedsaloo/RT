import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({
  value,
  onChange,
  placeholder = "ابحث عن مشروع...",
  tags = [],
  selectedTag,
  onTagChange,
}) => {
  const [open, setOpen] = useState(false);
  const [dropRight, setDropRight] = useState(false);
  const containerRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const displayTag = selectedTag || (tags.length > 0 ? tags[0] : "");

  // close on outside click
  useEffect(() => {
    function handleClick(e) {
      if (!containerRef.current) return;
      if (!containerRef.current.contains(e.target)) setOpen(false);
    }
    function handleEsc(e) {
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("click", handleClick);
    window.addEventListener("keydown", handleEsc);
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // decide menu placement to avoid overflow (flip to the left/right)
  useEffect(() => {
    if (!buttonRef.current || !menuRef.current) return;
    const btnRect = buttonRef.current.getBoundingClientRect();
    const menuWidth = Math.max(180, btnRect.width); // approximate
    const spaceRight = window.innerWidth - btnRect.right;
    // if not enough space on right, open towards left (dropRight=true => align right)
    setDropRight(spaceRight < menuWidth + 16);
  }, [open, tags.length]);

  // accessibility: stop propagation for clicks inside menu to avoid window click handler
  function stop(e) {
    e.stopPropagation();
  }

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-start gap-3 w-full flex-wrap"
    >
      {/* حقل البحث */}
      <div
        className="flex items-center
          bg-white/10 backdrop-blur-xl
          rounded-2xl shadow-xl
          border border-white/20
          overflow-hidden w-96
          max-w-full"
      >
        <Search className="mx-3 text-gray-600 flex-shrink-0" size={20} />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-3 px-2 text-gray-900 placeholder-gray-500 focus:outline-none"
          aria-label="حقل البحث"
        />
        {value && (
          <button
            onClick={() => onChange({ target: { value: "" } })}
            aria-label="مسح البحث"
            className="
            absolute left-3
            flex items-center justify-center
            w-6 h-6 rounded-full
            hover:bg-white/20 transition
          "
            title="مسح"
          >
            <X size={16} className="text-gray-600" />
          </button>
        )}
      </div>

      {/* زر التصنيفات */}
      {tags.length > 0 && (
        <div className="relative min-w-[130px]">
          <div
            ref={buttonRef}
            onClick={() => setOpen((s) => !s)}
            role="button"
            aria-haspopup="listbox"
            aria-expanded={open}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") setOpen((s) => !s);
              if (e.key === "Escape") setOpen(false);
            }}
            className="
              flex items-center justify-between
              px-4 py-2 rounded-2xl cursor-pointer
              bg-white/10 backdrop-blur-xl
              shadow-xl border border-white/20
              text-gray-900 text-sm
              select-none
            "
          >
            <span className="truncate max-w-[120px]">{displayTag}</span>
            <ChevronDown
              size={18}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                ref={menuRef}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.16 }}
                onClick={stop}
                className={`
                  absolute mt-2 w-full rounded-2xl overflow-hidden z-20
                  bg-white/20 backdrop-blur-xl border border-white/20
                  shadow-lg
                  ${dropRight ? "right-0 left-auto" : "left-0 right-auto"}
                  max-h-64 overflow-auto
                `}
                role="listbox"
                aria-label="قائمة التصنيفات"
              >
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      onTagChange({ target: { value: tag } });
                      setOpen(false);
                    }}
                    role="option"
                    aria-selected={selectedTag === tag}
                    className={`px-4 py-2 text-sm cursor-pointer ${
                      selectedTag === tag
                        ? "bg-white/40 text-gray-900 font-semibold"
                        : "text-gray-700 hover:bg-white/40"
                    }`}
                  >
                    {tag}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default SearchBar;

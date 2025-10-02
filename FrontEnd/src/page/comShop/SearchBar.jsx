import React, { useState } from "react";
import { Search, ChevronDown, Percent, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const SearchBar = ({
  value,
  onChange,
  placeholder = "ابحث عن منتج...",
  tags = [],
  selectedTag,
  onTagChange,
  hasDiscounts = false,
  showDiscounts = false,
  onDiscountClick,
}) => {
  const [open, setOpen] = useState(false);

  // استخدم أول tag كـ placeholder إذا لم يتم اختيار tag
  const displayTag = selectedTag || (tags.length > 0 ? tags[0] : "");

  return (
    <div className="flex items-center justify-start gap-3 w-full">
      {/* حقل البحث */}
      <div
        className="flex items-center
          bg-white/20 backdrop-blur-xl 
          rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.1)]
          border border-white/30 
          overflow-hidden w-96 relative"
      >
        <Search className="mx-3 text-gray-600" size={20} />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent py-3 px-2 text-gray-800 placeholder-gray-500 focus:outline-none"
          aria-label="حقل البحث"
        />
        {/* زر مسح الحقل */}
        {value && (
          <button
            onClick={() => onChange({ target: { value: "" } })}
            className="p-2 text-gray-500 hover:text-gray-700"
            aria-label="مسح الحقل"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* زر التصنيفات */}
      {tags.length > 0 && (
        <div className="relative min-w-[130px]">
          <div
            onClick={() => setOpen(!open)}
            className="
              flex items-center justify-between
              px-4 py-2 rounded-2xl cursor-pointer
              bg-white/20 backdrop-blur-xl
              shadow-[0_8px_32px_rgba(0,0,0,0.1)]
              border border-white/30
              text-gray-800 text-sm
              select-none
            "
          >
            <span>{displayTag}</span>
            <ChevronDown
              size={18}
              className={`transition-transform ${open ? "rotate-180" : ""}`}
            />
          </div>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="
                  absolute mt-2 w-full rounded-2xl overflow-hidden z-20
                  bg-white/30 backdrop-blur-xl border border-white/30
                  shadow-lg
                "
              >
                {tags.map((tag, index) => (
                  <div
                    key={index}
                    onClick={() => {
                      onTagChange({ target: { value: tag } });
                      setOpen(false);
                    }}
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

      {/* زر الخصومات */}
      {hasDiscounts && (
        <button
          onClick={onDiscountClick}
          aria-label="تصفية المنتجات المخفضة"
          className={`
            flex items-center gap-1 px-3 py-2 rounded-xl font-medium text-sm
            backdrop-blur-xl shadow-lg border border-white/30 whitespace-nowrap
            transition
            ${
              showDiscounts
                ? "bg-red-500 text-white"
                : "bg-white/30 text-gray-800 hover:bg-white/40"
            }
          `}
        >
          <Percent size={16} />
          خصومات
        </button>
      )}
    </div>
  );
};

export default SearchBar;

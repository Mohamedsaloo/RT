import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowPathIcon,
  ArrowDownTrayIcon,
  PrinterIcon,
  CodeBracketIcon,
  ShareIcon,
  ClipboardDocumentIcon,
} from "@heroicons/react/24/outline";

const getSelectedText = () => {
  const selection = window.getSelection().toString();
  if (selection) return selection;

  const activeEl = document.activeElement;
  if (
    activeEl &&
    (activeEl.tagName === "INPUT" || activeEl.tagName === "TEXTAREA") &&
    typeof activeEl.selectionStart === "number"
  ) {
    return activeEl.value.substring(activeEl.selectionStart, activeEl.selectionEnd);
  }

  return "";
};

const ContextMenu = () => {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [submenuId, setSubmenuId] = useState(null);
  const [selectedText, setSelectedText] = useState("");

  const menuItems = useMemo(
    () => [
      { id: "reload", label: "إعادة تحميل", icon: ArrowPathIcon, action: () => window.location.reload() },
      { id: "saveAs", label: "حفظ باسم", icon: ArrowDownTrayIcon, action: () => console.log("📥 حفظ الملف باسم...") },
      { id: "print", label: "طباعة", icon: PrinterIcon, action: () => window.print() },
      { id: "viewSource", label: "عرض المصدر", icon: CodeBracketIcon, action: () => window.open("view-source:" + window.location.href) },

      {
        id: "copy",
        label: "نسخ",
        icon: ClipboardDocumentIcon,
        action: () => {
          if (selectedText) {
            navigator.clipboard.writeText(selectedText);
          }
        },
        condition: () => selectedText.length > 0,
      },

      { id: "share", label: "مشاركة", icon: ShareIcon, action: () => console.log("🔗 مشاركة...") },
    ],
    [selectedText]
  );

  useEffect(() => {
    const handleContextMenu = (e) => {
      if (window.innerWidth <= 1024) return;

      e.preventDefault();
      setSelectedText(getSelectedText());

      const menuWidth = 240;
      const menuHeight = 300;
      let x = e.pageX;
      let y = e.pageY;

      if (x + menuWidth > window.innerWidth) x = window.innerWidth - menuWidth - 10;
      if (y + menuHeight > window.innerHeight) y = window.innerHeight - menuHeight - 10;

      setPos({ x, y });
      setVisible(true);
      setSubmenuId(null);
    };

    const handleClick = () => setVisible(false);
    const handleEsc = (e) => e.key === "Escape" && setVisible(false);

    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -10 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="fixed z-50 min-w-[220px] rounded-2xl
            backdrop-blur-xl bg-white/20 border border-white/20
            shadow-[0_4px_20px_rgba(0,0,0,0.1)]
            overflow-hidden p-2 text-right"
          style={{ top: pos.y, left: pos.x }}
          role="menu"
        >
          {menuItems
            .filter((item) => !item.condition || item.condition())
            .map(({ id, label, icon: Icon, action, submenu }) => (
              <div
                key={id}
                onClick={() => {
                  if (submenu) {
                    setSubmenuId(id === submenuId ? null : id);
                  } else if (action) {
                    action();
                    setVisible(false);
                  }
                }}
                className="relative flex items-center justify-between gap-3 px-3 py-2 mb-1 rounded-xl cursor-pointer
                  bg-white/10 text-black font-medium text-[0.95rem]
                  transition-all duration-300 ease-out
                  hover:bg-white/20 hover:shadow-md hover:scale-[1.02] active:scale-95"
                role="menuitem"
              >
                <span>{label}</span>
                <Icon className="h-5 w-5 text-black/80" />
              </div>
            ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ContextMenu;

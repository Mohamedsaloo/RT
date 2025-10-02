import React from "react";
import { Code2 } from "lucide-react";

export default function NavbarLogo({ texts = [] }) {
  return (
    <div className="flex items-center gap-3 relative">
      {/* اللوجو */}
      <div className="flex items-center gap-2">
        <Code2 size={26} className="text-black" />
        <span className="text-2xl font-bold text-black select-none">سالو</span>
      </div>

      <div className="relative">
        <div
          className="absolute top-1/2 left-full -translate-y-1/2 ml-3
            h-8 inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[12px]
            backdrop-blur-lg bg-white/20 border border-white/30
            shadow-[0_4px_12px_rgba(0,0,0,0.15)] text-black"
        >
          {/* إضاءة خلفية */}
          <div
            className="absolute inset-0 rounded-xl 
              bg-gradient-to-br from-white/40 via-transparent to-white/10 
              opacity-60 pointer-events-none"
          />

          {/* أيقونة صغيرة */}
          <svg
            width="16"
            height="16"
            viewBox="0 0 20 20"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            className="text-black/50 drop-shadow"
          >
            <path d="M17.665 10C17.665 10.6877 17.1785 11.2454 16.5488 11.3945L16.4219 11.4189C14.7098 11.6665 13.6129 12.1305 12.877 12.8623C12.1414 13.5938 11.6742 14.6843 11.4238 16.3887C11.3197 17.0973 10.7182 17.665 9.96484 17.665C9.27085 17.665 8.68836 17.1772 8.53613 16.5215C8.12392 14.7459 7.6623 13.619 6.95703 12.8652C6.31314 12.1772 5.39414 11.7268 3.88672 11.4688L3.57715 11.4199C2.88869 11.319 2.33496 10.734 2.33496 10C2.33496 9.26603 2.88869 8.681 3.57715 8.58008L3.88672 8.53125C5.39414 8.27321 6.31314 7.82277 6.95703 7.13477C7.6623 6.38104 8.12392 5.25413 8.53613 3.47852L8.56934 3.35742C8.76133 2.76356 9.31424 2.33496 9.96484 2.33496C10.7182 2.33497 11.3197 2.9027 11.4238 3.61133L11.5283 4.22266C11.7954 5.58295 12.2334 6.49773 12.877 7.1377C13.6129 7.86952 14.7098 8.33351 16.4219 8.58105C17.1119 8.68101 17.665 9.26667 17.665 10Z"></path>
          </svg>

          {texts.length > 0 ? (
            texts.map((txt, i) => (
              <span
                key={i}
                className="relative z-10 uppercase whitespace-nowrap text-[12px]"
              >
                {txt}
              </span>
            ))
          ) : (
            <span className="relative z-10 uppercase whitespace-nowrap text-[12px]">
              2025
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

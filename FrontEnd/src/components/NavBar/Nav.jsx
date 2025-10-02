import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence } from "framer-motion";
import useTexts from "../../Hooks/useText";

import NavbarLogo from "./NavbarLogo";
import NavbarLinks from "./NavbarLinks";
import NavbarAuthButtons from "./NavbarAuthButtons";
import NavbarMobileMenu from "./NavbarMobileMenu";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const links = [
    { name: "الرئيسية", path: "/" },
    { name: "المشاريع", path: "/projects" },
    { name: "المتجر", path: "/shop" },
    { name: "تواصل", path: "/contact" },
  ];

  const authButtons = [
    { name: "ابدأ دلوقتي", onClick: () =>(window.open("/contact")) },
  ];

  const { texts } = useTexts("banner");

  return (
    <>
      <nav
        className="fixed top-0 left-0 w-full z-50
             bg-white/10 backdrop-blur-xl"
        role="navigation"
      >
        {" "}
        <div className="max-w-7xl mx-auto py-2 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 relative">
            {/* Logo + Banner */}
            <NavbarLogo texts={texts} />

            {/* Links (Desktop) */}
            <NavbarLinks links={links} />

            {/* Auth + Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <div className="hidden md:flex gap-2">
                <NavbarAuthButtons buttons={authButtons} />
              </div>
              <div className="flex md:hidden">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  aria-label="Toggle menu"
                  className="p-2 rounded-md text-black transition-colors"
                >
                  {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <NavbarMobileMenu
            links={links}
            buttons={authButtons}
            onClose={() => setMenuOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}

import React from "react";
import Typed from "typed.js";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export default function Home() {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  const roleRef = React.useRef(null);

  React.useEffect(() => {
    if (!roleRef.current) return;

    const typed = new Typed(roleRef.current, {
      strings: [
        "بشتغل فرونت اند",
        "بشتغل باك اند",
        "فل ستاك ديفيلوبر",
        "بعمل مواقع وتطبيقات ويب",
      ],
      typeSpeed: 70,
      backSpeed: 45,
      backDelay: 1400,
      loop: true,
      showCursor: false,
    });

    return () => typed.destroy();
  }, []);

  return (
    <div
      dir="rtl"
      className="min-h-screen flex flex-col justify-between pt-24
      relative overflow-hidden px-8"
    >
      <Helmet>
        <title>الرئيسية - سالو</title>
        <meta
          name="description"
          content="محمد سالو - مطور ويب مصري. بشتغل على إنشاء مشاريع ومواقع وتطبيقات ويب."
        />
        <meta
          name="keywords"
          content="محمد سالو, مطور ويب, فرونت اند, باك اند, فل ستاك, مواقع, تطبيقات ويب"
        />
        <meta name="author" content="محمد سالو" />
        <link rel="canonical" href={currentUrl} />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="المطور محمد سالو"
        />
        <meta
          property="og:description"
          content="محمد سالو - مطور ويب مصري. بشتغل على إنشاء مشاريع ومواقع وتطبيقات ويب."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="محمد سالو" />
        <meta property="og:image" content="/fkg.jpg" />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="الرئيسية - سالو"
        />
        <meta
          name="twitter:description"
          content="محمد سالو - مطور ويب مصري. بشتغل على إنشاء مشاريع ومواقع وتطبيقات ويب."
        />
        <meta name="twitter:image" content="/fkg.jpg" />

        {/* Schema.org JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "محمد سالو",
            url: window.location.href,
            jobTitle: "الرئيسية - سالو",
            image: "/fkg.jpg",
            description:
            "محمد سالو - مطور ويب مصري. بشتغل على إنشاء مشاريع ومواقع وتطبيقات ويب."
          })}
        </script>
      </Helmet>

      <div className="absolute inset-0 opacity-6 pointer-events-none">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle fill="#000" cx="10" cy="10" r="1" opacity="0.06"></circle>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center flex-grow text-right">
        <div className="space-y-6 order-2 md:order-1 px-4 md:px-0">
          <motion.span
            className="inline-block text-lg font-medium tracking-wide text-gray-600"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 }}
          >
            ازيك انا
          </motion.span>

          <motion.h1
            className="text-4xl md:text-6xl font-extrabold leading-tight text-black"
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            محمد سالو
          </motion.h1>

          <div className="h-1 w-28 bg-black/60 rounded-full mt-2 ml-auto"></div>

          <div className="h-14 overflow-hidden">
            <motion.span
              ref={roleRef}
              className="block text-2xl md:text-3xl font-semibold text-gray-700 leading-[2.2rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.36, duration: 0.5 }}
            />
          </div>

          <motion.p
            className="text-base md:text-lg text-gray-700 max-w-xl leading-relaxed ml-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.44 }}
          >
            بحب اشتغل على الويب وبعمل مواقع حديثة وسهلة الاستخدام بحاول اخلي
            الشغل نضيف والتجربة سهلة من غير تعقيد
          </motion.p>

          <div className="flex flex-wrap gap-4 pt-2 justify-start">
            <Link
              to="/contact"
              className="inline-flex items-center px-6 py-3 rounded-xl font-semibold text-black
              backdrop-blur-xl bg-white/30 border border-white/40
              shadow-[0_4px_20px_rgba(0,0,0,0.1)]
              transition transform hover:scale-105 active:scale-95"
            >
              كلمني
            </Link>

            <Link
              to="/projects"
              className="inline-flex items-center px-6 py-3 rounded-xl font-medium text-black
              backdrop-blur-xl bg-white/20 border border-white/30
              shadow-[0_4px_20px_rgba(0,0,0,0.08)]
              transition hover:bg-white/30 hover:scale-105 active:scale-95"
            >
              شغلي
            </Link>
          </div>
        </div>

        <motion.div
          className="flex justify-center md:justify-end relative order-1 md:order-2 mb-8 md:mb-0"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
        >
          <div
            className="relative w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden 
            border-4 border-white/40 shadow-2xl backdrop-blur-lg"
          >
            <img alt="" src="/fkg.jpg" className="w-full h-full object-cover" />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

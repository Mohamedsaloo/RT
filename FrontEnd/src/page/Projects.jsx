import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SearchBar from "./comProjects/SearchBar";
import ProjectCard from "./comProjects/Card";
import { useProjects } from "../Hooks/useProject";
import Show from "./comProjects/Show";

const Projects = () => {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  const {
    projects,
    loading,
    tags,
    search,
    selectedTag,
    setSearch,
    setSelectedTag,
    page,
    nextPage,
    prevPage,
    total,
    pageSize,
  } = useProjects();

  return (
    <div
      dir="rtl"
      className="relative min-h-screen px-4 md:px-6 pt-32 pb-32 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 overflow-hidden"
    >
      <Helmet>
        <title>مشاريعي - سالو</title>
        <meta
          name="description"
          content="مشاريع محمد سالو كمبرمج مصري، مجموعة من الشغل اللي بعمله وبحبه في البرمجة وتطوير الويب."
        />
        <meta
          name="keywords"
          content="محمد سالو, مشاريعي, مبرمج مصري, مشاريع برمجة, React, شغل سالو"
        />
        <meta name="author" content="محمد سالو" />
        <link rel="canonical" href={currentUrl} />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="مشاريعي | سالو" />
        <meta
          property="og:description"
          content="مشاريع محمد سالو كمبرمج مصري، مجموعة من الشغل اللي بعمله وبحبه في البرمجة وتطوير الويب."
        />

        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="محمد سالو" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="مشاريعي - سالو" />
        <meta
          name="twitter:description"
          content="مشاريع محمد سالو كمبرمج مصري، مجموعة من الشغل اللي بعمله وبحبه في البرمجة وتطوير الويب."
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "مشاريعي - سالو",
            description:
              "مشاريع محمد سالو كمبرمج مصري، مجموعة من الشغل اللي بعمله وبحبه في البرمجة وتطوير الويب.",
            author: {
              "@type": "Person",
              name: "محمد سالو",
            },
            url: currentUrl,
          })}
        </script>
      </Helmet>
      <nav className="flex items-center justify-between text-sm text-gray-600 mb-10 relative z-20">
        <div className="flex items-center">
          <span className="text-gray-900 font-medium">مشاريعي</span>
          <ChevronLeft size={16} className="mx-2 text-gray-400" />
          <Link to="/" className="hover:text-gray-900 transition">
            الرئيسية
          </Link>
        </div>
      </nav>
      <div className="relative z-10 max-w-3xl ml-auto text-center md:text-right">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
        >
          مشاريعي
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg text-gray-700 mt-6"
        >
          هنا جمعت شوية من الشغل اللي بحبه وبعمله بإيدي.
        </motion.p>
      </div>
      {/* SearchBar مربوط مباشرة مع الهوك */}
      <div className="relative z-10 mt-12 flex gap-3 w-full max-md:flex-col">
        <SearchBar
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث عن مشروع..."
          tags={tags}
          selectedTag={selectedTag}
          onTagChange={(e) => setSelectedTag(e.target.value)}
        />
      </div>
      <div className="container my-8 px-4">
        <div className="grid items-start justify-items-center gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {loading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="relative w-full h-60 rounded-2xl overflow-hidden 
                           bg-white/10 backdrop-blur-md 
                           shadow-[0_8px_30px_rgba(0,0,0,0.3)] 
                           border border-white/20 group"
              >
                {/* Skeleton */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden">
                  <div
                    className="absolute -inset-[200%] bg-gradient-to-r 
                                  from-transparent via-white/20 to-transparent 
                                  animate-slide-light rotate-12"
                  />
                </div>
                <div className="relative z-10 p-4 space-y-3">
                  <div className="h-24 bg-gradient-to-r from-gray-200/30 via-gray-300/40 to-gray-200/30 rounded-xl" />
                  <div className="h-4 w-2/3 rounded bg-white/30" />
                  <div className="h-3 w-full rounded bg-white/20" />
                  <div className="h-3 w-1/2 rounded bg-white/20" />
                </div>
              </motion.div>
            ))
          ) : projects.length > 0 ? (
            projects.map((proj, i) => (
              <motion.div
                key={proj._id || proj.id || i}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.36, delay: i * 0.04 }}
              >
                <ProjectCard project={proj} />
              </motion.div>
            ))
          ) : (
            <div className="col-span-full text-center text-gray-600 py-12">
              لا توجد مشاريع
            </div>
          )}
        </div>
      </div>
      {total > pageSize && (
        <div className="flex items-center justify-center gap-4 mt-12 mb-16">
          <button
            onClick={prevPage}
            disabled={page === 0}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 shadow-md 
                  hover:bg-white/20 disabled:opacity-40 transition"
          >
            السابق
          </button>
          <span className="text-sm text-gray-700">
            صفحة {page + 1} — إجمالي {Math.ceil(total / pageSize)}
          </span>
          <button
            onClick={nextPage}
            disabled={(page + 1) * pageSize >= total}
            className="px-4 py-2 rounded-lg bg-white/10 border border-white/20 shadow-md 
                  hover:bg-white/20 disabled:opacity-40 transition"
          >
            التالي
          </button>
        </div>
      )}
      <Show projects={projects} />
    </div>
  );
};

export default Projects;

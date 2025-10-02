import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";
import SearchBar from "./comShop/SearchBar";
import ProductCard from "./comShop/Card";
import useShop from "../Hooks/useShop";

const Shop = () => {

  const {
    filteredProducts,
    tags,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    showDiscounts,
    setShowDiscounts,
    hasDiscounts,
    loading,
  } = useShop();

  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4, ease: "easeOut" },
    }),
  };


  return (
    <div
      className="relative min-h-screen px-6 pt-32
        bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 
        overflow-hidden"
      dir="rtl"
    >
      {/*  SEO */}
      <Helmet>
        <title>متجر - سالو</title>

        {/* Meta SEO */}
        <meta name="description" content="متجر سالو للأدوات البرمجية." />
        <meta
          name="keywords"
          content="متجر سالو, محمد سالو, سالو, أدوات برمجية, أدوات تطوير, Tools, أدوات React, أدوات JavaScript, أدوات Frontend, أدوات Backend, مكتبات برمجية, كود جاهز, مشاريع برمجية, تطوير مواقع, أدوات مطورين"
        />
        <meta name="author" content="سالو" />
        <link rel="canonical" href={currentUrl} />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="متجر سالو" />
        <meta property="og:description" content="متجر سالو للأدوات البرمجية." />
        <meta
          property="og:image"
          content="https://example.com/shop-preview.jpg"
        />
        <meta
          property="og:url"
          content={typeof window !== "undefined" ? window.location.href : ""}
        />
        <meta property="og:site_name" content="سالو" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="متجر سالو" />
        <meta
          name="twitter:description"
          content="متجر سالو للأدوات البرمجية."
        />

        {/* JSON-LD Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Store",
            name: "متجر سالو",
            description: "متجر سالو للأدوات البرمجية.",
            url: currentUrl,
            author: { "@type": "Person", name: "سالو" },
          })}
        </script>
      </Helmet>

      {/* الناف */}
      <nav className="flex items-center justify-between text-sm text-gray-600 mb-10 relative z-20">
        <div className="flex items-center">
          <Link to="/" className="hover:text-gray-900 transition">
            الرئيسية
          </Link>
          <ChevronLeft size={16} className="mx-2 text-gray-400" />
          <span className="text-gray-900 font-medium">المتجر</span>
        </div>
      </nav>

      {/* الهيرو */}
      <div className="relative z-10 max-w-3xl">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
          المتجر
        </h1>
        <p className="text-lg text-gray-700 mt-6">
          اكتشف أحدث أدوات البرمجة والمواقع المميزة بعروض حصرية تناسبك
        </p>
      </div>

      {/* البحث والفلترة */}
      <div className="relative z-10 mt-12 flex gap-3 w-full max-md:flex-col">
        <SearchBar
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          tags={tags}
          selectedTag={selectedTag}
          onTagChange={(e) => setSelectedTag(e.target.value)}
          hasDiscounts={hasDiscounts}
          showDiscounts={showDiscounts}
          onDiscountClick={() => setShowDiscounts(!showDiscounts)}
        />
      </div>

      {/* المنتجات */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-10 justify-center justify-items-center">
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
        ) : filteredProducts.length > 0 ? (
          <AnimatePresence>
            {filteredProducts.map((p, i) => (
              <motion.div
                key={p.id}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: 20 }}
              >
                <ProductCard product={p} interactive />
              </motion.div>
            ))}
          </AnimatePresence>
        ) : (
          <p className="text-gray-600 text-lg">لا توجد منتجات مطابقة</p>
        )}
      </div>
    </div>
  );
};

export default Shop;

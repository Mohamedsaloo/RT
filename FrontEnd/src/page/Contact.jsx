import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import Form from "./ComContact/FormContact";

const Contact = () => {
  const location = useLocation();
  const currentUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  return (
    <div
      dir="rtl"
      className="relative min-h-screen px-6 pt-32
      bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 
      overflow-hidden"
    >
      <Helmet>
        <title>تواصل معي - سالو</title>

        <meta
          name="description"
          content="تواصل مع محمد سالو مباشرة لأي استفسار أو تعاون شخصي أو شغل. أنا متاح للرد عليك بنفسي."
        />
        <meta
          name="keywords"
          content="محمد سالو, تواصل معي, اتصل بي, تواصل شخصي, سالو, Contact, استفسارات, تعاون"
        />
        <meta name="author" content="محمد سالو" />
        <link rel="canonical" href={currentUrl} />

        {/* OpenGraph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="تواصل معي - سالو" />
        <meta
          property="og:description"
          content="تواصل مع محمد سالو مباشرة لأي استفسار أو تعاون شخصي أو شغل. أنا متاح للرد عليك بنفسي."
        />

        <meta property="og:url" content={currentUrl} />
        <meta property="og:site_name" content="محمد سالو" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="تواصل معي - سالو" />
        <meta
          name="twitter:description"
          content="تواصل مع محمد سالو مباشرة لأي استفسار أو تعاون شخصي أو شغل. أنا متاح للرد عليك بنفسي."
        />

        {/* JSON-LD */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "تواصل معي - سالو",
            description:
              "تواصل مع محمد سالو مباشرة لأي استفسار أو تعاون شخصي أو شغل. أنا متاح للرد عليك بنفسي.",
            author: {
              "@type": "Person",
              name: "محمد سالو",
            },
            url: currentUrl,
          })}
        </script>
      </Helmet>

      {/* الناف */}
      <nav className="flex items-center justify-between text-sm text-gray-600 mb-10 relative z-20">
        <div className="flex items-center">
          <span className="text-gray-900 font-medium">تواصل</span>
          <ChevronLeft size={16} className="mx-2 text-gray-400" />
          <Link to="/" className="hover:text-gray-900 transition">
            الرئيسية
          </Link>
        </div>
      </nav>

      {/* الهيرو */}
      <div className="relative z-10 max-w-3xl ml-auto text-center md:text-right">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight"
        >
          تواصل معي
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
          className="text-lg text-gray-700 mt-6"
        >
          كبر ذاتك و شغلك مع سالو وقدم للعالم أفضل ما عندك
        </motion.p>
      </div>

      <Form />
    </div>
  );
};

export default Contact;

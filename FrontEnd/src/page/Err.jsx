import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet-async";

const Error = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center
      bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300
      relative overflow-hidden px-8 text-center"
    >
      <Helmet>
        <title>404 - الصفحة غير موجودة</title>
        <meta name="description" content="الصفحة التي تبحث عنها غير موجودة أو حدث خطأ." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-lg text-gray-600 mb-8">
        الصفحة غير موجودة أو حدث خطأ ما.
      </p>

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 px-6 py-3 
        rounded-2xl border border-white/40 
        bg-white/20 backdrop-blur-md shadow-lg 
        text-gray-800 font-medium hover:bg-white/30 transition"
      >
        <ArrowLeft size={20} />
        العودة للصفحة السابقة
      </button>
    </div>
  );
};

export default Error;

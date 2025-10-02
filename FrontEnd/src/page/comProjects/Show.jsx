import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { X, Link as LinkIcon, LucideArrowUpRightFromSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";

const Show = ({ projects = [] }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const params = new URLSearchParams(location.search);
  const id = params.get("id");

  const project = projects.find((p) => p.id === id);

  if (!id || !project) return null;

  const formattedDate = new Date(project.createdAt).toLocaleDateString(
    "ar-EG",
    {
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const closeModal = () => {
    params.delete("id");
    navigate({ search: params.toString() });
  };

  const shareUrl = `${window.location.origin}/projects?id=${project.id}`;

  const copyLink = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="backdrop"
        className="fixed top-0 left-0 w-full min-h-screen z-[999] backdrop-blur-sm flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <Helmet>
          <meta name="description" content={project.description} />
          <link
            rel="canonical"
            href={`${window.location.origin}/projects?id=${project.id}`}
          />
          <meta property="og:title" content={project.title} />
          <meta property="og:description" content={project.description} />
          {project.image && <meta property="og:image" content={project.image} />}
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={project.title} />
          <meta name="twitter:description" content={project.description} />
          {project.image && <meta name="twitter:image" content={project.image} />}
        </Helmet>

        <motion.div
          key={project.id}
          className="relative bg-white/20 backdrop-blur-lg border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full p-4 text-black"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <button
            onClick={closeModal}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/30 hover:bg-white/50 transition"
          >
            <X className="w-5 h-5 text-black" />
          </button>

          {/* زر نسخ الرابط فوق المشروع */}
          <div className="flex justify-end mb-2">
            <button
              onClick={copyLink}
              className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-lg hover:bg-white/30 transition"
            >
              <LinkIcon className="w-4 h-4" /> نسخ الرابط
            </button>
          </div>

          {project.image && (
            <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden bg-white/6 mb-4">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/10" />
            </div>
          )}

          <h2 className="text-xl font-bold mb-2 drop-shadow-md break-words">
            {project.title}
          </h2>

          <p className="text-sm text-gray-800 mb-4 drop-shadow-sm line-clamp-4">
            {project.description}
          </p>

          <div className="flex justify-between items-center text-sm text-gray-700 mb-4">
            <span className="px-3 py-1 bg-white/30 text-black rounded-full shadow-sm">
              {project.category}
            </span>
            <span className="drop-shadow-sm">{formattedDate}</span>
          </div>

          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex justify-center items-center gap-2 w-full py-2 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 text-gray-900 font-semibold shadow-md hover:bg-white/30 transition-all"
            >
              زيارة المشروع <LucideArrowUpRightFromSquare className="w-4 h-4" />
            </a>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Show;

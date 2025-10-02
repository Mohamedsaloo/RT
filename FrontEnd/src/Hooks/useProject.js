import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function useProjects(pageSize = 8) {
  const API_BASE = process.env.REACT_APP_API || "http://localhost:5000";

  const [allProjects, setAllProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [tags, setTags] = useState(["الكل"]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("الكل");

  // pagination
  const [page, setPage] = useState(0);

  const fetchProjects = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const url = `${API_BASE}/api/projects`;
      const { data } = await axios.get(url);

      if (!data || !data.data) {
        throw new Error("الرد غير متوقع من السيرفر");
      }

      setAllProjects(data.data);
      setTags(["الكل", ...new Set(data.data.map((p) => p.category))]);
    } catch (err) {
      console.error("❌ Error fetching projects:", err);
      setError("تعذر تحميل المشاريع");
      setAllProjects([]);
      setTags(["الكل"]);
    } finally {
      setLoading(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  useEffect(() => {
    let filtered = [...allProjects];

    if (search.trim()) {
      const q = search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title?.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q)
      );
    }

    if (selectedTag !== "الكل") {
      filtered = filtered.filter((p) => p.category === selectedTag);
    }

    // Pagination
    const start = page * pageSize;
    const paginated = filtered.slice(start, start + pageSize);

    setProjects(paginated);
  }, [search, selectedTag, allProjects, page, pageSize]);

  const total = allProjects.filter((p) =>
    selectedTag === "الكل"
      ? true
      : p.category === selectedTag
  ).length;

  return {
    projects,
    tags,
    loading,
    error,
    search,
    selectedTag,
    setSearch,
    setSelectedTag,
    page,
    setPage,
    total,
    pageSize,
    nextPage: () => setPage((p) => p + 1),
    prevPage: () => setPage((p) => Math.max(0, p - 1)),
  };
}
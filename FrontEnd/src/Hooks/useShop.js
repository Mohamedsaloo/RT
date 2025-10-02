import { useState, useMemo, useEffect } from "react";
import axios from "axios";

/*
* Custom hook to debounce a value
* Useful for search inputs to reduce number of requests
*/
function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}

/*
* Hook to manage shop products
* Handles fetching, caching, filtering, and processing
* Fully production-ready: no console errors or backend URLs exposed
*/
export default function useShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("الكل");
  const [showDiscounts, setShowDiscounts] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(false);

  const debouncedSearch = useDebounce(searchQuery, 400);

  /*
  * Fetch products with caching
  * Uses localStorage to cache results for 5 minutes
  */
  useEffect(() => {
    const cached = localStorage.getItem("products");
    const cachedAt = localStorage.getItem("products_cachedAt");

    if (cached && cachedAt && Date.now() - cachedAt < 5 * 60 * 1000) {
      setProducts(JSON.parse(cached));
      setLoading(false);
    } else {
      fetchProducts();
    }
  }, []);

  /*
  * Fetch products from API
  * Handles caching, loading, and error state
  * Errors are silently handled without exposing backend URLs
  */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${process.env.REACT_APP_API}/api/products`);
      setProducts(res.data);

      localStorage.setItem("products", JSON.stringify(res.data));
      localStorage.setItem("products_cachedAt", Date.now());
      setError(null);
    } catch {
      /*
      * Fallback to cached products if API fails
      * No console logs or API details exposed
      */
      const cached = localStorage.getItem("products");
      if (cached) {
        setProducts(JSON.parse(cached));
      }
      setError("An error occurred while fetching data");
    } finally {
      setLoading(false);
    }
  };

  /*
  * Process products
  * Calculates discounted price and ensures valid image
  */
  const processedProducts = useMemo(() => {
    return products.map((p) => {
      const discountedPrice = p.discount
        ? Number((p.price * (1 - p.discount / 100)).toFixed(2))
        : p.price;
      const image =
        p.image && p.image.trim() !== "" ? p.image : "/dkgk78778.png";
      return { ...p, discountedPrice, image };
    });
  }, [products]);

  /*
  * Extract unique tags from products
  */
  const tags = useMemo(
    () => [...new Set(processedProducts.map((p) => p.tag))],
    [processedProducts]
  );

  /*
  * Filter products based on search, tag, discounts, and stock
  */
  const filteredProducts = useMemo(() => {
    return processedProducts.filter((p) => {
      const matchesSearch = p.name
        .toLowerCase()
        .includes(debouncedSearch.toLowerCase());
      const matchesTag = selectedTag !== "الكل" ? p.tag === selectedTag : true;
      const matchesDiscount = showDiscounts ? p.discount > 0 : true;
      const matchesStock = inStockOnly ? p.stock > 0 : true;
      return matchesSearch && matchesTag && matchesDiscount && matchesStock;
    });
  }, [
    processedProducts,
    debouncedSearch,
    selectedTag,
    showDiscounts,
    inStockOnly,
  ]);

  /*
  * Check if there are any products with discounts
  */
  const hasDiscounts = useMemo(
    () => processedProducts.some((p) => p.discount > 0),
    [processedProducts]
  );

  return {
    products: processedProducts,
    filteredProducts,
    tags,
    searchQuery,
    setSearchQuery,
    selectedTag,
    setSelectedTag,
    showDiscounts,
    setShowDiscounts,
    inStockOnly,
    setInStockOnly,
    hasDiscounts,
    loading,
    error,
    refresh: fetchProducts,
  };
}

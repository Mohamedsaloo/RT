import { useEffect, useState } from "react";
import axios from "axios";

/*
* Custom hook to fetch text sections from API
* Handles loading state and silently manages errors
* Fully production-ready: no console errors or backend URLs exposed
*/
export default function useTexts(sectionKey) {
  const [texts, setTexts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /*
    * Fetch texts from API
    * Updates state for the given section key
    * Silently handles errors without exposing backend details
    */
    async function fetchTexts() {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/api/texts`);
        const data = res.data;

        if (data.length > 0 && data[0].sections[sectionKey]) {
          setTexts(data[0].sections[sectionKey]);
        }
      } catch {
        /*
        * Silently fail if API is unreachable
        * No console logs or sensitive data exposed
        */
        setTexts([]);
      } finally {
        setLoading(false);
      }
    }

    fetchTexts();
  }, [sectionKey]);

  return { texts, loading };
}

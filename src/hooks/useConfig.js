import { useState, useEffect } from "react";

/**
 * Custom hook to fetch and use configuration from public/config.json
 * This allows you to change images and content without modifying code
 *
 * Usage:
 * const config = useConfig();
 * <img src={config?.images?.hero} alt="Hero" />
 */
export const useConfig = () => {
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/config.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load config");
        }
        return res.json();
      })
      .then((data) => {
        setConfig(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading config:", err);
        setError(err);
        setLoading(false);
      });
  }, []);

  return { config, loading, error };
};

export default useConfig;

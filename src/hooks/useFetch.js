import { useEffect } from "react";

export function useFetch(url, setData) {
  const apiBase = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetch(apiBase + url)
      .catch(console.error)
      .then((res) => res.json())
      .then(setData);
  }, [url, setData]);
}

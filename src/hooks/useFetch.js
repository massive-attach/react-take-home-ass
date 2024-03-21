import { useEffect } from "react";

export function useFetch(url, setData) {
  const apiBase = import.meta.env.VITE_API_URL;
  useEffect(() => {
    fetch(apiBase + url)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .catch(console.error)
      .then(setData);
  }, [url, setData]);
}

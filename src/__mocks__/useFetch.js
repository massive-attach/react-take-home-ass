import { useEffect } from "react";
import { getBallotData } from "../lib/ballot";

// mock
export function useFetch(url, setData) {
  useEffect(() => {
    setData(getBallotData);
  }, [url, setData]);
}

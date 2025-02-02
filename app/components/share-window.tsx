"use client"
import { useLayoutEffect, useState } from "react";

const useShareWindow = () => {
  const [urlState, setUrl] = useState<Window & typeof globalThis>();
  useLayoutEffect(() => {
    if (typeof window != "undefined") {
      setUrl(window);
    }
  }, []);
  return urlState;
};

export default useShareWindow;

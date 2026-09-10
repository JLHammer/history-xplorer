import { useEffect, useState } from "react";

export const useScrolledToBottom = (tolerance = 0) => {
  const [atBottom, setAtBottom] = useState(false);

  useEffect(() => {
    const check = () => {
      const { scrollY, innerHeight } = window;
      const { scrollHeight, clientHeight } = document.documentElement;
      const viewport = Math.max(innerHeight, clientHeight);

      setAtBottom(scrollY + viewport >= scrollHeight - tolerance);
    };

    check();
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.visualViewport?.addEventListener("resize", check);
    const observer = new ResizeObserver(check);
    observer.observe(document.documentElement);

    return () => {
      window.removeEventListener("scroll", check);
      window.removeEventListener("resize", check);
      window.visualViewport?.removeEventListener("resize", check);
      observer.disconnect();
    };
  }, [tolerance]);

  return atBottom;
};

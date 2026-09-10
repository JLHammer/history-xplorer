import { useEffect, useState } from "react";

export const useScrolledPastTop = () => {
  const [scrolledPast, setScrolledPast] = useState(false);

  useEffect(() => {
    const check = () => setScrolledPast(window.scrollY > window.innerHeight);

    check();
    window.addEventListener("scroll", check, { passive: true });

    return () => window.removeEventListener("scroll", check);
  }, []);

  return scrolledPast;
};

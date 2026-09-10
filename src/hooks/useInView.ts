import { useEffect, useState } from "react";
import type { RefObject } from "react";

export const useInView = (
  ref: RefObject<Element | null>,
  rootMargin = "0px",
) => {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
};

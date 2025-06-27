import { useEffect, useState, useRef } from "react";

type Options = {
  root?: React.RefObject<Element | null>;
  rootMargin?: string;
  threshold?: number;
};

export function useInView<T extends Element>(
  isDragging: boolean,
  enabled: boolean,
  options?: Options
) {
  const ref = useRef<T>(null);
  const [isInView, setIsInView] = useState(!enabled);

  useEffect(() => {
    const element = ref.current;
    if (!enabled || !element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsInView(true);
        else if (!isDragging) setIsInView(false);
      },
      {
        root: options?.root?.current || null,
        rootMargin: options?.rootMargin || "0px 0px 200px 0px",
        threshold: options?.threshold || 0.1,
      }
    );

    observer.observe(element);
    return () => {
      if (element) observer.unobserve(element);
    };
  }, [options]);

  return { ref, isInView };
}

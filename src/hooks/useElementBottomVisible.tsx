import { useState, useLayoutEffect } from "react";

/**
 * @deprecated This hook is no longer maintained at the moment.
 * Please wait for future versions.
 */
function useElementBottomVisible(
  ref: React.RefObject<HTMLTableElement | null> | undefined
): boolean {
  const [isBottomVisible, setIsBottomVisible] = useState(false);
  const [init, setInit] = useState(false);

  useLayoutEffect(() => {
    const handleScroll = () => {
      if (ref && !ref.current) return;
      else if (ref?.current) {
        const rect = ref.current.getBoundingClientRect();
        const isVisible = rect.bottom <= window.innerHeight && rect.bottom >= 0;
        init && setIsBottomVisible(isVisible);
        setInit(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [ref?.current]);

  return isBottomVisible;
}

export default useElementBottomVisible;

import { useEffect, useRef, useState } from "react";
import { debounce } from "../utils/helpers/debounce";

export interface CellSettings {
  isSticky: boolean;
  isStickyActive: boolean;
}

export function useRowRef(
  tableRef: React.RefObject<HTMLTableElement | null> | undefined
) {
  const rowRef = useRef<HTMLTableRowElement>(null);
  const [isSticky, setIsSticky] = useState<boolean>(false);

  useEffect(() => {
    const parent = tableRef?.current;
    const child = rowRef?.current;
    if (!parent || !child) return;

    const updateSettings = () => {
      const isStickyActive = parent.scrollTop !== 0;
      setIsSticky(isStickyActive);
    };
    const handleScroll = debounce(updateSettings, 5);
    parent.addEventListener("scroll", handleScroll);

    return () => {
      parent.removeEventListener("scroll", handleScroll);
    };
  }, [tableRef]);

  return {
    rowRef,
    isSticky,
  };
}

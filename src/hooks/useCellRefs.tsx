import { useEffect, useRef, useState } from "react";
import { debounce } from "../utils/helpers/debounce";
import { isEqual } from "../utils/helpers/general";

export interface CellSettings {
  isSticky: boolean;
  isStickyActive: boolean;
}

export function useCellRefs<T extends HTMLElement = HTMLTableCellElement>(
  tableRef: React.RefObject<HTMLTableElement | null>
) {
  const refs = useRef<Map<string, T | null>>(new Map());
  const [cellSettings, setCellSettings] = useState<
    Record<string, CellSettings>
  >({});
  const cellSettingsRef = useRef(cellSettings);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    cellSettingsRef.current = cellSettings;
  }, [cellSettings]);

  const setRef = (key: string) => (el: T | null) => refs.current.set(key, el);

  useEffect(() => {
    const timeout = setTimeout(() => setIsReady(true), 1);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const parent = tableRef?.current;
    if (!isReady || !parent) return;

    const updateSettings = () => {
      const newSettings: Record<string, CellSettings> = {};

      for (const [key, el] of refs.current.entries()) {
        if (!el) continue;
        const isSticky = el.classList.contains("is-sticky");
        let isStickyActive = false;
        const firstKey = refs.current.keys().next().value;
        if (firstKey === key && isSticky && parent.scrollLeft !== 0) {
          isStickyActive = true;
        } else if (
          firstKey !== key &&
          isSticky &&
          refs.current.get(key)?.getBoundingClientRect().left ===
            parent.getBoundingClientRect().left + 1
        ) {
          isStickyActive = true;
        }

        newSettings[key] = {
          isSticky,
          isStickyActive,
        };
      }

      if (!isEqual(cellSettingsRef.current, newSettings))
        setCellSettings(newSettings);
    };

    const handleScroll = debounce(updateSettings, 5);
    updateSettings();
    parent.addEventListener("scroll", handleScroll);

    return () => {
      parent.removeEventListener("scroll", handleScroll);
    };
  }, [isReady, tableRef]);

  return {
    refs,
    setRef,
    isReady,
    cellSettings,
  };
}

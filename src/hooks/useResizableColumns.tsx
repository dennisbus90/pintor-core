import { useRef, useState, useCallback } from "react";

export function useResizableColumns(initialWidths: number[]) {
  const [colWidths, setColWidths] = useState(initialWidths);
  const startX = useRef(0);
  const startWidth = useRef(0);
  const resizingCol = useRef<number | null>(null);

  const onMouseDown = useCallback(
    (e: React.MouseEvent, index: number) => {
      e.preventDefault();
      resizingCol.current = index;
      startX.current = e.clientX;
      startWidth.current = colWidths[index];

      document.addEventListener("mousemove", onMouseMove);
      document.addEventListener("mouseup", onMouseUp);
    },
    [colWidths]
  );

  const onMouseMove = useCallback((e: MouseEvent) => {
    if (resizingCol.current === null) return;

    const delta = e.clientX - startX.current;
    setColWidths((prevWidths) => {
      const updated = [...prevWidths];
      updated[resizingCol.current!] = Math.max(50, startWidth.current + delta);
      return updated;
    });
  }, []);

  const onMouseUp = useCallback(() => {
    resizingCol.current = null;
    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  }, [onMouseMove]);

  return {
    colWidths,
    getResizerProps: (index: number) => ({
      onMouseDown: (e: React.MouseEvent) => onMouseDown(e, index),
    }),
  };
}

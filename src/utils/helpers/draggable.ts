export const exitDragState = (e: React.DragEvent, resetFn: Function) => {
  resetFn();
  const dropTarget = e?.target as HTMLElement;
  if (!dropTarget) return;

  const nativeEvent = new DragEvent("drop", {
    bubbles: true,
    cancelable: true,
  });

  dropTarget.dispatchEvent(nativeEvent);
};

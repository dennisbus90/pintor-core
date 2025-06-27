import React, { useEffect } from "react";
import { generateRandomNrBetween } from "../../../utils/helpers/general";
import { FullscreenLoader } from "./fullscreenLoader/FullscreenLoader";
import { RawCell, type RawCellProps } from "../raws/RawCell";
import type { DeepReadonly } from "../../../utils/helpers/typescript";
export interface CellLoaderAnimatorProps extends RawCellProps {
  columnSize: number;
  timeout?: number;
  isLoading?: boolean;
  isStatic?: boolean;
  onFinish?: () => void;
}

export const CellLoaderAnimator = ({
  columnSize,
  timeout,
  isLoading,
  isStatic = false,
  row,
  column,
  rowIndex,
  columnIndex,
  settings,
  onFinish,
}: DeepReadonly<CellLoaderAnimatorProps>) => {
  const [loadingHasFinished, setLoadingHasFinished] = React.useState(false);
  const randomNr = isStatic ? 100 : generateRandomNrBetween(40, 100);

  useEffect(() => {
    setLoadingHasFinished(false);
    const setTimeoutId = setTimeout(() => {
      if (!isLoading) {
        setLoadingHasFinished(true);
        onFinish && onFinish();
      }
    }, timeout);
    return () => clearTimeout(setTimeoutId);
  }, [isLoading]);

  const CellLoader = React.useMemo(() => {
    return (
      <td
        colSpan={columnSize}
        key={column.id}
        className={`${isLoading ? "is-loading" : "has-loaded"}`}
      >
        <div className={`${isStatic ? "" : "cell-content"}`}>
          <div>
            <FullscreenLoader width={`${randomNr}%`} height={18} />
          </div>
        </div>
      </td>
    );
  }, [loadingHasFinished]);

  return (
    <>
      {loadingHasFinished ? (
        <RawCell
          settings={settings}
          row={row}
          column={column}
          columnIndex={columnIndex}
          rowIndex={rowIndex}
          onSelectRow={() => {}}
        />
      ) : (
        CellLoader
      )}
    </>
  );
};

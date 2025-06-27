import { useEffect, useState } from "react";
import { RepresentationAnimation } from "../../../utils/animation/representation";
import { CellLoaderAnimator } from "./CellLoaderAnimator";
import type { Column } from "../../../utils/models/cell";
import type { Row } from "../../../utils/models/row";
import { pintorCheckbox } from "../../../utils/helpers/checkbox";
import type { DeepReadonly } from "../../../utils/helpers/typescript";
import type { FullscreenLoaderProps } from "./fullscreenLoader/FullscreenLoader";

export interface TableSkeletonLoaderProps extends FullscreenLoaderProps {
  columns: Column[];
  rows: Row[];
  loadingRows?: number;
  isLoading?: boolean;
}

export const TableSkeletonLoader = ({
  columns,
  rows,
  loadingRows = 10,
  isLoading = false,
}: DeepReadonly<TableSkeletonLoaderProps>) => {
  const [init, setInit] = useState(false);
  const animation = RepresentationAnimation.LeftWave.valueOf();
  let i = 0;

  useEffect(() => {
    if (isLoading) setInit(true);
  }, [isLoading]);

  if (!init || !rows) return null;

  return (
    <>
      {[...Array(loadingRows)].map((_, rowIndex) => {
        if (animation === RepresentationAnimation.TopWave) i++;
        if (animation === RepresentationAnimation.BottomWave) {
          i = Array(loadingRows).length - rowIndex;
        }

        return (
          <tr className="row">
            {columns.map((column, columnIndex) => {
              const columnSize = column.group ? column?.group?.length + 1 : 1;

              if (animation === RepresentationAnimation.LeftWave)
                i = columnIndex + 1;

              if (animation === RepresentationAnimation.RightWave)
                i = Array(loadingRows).length - columnIndex;

              if (
                !column.isHidden &&
                animation === RepresentationAnimation.TicTacToe
              ) {
                i++;
              }

              return (
                !column.isHidden && (
                  <CellLoaderAnimator
                    columnSize={columnSize}
                    timeout={75 * i}
                    isStatic={column.id === pintorCheckbox.id}
                    isLoading={isLoading}
                    column={column}
                    columnIndex={columnIndex}
                    row={rows[rowIndex]}
                    rowIndex={rowIndex}
                    onSelectRow={() => {}}
                    onFinish={() => {}}
                  />
                )
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

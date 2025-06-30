import { useEffect, useState } from "react";
import type { CellSettings } from "../../../hooks/useCellRefs";
import type { Column } from "../../../utils/models/cell";
import type { Row } from "../../../utils/models/row";
import { RepresentationAnimation } from "../../../utils/animation/representation";
import { pintorCheckbox } from "../../../utils/helpers/checkbox";
import { CellLoaderAnimator } from "./CellLoaderAnimator";
import type { FullscreenLoaderProps } from "./fullscreenLoader/FullscreenLoader";
import type { DeepReadonly } from "../../../utils/helpers/typescript";

export interface TableSkeletonRowLoaderProps extends FullscreenLoaderProps {
  columns: Column[];
  rows: Row[];
  onFinish: () => void;
  onStart: () => void;
  loadingRows?: number;
  isLoading?: boolean;
  isStatic?: boolean;
  row?: Row[];
  cellSettings?: Record<string, CellSettings>;
}

export const TableSkeletonRowLoader = ({
  columns,
  rows,
  cellSettings,
  loadingRows = 10,
  isLoading = false,
  isStatic = false,
  onFinish,
  onStart,
}: DeepReadonly<TableSkeletonRowLoaderProps>) => {
  const [init, setInit] = useState(false);
  const [nrOfFinishedLoadedCells, setNrOfFinishedLoadedCells] = useState(0);
  const nrOfCells = columns.filter((c) => !c.isHidden).length * rows.length;
  let i = 0;

  useEffect(() => {
    if (isLoading) setInit(true);
  }, [isLoading]);

  useEffect(() => {
    if (isLoading) onStart();
  }, [isLoading]);

  useEffect(() => {
    if (nrOfFinishedLoadedCells && nrOfFinishedLoadedCells === nrOfCells) {
      onFinish();
      setNrOfFinishedLoadedCells(0);
    }
  }, [nrOfFinishedLoadedCells]);

  if (!init) return null;

  const animation = RepresentationAnimation.TopWave.valueOf();

  return (
    <>
      {[...Array(loadingRows)].map((_, rowIndex) => {
        if (animation === RepresentationAnimation.TopWave) i++;
        if (animation === RepresentationAnimation.BottomWave) {
          i = Array(loadingRows).length - rowIndex;
        }

        return (
          <tr className="row" key={`row-${rowIndex}`}>
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
                    key={`cell-${rowIndex}-${columnIndex}`}
                    settings={cellSettings}
                    columnSize={columnSize}
                    timeout={75 * i}
                    isStatic={column.id === pintorCheckbox.id || isStatic}
                    isLoading={isLoading}
                    column={column}
                    columnIndex={columnIndex}
                    row={rows[rowIndex]}
                    rowIndex={rowIndex}
                    onSelectRow={() => {}}
                    onFinish={() => {
                      setNrOfFinishedLoadedCells((prev) => prev + 1);
                    }}
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

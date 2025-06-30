import { useCallback, useState } from "react";
import { swapBy } from "../../../utils/helpers/general";
import { RawHeaderCell } from "./RawHeaderCell";
import React from "react";
import type { CellSettings } from "../../../hooks/useCellRefs";
import { useRowRef } from "../../../hooks/useRowRef";
import { sortRows, type SortMode } from "../../../utils/helpers/sort";
import { debounce } from "../../../utils/helpers/debounce";
import { exitDragState } from "../../../utils/helpers/draggable";
import type { Table } from "../../../utils/models/table";
import type { Column } from "../../../utils/models/cell";
import type { Row } from "../../../utils/models/row";
import { pintorCheckbox } from "../../../utils/helpers/checkbox";
import type {
  DeepMutable,
  DeepReadonly,
} from "../../../utils/helpers/typescript";

interface RawHeaderRowProps extends Table {
  columns: Column[];
  rows: Row[];
  isSelected: boolean;
  onSelectRow: (isChecked: boolean) => void;
  draggableColumns?: boolean;
  cellRefs?: React.RefObject<Map<string, HTMLTableCellElement | null>>;
  cellSettings?: Record<string, CellSettings>;
  tableRef?: React.RefObject<HTMLTableElement | null>;
  onResizeColumn?: (column: Column, newSize: number) => void;
}

export const RawHeaderRow = ({
  columns,
  draggableColumns,
  cellRefs,
  cellSettings,
  tableRef,
  fixedHeader,
  rows,
  checkable,
  isSelected,
  resizableColumns,
  onReOrderColumns,
  onResizeColumn,
  onSelectRow,
  onSortRows,
}: DeepReadonly<RawHeaderRowProps>) => {
  const [fromColumnIndex, setFromColumnIndex] = useState<number>(-1);
  const [toColumnIndex, setToColumnIndex] = useState<number>(-1);
  const [sortMode, setSortMode] = useState<SortMode>("asc");
  const [sortingColumn, setSortingColumn] = useState<Column | null>(null);
  const { rowRef, isSticky } = useRowRef(
    tableRef as DeepMutable<typeof tableRef>
  );

  const resetColumnIndexes = () => {
    setFromColumnIndex(-1);
    setToColumnIndex(-1);
  };

  const columnDrop = (toIndex: number) => {
    if (onReOrderColumns && fromColumnIndex !== toIndex) {
      const newColumns = swapBy(columns, fromColumnIndex, toIndex);
      onReOrderColumns(
        newColumns as DeepMutable<typeof newColumns>,
        fromColumnIndex,
        toIndex
      );
    }
    resetColumnIndexes();
  };

  const handleDragState = useCallback(
    debounce(
      (e: React.DragEvent) => exitDragState(e, resetColumnIndexes),
      1000
    ),
    []
  );

  const columnDropIsAllowed = (e: React.DragEvent, toIndex: number) => {
    handleDragState(e);
    e.preventDefault();
    if (toColumnIndex !== toIndex) setToColumnIndex(toIndex);
  };

  const columnIsDragging = (columnIndex: number) => {
    if (fromColumnIndex !== columnIndex) setFromColumnIndex(columnIndex);
  };

  const setRef = (key: string) => (el: HTMLTableCellElement | null) => {
    cellRefs?.current.set(key, el);
  };

  const sortRowsHandle = (column: Column) => {
    let updatedRows: Row[] = [];
    const updatedSortMode = sortMode === "asc" ? "desc" : "asc";
    setSortingColumn(column);
    setSortMode(updatedSortMode);
    if (column.sortFn)
      updatedRows = column.sortFn(
        rows as DeepMutable<typeof rows>,
        updatedSortMode
      );
    else updatedRows = sortRows(rows as Row[], column.id, updatedSortMode);
    onSortRows && onSortRows(updatedRows, updatedSortMode);
  };

  return (
    <>
      <tr
        className={`${isSticky && fixedHeader ? "is-fixed" : ""}`}
        ref={rowRef}
      >
        {columns.map((column, columnIndex) => {
          return (
            !column.isHidden && (
              <RawHeaderCell
                key={column.id}
                resizableColumns={resizableColumns}
                sortMode={sortMode}
                isSortingActive={sortingColumn?.id === column.id}
                onSortRows={() =>
                  sortRowsHandle(column as DeepMutable<typeof column>)
                }
                isSelected={isSelected}
                onSelectRow={(checked) => onSelectRow && onSelectRow(checked)}
                checkable={checkable}
                rows={rows as DeepMutable<typeof rows>}
                fixedHeader={fixedHeader}
                ref={setRef(column.id)}
                draggableColumns={
                  column.id === pintorCheckbox.id ? false : draggableColumns
                }
                columnIndex={columnIndex}
                columns={columns as DeepMutable<typeof columns>}
                column={column as DeepMutable<typeof column>}
                toColumnIndex={toColumnIndex}
                fromColumnIndex={fromColumnIndex}
                onDragStart={(_) =>
                  draggableColumns && columnIsDragging(columnIndex)
                }
                onDrop={() => draggableColumns && columnDrop(columnIndex)}
                onDragOver={(e) => {
                  draggableColumns && columnDropIsAllowed(e, columnIndex);
                }}
                settings={cellSettings}
                tableRef={tableRef as DeepMutable<typeof tableRef>}
                onResizeColumn={onResizeColumn}
              />
            )
          );
        })}
      </tr>
    </>
  );
};

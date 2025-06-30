import React, { useEffect, useState, useCallback } from "react";
import type { CellSettings } from "../../../hooks/useCellRefs";
import { useResizableColumns } from "../../../hooks/useResizableColumns";
import { debounce } from "../../../utils/helpers/debounce";
import type { SortMode } from "../../../utils/helpers/sort";
import { TextAlign } from "../../../utils/models/enums/TextAlign";
import type { Table } from "../../../utils/models/table";
import type { Column } from "../../../utils/models/cell";
import type { Row } from "../../../utils/models/row";
import { pintorCheckbox } from "../../../utils/helpers/checkbox";
import type { DeepMutable } from "../../../utils/helpers/typescript";

interface RawHeaderCellProps extends Table {
  rows: Row[];
  column: Column;
  columnIndex: number;
  toColumnIndex: number;
  fromColumnIndex: number;
  isSelected: boolean;
  onDragStart: React.DragEventHandler<HTMLTableCellElement>;
  onDrop: React.DragEventHandler<HTMLTableCellElement>;
  onDragOver: React.DragEventHandler<HTMLTableCellElement>;
  onSelectRow: (checked: boolean) => void;
  draggableColumns?: boolean;
  settings?: Record<string, CellSettings>;
  sortMode?: SortMode;
  isSortingActive?: boolean;
  className?: string;
  tableRef?: React.RefObject<HTMLTableElement | null>;
  onResizeColumn?: (colun: Column, newSize: number) => void;
  onSort?: (rows: Row[]) => void;
}

export const RawHeaderCell = React.forwardRef<
  HTMLTableCellElement,
  RawHeaderCellProps
>((props, ref) => {
  const [cellOffset, setCellOffset] = useState(0);
  const columnSize = props.column.group ? props.column?.group?.length + 1 : 1;
  const columnSettings = props.settings?.[props.column.id];
  const stickyStyle =
    columnSettings?.isSticky && columnSettings?.isStickyActive
      ? "has-left-shadow"
      : "";
  const direction =
    props.fromColumnIndex > props.toColumnIndex ? "left" : "right";
  const hasCheckableColumn = props.columns?.find(
    (c) => c.id === pintorCheckbox.id
  );
  const tableOffset = hasCheckableColumn ? 50 : 0;
  const tableWidth = (props.tableRef?.current?.offsetWidth || 0) - tableOffset;
  const defaultColumnWidth = Math.floor(
    (tableWidth + 0) /
      (props.columns
        ?.filter((c) => !c.isHidden)
        ?.filter((c) => c.id !== pintorCheckbox.id).length || 1)
  );
  const { colWidths, getResizerProps } = useResizableColumns(
    (props.columns ?? []).map((column) => column.width || defaultColumnWidth)
  );

  useEffect(() => {
    const size = colWidths[props.columnIndex];
    toggleResize(props.column as DeepMutable<typeof props.column>, size);
  }, [colWidths[props.columnIndex]]);

  useEffect(() => {
    if (props.columns?.length && cellOffset === 0) {
      const totalWidth = props.columns.reduce((sum, col) => {
        return sum + (col.width ?? 0);
      }, 0);

      const nrOfColumnsToCount =
        props.columns?.filter(
          (c) => !c.isHidden && !c.width && c.id !== pintorCheckbox.id
        ).length || 1;
      const cOffset = totalWidth / nrOfColumnsToCount;
      setCellOffset(cOffset);
    }
  }, [props.columns?.length]);

  const toggleResize = useCallback(
    debounce(
      (column: Column, size: number) => props.onResizeColumn?.(column, size),
      1000
    ),
    [props.onResizeColumn]
  );

  const onSort = () => {
    if (props.column?.sortFn) {
      const sortedRows =
        props.column?.sortFn &&
        props.column?.sortFn(props.rows as DeepMutable<typeof props.rows>);
      props.onSort && props.onSort(sortedRows);
    }
  };

  const renderCell = () => {
    if (props.checkable && props.column.id === pintorCheckbox.id) {
      return (
        <input
          type="checkbox"
          checked={props.isSelected}
          onChange={(value) =>
            props.onSelectRow && props.onSelectRow(value.target.checked)
          }
        />
      );
    }

    return (
      <>
        <div
          className={`text-is-${
            props.column?.textAlign ? props.column.textAlign : TextAlign.Left
          }`}
          onClick={() =>
            props.column.isSortable && props.onSortRows && props.onSortRows()
          }
        >
          {props.column.renderHeaderCellFn
            ? props.column.renderHeaderCellFn(
                props.column as DeepMutable<typeof props.column>,
                props.columnIndex,
                onSort
              )
            : props.column.name}{" "}
          {props.column.isSortable ? (
            <span
              className={`sort-button ${
                props.isSortingActive ? "is-active" : ""
              } ${
                props.isSortingActive && props.sortMode === "desc"
                  ? "is-desc"
                  : ""
              }`}
            />
          ) : null}
        </div>
        {props.resizableColumns && (
          <div className="resizer" {...getResizerProps(props.columnIndex)} />
        )}
      </>
    );
  };

  return (
    <th
      style={{
        width: colWidths[props.columnIndex],
      }}
      ref={ref}
      className={`is-${direction} ${stickyStyle} ${
        props?.className ? props.className : ""
      } ${props.column.isSticky ? "is-sticky" : ""} ${
        props.toColumnIndex === props.columnIndex &&
        props.column.id !== pintorCheckbox.id
          ? "to-column"
          : ""
      } ${props.fromColumnIndex === props.columnIndex ? "from-column" : ""}`}
      colSpan={columnSize}
      draggable={props.draggableColumns}
      onDragStart={props.onDragStart}
      onDrop={(e) => {
        if (props.column.id !== pintorCheckbox.id) props.onDrop(e);
      }}
      onDragOver={props.onDragOver}
      key={props.column.id}
    >
      {renderCell()}
    </th>
  );
});

import React, {
  Fragment,
  forwardRef,
  useEffect,
  useMemo,
  useState,
} from "react";
import { RawCell } from "./RawCell";
import type { CellSettings } from "../../../hooks/useCellRefs";
import { useInView } from "../../../hooks/useInView";
import { Reorder } from "motion/react";
import type { Table } from "../../../utils/models/table";
import type { DeepMutable } from "../../../utils/helpers/typescript";
import type { Row } from "../../../utils/models/row";
import type { Column } from "../../../utils/models/cell";
import { HightlightTable } from "../../../utils/models/enums/highlightTable";
import { debugColumnNotFound } from "../../../utils/helpers/debug";

interface RawRowProps extends Table {
  row: Row;
  columns: Column[];
  rowIndex: number;
  onSelectRow: (isChecked: boolean) => void;
  children?: React.ReactNode;
  cellSettings?: Record<string, CellSettings>;
  isSelected?: boolean;
  tableRef?: React.RefObject<HTMLTableElement | null>;
  matrix?: boolean[][];
  onHover?: (isActive: boolean, columnIndex: number) => void;
}

export const RawRow = forwardRef(
  (
    {
      rowIndex = -1,
      columns = [],
      onCellClick,
      hightlight,
      row,
      onRowClick,
      draggableRows,
      cellSettings,
      checkable,
      isSelected,
      onSelectRow,
      lazyLoad = false,
      onHover,
      tableRef,
      matrix,
      debug,
    }: RawRowProps,
    _
  ) => {
    const [isRowSelected, setIsRowSelected] = useState<boolean>(
      isSelected || false
    );

    const [isDragging, setIsDragging] = useState(false);
    const { ref, isInView } = useInView<HTMLTableRowElement>(
      isDragging,
      lazyLoad,
      {
        root: tableRef,
        rootMargin: "0px 0px 200px 0px",
        threshold: 0.1,
      }
    );

    useEffect(() => setIsRowSelected(isSelected || false), [isSelected]);

    const renderRowChildren = (row: Row, level = 1): any => {
      return (
        row?.children &&
        row.isOpen &&
        row.children.map((child, childIndex) => {
          if (child?.children && child?.isOpen) {
            return (
              <>
                <tr className="row tr-hover">
                  {columns.map((column, columnIndex) => {
                    return (
                      <RawCell
                        hightlight={hightlight}
                        isSelected={isRowSelected}
                        column={column}
                        checkable={checkable}
                        row={child}
                        columnIndex={columnIndex}
                        rowIndex={childIndex}
                        settings={cellSettings}
                        onSelectRow={(isChecked) => {
                          setIsRowSelected(isChecked);
                          onSelectRow(isChecked);
                        }}
                      />
                    );
                  })}
                </tr>
                {renderRowChildren(child, level + 1)}
              </>
            );
          }
          return (
            <tr className="row tr-hover">
              {columns.map((column, columnIndex) => {
                return (
                  <RawCell
                    hightlight={hightlight}
                    isSelected={isRowSelected}
                    checkable={checkable}
                    column={column}
                    row={child}
                    columnIndex={columnIndex}
                    rowIndex={childIndex}
                    settings={cellSettings}
                    onSelectRow={(isChecked) => {
                      setIsRowSelected(isChecked);
                      onSelectRow(isChecked);
                    }}
                  />
                );
              })}
            </tr>
          );
        })
      );
    };

    const RenderCell = useMemo(() => {
      return isInView ? (
        columns.map((column, columnIndex) => {
          return (
            !column.isHidden && (
              <Fragment key={`cell-${columnIndex}`}>
                <RawCell
                  isActive={
                    matrix && matrix.length
                      ? matrix[rowIndex][columnIndex]
                      : false
                  }
                  onHover={(isActive) =>
                    onHover && onHover(isActive, columnIndex)
                  }
                  hightlight={hightlight}
                  onCellClick={onCellClick}
                  isSelected={isRowSelected}
                  checkable={checkable}
                  column={column}
                  row={row}
                  columnIndex={columnIndex}
                  rowIndex={rowIndex}
                  settings={cellSettings}
                  onSelectRow={(isChecked) => {
                    setIsRowSelected(isChecked);
                    onSelectRow(isChecked);
                  }}
                />
                {column.group &&
                  column.group?.map((group, groupIndex) => {
                    const groupColumn = columns.find((c) => c.id === group);
                    if (!groupColumn) {
                      debug && debugColumnNotFound(group);
                      return;
                    }

                    return (
                      <RawCell
                        hightlight={hightlight}
                        isSelected={isRowSelected}
                        checkable={checkable}
                        column={groupColumn}
                        row={row}
                        columnIndex={columnIndex + groupIndex + 1}
                        rowIndex={rowIndex}
                        settings={cellSettings}
                        onSelectRow={(isChecked) => {
                          setIsRowSelected(isChecked);
                          onSelectRow(isChecked);
                        }}
                      />
                    );
                  })}
              </Fragment>
            )
          );
        })
      ) : (
        <td colSpan={columns.length} />
      );
    }, [isInView]);

    return (
      <Reorder.Item
        as="tr"
        value={row}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        whileDrag={{ boxShadow: "0px 5px 15px rgba(0,0,0,0.2)" }}
        onDragStart={() => setIsDragging(true)}
        onDragEnd={() => setIsDragging(false)}
        dragListener={draggableRows}
        dragElastic={0.05}
        dragConstraints={tableRef}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        ref={ref}
        className={`row ${isDragging ? "is-dragging" : ""} ${
          hightlight === HightlightTable.Row && !isDragging ? "tr-hover" : ""
        }  ${isInView ? "visible" : "hidden"}`}
        onClick={() =>
          onRowClick && onRowClick(row as DeepMutable<typeof row>, rowIndex)
        }
      >
        {RenderCell}
      </Reorder.Item>
    );
  }
);

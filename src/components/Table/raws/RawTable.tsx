import React, { useEffect, useState, useMemo, useCallback } from "react";
import { clone } from "../../../utils/helpers/general";
import { TableSkeletonLoader } from "../loaders/TableSkeletonLoader";
import { RawRow } from "./RawRow";
import "./table.scss";
import { RawHeaderRow } from "./RawHeaderRow";
import { useCellRefs } from "../../../hooks/useCellRefs";
import { TableCellSize } from "../../../utils/models/enums/TableCellSize";
import {
  debugCheckableRowsSelection,
  debugPaginationRangeNotFound,
} from "../../../utils/helpers/debug";
import {
  paginationRangeNotFoundError,
  rowsCheckboxSelectionError,
} from "../../../utils/helpers/error";
import { debounce } from "../../../utils/helpers/debounce";
import { Reorder } from "motion/react";
import { RawEmptyTableBody } from "./RawEmptyTableBody";
import { TableTr } from "../parts/TableTr";
import type { Table } from "../../../utils/models/table";
import type {
  DeepMutable,
  DeepReadonly,
} from "../../../utils/helpers/typescript";
import type { Paginate } from "../../../utils/models/pagination";
import { HightlightTable } from "../../../utils/models/enums/highlightTable";
import { LoadingRowsPosition } from "../../../utils/models/enums/loadingRowsPosition";
import type { Column } from "../../../utils/models/cell";
import type { Row } from "../../../utils/models/row";
import { pintorCheckbox } from "../../../utils/helpers/checkbox";
import { TableSkeletonRowLoader } from "../loaders/TableSkeletonRowLoader";
import { useMatrix } from "../../../hooks/useMatrix";
import { usePagination } from "../../../hooks/usePagination";

interface RawTableProps extends Table {
  paginate?: Paginate;
}

export const RawTable = ({
  paginate,
  emptyState,
  messageState,
  rows = [],
  columns = [],
  loadingRows = 1,
  fixedHeader = false,
  showLoadingIncomingNewRows = false,
  draggableColumns = false,
  draggableRows = false,
  isLoading = false,
  checkable = false,
  debug = false,
  lazyLoad = false,
  resizableColumns = false,
  isBordered = false,
  hightlight = HightlightTable.Row,
  tableCellSize = TableCellSize.Medium,
  loadingRowsPosition = LoadingRowsPosition.Top,
  onResizeColumn,
  onReOrderRows,
  onReOrderColumns,
  onSelectRows,
  onError,
  onSortRows,
  onRowClick,
  onCellClick,
}: DeepReadonly<RawTableProps>) => {
  const tableRef = React.useRef<HTMLTableElement>(null);
  const [tableColumns, setTableColumns] = useState<Column[]>([]);
  const [tableRows, setTableRows] = useState<Row[]>([]);
  const [incomingNewRows, setIncomingNewRows] = useState<Row[]>([]);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [incomingRowsIsLoading, setIncomingRowsIsLoading] = useState(false);
  const {
    pageIsLoading,
    fromIndex,
    toIndex,
    paginatedRows,
    hasError: paginationHasError,
  } = usePagination({
    paginate,
    rows: tableRows,
    isLoading,
    incomingRowsIsLoading,
    loadingRows,
  });

  const { matrix, resetMatrix, updateMatrix } = useMatrix({
    rows,
    columns,
  });
  const [allRowsChecked, setAllRowsChecked] = useState<boolean>(false);
  const { refs: cellRefs, cellSettings } = useCellRefs(tableRef);
  const paginationNrOfRows = paginate
    ? paginate.toIndex - paginate.fromIndex
    : loadingRows;

  useEffect(() => {
    if (paginationHasError) {
      debug && debugPaginationRangeNotFound(fromIndex || -1, toIndex || -1);
      onError && onError(paginationRangeNotFoundError);
    }
  }, [paginationHasError]);

  useEffect(() => {
    let clonedColumns = clone(columns) as DeepMutable<typeof columns>;

    clonedColumns.forEach((column) => {
      if (column?.group) {
        if (column.group.length) {
          column.group.forEach((g) => {
            const groupColumn = clonedColumns.find((c) => c.id === g);

            if (groupColumn) {
              groupColumn.isHidden =
                groupColumn?.isHidden === undefined
                  ? true
                  : groupColumn.isHidden;
            }
          });
        }
      }
    });

    const hasNoCheckbox = !clonedColumns.some(
      (c) => c.id === pintorCheckbox.id
    );
    if (checkable && hasNoCheckbox) clonedColumns.unshift(pintorCheckbox);

    setTableColumns(clonedColumns);
  }, [columns]);

  useEffect(() => {
    const incomingRows = clone(rows) as DeepMutable<typeof rows>;

    if (tableRows.length === 0) setTableRows(incomingRows);
    else {
      const newRows = incomingRows.filter(
        (incomingRow) =>
          !tableRows.some((tableRow) => incomingRow.id === tableRow.id)
      );

      setIncomingNewRows(newRows);
    }
  }, [rows]);

  useEffect(() => {
    if (rows.length !== tableRows.length) setTableRows(rows as Row[]);
  }, [rows]);

  useEffect(() => {
    if (rows.length && columns.length) resetMatrix();
  }, [rows, columns]);

  useEffect(() => {
    if (!showLoadingIncomingNewRows && !pageIsLoading && paginate)
      setIncomingRowsIsLoading(false);
  }, [pageIsLoading, showLoadingIncomingNewRows]);

  const onResizeTableColumn = (column: Column, newSize: number) => {
    setTableColumns((prevColumns) => {
      onResizeColumn && onResizeColumn(column, newSize);
      return prevColumns.map((col) => {
        if (col.id === column.id) {
          return { ...col, width: newSize };
        }
        return col;
      });
    });
  };

  const RenderRows = useMemo(
    () =>
      [...(paginatedRows ?? tableRows)].map((row, rowIndex) => {
        return (
          <RawRow
            matrix={matrix}
            onHover={(isActive, columnIndex) => {
              hightlight === HightlightTable.Matrix && isActive
                ? updateMatrix(rowIndex, columnIndex)
                : resetMatrix();
            }}
            key={row.id as string}
            tableRef={tableRef}
            debug={debug}
            rows={tableRows}
            checkable={checkable}
            lazyLoad={lazyLoad}
            selectedRows={selectedRows}
            row={row as DeepMutable<typeof row>}
            rowIndex={rowIndex}
            onCellClick={(value, column, columnIndex, rowIndex) =>
              onCellClick && onCellClick(value, column, columnIndex, rowIndex)
            }
            hightlight={hightlight}
            columns={tableColumns}
            draggableRows={draggableRows}
            onRowClick={(row, index) => onRowClick && onRowClick(row, index)}
            cellSettings={cellSettings}
            onSelectRow={(selectedRow) => {
              setSelectedRows((prevSelectedRows) => {
                const isSelected = prevSelectedRows.includes(selectedRow.id as string);
                const updatedRows = isSelected
                  ? prevSelectedRows.filter((id) => id !== selectedRow.id)
                  : [...prevSelectedRows, selectedRow.id as string];

                const hasIdError = updatedRows.some((id) => !id);
                if (hasIdError) {
                  debug && debugCheckableRowsSelection();
                  onError && onError(rowsCheckboxSelectionError);
                }
                onSelectRows && onSelectRows(updatedRows);
                return updatedRows;
              });
            }}
          />
        );
      }),
    [
      tableRows,
      allRowsChecked,
      tableColumns,
      paginatedRows,
      cellSettings,
      incomingRowsIsLoading,
      matrix,
      selectedRows
    ]
  );

  const paginationStyle = paginate?.paginationAlign
    ? `has-pagination-${(paginate?.paginationAlign).toLowerCase()}`
    : "";

  const toggleReorderRows = useCallback(
    debounce((rows: Row[]) => onReOrderRows && onReOrderRows(rows), 750),
    []
  );

  return (
    <>
      <div
        className={`table ${paginationStyle} ${isBordered ? "is-bordered" : ""
          }`}
        draggable="false"
        ref={tableRef}
      >
        <table className={`is-${tableCellSize}`} draggable="false">
          <thead>
            <RawHeaderRow
              onSortRows={(updatedRows, sortMode) => {
                setTableRows(updatedRows ?? []);
                onSortRows &&
                  onSortRows(rows as DeepMutable<typeof rows>, sortMode);
              }}
              resizableColumns={resizableColumns}
              fixedHeader={fixedHeader}
              isSelected={selectedRows.length === tableRows.length}
              checkable={checkable}
              columns={tableColumns}
              rows={tableRows}
              onReOrderColumns={(
                columns: Column[],
                fromIndex: number,
                toIndex: number
              ) => {
                onReOrderColumns &&
                  onReOrderColumns(columns, fromIndex, toIndex);
                setTableColumns(columns);
              }}
              draggableColumns={draggableColumns}
              cellSettings={cellSettings}
              cellRefs={cellRefs}
              tableRef={tableRef}
              onResizeColumn={onResizeTableColumn}
              onSelectRow={(isChecked) => {
                setAllRowsChecked(isChecked);
                const updatedRows = isChecked
                  ? rows.map((row) => row.id as string)
                  : [];
                setSelectedRows(updatedRows);
                onSelectRows && onSelectRows(updatedRows);
              }}
            />
          </thead>

          {tableRows.length === 0 && (
            <RawEmptyTableBody columns={columns} state={emptyState} />
          )}

          {pageIsLoading && !showLoadingIncomingNewRows ? (
            <TableSkeletonLoader
              columns={tableColumns}
              rows={tableRows ?? []}
              loadingRows={loadingRows}
              isLoading={pageIsLoading}
            />
          ) : (
            <Reorder.Group
              as="tbody"
              axis="y"
              values={[...(paginatedRows ?? tableRows)]}
              onReorder={(order) => {
                if (paginate && order?.length) {
                  const prevOrder = clone(tableRows);
                  let result = [
                    ...prevOrder.slice(0, paginate.fromIndex),
                    ...order,
                    ...prevOrder.slice(paginate.fromIndex),
                  ];
                  setTableRows(result as DeepMutable<typeof result>);
                } else {
                  toggleReorderRows(order as DeepMutable<typeof order>);
                  setTableRows(order as DeepMutable<typeof order>);
                }
              }}
            >
              {showLoadingIncomingNewRows &&
                loadingRowsPosition === LoadingRowsPosition.Top && (
                  <TableSkeletonRowLoader
                    cellSettings={cellSettings}
                    onStart={() => setIncomingRowsIsLoading(true)}
                    onFinish={() => {
                      setIncomingRowsIsLoading(false);
                      setIncomingNewRows([]);
                    }}
                    columns={tableColumns}
                    loadingRows={incomingRowsIsLoading ? paginationNrOfRows : 0}
                    rows={incomingNewRows ?? []}
                    isLoading={pageIsLoading}
                  />
                )}

              {messageState?.render && (
                <TableTr columns={columns}>{messageState.render}</TableTr>
              )}
              {messageState?.keepRows === false ? null : RenderRows}

              {showLoadingIncomingNewRows &&
                loadingRowsPosition === LoadingRowsPosition.Bottom && (
                  <TableSkeletonRowLoader
                    cellSettings={cellSettings}
                    onStart={() => setIncomingRowsIsLoading(true)}
                    onFinish={() => {
                      setIncomingRowsIsLoading(false);
                      setIncomingNewRows([]);
                    }}
                    columns={tableColumns}
                    loadingRows={incomingRowsIsLoading ? paginationNrOfRows : 0}
                    rows={incomingNewRows ?? []}
                    isLoading={pageIsLoading}
                  />
                )}
            </Reorder.Group>
          )}
        </table>
      </div>
    </>
  );
};

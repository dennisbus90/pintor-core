import type { SortMode } from "../helpers/sort";
import type { TableCellSize } from "./enums/TableCellSize";
import type { TableErrorType } from "./enums/TableErrorType";
import type { EmptyState, MessageState } from "./states";
import type { Column } from "./cell";
import type { Row } from "./row";
import type { LoadingRowsPosition } from "./enums/loadingRowsPosition";

type Hightlight = "Row" | "Cell" | "Matrix";

interface TableError {
  type: TableErrorType;
  text: string;
}

export interface Table {
  /**
   * The column definitions for the table.
   * Each column defines properties such as header, accessor, width, etc.
   */
  columns?: Column[];
  /**
   * The row data for the table.
   * Each row includes key-value pairs representing cell data.
   */
  rows?: Row[];
  /**
   * Classes
   */
  className?: string;
  /**
   * Whether the table header is fixed and stays visible during scroll.
   */
  fixedHeader?: boolean;
  /**
   * Whether columns can be reordered by dragging.
   */
  draggableColumns?: boolean;
  /**
   * Whether rows can be reordered by dragging.
   */
  draggableRows?: boolean;
  /**
   * Whether columns can be resized by the user.
   */
  resizableColumns?: boolean;
  /**
   * Whether the table is currently in a loading state.
   */
  isLoading?: boolean;
  /**
   * Whether to show a loading indicator for new incoming rows.
   */
  showLoadingIncomingNewRows?: boolean;
  /**
   * Number of loading rows to display as placeholders.
   */
  loadingRows?: number;
  /**
   * Whether rows are checkable (with a checkbox).
   */
  checkable?: boolean;
  /**
   * Whether the table should display borders.
   */
  isBordered?: boolean;
  /**
   * Whether debug information should be enabled.
   */
  debug?: boolean;
  /**
   * Whether rows should be loaded lazily (e.g., for virtual scroll or infinite loading).
   */
  lazyLoad?: boolean;
  /**
   * @property {Hightlight} [hightlight] Optional highlight configuration.
   */
  hightlight?: Hightlight;
  /**
   * Optional position for loading rows indicator.
   */
  loadingRowsPosition?: LoadingRowsPosition;
  /**
   * @property {TableCellSize} [tableCellSize] Optional size setting for table cells.
   */
  tableCellSize?: TableCellSize;
  /**
   * @property {EmptyState} [emptyState] Optional state to display when there's no data,
   * can include text or a custom render element.
   */
  emptyState?: EmptyState;
  /**
   * @property {MessageState} [messageState] - Optional message state.
   */
  messageState?: MessageState;
  /**
   * Callback fired when rows are sorted.
   *
   * @param rows - The sorted list of rows. Optional; could be omitted if no rows are available.
   * @param sortMode - The sorting mode applied (e.g., ascending, descending). Optional.
   */
  onSortRows?: (rows?: Row[], sortMode?: SortMode) => void;
  /**
   * Callback fired when a column is resized.
   *
   * @param column - The column that was resized.
   * @param newSize - The new width (or size) of the column in pixels.
   */
  onResizeColumn?: (column: Column, newSize: number) => void;
  /**
   * Callback fired when the selected rows change.
   *
   * @param selectedRows - An array of row IDs (or keys) representing the currently selected rows.
   */
  onSelectRows?: (selectedRows: string[]) => void;
  /**
   * Callback fired when columns have been reordered.
   *
   * @param columns - The new ordered array of columns.
   * @param fromIndex - The original index of the column before reordering.
   * @param toIndex - The new index of the column after reordering.
   */
  onReOrderColumns?: (
    columns: Column[],
    fromIndex: number,
    toIndex: number
  ) => void;
  /**
   * Callback fired when rows have been reordered.
   *
   * @param rows - The new ordered array of rows.
   */
  onReOrderRows?: (rows: Row[]) => void;
  /**
   * Callback fired when a row is clicked.
   *
   * @param row - The row definition for the clicked row.
   * @param rowIndex - The index of the clicked row.
   */
  onRowClick?: (row: Row, rowIndex: number) => void;
  /**
   * Callback fired when a table error occurs.
   *
   * @param error - The error object containing details about the table error.
   */
  onError?: (error: TableError) => void;
  /**
   * Callback fired when a table cell is clicked.
   *
   * @param value - The value of the clicked cell (string or number).
   * @param column - The column definition for the clicked cell.
   * @param columnIndex - The index of the column for the clicked cell.
   * @param rowIndex - The index of the row for the clicked cell.
   */
  onCellClick?: (
    value: string | number,
    column: Column,
    columnIndex: number,
    rowIndex: number
  ) => void;
}

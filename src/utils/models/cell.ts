import type { ReactNode } from "react";
import type { TextAlign } from "./enums/TextAlign";
import type { Row } from "./row";
import type { SortMode } from "../helpers/sort";

export interface Column {
  id: string;
  name: string;
  group?: string[];
  isHidden?: boolean;
  isSticky?: boolean;
  isSortable?: boolean;
  width?: number;
  textAlign?: TextAlign;
  onClick?: (column?: string, index?: number) => void;
  renderHeaderCellFn?: (
    column?: Column,
    index?: number,
    sort?: () => void
  ) => ReactNode | null;
  renderCellFn?: (value: string, row: Row) => ReactNode | null;
  columnSizeFn?: (column?: Column, index?: number) => number;
  sortFn?: (rows: Row[], sortMode?: SortMode) => Row[];
}

export type ExpandedCell = {
  value: string | number | boolean;
  colSpan?: number;
  rowSpan?: number;
};

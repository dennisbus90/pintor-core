import type { ExpandedCell } from "../models/cell";

export const isExpandedCell = (cell: any): cell is ExpandedCell => {
  return cell?.value;
};

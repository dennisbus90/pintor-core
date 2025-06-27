import type { Row } from "../models/row";

export const hasValuesAtIndexes = (
  rows: Row[],
  fromIndex?: number,
  toIndex?: number
) =>
  fromIndex !== undefined &&
  toIndex !== undefined &&
  rows[fromIndex] !== undefined &&
  rows[toIndex - 1] !== undefined;

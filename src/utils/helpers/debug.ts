import { PintorTile } from "../../pintor.config";
import { TableErrorType } from "../models/enums/TableErrorType";

export const debugPaginationRangeNotFound = (
  fromIndex: number,
  toIndex: number
) => {
  const error = {
    type: TableErrorType.PAGINATION,
    text: `No rows found for the given pagination range [${fromIndex}, ${toIndex}]. Please check the pagination settings or the data source.`,
  };
  console.error(PintorTile, error, error.text);
};

export const debugCheckableRowsSelection = () => {
  const error = {
    type: TableErrorType.ROWS_CHECKBOX_SELECTION,
    text: `Some of the provided rows are missing an ID. Please ensure that all entities have a valid ID assigned.`,
  };
  console.error(PintorTile, error, error.text);
};

export const debugColumnNotFound = (columnId: string) => {
  const error = {
    type: TableErrorType.COLUMN,
    text: `Column with id ${columnId} not found`,
  };
  console.warn(PintorTile, error, error.text);
};

export const debugRowChildren = () => {
  const error = {
    type: TableErrorType.COLUMN,
    text: `List rows children is not yet implemented. Please check release notes.`,
  };
  console.error(PintorTile, error, error.text);
};
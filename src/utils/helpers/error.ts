import { TableErrorType } from "../models/enums/TableErrorType";

export const paginationRangeNotFoundError = {
  type: TableErrorType?.PAGINATION,
  text: "Could not load rows",
};

export const rowsCheckboxSelectionError = {
  type: TableErrorType?.ROWS_CHECKBOX_SELECTION,
  text: "Something went wrong with your selection.",
};

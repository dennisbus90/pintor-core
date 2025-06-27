export enum TableCellSize {
  Small = "small",
  Medium = "medium",
  Large = "large",
}

export const getTableCellPixelSizeBy = (size: TableCellSize) => {
  switch (size) {
    case TableCellSize.Small:
      return 40;
    case TableCellSize.Medium:
      return 48;
    case TableCellSize.Large:
      return 56;
    default:
      return 48;
  }
};

import React, { useState } from "react";
import { isExpandedCell } from "../../../utils/helpers/table";
import type { CellSettings } from "../../../hooks/useCellRefs";
import { TextAlign } from "../../../utils/models/enums/TextAlign";
import type { Table } from "../../../utils/models/table";
import type {
  DeepMutable,
  DeepReadonly,
} from "../../../utils/helpers/typescript";
import type { Row } from "../../../utils/models/row";
import type { Column } from "../../../utils/models/cell";
import { HightlightTable } from "../../../utils/models/enums/highlightTable";
import { pintorCheckbox } from "../../../utils/helpers/checkbox";

export interface RawCellProps extends Table {
  row?: Row;
  rowIndex: number;
  columnIndex: number;
  column: Column;
  children?: React.ReactNode;
  settings?: Record<string, CellSettings>;
  isSelected?: boolean;
  isActive?: boolean;
  onSelectRow: (isChecked: boolean) => void;
  onDragStart?: (index: number) => void;
  onDragOver?: (index: number) => void;
  onDrop?: (index: number) => void;
  onHover?: (isActive: boolean) => void;
  onOpen?: (isOpen: boolean) => void;
}

export const RawCell = ({
  row,
  columnIndex = -1,
  rowIndex = -1,
  column,
  onCellClick,
  hightlight,
  settings,
  checkable,
  isSelected,
  onSelectRow,
  onHover,
  isActive = false,
  debug,
  onOpen,
}: DeepReadonly<RawCellProps>) => {
  const tdRef = React.useRef<HTMLTableCellElement>(null);
  const [isRowOpen, setIsRowOpen] = useState(row?.isOpen || false);
  const cellHasChildren = row?.children && row?.children.length > 0 && columnIndex === 0;
  const cellIsCheckable = checkable && column.id === pintorCheckbox.id;

  if (!row) return null;
  let text;
  let rowValue = row[column.id];
  let colSpan = 1;
  let rowSpan = 1;
  if (isExpandedCell(rowValue)) {
    text = rowValue.value.toString();
    rowSpan = rowValue?.rowSpan || 1;
    colSpan = rowValue?.colSpan || 1;
  } else text = row[column.id]?.toString();
  const value = row[column.id]?.toString() ?? "";

  const stickyStyle = settings?.[column.id]?.isStickyActive
    ? "has-left-shadow"
    : "";

  return (
    <td
      ref={column.isSticky ? tdRef : null}
      colSpan={colSpan}
      rowSpan={rowSpan}
      onMouseEnter={() => onHover && onHover(true)}
      onMouseLeave={() => onHover && onHover(false)}
      className={`cell ${isActive ? "is-active" : ""} ${column.renderCellFn ? "is-custom-rendering" : ""
        } ${stickyStyle} ${column.isSticky ? "is-sticky" : ""} ${hightlight === HightlightTable.Cell && column.id !== pintorCheckbox.id
          ? "td-hover"
          : ""
        }`}
      onClick={() =>
        onCellClick &&
        onCellClick(
          value,
          column as DeepMutable<typeof column>,
          columnIndex,
          rowIndex
        )
      }
    >
      <div
        className={`cell-content text-is-${column?.textAlign ? column.textAlign : TextAlign.Left
          }`}
      >
        {cellHasChildren && (
          <button
            onClick={() => {
              onOpen && onOpen(!isRowOpen)
              setIsRowOpen(prev => !prev);
            }}
          >
            <span className={`expand-children-arrow ${isRowOpen ? 'is-down' : 'is-up'}`} />
          </button>
        )}
        {cellIsCheckable && !cellHasChildren ? (
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => {
              const isChecked = e.target.checked;
              onSelectRow && onSelectRow(isChecked);
            }}
          />
        ) : column.renderCellFn ? (
          column.renderCellFn(
            rowValue as string,
            row as DeepMutable<typeof row>
          )
        ) : (
          text
        )}
      </div>
    </td>
  );
};

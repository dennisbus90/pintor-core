import React from "react";
import type { ColumnProps } from "../../../utils/models/cell";
import rows from "./dummy-data/multiplication.json";

const cellWidth = 54;

function renderCell(value: string) {
  return (
    <div
      style={{
        height: cellWidth,
        width: cellWidth,
        fontSize: 20,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          height: cellWidth / 2,
          width: cellWidth / 2,
          background: "#fff",
          borderRadius: "50%",
          padding: 4,
          display: "inherit",
          justifyContent: "inherit",
          alignItems: "inherit",
        }}
      >
        <span>{value}</span>
      </div>
    </div>
  );
}

const columns: ColumnProps[] = [
  {
    id: "id",
    name: "id",
    isHidden: true,
  },
  {
    id: "title",
    name: "Title",
    width: cellWidth,
    renderHeaderCellFn: (column) => <div style={{ fontSize: 20 }}></div>,
    renderCellFn: (value) => (
      <div
        style={{
          height: cellWidth,
          width: cellWidth,
          fontSize: 20,
          display: "flex",
          fontWeight: "bold",
          justifyContent: "center",
          alignItems: "center",
          background: "white",
        }}
      >
        <span>{value}</span>
      </div>
    ),
  },
  {
    id: "1",
    name: "1",
    width: cellWidth,
    renderHeaderCellFn: (column) => (
      <div style={{ fontSize: 20, textAlign: "center" }}>{column?.name}</div>
    ),
    renderCellFn: renderCell,
  },
  {
    id: "2",
    name: "2",
    width: cellWidth,
    renderHeaderCellFn: (column) => (
      <div style={{ fontSize: 20, textAlign: "center" }}>{column?.name}</div>
    ),
    renderCellFn: renderCell,
  },
  {
    id: "3",
    name: "3",
    width: cellWidth,
    renderHeaderCellFn: (column) => (
      <div style={{ fontSize: 20, textAlign: "center" }}>{column?.name}</div>
    ),
    renderCellFn: renderCell,
  },
  {
    id: "4",
    name: "4",
    width: cellWidth,
    renderHeaderCellFn: (column) => (
      <div style={{ fontSize: 20, textAlign: "center" }}>{column?.name}</div>
    ),
    renderCellFn: renderCell,
  },
  {
    id: "5",
    name: "5",
    width: cellWidth,
    renderHeaderCellFn: (column) => (
      <div style={{ fontSize: 20, textAlign: "center" }}>{column?.name}</div>
    ),
    renderCellFn: renderCell,
  },
];

export const multiplicationData = {
  columns,
  rows,
};

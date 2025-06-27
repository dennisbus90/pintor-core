import { TextAlign } from "../../../utils/models/enums/TextAlign";
import rows from "../../../dummy-food.json";

import React from "react";
import { DefaultCell } from "../../../components/Table/renders/DefaultCell";
import { ColumnProps } from "../../../utils/models/cell";

const columns: ColumnProps[] = [
  {
    id: "id",
    name: "id",
    isHidden: true,
  },
  {
    id: "name",
    name: "Namn",
    isSticky: true,
    isSortable: true,
    renderCellFn(value) {
      return (
        <DefaultCell>
          <span>{value}</span>
        </DefaultCell>
      );
    },
  },
  { id: "kcal", textAlign: TextAlign.Right, isSortable: true, name: "Kcal" },
  { id: "fat", textAlign: TextAlign.Right, isSortable: true, name: "Fat(g)" },
  {
    id: "carbs",
    textAlign: TextAlign.Right,
    isSortable: true,
    name: "Carbs(g)",
  },
  {
    id: "protein",
    textAlign: TextAlign.Right,
    isSortable: true,
    name: "Protein(g)",
  },
];

export const fruitData = {
  columns,
  rows,
};

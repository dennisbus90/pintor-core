import { useState } from "react";
import type { Column } from "../utils/models/cell";
import type { Row } from "../utils/models/row";
import type { DeepReadonly } from "../utils/helpers/typescript";

export function useMatrix(
  params: DeepReadonly<{
    rows: Row[];
    columns: Column[];
  }>
) {
  const { rows, columns } = params;
  const [matrix, setMatrix] = useState<boolean[][]>([]);

  const updateMatrix = (rowIndex: number, columnIndex: number) => {
    const updatedMatrix = matrix.map((row, rIdx) =>
      row.map(
        (_, cIdx) =>
          (rIdx === rowIndex && cIdx <= columnIndex) ||
          (cIdx === columnIndex && rIdx <= rowIndex)
      )
    );

    setMatrix(updatedMatrix);
  };

  const resetMatrix = () => {
    setMatrix(
      Array.from({ length: rows?.length || 0 }, () =>
        Array.from({ length: columns.filter((c) => c.id).length }, () => false)
      )
    );
  };

  return {
    matrix,
    updateMatrix,
    resetMatrix,
  };
}

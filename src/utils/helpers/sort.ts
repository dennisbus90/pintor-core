import type { Row } from "../models/row";

export type SortMode = "asc" | "desc";

export const sortRows = (rows: Row[], key: string, order: SortMode = "asc") => {
  const direction = order === "asc" ? 1 : -1;

  return [...rows].sort((x, y) => {
    const a = x[key];
    const b = y[key];
    const typeA = typeof a;
    const typeB = typeof b;

    if (typeA !== typeB) {
      return direction * typeA.localeCompare(typeB);
    }

    if (typeof a === "number" && typeof b === "number") {
      return direction * (a - b);
    }

    if (typeof a === "string" && typeof b === "string") {
      return direction * a.localeCompare(b);
    }

    if (typeof a === "boolean" && typeof b === "boolean") {
      return direction * (Number(a) - Number(b));
    }

    if (a instanceof Date && b instanceof Date) {
      return direction * (a.getTime() - b.getTime());
    }

    if (Array.isArray(a) && Array.isArray(b)) {
      if (a.length !== b.length) return direction * (a.length - b.length);
      return direction * JSON.stringify(a).localeCompare(JSON.stringify(b));
    }

    if (typeof a === "object" && typeof b === "object") {
      return direction * JSON.stringify(a).localeCompare(JSON.stringify(b));
    }

    return direction * String(a).localeCompare(String(b));
  });
};

import type { ExpandedCell } from "./cell";

export type Row<T = any> = {
  children?: Row<T>[];
  isOpen?: boolean;
  data?: T;
} & {
  [key: string]:
    | string
    | number
    | boolean
    | ExpandedCell
    | Row<T>[]
    | undefined;
};

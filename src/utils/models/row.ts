import type { ExpandedCell } from "./cell";

export type Row<T = any> = {
  id: string;
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

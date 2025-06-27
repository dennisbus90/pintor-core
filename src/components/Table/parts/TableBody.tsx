import type { DeepReadonly } from "../../../utils/helpers/typescript";
import type { Column } from "../../../utils/models/cell";
import { TableTr } from "./TableTr";

interface TableBodyProps {
  columns: Column[];
  children: React.ReactNode;
}

export const TableBody = ({
  columns,
  children,
}: DeepReadonly<TableBodyProps>) => {
  return (
    <tbody>
      <TableTr columns={columns}>{children}</TableTr>
    </tbody>
  );
};

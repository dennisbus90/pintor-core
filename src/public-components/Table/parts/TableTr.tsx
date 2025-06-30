import type { DeepReadonly } from "../../../utils/helpers/typescript";
import type { Column } from "../../../utils/models/cell";

interface TableTrProps {
  columns: Column[];
  children: React.ReactNode;
}

export const TableTr = ({ columns, children }: DeepReadonly<TableTrProps>) => {
  const colSpan = columns.filter((c) => !c.isHidden).length;
  return (
    <tr>
      <td className="text-is-center is-custom-rendering" colSpan={colSpan}>
        {children}
      </td>
    </tr>
  );
};

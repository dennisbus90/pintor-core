import { useState } from "react";
import { RawTable } from "./raws/RawTable";
import { RawPagination } from "../Pagination/RawPagination";
import type { Table } from "../../utils/models/table";
import type { DeepReadonly } from "../../utils/helpers/typescript";
import {
  PaginationAlign,
  type Paginate,
  type PinPagination,
} from "../../utils/models/pagination";

interface PinTableProps extends Table {
  pagination?: PinPagination;
}

function PinTable(props: DeepReadonly<PinTableProps>) {
  const [paginate, setPaginate] = useState<Paginate>();

  const getPagination = () =>
    props?.pagination && (
      <RawPagination
        paginate={paginate}
        {...props?.pagination}
        onPageChange={(paginate) => {
          const paginationAlign =
            props?.pagination?.paginationAlign ?? PaginationAlign.BOTTOM;
          setPaginate({
            ...paginate,
            paginationAlign,
          });
          props?.pagination?.onPageChange?.(paginate);
        }}
      />
    );

  const align = props.pagination?.paginationAlign;
  const isPaginationTop =
    !!align &&
    [PaginationAlign.TOP, PaginationAlign.TOP_BOTTOM].includes(align);

  const isPaginationBottom =
    !!align &&
    [PaginationAlign.BOTTOM, PaginationAlign.TOP_BOTTOM].includes(align);

  const showBottomPagination =
    isPaginationBottom || (!isPaginationTop && !isPaginationBottom);

  return (
    <>
      {isPaginationTop && getPagination()}
      <RawTable {...props} paginate={paginate} />
      {showBottomPagination && getPagination()}
    </>
  );
}

export default PinTable;

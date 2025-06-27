import { useEffect, useState } from "react";
import "./pagination.scss";
import { TableCellSize } from "../../utils/models/enums/TableCellSize";
import { Dropdown, type DropdownItem } from "../Dropdown/Dropdown";
import type { DeepReadonly } from "../../utils/helpers/typescript";
import {
  PaginationAlign,
  type Paginate,
  type PinPagination,
} from "../../utils/models/pagination";

interface PaginationProps extends PinPagination {
  tableCellSize?: TableCellSize;
  paginate?: Paginate;
  pageSizes?: number[];
}

export const RawPagination = ({
  pageSize = 10,
  total = 0,
  page = 1,
  autoRefreshMs = 10000,
  onPageChange,
  tableCellSize = TableCellSize.Medium,
  paginationAlign,
  paginate,
  pageSizes,
}: DeepReadonly<PaginationProps>) => {
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);
  const [selectedPageSize, setSelectedPageSize] = useState(pageSize);
  const [fromTo, setFromTo] = useState<{ from: number; to: number }>({
    from: -1,
    to: -1,
  });
  const [currentPage, setCurrentPage] = useState(page);
  const [rowsLoadedPagination, setRowsLoadedPagination] =
    useState(currentPageSize);
  const [rowsLoaded, setRowsLoaded] = useState(currentPageSize);
  const fromIndex = paginate?.fromIndex
    ? paginate?.fromIndex
    : rowsLoaded - currentPageSize;
  const toIndex = paginate?.toIndex ? paginate?.toIndex : rowsLoaded;
  const defaultItemsPerPage = pageSizes ? pageSizes : [5, 10, 20, 50];
  let dropdownItems: DropdownItem[] = [];
  defaultItemsPerPage.forEach((item) => {
    if (item <= total)
      dropdownItems.push({ name: String(item), value: String(item) });
  });

  useEffect(() => {
    if (paginate) {
      const updatedPaginationSize = paginate?.toIndex - paginate?.fromIndex;
      if (updatedPaginationSize !== currentPage) {
        setCurrentPage(1);
        setRowsLoaded(updatedPaginationSize);
        setRowsLoadedPagination(updatedPaginationSize);
        setCurrentPageSize(updatedPaginationSize);
      }
    }
  }, [paginate]);

  useEffect(() => {
    const remainder = toIndex % currentPageSize;
    const padding = remainder === 0 ? 0 : currentPageSize - remainder;
    const adjustedToIndex = toIndex + padding;
    setRowsLoaded(toIndex);
    setRowsLoadedPagination(adjustedToIndex);
    setCurrentPage(paginate?.page ?? page);
  }, [fromIndex, toIndex]);

  useEffect(
    () =>
      onPageChange &&
      onPageChange({
        page: currentPage,
        fromIndex,
        toIndex,
        autoRefreshMs,
        prev: undefined,
        pageSize: currentPageSize,
      }),
    []
  );

  const next = () => {
    let rowsLoadedUpdated = rowsLoaded + currentPageSize;
    setRowsLoadedPagination(rowsLoadedUpdated);
    if (rowsLoadedUpdated > total) {
      rowsLoadedUpdated = total;
    }
    const from = rowsLoaded;
    const to = rowsLoadedUpdated;
    if (rowsLoaded < total) {
      setCurrentPage(currentPage + 1);
      setRowsLoaded(rowsLoadedUpdated);
    }

    onPageChange &&
      onPageChange({
        page: currentPage + 1,
        fromIndex: from,
        toIndex: to,
        autoRefreshMs,
        prev: {
          page: currentPage,
          fromIndex: rowsLoaded - currentPageSize,
          toIndex: rowsLoaded,
        },
        pageSize: currentPageSize,
      });
    setFromTo({ from, to });
  };

  const prev = () => {
    const rowsLoadedUpdated = rowsLoadedPagination - selectedPageSize;
    const from = rowsLoadedUpdated - selectedPageSize;
    const to = rowsLoadedUpdated;

    if (rowsLoaded <= total) {
      setCurrentPage(currentPage - 1);
      setRowsLoaded(rowsLoadedUpdated);
      setRowsLoadedPagination(rowsLoadedUpdated);
    }

    onPageChange &&
      onPageChange({
        page: currentPage - 1,
        fromIndex: from,
        toIndex: to,
        autoRefreshMs,
        prev: {
          page: currentPage,
          fromIndex: fromTo.from,
          toIndex: fromTo.to,
        },
        pageSize: selectedPageSize,
      });
    setFromTo({ from, to });
  };

  return (
    <div
      className={`pagination is-${tableCellSize} is-${(paginationAlign
        ? paginationAlign
        : PaginationAlign.BOTTOM
      ).toLowerCase()}`}
    >
      <Dropdown
        title={`Rows per page: ${selectedPageSize}`}
        items={dropdownItems}
        onSelect={(item) => {
          const value = Number(item.value);
          setCurrentPage(1);
          setRowsLoaded(value);
          setRowsLoadedPagination(value);
          setCurrentPageSize(value);
          setSelectedPageSize(value);
          setFromTo({ from: 0, to: value });
          onPageChange &&
            onPageChange({
              page: 1,
              fromIndex: 0,
              toIndex: value,
              autoRefreshMs,
              prev: {
                page: currentPage,
                fromIndex: 0,
                toIndex: value,
              },
              pageSize: value,
            });
        }}
      />
      <div>
        <span className="right-content">
          {fromIndex + 1}–{toIndex} of {total}
        </span>
        <button
          className="button next-button is-dark is-outlined is-rounded"
          onClick={prev}
          disabled={currentPage === 1}
        >
          <span className="arrow is-left"></span>
        </button>
        <button
          className="button next-button is-dark is-outlined is-rounded"
          onClick={next}
          disabled={rowsLoaded === total}
        >
          <span className="arrow is-right"></span>
        </button>
      </div>
    </div>
  );
};

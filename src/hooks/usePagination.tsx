import { useEffect, useState } from "react";
import type { Row } from "../utils/models/row";
import type { DeepMutable, DeepReadonly } from "../utils/helpers/typescript";
import React from "react";
import { hasValuesAtIndexes } from "../utils/helpers/rows";
import type { Paginate } from "../utils/models/pagination";

export function usePagination(
  params: DeepReadonly<{
    paginate?: Paginate;
    rows: Row[];
    isLoading: boolean;
    incomingRowsIsLoading: boolean;
    loadingRows: number;
  }>
) {
  const { paginate, rows, isLoading, incomingRowsIsLoading, loadingRows } =
    params;
  const [paginatedRows, setPaginatedRows] = useState<DeepReadonly<Row[]>>();
  const [pageIsLoading, setPageIsLoading] = useState<boolean>(false);
  const [hasError, setHasError] = useState<boolean>(false);
  const tableRowsRef = React.useRef(rows);
  let fromIndex = paginate?.fromIndex;
  let toIndex = paginate?.toIndex;

  React.useEffect(() => {
    setPageIsLoading(isLoading);
  }, [isLoading]);

  React.useEffect(() => {
    tableRowsRef.current = rows;
  }, [rows]);

  useEffect(() => {
    const tableIsLoading = paginate ? pageIsLoading : incomingRowsIsLoading;
    const pageRows = tableIsLoading ? [] : rows.slice(fromIndex, toIndex);
    if (paginate && !incomingRowsIsLoading) setPaginatedRows(pageRows);
    else if (!incomingRowsIsLoading) setPaginatedRows(pageRows);
  }, [rows, incomingRowsIsLoading, fromIndex, toIndex]);

  useEffect(() => {
    if (!paginate) {
      incomingRowsIsLoading
        ? setPaginatedRows(rows.slice(0, rows.length - loadingRows))
        : setPaginatedRows(rows);
    }
  }, []);

  React.useEffect(() => {
    const msToRetry = paginate?.autoRefreshMs || 10000;
    let msToRetryLeft = 0;

    if (paginate) {
      fromIndex = paginate?.fromIndex;
      toIndex = paginate?.toIndex;

      let exists = hasValuesAtIndexes(
        rows as DeepMutable<typeof rows>,
        fromIndex,
        toIndex
      );

      if (!exists) {
        setPageIsLoading(true);

        const intervalId = setInterval(() => {
          exists = hasValuesAtIndexes(
            tableRowsRef.current as DeepMutable<typeof rows>,
            fromIndex,
            toIndex
          );

          if (msToRetryLeft >= msToRetry && !exists) {
            setHasError(true);
            fromIndex = paginate?.prev?.fromIndex || fromIndex;
            toIndex = paginate?.prev?.toIndex || toIndex;
          }

          if (msToRetryLeft >= msToRetry || exists) {
            clearInterval(intervalId);
            setPageIsLoading(false);
          }
          msToRetryLeft += 250;
        }, 250);
        return () => clearInterval(intervalId);
      }
    }
  }, [paginate]);

  return { pageIsLoading, fromIndex, toIndex, hasError, paginatedRows };
}

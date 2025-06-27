export interface PinPagination {
  pageSize?: number;
  total?: number;
  onPageChange?: (paginate: Paginate) => void;
  page?: number;
  autoRefreshMs?: number;
  paginationAlign?: PaginationAlign;
  pageSizes?: number[];
}

export enum PaginationAlign {
  TOP = "TOP",
  BOTTOM = "BOTTOM",
  TOP_BOTTOM = "TOP-BOTTOM",
}

export type PaginationState = {
  fromIndex: number;
  toIndex: number;
  page?: number;
};

export interface Paginate extends PaginationState {
  autoRefreshMs?: number;
  paginateOnScroll?: boolean;
  prev?: PaginationState;
  paginationAlign?: PaginationAlign;
  pageSize?: number;
}

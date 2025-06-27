import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import rows from "../../dummy-food.json";
import { generateRandomNrBetween } from "../../utils/helpers/general";
import { Portal } from "../helpers/Portal";
import { fruitData } from "../helpers/columns-rows/fruitColumnsRows";
import { type TransactionData } from "../helpers/columns-rows/bankTransactionsColumnsRows";
import { tableConfig, tableDefaultParams } from "../config/tableConfig";
import type { Row } from "../../utils/models/row";
import { PaginationAlign } from "../../utils/models/pagination";
import PinTable from "../../components/Table";
import { hasValuesAtIndexes } from "../../utils/helpers/rows";
import React from "react";

const meta = {
  title: "Components/Table/Actions",
  component: (props) => {
    const page2 = [
      {
        id: generateRandomNrBetween(1, 999).toString(),
        name: "Fruit X",
        kcal: 32,
        carbs: 11,
        fat: 0.4,
        protein: 3.1,
      },
      {
        id: generateRandomNrBetween(1, 999).toString(),
        name: "Fruit Y",
        kcal: 44,
        carbs: 7,
        fat: 0.2,
        protein: 2.0,
      },
      {
        id: generateRandomNrBetween(1, 999).toString(),
        name: "Fruit Z",
        kcal: 44,
        carbs: 7,
        fat: 0.2,
        protein: 2.0,
      },
      {
        id: generateRandomNrBetween(1, 999).toString(),
        name: "Fruit Z",
        kcal: 44,
        carbs: 7,
        fat: 0.2,
        protein: 2.0,
      },
      {
        id: generateRandomNrBetween(1, 999).toString(),
        name: "Fruit Z",
        kcal: 44,
        carbs: 7,
        fat: 0.2,
        protein: 2.0,
      },
    ];
    const page3 = [
      {
        id: generateRandomNrBetween(1, 999).toString(),
        name: "Fruit 1",
        kcal: 32,
        carbs: 11,
        fat: 0.4,
        protein: 3.1,
      },
      {
        id: generateRandomNrBetween(1, 999).toString(),
        name: "Fruit 2",
        kcal: 44,
        carbs: 7,
        fat: 0.2,
        protein: 2.0,
      },
      {
        id: generateRandomNrBetween(1, 999).toString(),
        name: "Fruit 3",
        kcal: 44,
        carbs: 7,
        fat: 0.2,
        protein: 2.0,
      },
    ];

    const [isLoading, setIsLoading] = useState(false);
    const loadMore = () => {
      setIsLoading(true);
      setTimeout(() => {
        setTempRows((prev) => [...page2, ...prev]);
        setIsLoading(false);
      }, 2000);
    };

    const onNextPage = (page: number, pageSize: number) => {
      setTimeout(() => {
        if (page === 2) setTempRows((prev) => [...prev, ...page2]);
        if (page === 3) setTempRows((prev) => [...prev, ...page3]);
      }, 2000);
    };

    const [tempRows, setTempRows] = useState<Row<TransactionData>[]>(
      rows.slice(0, 5)
    );

    return (
      <>
        <button
          className="button is-primary"
          style={{ marginBottom: 16 }}
          onClick={loadMore}
        >
          Load items
        </button>
        <PinTable
          {...props}
          isLoading={isLoading}
          rows={tempRows}
          pagination={{
            ...props.pagination,
            onPageChange: (paginate) => {
              const { page, pageSize, fromIndex, toIndex } = paginate;
              const exists = hasValuesAtIndexes(tempRows, fromIndex, toIndex);

              if (!exists && page && pageSize) onNextPage(page, pageSize);
            },
          }}
        />
      </>
    );
  },
  decorators: [
    (Story, options) => {
      return (
        <Portal>
          <div style={{ width: 600 }}>
            <Story />
          </div>
        </Portal>
      );
    },
  ],

  ...tableConfig,
  tags: ["autodocs"],
} satisfies Meta<typeof PinTable>;

export default meta;
type Story = StoryObj<typeof PinTable>;

export const Pagination: Story = {
  args: {
    ...tableDefaultParams,
    draggableColumns: true,
    checkable: true,
    draggableRows: true,
    resizableColumns: true,
    showLoadingIncomingNewRows: true,
    fixedHeader: true,
    pagination: {
      pageSize: 5,
      pageSizes: [5, 10, 15],
      paginationAlign: PaginationAlign.TOP_BOTTOM,
      total: 13,
      onPageChange: () => {},
      autoRefreshMs: 10000,
    },
    columns: fruitData.columns,
  },
};

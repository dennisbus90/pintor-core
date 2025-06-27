import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "../helpers/Portal";
import { bankTransactionsData } from "../helpers/columns-rows/bankTransactionsColumnsRows";
import { TableCellSize } from "../../utils/models/enums/TableCellSize";
import { multiplicationData } from "../helpers/columns-rows/multiplicationColumnsRows";
import { tableConfig, tableDefaultParams } from "../config/tableConfig";
import { LoadingRowsPosition } from "../../utils/models/enums/loadingRowsPosition";
import PinTable from "../../components/Table";
import { PaginationAlign } from "../../utils/models/pagination";
import React from "react";

const meta = {
  title: "Components/Table/Examples",
  component: PinTable,
  decorators: [
    (Story, options) => {
      return (
        <Portal>
          <div style={{ width: 900 }}>
            <Story />
          </div>
        </Portal>
      );
    },
  ],
  ...tableConfig,
  tags: ["autodocs"],
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
} satisfies Meta<typeof PinTable>;

export default meta;
type Story = StoryObj<typeof PinTable>;

export const BankTransactions: Story = {
  args: {
    ...tableDefaultParams,
    draggableColumns: true,
    draggableRows: true,
    resizableColumns: true,
    showLoadingIncomingNewRows: true,
    fixedHeader: true,
    tableCellSize: TableCellSize.Large,
    loadingRowsPosition: LoadingRowsPosition.Top,
    ...bankTransactionsData,
  },
};

export const Multiplication: Story = {
  args: {
    ...tableDefaultParams,
    showLoadingIncomingNewRows: true,
    tableCellSize: TableCellSize.Large,
    loadingRowsPosition: LoadingRowsPosition.Top,
    ...multiplicationData,
  },
};

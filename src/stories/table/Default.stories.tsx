import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "../helpers/Portal";
import { fruitData } from "../helpers/columns-rows/fruitColumnsRows";
import { tableConfig, tableDefaultParams } from "../config/tableConfig";
import PinTable from "../../public-components/Table";

const meta = {
  title: "Components/Table",
  component: PinTable,
  decorators: [
    (Story, options) => {
      return (
        <Portal>
          <div style={{ width: 600, height: 400 }}>
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

export const Default: Story = {
  args: {
    ...tableDefaultParams,
    ...fruitData,
    draggableRows: true,
  },
};

import type { Meta, StoryObj } from "@storybook/react-vite";
import { Portal } from "../helpers/Portal";
import { fruitData } from "../helpers/columns-rows/fruitColumnsRows";
import { tableConfig, tableDefaultParams } from "../config/tableConfig";
import { LoadingRowsPosition } from "../../utils/models/enums/loadingRowsPosition";
import PinTable from "../../components/Table";

const meta = {
  title: "Components/Table/States",
  component: (props) => {
    return <PinTable {...props} />;
  },
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

export const EmptyState: Story = {
  args: {
    ...tableDefaultParams,
    loadingRowsPosition: LoadingRowsPosition.Top,
    ...fruitData,
    rows: [],
  },
};

export const MessageState: Story = {
  args: {
    ...tableDefaultParams,
    fixedHeader: true,
    ...fruitData,
    messageState: {
      keepRows: true,
      render: (
        <div
          style={{
            background: "#ffd9d7",
            height: "100%",
            padding: 12,
            boxSizing: "border-box",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div
              style={{ display: "flex", alignItems: "center" }}
              className="test"
            >
              <div style={{ width: 24, height: 24, display: "inline-block" }}>
                <svg
                  id="Lager_1"
                  data-name="Lager 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 102.73 102.73"
                >
                  <path
                    d="M87.69,15.05C77.66,5.02,64.51,0,51.37,0S25.07,5.02,15.04,15.05c-20.06,20.06-20.06,52.58,0,72.64,10.03,10.03,23.18,15.04,36.32,15.04s26.29-5.01,36.32-15.04c20.06-20.06,20.06-52.58,0-72.64ZM21.41,21.41c8-8,18.64-12.41,29.96-12.41,9.8,0,19.09,3.31,26.61,9.4l-59.57,59.58c-6.09-7.51-9.4-16.8-9.4-26.61,0-11.32,4.41-21.96,12.41-29.96ZM81.32,81.32c-8,8-18.64,12.41-29.96,12.41-9.8,0-19.09-3.31-26.61-9.4l59.58-59.58c6.09,7.51,9.4,16.8,9.4,26.61,0,11.32-4.41,21.96-12.41,29.96Z"
                    fill="#ff3636"
                    stroke-width="0"
                  />
                </svg>
              </div>
              <p
                style={{
                  margin: 0,
                  display: "inline-block",
                  marginLeft: 8,
                }}
              >
                Couldn't fetch all items this time. Please try again.
              </p>
            </div>
            <button
              style={{
                background: "white",
                border: "none",
                height: 32,
                padding: "4px 16px",
                borderRadius: 16,
              }}
            >
              Retry
            </button>
          </div>
        </div>
      ),
    },
  },
};

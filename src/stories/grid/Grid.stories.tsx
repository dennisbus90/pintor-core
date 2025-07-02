import type { Meta, StoryObj } from "@storybook/react-vite";
import PinRow from "../../public-components/grid/Row";
import PinColumn from "../../public-components/grid/Column";
import { gridConfig } from "../config/gridConfig";
import PinProvider from "../../context/PinProvider";
import "./grid.scss"

const meta = {
  title: "Components/Grid",
  component: (props) => {
    return (
      <>
        <div style={{ width: 800 }}>
          <h1>Grid</h1>
          <PinRow gap={32}>
            <PinColumn offset={{ widescreen: 3, fullhd: 3 }} size={{
              mobile: 3,
              tablet: 12,
              desktop: 6,
              widescreen: 6,
              fullhd: 6,
            }}><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
            <PinColumn><div className="column">Auto</div></PinColumn>
          </PinRow>
        </div>

        <PinProvider grid={{
          maxSizeColumns: 12,
          breakpoints: {
            sm: 410,
            md: 750,
            lg: 1024,
          },
          gap: 16
        }}>
          <div style={{ width: 800 }}>
            <h1>Custom Grid</h1>
            <PinRow>
              <PinColumn size={{
                sm: 3,
                md: 6,
                lg: 12,
              }}><div className="column">sm: 3/ md: 6/ lg: 12</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
              <PinColumn><div className="column">Auto</div></PinColumn>
            </PinRow>
          </div>
        </PinProvider ></>
    );
  },

  ...gridConfig,
  tags: ["autodocs"],
} satisfies Meta<typeof PinRow>;

export default meta;
type Story = StoryObj<typeof PinRow>;

export const Grid: Story = {
  args: {

  },
};

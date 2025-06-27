import { HightlightTable } from "../../utils/models/enums/highlightTable";
import { LoadingRowsPosition } from "../../utils/models/enums/loadingRowsPosition";

export const tableConfig = {
  parameters: {
    layout: "centered",
  },
  args: {
    hightlight: HightlightTable.Row,
    loadingRowsPosition: LoadingRowsPosition.Top,
  },
  argTypes: {
    //backgroundColor: { control: "color" },
    lazyLoad: {
      description: "Render each row seperately in the moment it's on view.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    checkable: {
      description: "Checkable rows.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isBordered: {
      description: "Wrap all cells with a solid border.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    debug: {
      description:
        "Debug to get extra and more specifik information on console. Made For developers.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    hightlight: {
      control: { type: "select" },
      options: Object.values(HightlightTable),
      description: "Highlight hover interaction",
      table: {
        type: { summary: "HightlightTable" },
        defaultValue: { summary: HightlightTable.Row },
      },
    },
    loadingRowsPosition: {
      control: { type: "select" },
      options: Object.values(LoadingRowsPosition),
      table: {
        type: { summary: "LoadingRowsPosition" },
        defaultValue: { summary: LoadingRowsPosition.Top },
      },
    },
    draggableColumns: {
      description: "Swap a column with another.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    draggableRows: {
      description: "Swap a row with another.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    resizableColumns: {
      description: "Resize a column. Minimum size is set to 50px.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    showLoadingIncomingNewRows: {
      description:
        "Whenever new rows are added into the component, the component will recognize and calculate what rows are new and serve them to the user.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    fixedHeader: {
      description: "Make top header sticky onscroll.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    isLoading: {
      description: "Activate a full loading view.",
      table: {
        defaultValue: { summary: "false" },
      },
    },
    loadingRows: {
      description:
        "Set the number of loading rows to be shown during loading state.",
      table: {
        defaultValue: { summary: "3" },
      },
    },
  },
};

export const tableDefaultParams = {
  isBordered: false,
  lazyLoad: true,
  checkable: false,
  debug: false,
  draggableColumns: false,
  draggableRows: false,
  resizableColumns: false,
  showLoadingIncomingNewRows: false,
  fixedHeader: false,
  hightlight: HightlightTable.Row,
  isLoading: false,
  loadingRows: 5,
  loadingRowsPosition: LoadingRowsPosition.Top,
  rows: [],
  columns: [],
};

import type { EmptyState } from "../../../utils/models/states";
import { TableBody } from "../parts/TableBody";
import type { DeepReadonly } from "../../../utils/helpers/typescript";
import type { Column } from "../../../utils/models/cell";

interface RawEmptyTableBodyProps {
  columns: Column[];
  state?: EmptyState;
}

export const RawEmptyTableBody = ({
  columns,
  state,
}: DeepReadonly<RawEmptyTableBodyProps>) => {
  return (
    <TableBody columns={columns}>
      <div style={{ padding: "24px 8px" }}>
        <div
          style={{
            width: 250,
            left: "50%",
            position: "relative",
            transform: "translateX(-50%)",
          }}
        >
          <svg
            id="Lager_1"
            data-name="Lager 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 193.45 79.5"
          >
            <rect
              width="193.45"
              height="23.8"
              rx="1.89"
              ry="1.89"
              fill="#f5f6f6"
              strokeWidth="0"
            />
            <rect
              y="27.85"
              width="193.45"
              height="23.8"
              rx="1.89"
              ry="1.89"
              fill="#f5f6f6"
              strokeWidth="0"
            />
            <path
              d="M15.46,44.66h-6.65c-.87,0-1.58-.71-1.58-1.58v-6.65c0-.87.71-1.58,1.58-1.58h6.65c.87,0,1.58.71,1.58,1.58v6.65c0,.87-.71,1.58-1.58,1.58ZM8.81,35.84c-.32,0-.58.26-.58.58v6.65c0,.32.26.58.58.58h6.65c.32,0,.58-.26.58-.58v-6.65c0-.32-.26-.58-.58-.58h-6.65Z"
              fill="#777"
              strokeWidth="0"
            />
            <rect
              y="55.7"
              width="193.45"
              height="23.8"
              rx="1.89"
              ry="1.89"
              fill="#f5f6f6"
              strokeWidth="0"
            />
            <path
              d="M15.46,72.5h-6.65c-.87,0-1.58-.71-1.58-1.58v-6.65c0-.87.71-1.58,1.58-1.58h6.65c.87,0,1.58.71,1.58,1.58v6.65c0,.87-.71,1.58-1.58,1.58ZM8.81,63.69c-.32,0-.58.26-.58.58v6.65c0,.32.26.58.58.58h6.65c.32,0,.58-.26.58-.58v-6.65c0-.32-.26-.58-.58-.58h-6.65Z"
              fill="#777"
              strokeWidth="0"
            />
            <g>
              <rect
                x="7.73"
                y="7.49"
                width="8.82"
                height="8.82"
                rx="1.08"
                ry="1.08"
                fill="#777"
                strokeWidth="0"
              />
              <path
                d="M15.46,16.81h-6.65c-.87,0-1.58-.71-1.58-1.58v-6.65c0-.87.71-1.58,1.58-1.58h6.65c.87,0,1.58.71,1.58,1.58v6.65c0,.87-.71,1.58-1.58,1.58ZM8.81,7.99c-.32,0-.58.26-.58.58v6.65c0,.32.26.58.58.58h6.65c.32,0,.58-.26.58-.58v-6.65c0-.32-.26-.58-.58-.58h-6.65Z"
                fill="#777"
                strokeWidth="0"
              />
            </g>
            <polyline
              points="9.34 11.9 10.96 14.24 14.91 9.89"
              fill="none"
              stroke="#fff"
              strokeMiterlimit="10"
            />
            <rect
              x="25.36"
              y="6.04"
              width="47.08"
              height="12.05"
              rx="6.02"
              ry="6.02"
              fill="#e2e2e2"
              strokeWidth="0"
            />
            <rect
              x="25.36"
              y="33.72"
              width="47.08"
              height="12.05"
              rx="6.02"
              ry="6.02"
              fill="#e2e2e2"
              strokeWidth="0"
            />
            <rect
              x="25.36"
              y="61.57"
              width="47.08"
              height="12.05"
              rx="6.02"
              ry="6.02"
              fill="#e2e2e2"
              strokeWidth="0"
            />
            <rect
              x="81.83"
              y="6.04"
              width="47.08"
              height="12.05"
              rx="6.02"
              ry="6.02"
              fill="#e2e2e2"
              strokeWidth="0"
            />
            <rect
              x="81.83"
              y="33.72"
              width="47.08"
              height="12.05"
              rx="6.02"
              ry="6.02"
              fill="#e2e2e2"
              strokeWidth="0"
            />
            <rect
              x="81.83"
              y="61.57"
              width="47.08"
              height="12.05"
              rx="6.02"
              ry="6.02"
              fill="#e2e2e2"
              strokeWidth="0"
            />
            <rect
              x="138.3"
              y="6.04"
              width="47.08"
              height="12.05"
              rx="6.02"
              ry="6.02"
              fill="#e2e2e2"
              strokeWidth="0"
            />
            <rect
              x="138.3"
              y="33.72"
              width="47.08"
              height="12.05"
              rx="6.02"
              ry="6.02"
              fill="#e2e2e2"
              strokeWidth="0"
            />
            <rect
              x="138.3"
              y="61.57"
              width="47.08"
              height="12.05"
              rx="6.02"
              ry="6.02"
              fill="#e2e2e2"
              strokeWidth="0"
            />
          </svg>
        </div>
        <p style={{ margin: "8px 0 0 0" }}>
          {state?.title || state?.title === ""
            ? state.title
            : "There are no rows to display"}
        </p>
        {state?.renderFoot && state.renderFoot}
      </div>
    </TableBody>
  );
};

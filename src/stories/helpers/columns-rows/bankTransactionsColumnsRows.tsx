import React from "react";
import { DefaultCell } from "../../../components/Table/renders/DefaultCell";
import type { ColumnProps } from "../../../utils/models/cell";
import { TextAlign } from "../../../utils/models/enums/TextAlign";
import type { Row } from "../../../utils/models/row";
import TimestampDate from "../../components/Date/Date";
import Tag from "../../components/Tag/Tag";
import { formatNumber } from "../formatNumbers";
import rows from "./dummy-data/transactions.json";

const columns: ColumnProps[] = [
  {
    id: "id",
    name: "id",
    isHidden: true,
  },
  {
    id: "transaction",
    name: "Transaction",
    width: 270,
    isSticky: true,
    renderCellFn(value) {
      return (
        <DefaultCell>
          <strong>{value}</strong>
        </DefaultCell>
      );
    },
  },
  {
    id: "date",
    name: "Date",
    isSortable: true,

    renderCellFn(value) {
      return (
        <DefaultCell>
          <TimestampDate timestamp={value || ""} />
        </DefaultCell>
      );
    },
  },
  {
    id: "method",
    name: "Method",
    width: 200,

    renderCellFn(value, row) {
      return (
        <DefaultCell>
          <div style={{ display: "flex" }}>
            <div style={{ marginRight: 8 }}>
              {value === "VISA" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <g className="nc-icon-wrapper">
                    <rect
                      x="2"
                      y="7"
                      width="28"
                      height="18"
                      rx="3"
                      ry="3"
                      fill="#1434cb"
                      stroke-width="0"
                    ></rect>
                    <path
                      d="m27,7H5c-1.657,0-3,1.343-3,3v12c0,1.657,1.343,3,3,3h22c1.657,0,3-1.343,3-3v-12c0-1.657-1.343-3-3-3Zm2,15c0,1.103-.897,2-2,2H5c-1.103,0-2-.897-2-2v-12c0-1.103.897-2,2-2h22c1.103,0,2,.897,2,2v12Z"
                      stroke-width="0"
                      opacity=".15"
                    ></path>
                    <path
                      d="m27,8H5c-1.105,0-2,.895-2,2v1c0-1.105.895-2,2-2h22c1.105,0,2,.895,2,2v-1c0-1.105-.895-2-2-2Z"
                      fill="#fff"
                      opacity=".2"
                      stroke-width="0"
                    ></path>
                    <path
                      d="m13.392,12.624l-2.838,6.77h-1.851l-1.397-5.403c-.085-.332-.158-.454-.416-.595-.421-.229-1.117-.443-1.728-.576l.041-.196h2.98c.38,0,.721.253.808.69l.738,3.918,1.822-4.608h1.84Z"
                      fill="#fff"
                      stroke-width="0"
                    ></path>
                    <path
                      d="m20.646,17.183c.008-1.787-2.47-1.886-2.453-2.684.005-.243.237-.501.743-.567.251-.032.943-.058,1.727.303l.307-1.436c-.421-.152-.964-.299-1.638-.299-1.732,0-2.95.92-2.959,2.238-.011.975.87,1.518,1.533,1.843.683.332.912.545.909.841-.005.454-.545.655-1.047.663-.881.014-1.392-.238-1.799-.428l-.318,1.484c.41.188,1.165.351,1.947.359,1.841,0,3.044-.909,3.05-2.317"
                      fill="#fff"
                      stroke-width="0"
                    ></path>
                    <path
                      d="m25.423,12.624h-1.494c-.337,0-.62.195-.746.496l-2.628,6.274h1.839l.365-1.011h2.247l.212,1.011h1.62l-1.415-6.77Zm-2.16,4.372l.922-2.542.53,2.542h-1.452Z"
                      fill="#fff"
                      stroke-width="0"
                    ></path>
                    <path
                      fill="#fff"
                      stroke-width="0"
                      d="M15.894 12.624L14.446 19.394 12.695 19.394 14.143 12.624 15.894 12.624z"
                    ></path>
                  </g>
                </svg>
              )}
              {value === "BANK TRANSFER" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <g className="nc-icon-wrapper">
                    <rect
                      x="2"
                      y="7"
                      width="28"
                      height="18"
                      rx="3"
                      ry="3"
                      fill="#e6e6e6"
                      stroke-width="0"
                    ></rect>
                    <path
                      d="m27,7H5c-1.657,0-3,1.343-3,3v12c0,1.657,1.343,3,3,3h22c1.657,0,3-1.343,3-3v-12c0-1.657-1.343-3-3-3Zm2,15c0,1.103-.897,2-2,2H5c-1.103,0-2-.897-2-2v-12c0-1.103.897-2,2-2h22c1.103,0,2,.897,2,2v12Z"
                      stroke-width="0"
                      opacity=".15"
                    ></path>
                    <path
                      d="m27,8H5c-1.105,0-2,.895-2,2v1c0-1.105.895-2,2-2h22c1.105,0,2,.895,2,2v-1c0-1.105-.895-2-2-2Z"
                      fill="#fff"
                      opacity=".2"
                      stroke-width="0"
                    ></path>
                    <path
                      d="m21.645,13.36l-5.25-3.248c-.242-.149-.547-.149-.789,0l-5.25,3.249c-.221.137-.355.378-.355.638v.751c0,.199.079.39.22.53s.331.22.53.22h10.5c.414,0,.75-.337.75-.751v-.751c0-.26-.135-.501-.355-.638Z"
                      fill="#1a1a1a"
                      stroke-width="0"
                    ></path>
                    <path
                      d="m21.25,20.5h-.75v-3.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75v3.25h-2.25v-3.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75v3.25h-2.25v-3.25c0-.414-.336-.75-.75-.75s-.75.336-.75.75v3.25h-.75c-.414,0-.75.336-.75.75s.336.75.75.75h10.5c.414,0,.75-.336.75-.75s-.336-.75-.75-.75Z"
                      fill="#1a1a1a"
                      stroke-width="0"
                    ></path>
                  </g>
                </svg>
              )}
              {value === "MASTERCARD" && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                >
                  <g className="nc-icon-wrapper">
                    <rect
                      x="2"
                      y="7"
                      width="28"
                      height="18"
                      rx="3"
                      ry="3"
                      fill="#fff"
                      stroke-width="0"
                    ></rect>
                    <path
                      d="m27,7H5c-1.657,0-3,1.343-3,3v12c0,1.657,1.343,3,3,3h22c1.657,0,3-1.343,3-3v-12c0-1.657-1.343-3-3-3Zm2,15c0,1.103-.897,2-2,2H5c-1.103,0-2-.897-2-2v-12c0-1.103.897-2,2-2h22c1.103,0,2,.897,2,2v12Z"
                      stroke-width="0"
                      opacity=".15"
                    ></path>
                    <path
                      d="m27,8H5c-1.105,0-2,.895-2,2v1c0-1.105.895-2,2-2h22c1.105,0,2,.895,2,2v-1c0-1.105-.895-2-2-2Z"
                      fill="#fff"
                      opacity=".2"
                      stroke-width="0"
                    ></path>
                    <path
                      fill="#ff5f00"
                      stroke-width="0"
                      d="M13.597 11.677H18.407V20.32H13.597z"
                    ></path>
                    <path
                      d="m13.902,15.999c0-1.68.779-3.283,2.092-4.322-2.382-1.878-5.849-1.466-7.727.932-1.863,2.382-1.451,5.833.947,7.712,2,1.573,4.795,1.573,6.795,0-1.329-1.038-2.107-2.642-2.107-4.322Z"
                      fill="#eb001b"
                      stroke-width="0"
                    ></path>
                    <path
                      d="m24.897,15.999c0,3.039-2.459,5.497-5.497,5.497-1.237,0-2.428-.412-3.39-1.176,2.382-1.878,2.795-5.329.916-7.727-.275-.336-.58-.657-.916-.916,2.382-1.878,5.849-1.466,7.712.932.764.962,1.176,2.153,1.176,3.39Z"
                      fill="#f79e1b"
                      stroke-width="0"
                    ></path>
                  </g>
                </svg>
              )}
            </div>
            <div>
              <div style={{ marginTop: row.data.expDate ? 0 : 9 }}>{value}</div>
              {row.data.expDate && (
                <div style={{ fontSize: 12, marginTop: 4, color: "#848484" }}>
                  Exp {row.data.expDate}
                </div>
              )}
            </div>
          </div>
        </DefaultCell>
      );
    },
  },
  {
    id: "amount",
    name: "Amount",
    isSortable: true,
    width: 120,
    textAlign: TextAlign.Right,
    renderCellFn(value, row) {
      const amount: number = value ? Number(value) : 0;
      return (
        <DefaultCell>
          {`${formatNumber(amount)} ${row.data.currency}`}
        </DefaultCell>
      );
    },
  },
  {
    id: "status",
    name: "Status",
    width: 130,
    textAlign: TextAlign.Right,
    renderCellFn(value) {
      return (
        <DefaultCell>
          <Tag value={value || ""} />
        </DefaultCell>
      );
    },
  },
];

export interface TransactionData {
  currency: string;
  expDate: string;
}

export const bankTransactionsData = {
  columns,
  rows: rows as unknown as Row<TransactionData>[],
};

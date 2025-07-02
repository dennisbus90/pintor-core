import React from "react";
import "./grid.scss";
import PinColumn from "./Column";
import { GridRow } from "../../utils/models/grid";

type PinColumnInjectedProps = Pick<GridRow, "gap" | "debug">;

function PinRow({ children, gap = 16, debug = false }: GridRow) {
    const modifiedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === PinColumn) {
            return React.cloneElement(child as React.ReactElement<PinColumnInjectedProps>, {
                gap,
                debug
            });
        }
        return child;
    });

    return <div className="p-grid" style={{ marginInlineStart: gap ? `-${gap / 2}px` : "0px", width: gap ? `calc(100% + ${gap}px)` : "100%" }}>{modifiedChildren}</div>;
}

export default PinRow;

import React from "react";
import "./grid.scss";
import PinColumn from "./Column";

type PinColumnInjectedProps = Pick<PinRowProps, "gap" | "debug">;

interface PinRowProps {
    children: React.ReactNode;
    gap?: number;
    debug?: boolean;
}

function PinRow({ children, gap = 16, debug = false }: PinRowProps) {
    const halfGap = gap / 2;
    const modifiedChildren = React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === PinColumn) {
            return React.cloneElement(child as React.ReactElement<PinColumnInjectedProps>, {
                gap,
                debug
            });
        }
        return child;
    });

    return <div className="grid" style={{ marginInlineStart: gap ? `calc(-${halfGap}px)` : "0px" }}>{modifiedChildren}</div>;
}

export default PinRow;

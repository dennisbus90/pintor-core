import "./grid.scss";
import React, { useContext, useMemo, useState } from 'react';
import { PintorContext } from "../../context/PintorContext";
import { debugGridColumnId } from "../../utils/helpers/debug";
import { ColumnSize, GridColumn } from "../../utils/models/grid";

function PinColumn({
    id,
    size,
    offset = {},
    children,
    debug = false,
    gap = 0,
    fit,
}: GridColumn) {
    const { grid } = useContext(PintorContext);
    const [columnId, _] = useState<string>(id ? id : crypto.randomUUID())

    if (!grid) return null;

    const sortedBreakpoints = useMemo(
        () => Object.entries(grid.breakpoints).sort((a, b) => a[1] as number - b[1] as number),
        [grid.breakpoints]
    );
    const lowestBreakpoint = sortedBreakpoints[0][0];

    if (!columnId && offset) debug && debugGridColumnId();

    const transformed = Object.fromEntries(
        Object.keys(grid.breakpoints).map(key => [key, 1])
    );

    const offsetClasses = Object.keys(offset).map(key => `has-offset-${key}-${columnId}`);
    const className = ['column', `is-${columnId}`, ...offsetClasses].join(' ');

    const mediaStyles = useMemo(() => {
        return Object.entries(transformed).map(([key, colSpan]) => {
            const columnSize: ColumnSize = size && size[key] ? Math.floor(size[key]) : "auto";
            const widthPercent = (colSpan / grid.maxSizeColumns) * 100;
            const offsetValue = offset[key] || 0;
            const offsetPercent = (offsetValue / grid.maxSizeColumns) * 100;
            const minWidth = key === lowestBreakpoint ? 0 : grid.breakpoints[key];

            const offsetRule = offsetValue
                ? `\n    .has-offset-${key}-${columnId} { margin-left: ${offsetPercent}%; }`
                : '';

            const widthRule = typeof columnSize === "number"
                ? `\n    .is-${columnId} { width: calc(${widthPercent * columnSize}% - ${gap}px); }`
                : `\n    .is-${columnId} { flex-grow: 1; }`;

            return `@media (min-width: ${minWidth}px) {
                ${widthRule}${offsetRule}
            }`;
        });
    }, [size, offset, grid.maxSizeColumns, grid.breakpoints, columnId, lowestBreakpoint]);

    return (
        <>
            <style>{mediaStyles.join('\n')}</style>
            <div id={columnId} className={className} style={{ flex: fit ? 'none' : '', margin: `${(gap ? gap : grid.gap) / 2}px` }}>
                {children}
            </div >
        </>
    );
}

export default PinColumn;

export type ColumnSize = "auto" | number;

export interface GridColumn {
    /**
     * Optional unique identifier for the column. Else the component creates its own.
     */
    id?: string;
    /**
     * The horizontal and vertical spacing (in pixels) between columns in a global state. Applies on all child columns.
     * Default is 16.
     */
    gap?: number;
    /**
     * Defines the column size at different breakpoints.
     * 
     * Example: { mobile: 12, tablet: 6, desktop: 4, widescreen: 3, fullhd: 2 } — where the numbers typically represent grid units (e.g., 12-column layout).
     */
    size?: Record<string, number>;
    /**
     * Defines the column offset at different breakpoints.
     * 
     * Example: { mobile: 3, tablet: 3, desktop: 3, widescreen: 3, fullhd: 3 } would offset the column by 3 units on small screens.
     */
    offset?: Record<string, number>;
    /**
     * Whether debug information should be enabled.
     */
    debug?: boolean;
    /**
     * Whether the column should only take the width needed by its content.
     */
    fit?: boolean;
    /**
     * The content to render inside the column.
     */
    children?: React.ReactNode;
}

export interface GridRow {
    /**
     * The child elements to be rendered inside the row.
     * Typically a list of <PinColumn> components.
     */
    children: React.ReactNode;
    /**
     * The horizontal and vertical spacing (in pixels) between columns.
     * Default is 16.
     */
    gap?: number;
    /**
     * Whether debug information should be enabled.
     */
    debug?: boolean;
}

interface GridContext {
    /**
     * The maximum number of columns in the grid layout.
     */
    maxSizeColumns: number;

    /**
     * The gap size (in pixels) between columns and rows.
     */
    gap: number;

    /**
     * Breakpoint definitions mapping names to pixel widths.
     * Example: { sm: 576, md: 768, lg: 992 }
     */
    breakpoints: Record<string, number>;
}

export interface PintorProvider {
    /**
     * Optional grid context to configure grid behavior.
     */
    grid?: GridContext;
}
import React from 'react';
import { PintorContext } from './PintorContext';

interface GridContext {
    maxSizeColumns: number;
    gap: number;
    breakpoints: Record<string, number>;
}

export interface PintorProvider {
    grid?: GridContext,
}

interface PintorProviderProps extends PintorProvider {
    children?: React.ReactNode
}

const PintorProvider = (provider: PintorProviderProps) => {
    const { children, ...rest } = provider;
    const hasOtherProps = Object.keys(rest).length > 0;
    return (
        hasOtherProps ? <PintorContext.Provider value={{ grid: provider.grid }}>
            {children}
        </PintorContext.Provider> : <>{children}</>
    );
};

export default PintorProvider;

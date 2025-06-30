import React from 'react';
import { PintorContext } from './PintorContext';
import { PintorProvider } from '../utils/models/grid';

interface PintorProviderProps extends PintorProvider {
    children?: React.ReactNode
}

const PinProvider = (provider: PintorProviderProps) => {
    const { children, ...rest } = provider;
    const hasOtherProps = Object.keys(rest).length > 0;
    return (
        hasOtherProps ? <PintorContext.Provider value={{ grid: provider.grid }}>
            {children}
        </PintorContext.Provider> : <>{children}</>
    );
};

export default PinProvider;

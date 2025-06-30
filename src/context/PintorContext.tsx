import React from 'react';
import { PinProvider } from './PinProvider';

export const PintorContext = React.createContext<PinProvider>({
    grid: {
        maxSizeColumns: 12,
        breakpoints: {
            mobile: 450,
            tablet: 750,
            desktop: 1024,
            widescreen: 1200,
            fullhd: 1400,
        },
        gap: 16
    }
});

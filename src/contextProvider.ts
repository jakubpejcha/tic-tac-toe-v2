import React from 'react';
import { BoardContextInterface } from './shared/types';

export const BoardContext = React.createContext<BoardContextInterface | null>(
    null
);

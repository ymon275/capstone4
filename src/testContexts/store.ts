import { createContext } from 'react';


const initialState = {
    first: "Jean",
    last: "Morrison"
};

export type UserState = typeof initialState;

const context = createContext<typeof initialState>(initialState)

export default context;
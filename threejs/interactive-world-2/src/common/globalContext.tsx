import React, {createContext} from 'react';
import {useInterpret} from '@xstate/react';
import {assign, createMachine} from "xstate";

export const GlobalStateContext = createContext<{ authService: any, pickupItem: () => void }>({
        authService: null,
        pickupItem: () => null,
    }
);

interface PlayerContext {
    nBooks: number
}

const playerMachine = createMachine<PlayerContext>({
    id: "book",
    initial: "idle",
    context: {
        nBooks: 1,
    },
    states: {
        "idle": {
            on: {
                // INC: {actions: assign({nBooks: ctx => ctx.nBooks + 1})}
                INC: {actions: assign({nBooks: ctx => ctx.nBooks + 1})}
            }
        },
    }
});

export const GlobalStateProvider = (props) => {
    const authService = useInterpret(playerMachine);

    const pickupItem = () => authService.send('INC')

    return (
        <GlobalStateContext.Provider value={
            {
                authService,
                pickupItem
            }
        }>
            {props.children}
        </GlobalStateContext.Provider>
    );
};

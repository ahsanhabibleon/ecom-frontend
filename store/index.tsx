import { createContext, ReactNode, useReducer } from "react";
import { ProductDataTypes } from "../components/ProductList/ProductList.types";

export type CartType = {
    cartItems: ProductDataTypes[]
}

export type InitialStateType = {
    cart: CartType
}

export interface ReducerActionProps {
    type: string
    payload: any
}

const initialState: InitialStateType = {
    cart: {
        cartItems: []
    }
}

export const Store = createContext<InitialStateType>(initialState);


const storeReducer = (state: InitialStateType, action: ReducerActionProps) => {
    switch (action.type) {
        case 'ADD_ITEM_TO_CART':
            const newItem = action.payload;
            const existedItem = state.cart.cartItems.find(c => c._id === newItem._id)

            const cartItems = existedItem ? state.cart.cartItems.map((item) =>
                item._id == existedItem._id ? newItem : item
            ) : [...state.cart.cartItems, newItem];

            return {
                ...state,
                cart: { ...state.cart, cartItems }
            }

        default:
            return state
    }
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState)
    const value = { state, dispatch };
    // @ts-ignore
    return <Store.Provider value={value}>{children}</Store.Provider>
}

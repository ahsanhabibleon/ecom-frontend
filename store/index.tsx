import { createContext, ReactNode, useEffect, useReducer } from "react";
import { ProductDataTypes } from "../components/ProductList/ProductList.types";
import { useLocalStorage } from "../hooks";

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
    let cartItems = [];

    switch (action.type) {

        case "STORE_STATE_IN_LOCAL_STORAGE": {
            return action.payload
        }

        case 'ADD_ITEM_TO_CART':
            const newItem = action.payload;
            const existedItem = state?.cart?.cartItems?.find(c => c._id === newItem._id)

            cartItems = existedItem ? state?.cart?.cartItems?.map((item) =>
                item._id === existedItem._id ? newItem : item
            ) : [...state?.cart?.cartItems, newItem];

            return {
                ...state,
                cart: { ...state.cart, cartItems }
            }


        case 'REMOVE_ITEM_FROM_CART':
            cartItems = state?.cart?.cartItems?.filter((item) =>
                item._id !== action.payload.id
            )

            return {
                ...state,
                cart: { ...state.cart, cartItems }
            }

        case "UPDATE_QUANTITY":
            cartItems = state?.cart?.cartItems?.map((item) =>
                item._id === action.payload.item._id ? action.payload.item : item)

            return {
                ...state,
                cart: { ...state.cart, cartItems }
            }

        case "SAVE_SHIPPING_ADDRESS":
            return {
                ...state,
                cart: { ...state.cart, shippingAddress: action.payload }
            }

        case "SAVE_PAYMENT_METHOD":
            return {
                ...state,
                cart: { ...state.cart, paymentMethod: action.payload }
            }

        default:
            return state
    }
}

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState)

    useLocalStorage("store", state, initialState, dispatch)

    const value = { state, dispatch };

    // @ts-ignore
    return <Store.Provider value={value}>{children}</Store.Provider>
}

import { Dispatch, useEffect } from "react"
import { InitialStateType, ReducerActionProps } from "../store";

export const useLocalStorage = (key: string, state: InitialStateType, initialState: InitialStateType, dispatch: Dispatch<ReducerActionProps>) => {

    useEffect(() => {
        const cartItemsFromLocal = JSON.parse(localStorage.getItem(key) as string);

        if (cartItemsFromLocal) {
            //checking if there already is a state in localstorage
            dispatch({
                type: "STORE_CART_ITEMS_IN_LOCAL_STORAGE",
                payload: cartItemsFromLocal,
                //if yes, update the current state with the stored one
            });
        }
    }, []);

    useEffect(() => {
        if (typeof window !== 'undefined' && state !== initialState) {
            localStorage.setItem(key, JSON.stringify(state?.cart?.cartItems || []));
            //create and/or set a new localstorage variable called "state"
        }
    }, [state]);
}

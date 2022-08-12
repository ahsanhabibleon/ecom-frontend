import { Dispatch } from "react";
import { ReducerActionProps } from "../../../store";
import { ProductDataTypes } from "../../ProductList/ProductList.types";

export interface PropObjTypes {
    item: ProductDataTypes
    dispatch: Dispatch<ReducerActionProps>
}
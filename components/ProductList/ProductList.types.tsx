export interface ProductDataTypes {
    _id?: number | string;
    brand: string
    category: string
    countInStock: number
    description: string
    image: string
    name: string
    numReviews: number
    price: number
    rating: number
    slug: string
    quantity?: number
}

export interface ProductReducerProps {
    loading: boolean
    error: any
    products: ProductDataTypes[]
}

export interface ProductSingleReducerProps {
    loading: boolean
    error: any
    product: ProductDataTypes | null
}

export enum ProductFetchingActionKind {
    FETCH_PRODUCTS = 'FETCH_PRODUCTS',
    FETCH_PRODUCTS_SUCCESS = 'FETCH_PRODUCTS_SUCCESS',
    FETCH_PRODUCTS_ERROR = 'FETCH_PRODUCTS_ERROR',
}

// An interface for our actions
export interface ProductFetchingAction {
    type: ProductFetchingActionKind;
    payload?: any;
}

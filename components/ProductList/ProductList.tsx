import React, { useEffect, useReducer } from 'react'
import { getError } from '../../utils'
import ProductSingle from '../ProductSingle/ProductSingle'
import Styles from './ProductList.module.scss'
import { ProductFetchingAction, ProductFetchingActionKind, ProductReducerProps } from './ProductList.types'

const reducer = (state: ProductReducerProps, action: ProductFetchingAction) => {
    switch (action.type) {
        case ProductFetchingActionKind.FETCH_PRODUCTS:
            return {
                ...state,
                loading: true
            }
        case ProductFetchingActionKind.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload

            }
        case ProductFetchingActionKind.FETCH_PRODUCTS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.payload
            }

        default:
            return state
    }
}

const ProductList = () => {
    const [{ loading, error, products }, dispatch] = useReducer<(state: ProductReducerProps, action: ProductFetchingAction) => ProductReducerProps>(reducer, {
        loading: false,
        error: null,
        products: []
    })

    const fetchData = async () => {
        dispatch({ type: ProductFetchingActionKind.FETCH_PRODUCTS })
        try {
            await fetch("/api/products")
                .then(res => res.json())
                .then(json => {
                    dispatch({ type: ProductFetchingActionKind.FETCH_PRODUCTS_SUCCESS, payload: json })
                })
        } catch (error: any) {
            dispatch({ type: ProductFetchingActionKind.FETCH_PRODUCTS_ERROR, payload: getError(error) || "Something went wrong" })
        }
    }
    useEffect(() => {
        fetchData()
    }, [])

    return (
        <div className={Styles.products} id="product-list">
            <div className="container">
                <h3>Featured Products</h3>
                <div className={Styles.product_list}>
                    {loading ? <div>Loading...</div>
                        : error ? <div>Somenting went wrong! Please try again later!</div>
                            : products?.map((product, index) => (
                                <ProductSingle product={product} key={`${product?.slug}_${index}`} />
                            ))}
                </div>
            </div>
        </div>
    )
}

export default ProductList;

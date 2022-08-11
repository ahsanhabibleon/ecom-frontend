import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect, useReducer } from 'react'
import MainLayout from '../../components/MainLayout'
import { ProductFetchingAction, ProductFetchingActionKind, ProductSingleReducerProps } from '../../components/ProductList/ProductList.types'
import ProductSingle from '../../components/ProductSingle/ProductSingle'
import { getError } from '../../utils'

const reducer = (state: ProductSingleReducerProps, action: ProductFetchingAction) => {
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
                product: action.payload

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

const ProductDetailsPage = () => {
    const router = useRouter();
    const { slug } = router.query;

    const [{ loading, error, product }, dispatch] = useReducer<(state: ProductSingleReducerProps, action: ProductFetchingAction) => ProductSingleReducerProps>(reducer, {
        loading: false,
        error: null,
        product: null
    })

    // console.log({ error })

    const fetchData = async (slug: string | string[] | undefined) => {
        dispatch({ type: ProductFetchingActionKind.FETCH_PRODUCTS })
        try {
            await fetch(`/api/products/slug/${slug}`)
                .then(res => res.json())
                .then(json => {
                    if (json?.status === 404) {
                        dispatch({ type: ProductFetchingActionKind.FETCH_PRODUCTS_ERROR, payload: getError(json) || "Something went wrong" })
                    } else {
                        dispatch({ type: ProductFetchingActionKind.FETCH_PRODUCTS_SUCCESS, payload: json })
                    }
                })
                .catch(error => {
                    dispatch({ type: ProductFetchingActionKind.FETCH_PRODUCTS_ERROR, payload: getError(error) || "Something went wrong" })
                })
        } catch (error: any) {
            dispatch({ type: ProductFetchingActionKind.FETCH_PRODUCTS_ERROR, payload: getError(error) || "Something went wrong" })
        }
    }
    useEffect(() => {
        slug && fetchData(slug)
    }, [slug])

    return (
        <MainLayout>
            <Head>
                <title>{product?.name || 'E-COM'}</title>
            </Head>
            {loading ? <div>Loading...</div>
                : error ? <div>{error}</div>
                    : <ProductSingle className='product_details' product={product} />}
        </MainLayout>
    )
}

export default ProductDetailsPage

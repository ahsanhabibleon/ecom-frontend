import { Button } from 'antd';
import Link from 'next/link';
import React from 'react'
import { ProductDataTypes } from '../ProductList/ProductList.types'
import Styles from './ProductSingle.module.scss'

const ProductSingle = (props: { product: ProductDataTypes | null, className?: string }) => {
    const { product, className } = props;

    const handleClick = (event: any, id: string | number) => {
        event.preventDefault()
        console.log({ id, event })
    }

    return (
        <Link href={`/product-details/${product?.slug}`}>
            <a className={Styles.product_card + ` ${className && className}`}>
                <div className={Styles.img_container}>
                    {product?.image && <img src={product?.image} alt={product?.name || ''} />}
                </div>
                <div className={Styles.text_content}>
                    <h4>{product?.name || 'Product Name'}</h4>
                    <p>{product?.description || "Description not available."}</p>
                    <h5>${product?.price || '---'}</h5>
                    {product && product?.countInStock > 0 ?
                        <Button onClick={(event) => handleClick(event, product?.id)}>
                            Add to cart
                        </Button>
                        : <Button disabled>Out of Stock</Button>}
                </div>
            </a>
        </Link>
    )
}

export default ProductSingle

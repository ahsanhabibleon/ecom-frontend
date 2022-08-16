import { Card, Col, Row } from 'antd'
import Link from 'next/link'
import React, { useContext } from 'react'
import { Store } from '../../store'
import { capitalizeFirstLetter } from '../../utils'
import CartItem from '../CartComp/CartItems'
import { ProductDataTypes } from '../ProductList/ProductList.types'
import Styles from './ReviewOrderComp.module.scss'

const ReviewOrderComp = () => {
    // @ts-ignore
    const { state, dispatch } = useContext(Store);
    const { shippingAddress, paymentMethod, cartItems } = state?.cart;
    return (
        <div className='login_register_form'>
            <h1>Review your order summary</h1>

            <Row gutter={30}>
                <Col span={17}>
                    <Card title="Shipping address">
                        <div className={Styles.addressRow}>
                            <h4>Name:</h4> {shippingAddress?.name || 'No name available'}
                        </div>
                        <div className={Styles.addressRow}>
                            <h4>Address:</h4> {`${shippingAddress?.street}, ${capitalizeFirstLetter(shippingAddress?.district || '')}, ${capitalizeFirstLetter(shippingAddress?.division || '')}`}
                        </div>
                        <Link href='/shipping'>
                            <a className={Styles.editBtn}>Edit</a>
                        </Link>
                    </Card>

                    <Card title="Payment">
                        <div className={Styles.addressRow}>
                            <h4>Method:</h4> {paymentMethod || 'Not selected'}
                        </div>
                        <Link href='/payment'>
                            <a className={Styles.editBtn}>Edit</a>
                        </Link>
                    </Card>

                    <Card title="Cart Items">
                        {cartItems?.map((item: ProductDataTypes) => (
                            <Card key={item._id}>
                                <CartItem propObj={{ dispatch, item }} />
                            </Card>
                        ))}
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ReviewOrderComp

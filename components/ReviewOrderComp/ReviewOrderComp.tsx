import { Button, Card, Col, notification, Row, Spin } from 'antd'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useContext, useState } from 'react'
import { Store } from '../../store'
import { capitalizeFirstLetter } from '../../utils'
import CartItem from '../CartComp/CartItems'
import { ProductDataTypes } from '../ProductList/ProductList.types'
import Styles from './ReviewOrderComp.module.scss'

const ReviewOrderComp = () => {
    // @ts-ignore
    const { state, dispatch } = useContext(Store);
    const { shippingAddress, paymentMethod, cartItems } = state?.cart;
    const totalPrice = cartItems?.reduce((a: number, c: ProductDataTypes) => a + ((c?.price * (c?.quantity || 0))), 0)
    const tax = totalPrice * 0.05;
    const shipping = totalPrice > 100 ? 0 : 10;
    const subTotal = totalPrice + tax + shipping;
    const [loading, setLoading] = useState(false)

    //get token from localStorage
    const userToken = typeof window !== 'undefined' ? localStorage?.getItem('token') : null;

    //next router
    const router = useRouter()

    const handlePlaceOrder = async () => {

        const dataToSendToTheBackend = {
            orderedItems: cartItems,
            shippingAddress,
            paymentMethod,
            shippingPrice: shipping,
            itemsPrice: totalPrice,
            totalPrice: subTotal,
            taxPrice: tax,
        }

        setLoading(true)

        console.log({ dataToSendToTheBackend })

        try {
            await fetch('/api/orders', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userToken}`
                },
                body: JSON.stringify(dataToSendToTheBackend)
            })
                .then((response) => response.json())
                .then((res) => {
                    console.log({ res })
                    dispatch({ type: 'CLEAR_CART' })
                    localStorage.removeItem('store')
                    // notification.success({ message: res?.message || 'Order created successfully!' })
                    router.push(`/order/${res?.order?._id}`)
                })
                .catch((error) => {
                    console.log({ error })
                    notification.error({
                        message: error?.message
                    })
                })

        } catch (error) {
            console.log({ error })
            // notification.error({
            //     message: error?.message || 'Attempt failed!'
            // })
        } finally {
            setLoading(false)
        }
    }

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
                        <Link href='/payment-method'>
                            <a className={Styles.editBtn}>Edit</a>
                        </Link>
                    </Card>

                    <Card title="Cart Items">
                        {cartItems?.map((item: ProductDataTypes) => (
                            <Card key={item._id}>
                                <CartItem forPreview propObj={{ dispatch, item }} />
                            </Card>
                        ))}
                    </Card>
                </Col>

                <Col span={7}>
                    <Card title="Order Summary">
                        <div className={Styles.order_summary_row}>
                            <span>Product Price:</span>
                            <span>
                                {totalPrice}
                            </span>
                        </div>

                        <div className={Styles.order_summary_row}>
                            <span>Shipping:</span>
                            <span>
                                ${shipping}
                            </span>
                        </div>

                        <div className={Styles.order_summary_row}>
                            <span>Tax:</span>
                            <span>
                                ${tax}
                            </span>
                        </div>

                        <div className={Styles.order_summary_row}>
                            <span>Subtotal:</span>
                            <span>
                                ${subTotal}
                            </span>
                        </div>

                        <Button loading={loading} onClick={handlePlaceOrder} type='primary' style={{ backgroundColor: "#faad14", borderColor: "#faad14", color: '#333', marginTop: 10 }}>
                            Place Order
                        </Button>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default ReviewOrderComp

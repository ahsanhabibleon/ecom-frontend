import { Button, Card, Col, notification, Row, Spin } from "antd"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import CartItem from "../../components/CartComp/CartItems"
import MainLayout from "../../components/MainLayout"
import { ProductDataTypes } from "../../components/ProductList/ProductList.types"
import { capitalizeFirstLetter } from "../../utils"
import bkash from "../../utils/bkash"
import Styles from './order.module.scss'
import { STRIPE_PUBLISHABLE_KEY } from "../../api";
import axios from "axios";
import { usePayPalScriptReducer, PayPalButtons, SCRIPT_LOADING_STATE } from "@paypal/react-paypal-js";



const OrderDetails = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const [{ options, isResolved, isPending, isRejected }, dispatch] = usePayPalScriptReducer();


    const router = useRouter();
    const orderId = router?.query?.id;

    const handleProceedToPayment = async (method: string) => {
        switch (method) {
            case 'bkash':
                const paymentRequest: any = {
                    amount: 1000,
                    orderID: 'ORD1020069',
                    intent: 'sale',
                };

                const result = await bkash.createPayment(paymentRequest);
                console.log(result);
                break;

            case 'stripe':
                const requestOptions = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
                    },
                    body: JSON.stringify({ order: orderDetails })
                };
                fetch('/api/payment', requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log({ data });
                        data.clientSecret && router.push('/payment?clientSecret=' + data.clientSecret)
                    });

            default:
                return false
        }
    }

    const createOrder = (data: any, actions: any) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        value: orderDetails?.totalPrice || 100,
                    },
                },
            ],
        }).then((orderId: string) => orderId);
    }
    const onApprove = (data: any, actions: any) => {
        return actions.order.capture().then((details: any) => {
            console.log({ details })
            const name = details.payer.name.given_name;
            // alert(`Transaction completed by ${name}`);
            notification.success({
                message: `Transaction completed by ${name}`
            })
        });
    }

    const onError = (error: any) => {
        console.log({ error })
        notification.error({
            message: 'Payment not successfull!'
        })
    }

    useEffect(() => {
        if (!token) {
            router.push('/login')
        } else if (orderId) {
            axios.get(`/api/orders/${orderId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then((data) => {
                setOrderDetails(data?.data)
            }).catch(error => {
                console.log({ error })
                if (error?.response?.status === 404) {
                    router.push('/')
                }
                notification.error({
                    message: error?.response?.data?.messege
                })
            })

            axios.get('/api/keys/paypal')
                .then(data => {
                    if (data?.data) {
                        dispatch({
                            type: "resetOptions",
                            value: {
                                ...options,
                                "client-id": data?.data,
                                currency: 'USD'
                            },
                        });
                        dispatch({
                            // @ts-ignore
                            type: 'setLoadingStatus', value: 'pending'
                        })
                    }
                });
        }
    }, [token, orderId, dispatch])

    return (
        <>
            <MainLayout>
                <Head>
                    <title>Order Details</title>
                </Head>
                <div className='container'>
                    <div className="login_register_container" style={{ alignItems: 'flex-start' }}>
                        <div className='login_register_form'>

                            <h1>Order #{orderId}:</h1>

                            <Row gutter={30}>
                                <Col span={17}>
                                    <Card title="Shipping address">
                                        <div className={Styles.addressRow}>
                                            <h4>Name:</h4> {orderDetails?.shippingAddress?.name || 'No name available'}
                                        </div>
                                        <div className={Styles.addressRow}>
                                            <h4>Address:</h4> {`${orderDetails?.shippingAddress?.street}, ${capitalizeFirstLetter(orderDetails?.shippingAddress?.district || '')}, ${capitalizeFirstLetter(orderDetails?.shippingAddress?.division || '')}`}
                                        </div>
                                        <div className={Styles.info}>
                                            {orderDetails?.isDelivered ? 'Delivered' : 'Not delivered'}
                                        </div>
                                    </Card>

                                    <Card title="Payment">
                                        <div className={Styles.addressRow}>
                                            <h4>Method:</h4> {orderDetails?.paymentMethod || 'Not selected'}
                                        </div>
                                        <div className={Styles.info}>
                                            {orderDetails?.isPaid ? 'Paid' : 'Not Paid'}
                                        </div>
                                    </Card>

                                    <Card title="Cart Items">
                                        {orderDetails?.orderedItems?.map((item: ProductDataTypes) => (
                                            <Card key={item._id}>
                                                <CartItem forPreview propObj={{ dispatch: () => { }, item }} />
                                            </Card>
                                        ))}
                                    </Card>
                                </Col>

                                <Col span={7}>
                                    <Card title="Order Summary">
                                        <div className={Styles.order_summary_row}>
                                            <span>Product Price:</span>
                                            <span>
                                                {orderDetails?.itemsPrice}
                                            </span>
                                        </div>

                                        <div className={Styles.order_summary_row}>
                                            <span>Shipping:</span>
                                            <span>
                                                ${orderDetails?.shippingPrice}
                                            </span>
                                        </div>

                                        <div className={Styles.order_summary_row}>
                                            <span>Tax:</span>
                                            <span>
                                                ${orderDetails?.taxPrice}
                                            </span>
                                        </div>

                                        <div className={Styles.order_summary_row}>
                                            <span>Subtotal:</span>
                                            <span>
                                                ${orderDetails?.totalPrice}
                                            </span>
                                        </div>
                                        {!orderDetails?.isPaid && <>
                                            {/* <Button
                                                // loading={loading}
                                                onClick={() => handleProceedToPayment('bkash')} type='primary' style={{ backgroundColor: "#faad14", borderColor: "#faad14", color: '#333', marginTop: 10 }}>
                                                Pay with BKash
                                            </Button> */}
                                            {/* <Button
                                                // loading={loading}
                                                disabled
                                                onClick={() => handleProceedToPayment('card')} type='primary' style={{ backgroundColor: "#faad14", borderColor: "#faad14", color: '#333', marginTop: 10, opacity: .5 }}>
                                                Pay with Card
                                            </Button> */}

                                            <Button
                                                // loading={loading}

                                                onClick={() => handleProceedToPayment('stripe')} type='primary' style={{ backgroundColor: "#faad14", borderColor: "#faad14", color: '#333', marginTop: 10, width: '100%' }}>
                                                Pay with Stripe
                                            </Button>
                                            {isPending ? <Spin /> : null}
                                            {isResolved && <div style={{ marginTop: 10 }}>
                                                <PayPalButtons
                                                    style={{ layout: "horizontal" }}
                                                    createOrder={createOrder}
                                                    onApprove={onApprove}
                                                    onError={onError}
                                                />
                                            </div>}
                                        </>}
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </MainLayout>
        </>

    )
}

export default OrderDetails

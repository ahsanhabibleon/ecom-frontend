import { Button, Card, Col, Row } from "antd"
import Head from "next/head"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CartItem from "../../components/CartComp/CartItems"
import CheckoutForm from "../../components/CheckoutForm/CheckoutForm"
import MainLayout from "../../components/MainLayout"
import { ProductDataTypes } from "../../components/ProductList/ProductList.types"
import { capitalizeFirstLetter } from "../../utils"
import bkash from "../../utils/bkash"
import Styles from './order.module.scss'
import { STRIPE_PUBLISHABLE_KEY } from "../../api";

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY as string);

const orderDetails = () => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null
    const [orderDetails, setOrderDetails] = useState<any>(null);
    const [clientSecret, setClientSecret] = useState("");

    const router = useRouter()
    const orderId = router?.query?.id
    console.log({ orderDetails })

    useEffect(() => {
        if (orderId) {

            fetch(`/api/orders/${orderId}`, {
                headers: {
                    authorization: `Bearer ${token}`
                }
            }).then(res => res.json()).then((data) => {
                console.log({ data })
                setOrderDetails(data)
            })
        }
    }, [orderId])

    const handleProceedToPayment = async (method: string) => {
        console.log({ method, orderDetails })

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
                        setClientSecret(data.clientSecret)
                    });


            default:
                return false
        }

    }

    useEffect(() => {
        if (!orderId || orderDetails?.orderedItems?.length < 1) {
            router.push('/')
        } else if (!token) {
            router.push('/login')
        }
    }, [token, orderId, orderDetails?.orderedItems])

    const appearance = {
        theme: 'stripe',
    };
    const options: any = {
        clientSecret,
        appearance,
    };

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
                                        <Button
                                            // loading={loading}
                                            onClick={() => handleProceedToPayment('bkash')} type='primary' style={{ backgroundColor: "#faad14", borderColor: "#faad14", color: '#333', marginTop: 10 }}>
                                            Pay with BKash
                                        </Button>
                                        <Button
                                            // loading={loading}
                                            onClick={() => handleProceedToPayment('stripe')} type='primary' style={{ backgroundColor: "#faad14", borderColor: "#faad14", color: '#333', marginTop: 10 }}>
                                            Pay with Stripe
                                        </Button>
                                        <Button
                                            // loading={loading}
                                            disabled
                                            onClick={() => handleProceedToPayment('card')} type='primary' style={{ backgroundColor: "#faad14", borderColor: "#faad14", color: '#333', marginTop: 10, opacity: .5 }}>
                                            Pay with Card
                                        </Button>
                                    </Card>
                                </Col>
                            </Row>
                        </div>
                    </div>
                </div>
            </MainLayout>

            {clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )
            }
        </>

    )
}

export default orderDetails

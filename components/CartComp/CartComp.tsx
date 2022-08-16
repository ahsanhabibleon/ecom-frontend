import { Button, Card, Col, Empty, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react'
import { Store } from '../../store';
import { ProductDataTypes } from '../ProductList/ProductList.types';
import Styles from './CartComp.module.scss';
import CartItem from './CartItems';

const CartComp = () => {
    const router = useRouter();
    // @ts-ignore
    const { state, dispatch } = useContext(Store);
    const cartItems = state?.cart?.cartItems || []
    const handleCheckout = () => {
        router.push('/sign-in?redirect=shipping')
    }
    return (
        <div className={Styles.cart_page}>
            <h3>Cart Items</h3>

            {cartItems?.length ?
                <Row gutter={30}>
                    <Col span={17} className={Styles.cart_items}>
                        {cartItems?.map((item: ProductDataTypes) => (
                            <Card key={item._id}>
                                <CartItem propObj={{ dispatch, item }} />
                            </Card>
                        ))}
                    </Col>

                    <Col span={7} className={Styles.process_to_checkout}>
                        <Card>
                            <div>
                                <h4>
                                    Subtotal: {" "}
                                    <span className={Styles.subtotal}>
                                        ${cartItems.reduce((a: number, c: ProductDataTypes) => a + ((c?.price * (c?.quantity || 0))), 0)}
                                    </span>
                                    {" "}
                                    <span className={Styles.total_quantity}>
                                        ({cartItems.reduce((a: number, c: ProductDataTypes) => a + (c?.quantity || 0), 0)} items)
                                    </span>
                                </h4>
                                <Button onClick={handleCheckout} type='primary' style={{ backgroundColor: "#faad14", borderColor: "#faad14", fontWeight: 600 }}>
                                    Proceed to Checkout
                                </Button>
                                <br />
                                or
                                <br />
                                <Link href="/">Browse more products</Link>
                            </div>
                        </Card>
                    </Col>
                </Row> :
                <Empty
                    description={
                        <span>
                            Cart is empty!{' '}
                            <Link href="/">Browse products</Link>
                        </span>
                    }>
                </Empty>
            }

        </div>
    )
}

export default CartComp




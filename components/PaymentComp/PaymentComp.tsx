import { Button, Form, Radio, RadioChangeEvent } from 'antd'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { Store } from '../../store'
import Styles from './PaymentComp.module.scss'

const PaymentComp = () => {
    const router = useRouter()
    // @ts-ignore
    const { state, dispatch } = useContext(Store);
    const [paymentMethod, setPaymentMethod] = useState(state?.cart?.paymentMethod || 'bkash')

    console.log({ state })

    const handlePaymentMethod = ({ target: { value } }: RadioChangeEvent) => {
        setPaymentMethod(value);
    };
    const handleProceedToPayment = () => {
        dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: paymentMethod })
        router.push('/review-order')
    };

    useEffect(() => {
        setPaymentMethod(state?.cart?.paymentMethod || 'bkash')
    }, [state])

    return (
        <div className='login_register_form' style={{ maxWidth: 500 }}>
            <h1>Choose payment method:</h1>

            <Radio.Group onChange={handlePaymentMethod} value={paymentMethod}>
                <Radio value="bkash">Bkash</Radio>
                <Radio value='card'>Credit/debit Cart</Radio>
            </Radio.Group>

            <div className={Styles.btn}>
                <Button onClick={handleProceedToPayment} type='primary' style={{ backgroundColor: "#faad14", borderColor: "#faad14", fontWeight: 600 }}>
                    Proceed to Payment
                </Button>
            </div>
        </div>
    )
}

export default PaymentComp

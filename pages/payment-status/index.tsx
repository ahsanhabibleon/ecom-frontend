import { Button } from 'antd';
import { useRouter } from 'next/router'
import React from 'react'

const PaymentStatusPage = () => {
    const router = useRouter();
    const query = router?.query;
    return (
        <div>
            <h3>Payment status: {query?.redirect_status}</h3>
            <div><strong>payment_intent:</strong> {query?.payment_intent}</div>
            <Button type='primary' onClick={() => router.push('/')}>Return to home</Button>
        </div>
    )
}

export default PaymentStatusPage

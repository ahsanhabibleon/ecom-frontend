import { useRouter } from 'next/router'
import React from 'react'

const PaymentStatusPage = () => {
    const router = useRouter();
    const query = router?.query;
    return (
        <div>
            <h3>Payment status: {query?.redirect_status}</h3>
            <div><strong>payment_intent:</strong> {query?.payment_intent}</div>
        </div>
    )
}

export default PaymentStatusPage

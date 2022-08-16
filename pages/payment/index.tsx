import Head from 'next/head'
import React from 'react'
import MainLayout from '../../components/MainLayout'
import PaymentComp from '../../components/PaymentComp'

function PaymentPage() {
    return (
        <MainLayout>
            <Head>
                <title>Payment</title>
            </Head>
            <div className='container'>
                <div className="login_register_container" style={{ alignItems: 'flex-start' }}>
                    <PaymentComp />
                </div>
            </div>
        </MainLayout>
    )
}

export default PaymentPage

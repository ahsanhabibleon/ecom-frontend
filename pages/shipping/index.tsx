import Head from 'next/head'
import React from 'react'
import MainLayout from '../../components/MainLayout'
import ShippingComp from '../../components/ShippingComp'

function ShippingPage() {
    return (
        <MainLayout>
            <Head>
                <title>Shipping</title>
            </Head>
            <div className='container'>
                <div className="login_register_container" style={{ alignItems: 'flex-start' }}>
                    <ShippingComp />
                </div>
            </div>
        </MainLayout>
    )
}

export default ShippingPage

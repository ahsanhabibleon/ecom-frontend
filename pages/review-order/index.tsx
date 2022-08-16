import Head from 'next/head'
import React from 'react'
import MainLayout from '../../components/MainLayout'
import ReviewOrderComp from '../../components/ReviewOrderComp'

function ReviewOrderPage() {
    return (
        <MainLayout>
            <Head>
                <title>Review Order Summary</title>
            </Head>
            <div className='container'>
                <div className="login_register_container" style={{ alignItems: 'flex-start' }}>
                    <ReviewOrderComp />
                </div>
            </div>
        </MainLayout>
    )
}

export default ReviewOrderPage

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import CartComp from '../../components/CartComp';
import MainLayout from '../../components/MainLayout'

const Cart = () => {
    const router = useRouter();

    useEffect(() => {
        if (!localStorage?.getItem('token')) {
            router.push('/sign-in')
        }
    }, [])

    return (
        <MainLayout>
            <Head>
                <title>Cart</title>
            </Head>
            <div className="container">
                <CartComp />
            </div>
        </MainLayout>
    )
}

export default Cart

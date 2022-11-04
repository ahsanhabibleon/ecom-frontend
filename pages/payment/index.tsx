import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js';
import { useRouter } from 'next/router';
import React from 'react'
import { STRIPE_PUBLISHABLE_KEY } from '../../api';
import CheckoutForm from '../../components/CheckoutForm'
const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY as string);

const Payment = () => {

    const router = useRouter();
    const clientSecret = router?.query?.clientSecret;

    const appearance = {
        theme: 'stripe',
    };
    const options: any = {
        clientSecret,
        appearance,
    };

    !clientSecret && <div>Something went wrong!</div>

    return (
        <Elements options={options} stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    )
}

export default Payment

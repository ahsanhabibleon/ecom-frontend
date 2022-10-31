import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { STRIPE_PUBLISHABLE_KEY } from "../api";
import axios from 'axios'

const ProductDisplay = () => {
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
    const handleClick = (e: any) => {
        e.preventDefault()
        // fetch('/api/payment', {
        //     method: 'POST',
        //     mode: 'no-cors',
        //     headers: {
        //         "Content-type": "application/json;",
        //         Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`
        //     },
        //     body: JSON.stringify({ order: orderDetails })
        // })

        axios({
            method: 'post',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                "Access-Control-Allow-Origin": "*"
            },
            url: 'http://localhost:8080/api/payment',
            data: { order: orderDetails }
        }).then(function (response) {
            console.log(response.data);
        });
    }

    return <section>
        <div className="product">
            <img
                src="https://i.imgur.com/EHyR2nP.png"
                alt="The cover of Stubborn Attachments"
            />
            <div className="description">
                <h3>Stubborn Attachments</h3>
                <h5>$20.00</h5>
            </div>
        </div>
        <form
            onSubmit={handleClick}
        // action="/api/payment"
        // method="POST"
        >
            <button>
                Checkout
            </button>
        </form>
    </section >
}

const Message = ({ message }: any) => (
    <section>
        <p>{message}</p>
    </section>
);

export default function App() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        // Check to see if this is a redirect back from Checkout
        const query = new URLSearchParams(window.location.search);

        if (query.get("success")) {
            setMessage("Order placed! You will receive an email confirmation.");
        }

        if (query.get("canceled")) {
            setMessage(
                "Order canceled -- continue to shop around and checkout when you're ready."
            );
        }
    }, []);

    return message ? (
        <Message message={message} />
    ) : (
        <ProductDisplay />
    );
}
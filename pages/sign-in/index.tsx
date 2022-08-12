import { Spin } from 'antd';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import MainLayout from '../../components/MainLayout';
import SignInComp from '../../components/SignInComp';

const SignIn = () => {
    const [loading, setLoading] = useState(true)
    const router = useRouter();
    const redirectUrl = (router?.query?.redirectUrl || '') as string;

    useEffect(() => {
        if (localStorage?.getItem('token')) {
            router.push('/' + redirectUrl)
        } else {
            setLoading(false)
        }
    }, [])

    return (
        <MainLayout>
            {!loading ? <>
                <Head>
                    <title>Sign In</title>
                </Head>
                <div className='container'>
                    <div className="login_register_container">
                        <SignInComp redirectUrl={redirectUrl} />
                    </div>
                </div>
            </> : <Spin className='full-page-loading' />}
        </MainLayout>
    );
};

export default SignIn;
import Head from 'next/head';
import MainLayout from '../../components/MainLayout';
import SignInComp from '../../components/SignInComp';

const SignIn = () => {
    return (
        <MainLayout>
            <Head>
                <title>Sign In</title>
            </Head>
            <div className='container'>
                <div className="login_register_container">
                    <SignInComp />
                </div>
            </div>
        </MainLayout>
    );
};

export default SignIn;
import type { NextPage } from 'next'
import dynamic from 'next/dynamic';
import Head from 'next/head'
const Banner = dynamic(() => import('../components/Banner'));
const MainLayout = dynamic(() => import('../components/MainLayout'));
const ProductList = dynamic(() => import('../components/ProductList'));

const Home: NextPage = () => {
  return (
    <MainLayout>
      <Head>
        <title>E-COM</title>
      </Head>
      <Banner />
      <ProductList />
    </MainLayout>
  )
}

export default Home

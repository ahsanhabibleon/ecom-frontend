import { Breadcrumb, Layout, Menu } from 'antd';
import React from 'react';
import { propTypes } from './MainLayout.types';
const { Header, Content, Footer } = Layout;
import Styles from './MainLayout.module.scss'
import Navbar from '../Navbar';
import Link from 'next/link';

const MainLayout = ({ children }: propTypes) => (
    <Layout>
        <Header className='d-flex align-items-center justify-content-between'>
            <Link href={"/"}>
                <a className={Styles.logo}>
                    E-COM
                </a>
            </Link>
            <Navbar />
        </Header>

        <Content className={Styles.site_layout}>
            {/* <Breadcrumb>
                <Breadcrumb.Item>Home</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
                <Breadcrumb.Item>App</Breadcrumb.Item>
            </Breadcrumb> */}

            <div
                className={Styles.main_content_wrapper}
            >
                {children}
            </div>
        </Content>

        <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2018 Created by Ant UED
        </Footer>
    </Layout>
);

export default MainLayout;
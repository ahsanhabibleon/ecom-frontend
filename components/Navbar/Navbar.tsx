import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'
import Styles from "./Navbar.module.scss"
import jwt_decode from "jwt-decode";
import { Dropdown, Menu, notification, Space } from 'antd';
import { DownOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { Store } from '../../store';
import { ProductDataTypes } from '../ProductList/ProductList.types';
import Badge from '../../molicules/Button/Badge';

const Navbar = () => {

    const [user, setUser] = useState<any>(null);

    // @ts-ignore
    const { state } = useContext(Store);

    console.log({ state })

    const logout = () => {
        localStorage.removeItem("token");
        window.location.reload();
        notification.success({
            message: 'Successfully logged out!',
        })
    }

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            const decoded = jwt_decode(token)
            setUser(decoded)
        }
    }, [])

    const menu = (
        <Menu
            items={[
                {
                    label: <Link href="/profile">Profile</Link>,
                    key: '0',
                },
                // {
                //     label: <a href="https://www.aliyun.com">2nd menu item</a>,
                //     key: '1',
                // },
                // {
                //     type: 'divider',
                // },
                {
                    label: 'Logout',
                    key: '3',
                    onClick: logout
                },
            ]}
        />
    );


    return (
        <div className={"d-flex align-items-center"}>
            {!user ? <Link href="/sign-in" passHref>
                <a className={Styles.navbar_item}>
                    Sign In
                </a>
            </Link> : <Dropdown className={Styles.profile_dropdown} overlay={menu} trigger={['click']}>
                <a onClick={e => e.preventDefault()}>
                    <Space>
                        {user?.name}
                        <DownOutlined />
                    </Space>
                </a>
            </Dropdown>}
            <Link href="/cart" passHref>
                <a className={Styles.navbar_item}>
                    <span className={Styles.icon}>
                        <ShoppingCartOutlined />
                    </span>
                    <Badge count={state?.cart?.cartItems?.reduce((a: number, c: ProductDataTypes) => a + (c?.quantity || 0), 0)}>
                        Cart
                    </Badge>
                </a>
            </Link>
        </div>
    )
}

export default Navbar

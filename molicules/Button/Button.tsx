import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import Styles from './Button.module.scss'
import { BtnProps } from './Button.types'

const Button = ({ children, type, href, targetBlank, small, disabled, onClick }: BtnProps) => {
    const classes = classNames(Styles.btn, {
        [Styles.btn_primary]: type === 'primary',
        [Styles.btn_outline]: type === 'outline',
        [Styles.btn_small]: small,
        [Styles.btn_disabled]: disabled,
    })
    return (
        <>
            {
                href ? <Link href={href} passHref target={targetBlank ? "_blank" : "_self"}>
                    <a className={classes}>
                        {children}
                    </a>
                </Link> : <button className={classes} onClick={onClick}>
                    {children}
                </button>
            }
        </>
    )
}

export default Button

import React, { CSSProperties, ReactNode } from 'react';
import Styles from './Badge.module.scss';

const Badge = ({ children, count, style }: { children?: ReactNode, count: number, style?: CSSProperties | undefined }) => {
    return (
        <div className={Styles.badgeParent}>
            {children}
            <span className={Styles.badge} style={style}>
                <span className={Styles.count}>{count}</span>
            </span>
        </div>
    )
}

export default Badge

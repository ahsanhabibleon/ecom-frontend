import React from 'react'
import { ArrowRightOutlined } from '@ant-design/icons'
import { Button, Carousel } from 'antd'
import Styles from "./Banner.module.scss"
import { bannerData } from './data'

const Banner = () => {
    return (
        <div className={Styles.banner_wrapper}>
            <div className="container">
                <Carousel autoplay>
                    {bannerData.map((ban => (
                        <div key={ban.key}>
                            <div className={Styles.banner} style={{ backgroundImage: `url(${ban?.backgroundImg})` }}>
                                <div className={Styles.banner_content}>
                                    <h1>{ban?.title || 'Banner Title'}</h1>
                                    <Button href='#product-list'>
                                        Explore
                                        <ArrowRightOutlined />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )))}
                </Carousel>
            </div>
        </div>

    )
}

export default Banner

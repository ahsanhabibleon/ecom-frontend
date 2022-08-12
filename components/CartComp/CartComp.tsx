import { useContext } from 'react'
import { Store } from '../../store';
import { ProductDataTypes } from '../ProductList/ProductList.types';
import Styles from './CartComp.module.scss'

const CartComp = () => {
    // @ts-ignore
    const { state: { cart: { cartItems } }, dispatch } = useContext(Store);
    console.log({ cartItems })
    return (
        <div className={Styles.cart_page}>
            <h3>Cart Items</h3>
            <div className={Styles.cart_items}>
                {cartItems?.map((item: ProductDataTypes) => {
                    <div></div>
                })}
            </div>
        </div>
    )
}

export default CartComp

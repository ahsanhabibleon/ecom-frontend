import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons"
import { Popconfirm } from "antd";
import Image from "next/image"
import Styles from './CartItem.module.scss';
import { PropObjTypes } from "./CartItem.types";

const CartItem = ({ propObj, forPreview = false }: { propObj: PropObjTypes, forPreview?: boolean }) => {

    const { item, dispatch } = propObj

    const removeItemFromCart = () => {
        dispatch({ type: 'REMOVE_ITEM_FROM_CART', payload: { id: item._id } })
    };

    const updateQuantity = (param: string) => {
        const newItem = { ...item };
        if (newItem?.quantity || newItem?.quantity === 0) {
            if (param === 'decrement' && newItem.quantity > 0) {
                newItem.quantity = (newItem?.quantity || 0) - 1
            }
            if (param === 'increment' && newItem.quantity < newItem.countInStock) {
                newItem.quantity = (newItem?.quantity || 0) + 1
            }
            dispatch({ type: 'UPDATE_QUANTITY', payload: { item: newItem } })
        }
    }

    return (
        <div className={Styles.cart_item} key={item._id} >
            <div className={Styles.img_container}>
                {item?.image ? <Image src={item.image} alt={item.name} width={50} height={50} /> : 'No image'}
            </div>
            <div className={Styles.item_name}>{item?.name || ''}</div>
            {forPreview && <span>{item.quantity}</span>}
            <div className={Styles.item_price}>${item?.price || 'Not available'}</div>
            {!forPreview &&
                <>
                    <div className={Styles.item_quantity}>
                        <span className={!item?.quantity || item?.quantity < 2 ? 'disabled' : ''} onClick={() => updateQuantity('decrement')}>
                            <MinusOutlined />
                        </span>
                        <span>{item.quantity}</span>
                        <span className={(item?.quantity || item?.quantity === 0) && item?.quantity < item.countInStock ? '' : 'disabled'} onClick={() => updateQuantity('increment')}>
                            <PlusOutlined />
                        </span>
                    </div>
                    <Popconfirm
                        className={Styles.remove_icon}
                        title="Remove this item from cart?"
                        placement="topRight"
                        onConfirm={removeItemFromCart}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined />
                    </Popconfirm>
                </>
            }
        </div>
    )
}

export default CartItem
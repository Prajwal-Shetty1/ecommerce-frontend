import React, { useContext } from 'react'
import Title from '../components/Title';
import { ShopContext } from '../context/ShopContext';

const CartTotal = () => {
    const {currency,delivery_cost,getCartAmount} = useContext(ShopContext);
  return (
    <>
      <div className='cart-total'>
        <div className="cart-total-title">
        <Title text1={'CART'} text2={'TOTALS_____'} />
        </div>
        <div className="cart-total-row">
            <p>SubTotal</p>
            <p>{currency}{getCartAmount()}.00</p>
        </div>
        <hr />
        <div className="cart-total-row">
            <p>DeliveryFees</p>
            <p>{currency}{delivery_cost}.00</p>
        </div>
        <hr />
        <div className="cart-total-row">
            <b>Total</b>
            <b>{currency}{getCartAmount() == 0 ? 0 : getCartAmount() + delivery_cost}.00</b>
        </div>
      </div>
    </>
  )
}

export default CartTotal;

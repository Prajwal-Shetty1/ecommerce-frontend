import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {

  const { products, currency, cartItems, updateQuantity , navigate} = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

 useEffect(() =>{
  const tempData = [];
  for (const items in cartItems){
    for (const size in cartItems[items]){
      if (cartItems[items][size] > 0){
        tempData.push({
          _id : items,
          size : size,
          quantity : cartItems[items][size]
        })
      }
    }
  }
 setCartData(tempData);
 },[cartItems]);

 return (
  <>
    <div className='cart-title'>
      <Title text1={"_____YOUR"} text2={"CART_____"} />
    </div>

    <div className="cart-container">
  {cartData.map((item, index) => {
    const productData = products.find(
      product => product._id === item._id
    );

    return (
      <div className="cart-row" key={index}>
        <img src={productData.image[0]} className="cart-img" />

        <div className="cart-info">
          <p>{productData.name}</p>
          <p>Size: {item.size}</p>
        </div>

        <p>{currency}{productData.price}</p>

        <input type="number" min={1} value={item.quantity}
          onChange={(e) =>updateQuantity(item._id, item.size, Number(e.target.value))
          }
        />

        <img className="cart-delete"
          onClick={() => updateQuantity(item._id, item.size, 0)} src={assets.bin_icon} alt=""
        />
      </div>
    );
  })}
</div>
<div>
  <CartTotal />
  <div className="cart-checkout">
    <button onClick={() => navigate('Placed-Order')}>PROCEED TO CHECKOUT</button>
  </div>
</div>
  </>
);
};
export default Cart;

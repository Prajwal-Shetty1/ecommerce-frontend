import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';

const Cart = () => {

  const { products, currency, cartItems } = useContext(ShopContext);
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
    <div>
      <Title text1={"_____YOUR"} text2={"CART_____"} />
    </div>

    <div>
      {cartData.map((item, index) => {
        const productData = products.find(product => product._id === item._id);
     return(
      <div key={index}>
        <img src={productData.image[0]} alt="" />
  
      <div>
        <p>{productData.name}</p>
      </div>
      <div>
          <p>{currency}{productData.price}</p> 
           <p>{item.size}</p> 
      </div>
      </div>
     )
  
      })}
    </div>
  </>
);
};
export default Cart;

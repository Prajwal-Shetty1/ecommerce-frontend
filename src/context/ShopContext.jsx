import React, { useEffect, useState } from "react";
import { createContext } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";



export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_cost = 30;
    const [search , setSearch] = useState(""); //search logo
    const [showSearch , setShowSearch] = useState(false); //search logo
    //Add to cart
    const [cartItems , setCartItems] = useState({});

//Add to the cart-Same product + same size → quantity increases
//Same product + different size → new size entry added

 const addToCart =async (teamId,size) => {
    if (!size) {
        toast.error("Select Product Size");
        return;
    }
    let cartData = structuredClone(cartItems);
    if (cartData[teamId]) {
        if (cartData[teamId][size]) {
            cartData[teamId][size] +=1;
        }else{
            cartData[teamId][size] = 1;
        }
    }
    else{
        cartData[teamId] = {};
        cartData[teamId][size] = 1;
    }
 setCartItems(cartData);
};

 useEffect(() => {
   console.log(cartItems);
 },[cartItems])

 const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems){
        for (const item in cartItems[items]){
            try {
                if (cartItems[items][item] > 0){
                    totalCount += cartItems[items][item];
                }
            } catch (error) {
                
            }
        }
    }
    return totalCount;
 }

    const values = {
        products , currency ,delivery_cost,
        search , setSearch , showSearch , setShowSearch ,cartItems , addToCart ,getCartCount
    }
    return(
           <ShopContext.Provider value={values}>
                  {props.children}
           </ShopContext.Provider>
    )
}
export default ShopContextProvider;
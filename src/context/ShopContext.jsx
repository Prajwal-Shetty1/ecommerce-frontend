import React, { use, useEffect, useState } from "react";
import { createContext } from "react";
//import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";


export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '₹';
    const delivery_cost = 30;
    const [search, setSearch] = useState(""); //search logo
    const [showSearch, setShowSearch] = useState(false); //search logo
    //Add to cart
    const [cartItems, setCartItems] = useState({});
    //proceed to checkout button
    const navigate = useNavigate();
    //Backend url connectivity
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    //to add products from api
    const [products, setProducts] = useState([]);
    //Add to the cart-Same product + same size → quantity increases
    //Same product + different size → new size entry added
    const[token,setToken] = useState('');
useEffect(() => {
  console.log("TOKEN VALUE:", token);
}, [token]);
useEffect(() => {
  const savedToken = localStorage.getItem("token");
  if (savedToken) {
    setToken(savedToken);
  }
}, []);

    const addToCart = async (teamId, size) => {
        if (!size) {
            toast.error("Select Product Size");
            return;
        }
        console.log("TOKEN VALUE IN ADD TO CART:", token);

        let cartData = structuredClone(cartItems || {});
        if (cartData[teamId]) {
            if (cartData[teamId][size]) {
                cartData[teamId][size] += 1;
            } else {
                cartData[teamId][size] = 1;
            }
        }
        else {
            cartData[teamId] = {};
            cartData[teamId][size] = 1;
        }
        setCartItems(cartData);

        //to add selected products in cart to databases
        if (token) {
            try {
                await axios.post(backendUrl+'/api/cart/add',{ itemId: teamId, size},{ headers : {token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };

    useEffect(() => {
        console.log(cartItems);
    }, [cartItems])

    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalCount;
    }
    //used for to delete cartitems(bin icons) in cart.jsx

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems || {});


        if (quantity === 0) {
            delete cartData[itemId][size];
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        } else {
            cartData[itemId][size] = quantity;
        }

        setCartItems(cartData);

        //To update user cart in database (so if we update quantity it should be changed in database)
        if(token){
            try {
                 await axios.post(backendUrl+'/api/cart/update',{ itemId,size,quantity},{ headers : {token}})
            } catch (error) {
                console.log(error);
                toast.error(error.message);
            }
        }
    };
    //if refresh is given cart products are removed from userpanel while it should be restored from database
    const getUserCart = async(token) =>{
        try {
            const response = await axios.post(backendUrl+'/api/cart/get',{},{headers : {token}});
            if(response.data.success){
                setCartItems(response.data.cartData);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    }
    useEffect(() => {
  if (token) {
    getUserCart(token);
  }
}, [token]);

    //to get the cart amount of a particular items 
    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let iteminfo = products.find(product => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += iteminfo.price * cartItems[items][item];
                    }
                } catch (error) {

                }
            }
        }
        return totalAmount;
    }

    const getProducts = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list');
            //console.log(response);
            if (response.data.success) {
                setProducts(response.data.products);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(message.error);
        }
    }
    useEffect(() => {
    getProducts();
}, []);

    const values = {
        products, currency, delivery_cost,
        search, setSearch, showSearch, setShowSearch, cartItems, addToCart, getCartCount,
        updateQuantity, getCartAmount, navigate, backendUrl ,token , setToken,setCartItems
    }
    return (
        <ShopContext.Provider value={values}>
            {props.children}
        </ShopContext.Provider>
    )
}
export default ShopContextProvider;
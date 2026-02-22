import React, { useState } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';
import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const PlaceOrdered = () => {
  const [method, setMethod] = useState('cod');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_cost, products } = useContext(ShopContext);
  //for cartproducts to ordering(by providing informations for delivery purpose)
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  })
  const onChangeHandler = (event) => {
    //input field name (email, password, etc.)
    const name = event.target.name;
    //what user types
    const value = event.target.value;
    //updates that specific field in formData
    setFormData(data => ({ ...data, [name]: value }))
  }
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {

    console.log("cartItems:", cartItems); 
      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      // console.log(orderItems);
      let orderData = {
        address: formData,
        item: orderItems,
        amount: getCartAmount() + delivery_cost
      }
      //switch case for choosing payment methods and to store objects in orders Database
      switch (method) {
        //Api called for "COD"
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } })
          //console.log(response.data.successs);
          if (response.data.success) {
            setCartItems({})
            navigate('/Orders')
          } else {
            toast.error(response.data.message);
          }
          break;
        case "Stripe":
          try {
            const responseStripe = await axios.post(backendUrl + "/api/order/stripe",orderData,{ headers: { token } });
             console.log("Stripe Response:", responseStripe);
            if (responseStripe?.data?.success) {
              window.location.replace(responseStripe.data.session_url);
            } else {
              toast(responseStripe?.data?.message || "Payment Failed");
            }

          } catch (error) {
            console.log("Stripe Error:", error);
            toast("Stripe payment failed");
          }
          break;

        default:
          break;
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  return (
    <>
      <form className="place-order" onSubmit={onSubmitHandler}>

        {/* LEFT SIDE */}
        <div className="place-order-left">
          <div className='placeorder-title'>
            <Title text1={'DELIVERY'} text2={'INFORMATION_____'} />
          </div>
          <div className="two-inputs">
            <input onChange={onChangeHandler} name='firstname' value={formData.firstname} type="text" placeholder="First Name" required />
            <input onChange={onChangeHandler} name='lastname' value={formData.lastname} type="text" placeholder="Last Name" required />
          </div>

          <input onChange={onChangeHandler} name='email' value={formData.email} type="email" placeholder="Email Address" required />
          <input onChange={onChangeHandler} name='street' value={formData.street} type="text" placeholder="Street" required />

          <div className="two-inputs">
            <input onChange={onChangeHandler} name='city' value={formData.city} type="text" placeholder="City" required />
            <input onChange={onChangeHandler} name='state' value={formData.state} type="text" placeholder="State" required />
          </div>

          <div className="two-inputs">
            <input onChange={onChangeHandler} name='zipcode' value={formData.zipcode} type="number" placeholder="Zip Code" required />
            <input onChange={onChangeHandler} name='country' value={formData.country} type="text" placeholder="Country" required />
          </div>

          <input onChange={onChangeHandler} name='phone' value={formData.phone} type="number" placeholder="Phone" required />
        </div>

        {/* RIGHT SIDE */}
        <div className="place-order-right">
          <CartTotal />
          <div className='payment-title'>
            <Title text1={'PAYMENT'} text2={'METHODS_____'} />
          </div>

          <div className="payment-methods">
            <img onClick={() => setMethod('Stripe')} className={method === 'Stripe' ? 'active' : ''}
              src={assets.stripe_logo} alt="Stripe" />
            <img onClick={() => setMethod('Razorpay')} className={method === 'Razorpay' ? 'active' : ''}
              src={assets.razorpay_logo} alt="Razorpay" />
            <p onClick={() => setMethod('cod')} className={method === 'cod' ? 'active' : ''}
            >CASH ON DELIVERY</p>
          </div>
          <div className='place-button'>
            <button type='submit'>PLACE ORDER</button>
          </div>
        </div>

      </form>

    </>
  )
}

export default PlaceOrdered;

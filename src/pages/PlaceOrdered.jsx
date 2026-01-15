import React, { useState } from 'react'
import Title from '../components/Title';
import CartTotal from '../components/CartTotal';
import { assets } from '../assets/assets';

const PlaceOrdered = () => {
  const [method , setMethod] = useState('cod');
  return (
    <>
    <div className="place-order">

      {/* LEFT SIDE */}
      <div className="place-order-left">
        <div className='placeorder-title'>
        <Title text1={'DELIVERY'} text2={'INFORMATION_____'} />
        </div>
        <div className="two-inputs">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
        </div>

        <input type="email" placeholder="Email Address" />
        <input type="text" placeholder="Street" />

        <div className="two-inputs">
          <input type="text" placeholder="City" />
          <input type="text" placeholder="State" />
        </div>

        <div className="two-inputs">
          <input type="number" placeholder="Zip Code" />
          <input type="text" placeholder="Country" />
        </div>

        <input type="number" placeholder="Phone" />
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
      </div>

    </div>
    </>
  )
}

export default PlaceOrdered;

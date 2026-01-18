import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'

const Orders = () => {
  const { products, currency } = useContext(ShopContext)

  return (
    <>
      <div className="orders-title">
        <Title text1={'MY'} text2={'ORDERS_____'} />
      </div>

      <div className="orders-map">
        {
          products.slice(1, 4).map((item, index) => (
            <div key={index} className="orders-mapping">
              <img src={item.image[0]} alt={item.name} />

              <div className="orders-para">
                <p>{item.name}</p>
                <p>{currency} {item.price}</p>
                <p>Quantity : 1</p>
                <p>Size : M</p>
                <p>Date: <span>18 January, 2026</span></p>
              </div>
              <div className='para-orders'>
                <p>Ready to Ship</p>
              </div>
              <button>Track Order</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Orders

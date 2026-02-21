import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
const Orders = () => {
  //const { products, currency } = useContext(ShopContext)
  const { backendUrl, token, currency } = useContext(ShopContext);

  //to display order Db details to myorders(last) page
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) {
        return null;
      }
      const response = await axios.post(backendUrl + '/api/order/userOrders', {}, { headers: { token } });
      //console.log(response.data)
      //TO display in web page
      if (response.data.success) {

        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.item.forEach((product) => {

            product.status = order.status;
            product.payment = order.payment;
            product.paymentMethod = order.paymentMethod;
            product.date = order.date;

            allOrdersItem.push(product);
          });
        });

        setOrderData(allOrdersItem.reverse());
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }
  useEffect(() => {
    loadOrderData();
  }, [token])


  return (
    <>
      <div className="orders-title">
        <Title text1={'MY'} text2={'ORDERS_____'} />
      </div>

      <div className="orders-map">
        {
          orderData.map((item, index) => (
            <div key={index} className="orders-mapping">
              <img src={item.image[0]} alt={item.name} />

              <div className="orders-para">
                <p>{item.name}</p>
                <p>{currency} {item.price}</p>
                <p>Quantity : {item.quantity}</p>
                <p>Size : {item.size}</p>
                <p>Date: <span>{new Date(item.date).toLocaleDateString()}</span></p>
                <p>Payment : {item.paymentMethod}</p>
              </div>
              <div className='para-orders'>
                <div className="order-status">
                  <span className="status-dot"></span>
                  <p>{item.status}</p>
                </div>
              </div>
              <button onClick={loadOrderData}>Track Order</button>
            </div>
          ))
        }
      </div>
    </>
  )
}

export default Orders

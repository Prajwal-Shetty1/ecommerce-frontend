import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    //console.log(products);
    const[latestProducts,setLatestProducts] = useState([]);
    useEffect(() =>{
      setLatestProducts(products.slice(0,10));
    },[products])
  return (
    <>
    <div>
      <Title text1="_____LATEST" text2="COLLECTIONS_____"/>
       <p className="desc">Explore our newest arrivals and trendy styles.  
           Find outfits that make you stand out every season!</p>
    </div>

    {/*RENDERING PRODUCTS -props is passed from ProductItem.jsx*/ }
    <div className='rendering-products'>
    {
    latestProducts.map((item,index) => (
           <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.price}/>
    ))
  }
    </div>
    </>
  )
}
export default LatestCollection;
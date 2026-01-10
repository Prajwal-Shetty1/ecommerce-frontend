import React, { useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import { useEffect } from 'react';
import { useContext } from 'react';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


const RelatedProduct = ({category,subcategory}) => {
    const {products} = useContext(ShopContext);
    const [related , setRelated] = useState([]);

useEffect (() =>{
    if(products.length > 0){
      let productsCopy = products.slice();
      productsCopy = productsCopy.filter(item => category == item.category);
      productsCopy = productsCopy.filter(item => subcategory == item.subcategory);
      //console.log(productsCopy.slice(0,5));
      setRelated(productsCopy.slice(0,5));
    }
},[products]);

  return (
    <>
      <div className='related-products'>
        <div className='related-title'>
          <Title text1={'_____RELATED'} text2={'PRODUCTS_____'} />
        </div>
        <div className='related-img'>
          {related.map((item,index) => (
            <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
          ))}
        </div>
      </div>
    </>
  )
}

export default RelatedProduct;

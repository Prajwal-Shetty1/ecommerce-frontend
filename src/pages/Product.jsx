import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProduct from '../components/RelatedProduct';

const Product = () => {

  const {ProductId} = useParams();
  //console.log(ProductId);
  const {products , currency , addToCart} = useContext(ShopContext);
  const [productData , setProductData] = useState(false);
  const [image , setImage] = useState("");
  const [size , setSize] = useState("");

const fetchProductData = async () => {
   
  products.map((item) => {
    if (item._id == ProductId) {
      setProductData(item);
      //console.log(item);
      setImage(item.image[0]);
      return null;
    }
  })
}
useEffect(() => {
  fetchProductData();
},[ProductId])

  return productData ? (
    <>
  <div className='pro-images'>

    {/* ------ PRODUCT IMAGES ------ */}
    {productData.image.length > 1 && (
      <div className='img-left'>
        {productData.image.map((item, index) => (
          <img src={item} key={index} onClick={() => setImage(item)} alt="" />
        ))}
      </div>
    )}

    <div className='img-right'>
      <img src={image} alt="" />
    </div>

    {/* ------ PRODUCT INFORMATION ------ */}
    <div className='pro-inform'>
      <h1>{productData.name}</h1>
      <div className='pro-img'>
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_icon} alt="" />
        <img src={assets.star_dull_icon} alt="" />
        <p>(122)</p>
      </div>
      <div className='pro-chang'>
      <p>{currency} {productData.price}</p>
      <p>{productData.description}</p>
      </div>
      
<div className='pro-size'>
  <p>Select Size:</p>
  {
    productData.sizes.map((item,index) => (
      <button
        onClick={() => setSize(item)}
        key={index}
        className={size === item ? "active-size" : ""}>{item}</button>
    ))
  }
</div>
   <button onClick={() => addToCart(productData._id,size)}>ADD TO CART</button>
   <hr />
    <div className='pro-de'>
  <p>100% Original Product</p>
  <p>Cash on delivery is available on this product.</p>
  <p>Easy return & exchange policy within 7days.</p>
    </div>
  </div>
   </div>

    {/* Description & Review Section */}
    <div className='desc-review'>
  <div className='desc-head'>
    <b>Description</b>
    <b>Reviews (122)</b>
  </div>

  <p>
    Made with premium quality fabric, this clothing item is designed for maximum comfort and a perfect fit. 
    It offers excellent breathability and durability, making it ideal for everyday wear.
    Whether you are heading out casually or dressing up for an occasion, this piece complements all styles.
  </p>

  <p>
    This apparel is crafted from high-grade materials to deliver superior comfort and long-lasting performance.
    Its soft and breathable fabric keeps you comfortable throughout the day, while the modern tailored fit enhances your overall look.
    The material is gentle on the skin and ensures flexibility and ease of movement.
    Designed thoughtfully, it offers a stylish appearance suitable for outings, work, college, and travel.
  </p>
</div>

{/*----------Display related products----------*/}
<RelatedProduct category={productData.category} subcategory={productData.subcategory} />
    </>
) : <div></div>;

}
export default Product;

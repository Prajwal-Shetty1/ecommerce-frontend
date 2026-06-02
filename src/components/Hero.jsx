import React from 'react'
import { assets } from '../assets/assets';

const Hero = () => {
  return (
    
    <div className='hero'>
    <div className='hero-left'>
      <p>______OUR BESTSELLERS</p>
      <h1>LATEST ARRIVALS</h1>
      <p>SHOP NOW______</p>
    </div>
    <div className='hero-right'>
       <img src={assets.hero_img} alt="hero" />
    </div>
    </div>
    
  )
}

export default Hero; 

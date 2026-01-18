import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox'
const Contact = () => {
  return (
    <>
      <Title text1={'_____CONTACT'} text2={'US_____'} />
      <div className='contact-container'>
        <img src={assets.contact_img} alt="" />
        <div className='contact-body'>
          <b>Our Store</b>
          <p>Manyata Embassy Business Park-Outer Ring Road, Nagawara <br/> Bengaluru, Karnataka, India Pincode: 560045</p>
          <p>Tel:+91 1234567890 <br /> Email:admin@forever.com</p>
          <b>Careers at Forever</b>
          <p>Learn more about teams and job openings</p>
          <button>Explore Jobs</button>
        </div>
      </div>
      <NewsletterBox />
    </>
  )
}

export default Contact;

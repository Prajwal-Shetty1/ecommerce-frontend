import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'
const About = () => {
  return (
    <>
      <Title text1={'_____ABOUT'} text2={'US_____'} />

<div className="about-section">
  <img src={assets.about_img} alt="About Forever" />

  <div className="about-text">
    <p>
      Forever is a modern clothing brand created for people who want to feel
      confident, comfortable, and stylish every day. We believe fashion is
      not just about following trends, but about expressing your personality
      in the simplest and most natural way.
    </p>
    <p>
      Our collections are carefully designed to suit everyday wear while
      keeping comfort as a top priority. We focus on clean designs, soft
      fabrics, and modern fits that look good and feel even better.
         </p>

    <b>Our Mission</b>
    <p>
      Our mission is to make fashion affordable, reliable, and accessible
      for everyone. We aim to bring premium-quality clothing at fair prices,
      so looking good never feels like a luxury.
        </p>
    <p>
      At Forever, we care deeply about our customers and the world we live in.
      We are committed to ethical practices, responsible sourcing, and
      reducing waste wherever possible.
    </p>

  </div>
</div>
  <Title text1={'WHY'} text2={'CHOOSE US_____'} />
  <div className="choose-us">
    <div className="choose-card">
   <b>Quality Assurance:</b>
   <p> Every Forever product goes through strict quality checks to ensure
      premium fabrics, perfect fits, and long-lasting comfort.</p>
   </div>
   <div className="choose-card">
    <b>Convenience:</b>
    <p> From easy browsing to quick checkout, we make shopping simple and
      hassle-free. Enjoy fast delivery, multiple payment options, and easy
      returns designed for your comfort.</p>
   </div>
   <div className="choose-card">
    <b>Exceptional Customer Service:</b>
    <p> Our support team is always ready to help you. Whether you have a
      question or need assistance, we are committed to giving you a smooth
      and friendly shopping experience.</p>
   </div>
  </div>
<NewsletterBox />
    </>
  )
}

export default About;

import React from 'react';
import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsLetterBox from '../components/NewsLetterBox';

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.landing_5} />
        <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
          <p className='text-justify'>HappyFeet is an exclusive store, available both online and offline, dedicated to providing stylish and comfortable footwear for all occasions. Whether you're looking for trendy sneakers, elegant formal shoes, or cozy casual wear, HappyFeet offers a diverse range of options to suit every preference. Our carefully curated collection ensures high quality, durability, and affordability, making it easier for customers to find the perfect pair. With a user-friendly interface and seamless shopping experience, HappyFeet aims to redefine footwear shopping by blending fashion with convenience.</p>
          <p className='text-justify'>At HappyFeet, customer satisfaction is our top priority. We offer detailed product descriptions, multiple size options, and a hassle-free return policy to ensure a smooth shopping experience. Our secure payment gateway and fast delivery services guarantee that customers receive their orders promptly and safely. Additionally, our website features customer reviews and recommendations, helping shoppers make informed decisions. Whether you're stepping out for a casual outing or preparing for a formal event, HappyFeet has the right footwear to keep you stylish and comfortable every step of the way.</p>
          <b className='text-gray-800'>Our Mission</b>
          <p className='text-justify'>At HappyFeet, our mission is to provide stylish, comfortable, and high-quality footwear for every occasion. We aim to make fashion accessible with durable, affordable options while ensuring a seamless shopping experience through secure payments and reliable delivery. Our goal is to be a trusted destination where style meets comfort in every step.</p>
        </div>
      </div>

      <div className='text-4xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600 text-justify'>At HappyFeet, we prioritize quality assurance to ensure every pair meets high standards of durability, comfort, and style. Our products undergo strict quality checks, from material selection to final packaging, guaranteeing a premium experience. We are committed to providing reliable, long-lasting footwear that our customers can trust.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Covenience:</b>
          <p className='text-gray-600 text-justify'>HappyFeet is designed for ultimate convenience, offering a seamless shopping experience with an easy-to-navigate website, secure payments, and fast delivery. With detailed product descriptions, multiple size options, and a hassle-free return policy, we ensure a smooth and stress-free purchase for every customer.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional Customer Service:</b>
          <p className='text-gray-600 text-justify'>At HappyFeet, we prioritize exceptional customer service by providing prompt support, easy returns, and a seamless shopping experience. Our dedicated team is always ready to assist with inquiries, ensuring every customer enjoys a hassle-free and satisfying experience.</p>
        </div>
      </div>

      <NewsLetterBox />
    </div>
  )
}

export default About
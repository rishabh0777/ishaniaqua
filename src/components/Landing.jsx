/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from 'react'
import gallonImage from '../assets/images/20lGalon.png';
import Button from './Button';
import DetCard from './Detcard'
import Footer from './Footer'
const Landing = () => {
  return (
    <>
    <div className="w-full h-[88vh] flex xsm:flex-col-reverse md:flex-row ">
        <div id="left" className='md:w-[55%] md:h-full xsm:w-full xsm:h-[55%] flex flex-col xsm:flex-col-reverse items-end justify-center '>
          <div className='md:w-[60%] xsm:w-full md-px-0 xsm:px-4 xsm:pl-7 md-pl-0'>
          <div className='md:mr-[8vw] mb-[4vh] md:w-[50%] w-[60%]  md:text-[0.9em] xsm:text-[0.8em] md:px-2 md:py-3 xsm:py-1 xsm:px-3 rounded-md text-center bg-blue-600 text-white '><h3 className='whitespace-none'>Water is Nothing But Life</h3></div>
        <h1 className='mr-[8vw] lineheight md:text-[3.5vw] xsm:text-[8vw] whitespace-nowrap'>Mineral Water</h1>
        <h1 className='mr-[8vw] mb-[4vh] md:text-[3.5vw] xsm:text-[8vw] whitespace-nowrap'>With Great Taste</h1>
        <p className='mr-[8vw] mb-[4vh] md:text-[0.7em] xsm:text-[0.6em]'>Experience the purity and refreshing taste of Ishani Aqua Mineral Water. Our water is sourced from pristine springs and undergoes rigorous filtration to ensure it meets the highest standards of quality. Whether it's for your daily hydration or special occasions, trust Ishani Aqua Mineral Water to deliver the freshness and mineral-rich goodness your body deserves.</p>
        <Button text="Read more" />
          </div>
        </div>
        <div id="right" className='md:w-[45%] md:h-full xsm:w-full xsm:h-[45%]  flex md:justify-start md:items-center xsm:justify-center xsm:items-end '>
          <img 
          src={gallonImage} 
          className='md:w-[70%] xsm:w-[80%]'
          alt="image not found" />
        </div>
    </div>

        <div className="w-full min-h-[100vh] md:py-6 ">
      {/* Header Section */}
      <div className="md:h-[30vh] xsm:h-[20vh] w-full bg-gradient-to-r from-blue-400 to-blue-600 flex flex-col justify-center items-center text-white">
        <h1 className="md:text-4xl font-bold whitespace-nowrap xsm:text-[5vw]">Delivering Purity, Every Drop Counts</h1>
        <p className="md:text-lg xsm:text-[0.7em] whitespace-nowrap mt-2">Premium Anodized Mineral Water with 100+ TDS for Your Health</p>
      </div>

      {/* Feature Cards Section */}
      <div className="mt-10 grid grid-cols-1 ">
        <DetCard 
          icon="ri-water-flash-fill" 
          num="100+ TDS" 
          text="Our water is enriched with essential minerals for a healthy lifestyle." 
        />
        <DetCard 
          icon="ri-emotion-fill" 
          num="200+ Happy Customers" 
          text="Serving satisfied customers for over 5 years." 
        />
        <DetCard 
          icon="ri-service-fill" 
          num="Anodized Water" 
          text="Advanced filtration ensuring pure, safe water for every home." 
        />
      </div>
    </div>

        <Footer />
        </>
  );
};




export default Landing
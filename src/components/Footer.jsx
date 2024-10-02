import React from 'react'

const Footer = () => {


  const handleEmailClick = () => {
    window.location.href = "mailto:ishaniaquamineralwater@gmail.com";
}
  

  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        {/* About Company */}
        <div className="text-center mb-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl font-bold">About Ishani Aqua</h2>
          <p className="md:mt-2 xsm:mt-3 md:w-[70%] flex justify-center md:text-[1em] xsm:text-[0.6em] px-2">
            We are committed to providing clean and safe drinking water for you and your family. Our state-of-the-art filtration systems ensure that every drop is pure and refreshing.
          </p>
        </div>

   

        {/* Contact Information */}
        <div className="text-center md:text-[0.9em] xsm:text-[0.7em] md:mb-4 xsm:mb-7 cursor-pointer">
        <h2 className="mb-3 text-2xl font-bold">Contact Details :</h2>
          <p>Mail: <span onClick={handleEmailClick}>ishaniaquamineralwater@gmail.com</span></p>
          <p>Mob: +91 9532090228</p>
        </div>

        {/* Copyright */}
        <div className="text-center px-[2]">
          <p className="md:text-sm xsm:text-[0.7em]">© {new Date().getFullYear()} Ishani Aqua Mineral Water. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

const Footer = () => {
  return (
    <footer className="bg-blue-600 text-white py-8">
      <div className="container mx-auto flex flex-col items-center">
        {/* About Company */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold">About Ishani Aqua</h2>
          <p className="md:mt-2 xsm:mt-3 max-w-md md:text-[1em] xsm:text-[0.6em] px-2">
            We are committed to providing clean and safe drinking water for you and your family. Our state-of-the-art filtration systems ensure that every drop is pure and refreshing.
          </p>
        </div>

   

        {/* Contact Information */}
        <div className="text-center md:text-[0.9em] xsm:text-[0.7em] mb-4 cursor-pointer">
          <p>📧 ishaniaquamineralwater@gmail.com</p>
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

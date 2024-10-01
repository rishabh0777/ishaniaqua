import React from 'react'

const Offer = () => {
  const handleEmailClick = () => {
    window.location.href = "mailto:rishabhsrivastava7777@gmail.com?subject=Birthday Offer Verification";
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto my-10 border border-blue-500">
      <h2 className="text-center text-3xl font-bold text-blue-600 mb-4">🎉 Special Birthday Offer! 🎉</h2>
      <p className="text-center text-gray-700 mb-6">
        Planning a small gathering for your birthday? We have a special offer just for you!
      </p>
      <div className="bg-blue-100 rounded-lg p-4 border border-blue-300 mb-4">
        <h3 className="text-xl font-semibold text-blue-600">Free Jar for Small Parties!</h3>
        <p className="text-gray-600">
          If you're hosting a party of 5 to 6 people, get 1 jar of our premium water absolutely free!
        </p>
      </div>
      <p className="text-center text-gray-700 mb-6">
        To verify your birthday, please send us your Aadhaar card via email.
      </p>
      <button 
        onClick={handleEmailClick} 
        className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition duration-300">
        Verify Birthday
      </button>
    </div>
  );
};

export default Offer;


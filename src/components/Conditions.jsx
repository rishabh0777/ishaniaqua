import React from 'react';

const Conditions = () => {
  return (
    <div className="w-full min-h-screen p-8 xsm:text-[0.6em] md:text-[1em]">
      <h1 className="text-3xl font-bold mb-6 text-red-500">Terms and Conditions</h1>
      
      {/* Delivery Timing Section */}
      <h2 className="text-xl font-semibold mb-4 text-blue-500">Delivery Timing</h2>
      <p className="mb-4">
        Our delivery timings are as follows:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Morning Delivery: 7 AM to 11 AM</li>
        <li>Evening Delivery: 4 PM to 7 PM</li>
      </ul>

      {/* Ordering Before Morning Time */}
      <h2 className="text-xl font-semibold mb-4 text-blue-500">Delivery Rules Based on Time of Order</h2>
      <p className="mb-4">
        Your order delivery will be determined by the time at which the order is placed.
      </p>
      
      <ul className="list-disc list-inside mb-4">
        <li>
          <strong>Orders placed before 8 AM:</strong> If your order is placed before 8 AM, it will be delivered during the morning slot (7 AM - 11 AM).
        </li>
        <li>
          <strong>Orders placed after 8 AM but before 6 PM:</strong> Orders placed during this time will be delivered in the evening slot (4 PM - 7 PM).
        </li>
        <li>
          <strong>Orders placed after 6 PM:</strong> If the order is placed after 6 PM, it will be delivered the next morning between 7 AM - 11 AM.
        </li>
      </ul>

      {/* Additional Conditions */}
      <h2 className="text-xl font-semibold mb-4 text-blue-500">Additional Conditions</h2>
      <p className="mb-4">
        Please note:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Orders placed after 6 PM will be processed for delivery the following morning.</li>
        <li>If any delays occur due to unforeseen circumstances, we will notify you promptly.</li>
      </ul>

      <p className="mt-6 text-blue-500">
        Thank you for choosing Ishani Aqua Mineral Water. We strive to ensure timely and reliable delivery of our products.
      </p>
    </div>
  );
};

export default Conditions;

import React from 'react';

const Card = ({ username, totalOrders, totalPrice, orderStatus, children }) => {
    return (
        <div className="border p-4 rounded-lg shadow-lg space-y-3 bg-white text-gray-800">
            <h2 className="text-xl font-bold">{username}</h2>
            <p>Total Orders: {totalOrders}</p>
            <p>Total Price: ₹{totalPrice}</p>
            <p>Order Status: 
                <span className={`ml-2 ${orderStatus === 'Pending' ? 'text-yellow-500' : orderStatus === 'Confirmed' ? 'text-green-500' : 'text-red-500'}`}>
                    {orderStatus || 'No Orders'}
                </span>
            </p>
            
            {/* Buttons rendered conditionally, if orderStatus is Pending */}
            {children && orderStatus === 'Pending' && (
                <div className="flex space-x-4">
                    {children}
                </div>
            )}
        </div>
    );
};

export default Card;

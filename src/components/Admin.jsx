import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers, updateUserData } from '../redux/slice/userSlice';

const Admin = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                await dispatch(fetchAllUsers());
            } catch (err) {
                setError('Failed to fetch users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [dispatch]);

    // Debugging logs
    console.log('Users:', users);

    const handleDeliver = (user) => {
        const updatedOrderStatus = {
            ...user.userOrder,
            status: 'Delivered',
        };

        const updatedTotalItem = user.totalItem + user.userOrder.totalItem;
        const updatedPrice = user.price + user.userOrder.orderedPrice;

        dispatch(updateUserData({
            uid: user.uid,
            totalItem: updatedTotalItem,
            price: updatedPrice,
            role: user.role,
            userOrder: updatedOrderStatus,
        }));
    };

    const handleCancel = (user) => {
        const updatedOrderStatus = {
            ...user.userOrder,
            status: 'Cancelled',
        };

        dispatch(updateUserData({
            uid: user.uid,
            totalItem: user.totalItem, // Keep total items same
            price: user.price, // Keep price same
            role: user.role,
            userOrder: updatedOrderStatus,
        }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    // Check if there are any users with pending orders
    const hasPendingOrders = users.some(user => user.userOrder.status === 'pending');

    return (
      <div className="w-full min-h-[88vh] p-6">
        <h1 className="text-2xl font-bold mb-4 text-center ">Admin Panel</h1>

        {hasPendingOrders ? (
            users.map((user) => (
                user.userOrder.status === 'pending' && (
                    <div key={user.uid} className="border p-4 rounded">
                        <h2 className="font-bold">{user.name}</h2>
                        <p>Status: {user.userOrder.status}</p>
                        <p>Total Ordered: {user.userOrder.totalItem}</p>
                        <p>Total Price: ₹{user.userOrder.orderedPrice}</p>
                        <button
                            onClick={() => handleDeliver(user)}
                            className="bg-green-500 text-white my-2 py-2 px-4 rounded-lg mr-2"
                        >
                            Mark as Delivered
                        </button>
                       {
                        user.userOrder.status==='pending' &&(
                            <button
                            onClick={() => handleCancel(user)}
                            className="bg-red-500 text-white py-2 px-4 rounded-lg"
                        >
                            Cancel Order
                        </button>
                            )
                       }
                    </div>
                )
            ))
        ) : (
            <div className="text-center">
                <h2>No Order Pending</h2>
            </div>
        )}
      </div>
    );
};

export default Admin;

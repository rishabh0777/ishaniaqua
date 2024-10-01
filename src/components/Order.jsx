import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, updateUserData } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router';



export default function Order() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user); // User data from user slice
    const myUser = useSelector((state) => state.auth.user); // Authenticated user from auth slice
    const navigate = useNavigate();

    const [orderQuantity, setOrderQuantity] = useState(1);

    useEffect(() => {
        if (myUser?.uid) {  // Ensure the correct UID is used
            dispatch(fetchUserData(myUser.uid));  // Pass UID to fetch user data
        }
    }, [dispatch, myUser?.uid]);

    const handleOrder = () => {
        if (!myUser?.uid) {
            console.error("User UID is missing!");
            return;
        }

        const newTotalItem = user.totalItem + orderQuantity;
        const newTotalPrice = user.price + orderQuantity * 20; // Assuming each item costs 20

        dispatch(updateUserData({
            uid: myUser.uid, // Use the UID from myUser
            totalItem: newTotalItem,
            price: newTotalPrice,
            role: user.role,
            userOrder: {
                status: "pending",
                orderedPrice: orderQuantity * 20,
                totalItem: orderQuantity,
            },
        }));

        dispatch(fetchUserData(myUser.uid)); // Refetch user data after ordering
    };

    const handleCancelOrder = () => {
        const newTotalItem = user.totalItem - user.userOrder.totalItem;
        const newTotalPrice = user.price - user.userOrder.orderedPrice;

        dispatch(updateUserData({
            uid: myUser.uid,
            totalItem: newTotalItem,
            price: newTotalPrice,
            role: user.role,
            userOrder: {
                status: 'cancelled',
                orderedPrice: 0,
                totalItem: 0,
            }
        }));

        dispatch(fetchUserData(myUser.uid)); // Refetch data after canceling the order
    };

    return (
        <>
            {myUser ? (
                <div className="w-full h-[88vh] flex justify-center items-center">
                    <div className="p-6 bg-white shadow-black shadow-lg rounded-[1.9vw]">
                        <h1 className="text-2xl font-bold mb-4">Place Your Order</h1>
                        <div className="space-y-4">
                            <p>Total Orders: {user.totalItem}</p>
                            <p>Total Price: ₹{user.price}</p>
                            <input
                                type="number"
                                value={orderQuantity}
                                onChange={(e) => setOrderQuantity(Number(e.target.value))}
                                className="border p-2 rounded mr-2 shadow-lg shadow-black outline-none"
                                min={1}
                            />
                            <button onClick={handleOrder} className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2">
                                Order Water
                            </button>
                            {user.userOrder.status === 'pending' && (
                                <button onClick={handleCancelOrder} className="bg-red-500 text-white py-2 px-4 rounded-lg mr-2">
                                    Cancel Order
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="w-full h-[88vh] flex justify-center items-center ">
                    <button onClick={() => navigate('/login', { replace: true })} className="bg-blue-500 md:text-[2vw] xsm:text-[3.5vw] text-white px-7 py-2 rounded-lg">
                        Login
                    </button>
                </div>
            )}

        </>
    );
}

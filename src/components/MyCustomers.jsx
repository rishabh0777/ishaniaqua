import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllUsers } from '../redux/slice/userSlice';
import Card from './Card';

const MyCustomers = () => {
    const dispatch = useDispatch();
    const users = useSelector((state) => state.user.users);
    const currentUser = useSelector((state) => state.user); // Get current user data from state

    useEffect(() => {
        dispatch(fetchAllUsers());
    }, [dispatch]);

    // Filter customers, but ensure you check the role correctly
const customers = users.filter(user => user.role === 'customer' && user.uid === user.uid); // Adjust logic as needed

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">My Customers</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {customers.map(customer => (
                    <Card
                        key={customer.uid}
                        username={customer.name}
                        totalOrders={customer.totalItem}
                        totalPrice={customer.price}
                        orderStatus={customer.userOrder.status}
                    >
                        {/* You can add buttons or any other actions here */}
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default MyCustomers;

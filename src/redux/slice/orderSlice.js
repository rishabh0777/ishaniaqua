// orderSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    users: {} // Users will be stored here
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        createUserData: (state, action) => {
            const { userId, name, role } = action.payload;
            state.users[userId] = {
                name,
                totalItem: 0,
                totalPrice: 0,
                role,
                orders: []
            };
        },
        placeOrder: (state, action) => {
            const { userId, orderData } = action.payload;
            const user = state.users[userId];

            if (user) {
                const orderId = `order${user.orders.length + 1}`; // Generate a new order ID
                const newOrder = {
                    orderId,
                    items: orderData.items,
                    price: orderData.price,
                    status: "pending" // Default status
                };
                user.orders.push(newOrder);
                
                // Update total items and total price
                user.totalItem += orderData.items.length; // Update total items
                user.totalPrice += orderData.price; // Update total price
            }
        },
        updateOrderStatus: (state, action) => {
            const { userId, orderId, status } = action.payload;
            const user = state.users[userId];

            if (user) {
                const order = user.orders.find(order => order.orderId === orderId);
                if (order) {
                    order.status = status; // Update order status
                }
            }
        },
    }
});

// Export actions
export const { createUserData, placeOrder, updateOrderStatus } = orderSlice.actions;

// Export reducer
export default orderSlice.reducer;

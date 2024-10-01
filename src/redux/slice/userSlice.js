import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { ref, set, get, child, update } from 'firebase/database';
import { db } from '../../Firebase/firebaseConfig';

// Thunks for interacting with Firebase
export const createUserData = createAsyncThunk('user/createUserData', async (userData, { dispatch }) => {
    const userRef = ref(db, `users/${userData.uid}`);
    await set(userRef, {
        name: userData.name,
        email: userData.email,
        totalItem: 0,
        price: 0,
        role: 'customer',
        userOrder:{
            status: "noOrder",
            orderedPrice: 0,
            totalItem:0,
        } 
    });
    dispatch(setUser(userData));
});

export const fetchUserData = createAsyncThunk('user/fetchUserData', async (uid, { dispatch }) => {
    const userSnapshot = await get(child(ref(db), `users/${uid}`));
    if (userSnapshot.exists()) {
        const userData = userSnapshot.val();
        dispatch(setUser(userData));
    }
});

export const fetchAllUsers = createAsyncThunk('user/fetchAllUsers', async (_, { dispatch }) => {
    const usersSnapshot = await get(child(ref(db), 'users'));
    if (usersSnapshot.exists()) {
        const usersData = usersSnapshot.val();
        dispatch(setUsers(Object.keys(usersData).map(key => ({ uid: key, ...usersData[key] }))));
    }
});

export const updateUserData = createAsyncThunk('user/updateUserData', async (data, { dispatch }) => {
    // If this is a cancel request, revert to previous values
    if (data.isCancel) {
        const userSnapshot = await get(child(ref(db), `users/${data.uid}`));
        if (userSnapshot.exists()) {
            const userData = userSnapshot.val();
            const revertedPrice = userData.price - data.userOrder.orderedPrice;
            const revertedTotalItems = userData.totalItem - data.userOrder.totalItem;
            
            await update(ref(db, `users/${data.uid}`), {
                totalItem: revertedTotalItems,
                price: revertedPrice,
                role: data.role,
                userOrder: {
                    status: 'cancelled',
                    orderedPrice: 0,
                    totalItem: 0,
                },
            });
        }
    } else {
        // For normal updates (new order)
        await update(ref(db, `users/${data.uid}`), {
            totalItem: data.totalItem,
            price: data.price,
            role: data.role,
            userOrder: data.userOrder, // Updated user order
        });
    }
    dispatch(fetchAllUsers());
});



const userSlice = createSlice({
    name: 'user',
    initialState: {
        users: [],
        role: 'customer',
        totalItem: 0,
        price: 0,
         userOrder:{
            status: "noOrder",
            orderedPrice: 0,
            totalItem:0,
        },
    },
    reducers: {
        setUser: (state, action) => {
            return { ...state, ...action.payload };
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserData.fulfilled, (state, action) => {
                state.role = action.payload.role;
                state.totalItem = action.payload.totalItem;
                state.price = action.payload.price;
                state.userOrder = action.payload.userOrder;
                
            });
    },
});

export const { setUser, setUsers } = userSlice.actions;
export default userSlice.reducer;

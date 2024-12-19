import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
    wishlistItems: localStorage.getItem('wishlist') 
        ? JSON.parse(localStorage.getItem('wishlist')) 
        : []
};

const wishlistSlice = createSlice({
    name: 'wishlist',
    initialState,
    reducers: {
        addToWishlist: (state, action) => {
            const existingItem = state.wishlistItems.find(item => item._id === action.payload._id);
            if (!existingItem) {
                state.wishlistItems.push(action.payload);
                localStorage.setItem('wishlist', JSON.stringify(state.wishlistItems));
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Added to Wishlist",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                Swal.fire({
                    title: "Already in Wishlist",
                    text: "This item is already in your wishlist!",
                    icon: "info",
                    showConfirmButton: true,
                    confirmButtonColor: "#3085d6",
                });
            }
        },
        removeFromWishlist: (state, action) => {
            state.wishlistItems = state.wishlistItems.filter(item => item._id !== action.payload._id);
            localStorage.setItem('wishlist', JSON.stringify(state.wishlistItems));
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Removed from Wishlist",
                showConfirmButton: false,
                timer: 1500
            });
        },
        clearWishlist: (state) => {
            state.wishlistItems = [];
            localStorage.removeItem('wishlist');
        }
    }
});

export const { addToWishlist, removeFromWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
// Import the configureStore function from Redux Toolkit - this is the modern way to set up Redux
import { configureStore } from '@reduxjs/toolkit';

// Import the cart reducer from our cart slice
import cartReducer from './features/cart/cartSlice';

// Import the wishlist reducer
import wishlistReducer from './features/wishlist/wishlistSlice';

// Import our RTK Query API slices for plants and orders
import plantsApi from './features/plants/plantsApi';
import ordersApi from './features/orders/ordersApi';

// Create and export the Redux store
export const store = configureStore({
  // Configure the root reducer - this combines all our reducers into one
  reducer: {
    // Regular reducer for cart functionality
    cart: cartReducer,
    // Add wishlist reducer
    wishlist: wishlistReducer,

    // Add the reducers for our RTK Query APIs
    // Using computed property names to dynamically set the reducer paths
    [plantsApi.reducerPath]: plantsApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
  },

  // Configure middleware
  middleware: (getDefaultMiddleware) =>
    // Get the default middleware that comes with Redux Toolkit
    // Then add our RTK Query API middleware to enable caching, invalidation, polling, etc.
    getDefaultMiddleware().concat(
      plantsApi.middleware,
      ordersApi.middleware  // Fixed the typo here: changed 'middyleware' to 'middleware'
    ),
});

export default store;
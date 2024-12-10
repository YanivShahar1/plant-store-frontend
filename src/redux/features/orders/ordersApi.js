// Import necessary dependencies from Redux Toolkit Query
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import getBaseUrl from "../../../utils/baseURL";

/**
 * Orders API slice using Redux Toolkit Query
 * This file defines the API endpoints for handling order-related operations
 */
const ordersApi = createApi({
    // Unique key for this api slice in the Redux store
    reducerPath: 'ordersApi',

    // Configure the base query with common settings
    baseQuery: fetchBaseQuery({
        // Set the base URL for all endpoints using a utility function
        baseUrl: `${getBaseUrl()}/api/orders`,
        // Include credentials in requests (important for authentication)
        credentials: 'include'
    }),

    // Define cache tags for invalidation
    tagTypes: ['Orders'],

    // Define the API endpoints
    endpoints: (builder) => ({
        // Mutation endpoint for creating a new order
        createOrder: (builder.mutation) ({
            query: (newOrder) => ({
                url: "/",
                method: "POST",
                body: newOrder,
                credentials: 'include',
            })
        }),

        // Query endpoint for fetching orders by email
        getOrderByEmail: (builder.query) ({
            query: (email) => ({
                url: `/email/${email}`
            }),
            // Tag this query result as 'Orders' for cache invalidation
            providesTags: ['Orders']
        })
    })
})

// Export auto-generated hooks for use in components
// useCreateOrderMutation - Hook for creating orders
// useGetOrderByEmailQuery - Hook for fetching orders by email
export const {useCreateOrderMutation, useGetOrderByEmailQuery} = ordersApi;

// Export the API slice for use in the Redux store
export default ordersApi;
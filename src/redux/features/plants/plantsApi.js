// Import necessary dependencies from Redux Toolkit
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import getBaseUrl from '../../../utils/baseURL'

// Configure the base query with authentication and headers
const baseQuery = fetchBaseQuery({
    // Set the base URL for all API requests
    baseUrl: `${getBaseUrl()}/api/plants`,
    // Include credentials in requests (cookies, etc.)
    credentials: 'include',
    // Prepare headers for each request
    prepareHeaders: (Headers) => {
        // Get JWT token from localStorage
        const token = localStorage.getItem('token');
        // If token exists, add it to Authorization header
        if (token) {
            Headers.set('Authorization', `Bearer ${token}`);
        }
        return Headers;
    },
});

// Create the API slice using RTK Query
const plantsApi = createApi({
    // Unique key for Redux store
    reducerPath: 'plantsApi',
    // Use the configured base query
    baseQuery,
    // Define cache tags for automatic cache invalidation
    tagTypes: ['Plants'],
    // Define the API endpoints
    endpoints: (builder) => ({
        // GET all plants
        fetchAllPlants: builder.query({
            query: () => "/",
            // Tag the response for cache management
            providesTags: ["Plants"],
        }),
        
        // GET single plant by ID
        fetchPlantById: builder.query({
            query: (id) => `/${id}`,
            // Tag with specific plant ID for granular cache management
            providesTags: (result, error, id) => [{ type: "Plants", id }],
        }),
        
        // POST new plant
        addPlant: builder.mutation({
            query: (newPlant) => ({
                url: `/create-plant`,
                method: "POST",
                body: newPlant,
            }),
            // Invalidate the Plants cache when a new plant is added
            invalidatesTags: ["Plants"],
        }),
        
        // PUT update existing plant
        updatePlant: builder.mutation({
            query: ({ id, ...rest }) => ({
                url: `/edit/${id}`,
                method: "PUT",
                body: rest,
                headers: {
                    'Content-Type': 'application/json',
                },
            }),
            // Invalidate the Plants cache when a plant is updated
            invalidatesTags: ["Plants"],
        }),
        
        // DELETE plant
        deletePlant: builder.mutation({
            query: (id) => ({
                url: `/${id}`,
                method: "DELETE",
            }),
            // Invalidate the Plants cache when a plant is deleted
            invalidatesTags: ["Plants"],
        }),
    }),
});

// Export generated hooks for use in components
export const {
    useFetchAllPlantsQuery,    // Hook for fetching all plants
    useFetchPlantByIdQuery,    // Hook for fetching a single plant
    useAddPlantMutation,       // Hook for adding a new plant
    useUpdatePlantMutation,    // Hook for updating a plant
    useDeletePlantMutation,    // Hook for deleting a plant
} = plantsApi;

export default plantsApi;

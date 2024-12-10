import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import axios from "axios"
import getBaseUrl from '../utils/baseURL'
import { useNavigate } from 'react-router-dom'
import Footer from './Footer'

/**
 * AdminLogin Component
 * Provides a login interface for admin users with form validation and authentication
 * Features:
 * - Form validation using react-hook-form
 * - JWT token management
 * - Auto logout after token expiration (1 hour)
 * - Error handling and user feedback
 */
const AdminLogin = () => {
    const [message, setMessage] = useState("")

    // Initialize react-hook-form with destructured methods
    const {
        register,        
        handleSubmit,    
        formState: { errors }, // Form validation errors
    } = useForm()

    const navigate = useNavigate()

    /**
     * Handles form submission and authentication
     * @param {Object} data - Form data containing username and password
     */
    const onSubmit = async (data) => {
        try {
            // Make POST request to admin authentication endpoint
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            const auth = response.data;

            // Handle successful authentication
            if(auth.token) {
                // Store JWT token in localStorage
                localStorage.setItem('token', auth.token);

                // Set token expiration (1 hour)
                setTimeout(() => {
                    localStorage.removeItem('token')
                    alert('Token has been expired!, Please login again.');
                    navigate("/")
                }, 3600 * 1000) // 1 hour in milliseconds
            }

            // Notify user and redirect to dashboard
            alert("Admin Login successful!")
            navigate("/dashboard")

        } catch (error) {
            // Handle authentication errors
            setMessage("Please provide a valid email and password") 
            console.error(error)
        }
    }

    return (
        // Main container with centered content
        <div className='h-screen flex justify-center items-center '>
            {/* Login form card */}
            <div className='w-full max-w-sm mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'>
                <h2 className='text-xl font-semibold mb-4'>Admin Dashboard Login </h2>

                {/* Login form */}
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* Username field */}
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="username">
                            Username
                        </label>
                        <input 
                            {...register("username", { required: true })} 
                            type="text"
                            name="username"
                            id="username"
                            placeholder='username'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                    </div>

                    {/* Password field */}
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor="password">
                            Password
                        </label>
                        <input 
                            {...register("password", { required: true })} 
                            type="password"
                            name="password"
                            id="password"
                            placeholder='Password'
                            className='shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow'
                        />
                    </div>

                    {/* Error message display */}
                    {message && <p className='text-red-500 text-xs italic mb-3'>{message}</p>}

                    {/* Submit button */}
                    <div className='w-full'>
                        <button className='bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none'>
                            Login 
                        </button>
                    </div>
                </form>

            </div>
        </div>
    )
}

export default AdminLogin
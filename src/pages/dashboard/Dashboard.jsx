import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/Loading';
import getBaseUrl from '../../utils/baseURL';
import { MdIncompleteCircle } from 'react-icons/md'
import RevenueChart from './RevenueChart';

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState({});
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${getBaseUrl()}/api/admin`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                        'Content-Type': 'application/json',
                    },
                })
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        fetchData();
    }, []);

    if(loading) return <Loading/>

    return (
        <>
            <section className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-primary bg-primary/10 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">35</span>
                        <span className="block text-gray-500">Total Plants</span>
                    </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-primary bg-primary/10 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">$2,485</span>
                        <span className="block text-gray-500">Monthly Revenue</span>
                    </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-accent bg-accent/10 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                        </svg>
                    </div>
                    <div>
                        <span className="inline-block text-2xl font-bold">16</span>
                        <span className="inline-block text-xl text-gray-500 font-semibold">(24%)</span>
                        <span className="block text-gray-500">Bestselling Plants</span>
                    </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-secondary bg-secondary/10 rounded-full mr-6">
                        <MdIncompleteCircle className='size-6'/>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">10</span>
                        <span className="block text-gray-500">Active Orders</span>
                    </div>
                </div>
            </section>

            <section className="grid md:grid-cols-2 xl:grid-cols-4 xl:grid-rows-3 xl:grid-flow-col gap-6 mt-6">
                <div className="flex flex-col md:col-span-2 md:row-span-2 bg-white shadow rounded-lg">
                    <div className="px-6 py-5 font-semibold border-b border-gray-100">Monthly Sales Overview</div>
                    <div className="p-4 flex-grow">
                        <div className="flex items-center justify-center h-full px-4 py-16 text-gray-400 text-3xl font-semibold bg-blackBG border-2 border-gray-200 border-dashed rounded-md">
                            <RevenueChart />
                        </div>
                    </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-accent bg-accent/10 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">3</span>
                        <span className="block text-gray-500">Pending Deliveries</span>
                    </div>
                </div>

                <div className="flex items-center p-8 bg-white shadow rounded-lg">
                    <div className="inline-flex flex-shrink-0 items-center justify-center h-16 w-16 text-primary bg-primary/10 rounded-full mr-6">
                        <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <span className="block text-2xl font-bold">187</span>
                        <span className="block text-gray-500">Monthly Visitors</span>
                    </div>
                </div>

                <div className="row-span-3 bg-white shadow rounded-lg">
                    <div className="flex items-center justify-between px-6 py-5 font-semibold border-b border-gray-100">
                        <span>Top Customer Reviews</span>
                        <button type="button" className="inline-flex justify-center rounded-md px-1 -mr-1 bg-white text-sm leading-5 font-medium text-gray-500 hover:text-gray-600">
                            Latest
                            <svg className="-mr-1 ml-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    <div className="overflow-y-auto" style={{maxHeight: '24rem'}}>
                        <ul className="p-6 space-y-6">
                            {[
                                { name: "Sarah Green", rating: "4.9", img: "32" },
                                { name: "Michael Garden", rating: "4.8", img: "45" },
                                { name: "Emma Botanist", rating: "4.7", img: "23" },
                                { name: "James Plant", rating: "4.6", img: "56" },
                                { name: "Lucy Flora", rating: "4.6", img: "89" },
                                { name: "David Nature", rating: "4.5", img: "67" },
                                { name: "Rose Petal", rating: "4.4", img: "43" },
                                { name: "Tom Greenhouse", rating: "4.3", img: "78" }
                            ].map((user, idx) => (
                                <li key={idx} className="flex items-center">
                                    <div className="h-10 w-10 mr-3 bg-blackBG rounded-full overflow-hidden">
                                        <img 
                                            src={`https://randomuser.me/api/portraits/${idx % 2 ? 'men' : 'women'}/${user.img}.jpg`}
                                            alt={`${user.name} profile picture`}
                                        />
                                    </div>
                                    <span className="text-gray-600">{user.name}</span>
                                    <span className="ml-auto font-semibold">⭐ {user.rating}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col row-span-3 bg-white shadow rounded-lg">
                    <div className="px-6 py-5 font-semibold border-b border-gray-100">Plant Categories</div>
                    <div className="p-4 flex-grow">
                        <div className="flex items-center justify-center h-full px-4 py-24 text-gray-400 text-3xl font-semibold bg-blackBG border-2 border-gray-200 border-dashed rounded-md">
                            Chart
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Dashboard;
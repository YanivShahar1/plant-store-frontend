import React, { useEffect, useState } from 'react';

const EducationalNoticeModal = () => {
    const [showModal, setShowModal] = useState(false);
    
    const SHOW_INTERVAL = 24 * 60 * 60 * 1000; // 1 day in milliseconds
    const STORAGE_KEY = 'lastNoticeShown';

    useEffect(() => {
        const checkAndShowModal = () => {
            const lastShown = localStorage.getItem(STORAGE_KEY);
            const now = Date.now();
            
            if (!lastShown || (now - Number(lastShown)) >= SHOW_INTERVAL) {
                setShowModal(true);
                localStorage.setItem(STORAGE_KEY, now.toString());
            }
        };

        // Check on initial load
        checkAndShowModal();

        // Set up periodic check
        const intervalId = setInterval(checkAndShowModal, SHOW_INTERVAL);

        // Cleanup on unmount
        return () => clearInterval(intervalId);
    }, []);

    const handleAccept = () => {
        setShowModal(false);
    };

    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full shadow-xl" role="dialog" aria-modal="true">
                <div className="p-6">
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                        <h2 className="text-lg font-semibold text-blue-800 mb-2">
                            🌱 Educational Project Notice
                        </h2>
                        <div className="text-sm text-blue-700 space-y-2">
                            <p>
                                Welcome! This is a mock e-commerce project created for educational purposes and to demonstrate full-stack development capabilities.
                            </p>
                            <p>
                                Key points to note:
                            </p>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>This is not a real store</li>
                                <li>Products and prices are fictional</li>
                                <li>Full-stack application built with MERN stack:</li>
                                <li className="ml-6">Backend: Node.js, Express.js, MongoDB</li>
                                <li className="ml-6">Frontend: React, Redux, TailwindCSS</li>
                                <li>No real transactions are processed</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div className="mt-6">
                        <button
                            onClick={handleAccept}
                            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            I Understand
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EducationalNoticeModal;
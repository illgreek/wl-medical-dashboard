'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import RegistrationForm from './RegistrationForm';
import LeftSidebar from "@/app/ui/static/LeftSidebar";
import { useCookies } from 'react-cookie';
import UserInfoPanel from "@/app/ui/static/UserInfoPanel";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const defaultAvatar = '/assets/user.png'; // Default avatar image path

const RegistrationChecker = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [cookies, setCookie] = useCookies(['user']);
    const [isChecking, setIsChecking] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // State to track the sidebar's open/closed status

    // Load user data from cookies only once on component mount
    useEffect(() => {
        const userData = cookies['user'];
        // Check if user data exists in cookies and not in Redux state before dispatching action
        if (userData && !Object.values(user).some(value => value)) {
            dispatch({ type: 'REGISTER_USER', payload: userData });
        }
        setIsChecking(false);
    }, []); // Empty dependency array to ensure this effect runs only once on mount

    // Save user data to cookies whenever it changes
    useEffect(() => {
        setCookie('user', JSON.stringify(user), { path: '/' });
    }, [user, setCookie]);

    if (isChecking) {
        return (
            <div className="flex justify-center items-center h-screen">
                {/* Render a loader here */}
                <div className="spinner-border text-primary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        );
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className="registration-checker">
            {/* Check if any user data exists */}
            {Object.values(user).some(value => value) ? (
                <>
                    <div className={` overflow-y-auto`}>
                        {/* Render the LeftSidebar component if it's open */}
                        {isSidebarOpen && <LeftSidebar key="sidebar" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}

                        {/* Main Content */}
                        <div className={`${isSidebarOpen ? 'pl-64' : ''}`}>
                            {/* Render the children components */}
                            <UserInfoPanel/>
                            {React.cloneElement(children as React.ReactElement, { key: isSidebarOpen ? 'appointment-card-open' : 'appointment-card-closed' })}
                        </div>
                    </div>
                    {/* Render the sidebar toggle button if the sidebar is closed */}
                    {!isSidebarOpen && (
                        <button className='bg-blue text-white rounded-full p-2 fixed bottom-4 left-4 z-10' onClick={toggleSidebar}>
                            <FiChevronRight size={24} />
                        </button>
                    )}
                </>
            ) : (
                // If no user data exists, render the registration form with default avatar
                <RegistrationForm  />
            )}
        </div>
    );
};

export default RegistrationChecker;

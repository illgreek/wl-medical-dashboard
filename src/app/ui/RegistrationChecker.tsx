// RegistrationChecker.tsx
'use client';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import RegistrationForm from './RegistrationForm';
import LeftSidebar from "@/app/ui/static/LeftSidebar";
import { useCookies } from 'react-cookie';
import UserInfoPanel from "@/app/ui/static/UserInfoPanel";
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const RegistrationChecker = ({ children }: { children: React.ReactNode }) => {
    const dispatch = useDispatch();
    const user = useSelector((state: RootState) => state.user);
    const [cookies, setCookie] = useCookies(['user']);
    const [isChecking, setIsChecking] = useState(true);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Состояние для отслеживания открытия/закрытия боковой панели

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
        return null; // Render nothing while checking for user data
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
                        {/* Key добавлен для перерендеринга компонента LeftSidebar */}
                        {isSidebarOpen && <LeftSidebar key="sidebar" isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />}

                        {/* Main Content */}
                        <div className={`${isSidebarOpen ? 'pl-64' : ''}`}>
                            {/* Render the children components */}
                            <UserInfoPanel/>
                            {React.cloneElement(children as React.ReactElement, { key: isSidebarOpen ? 'appointment-card-open' : 'appointment-card-closed' })}
                        </div>
                    </div>
                    {!isSidebarOpen && (
                        <button className='bg-blue text-white rounded-full p-2 fixed bottom-4 left-4' onClick={toggleSidebar}>
                            <FiChevronRight size={24} />
                        </button>
                    )}
                </>
            ) : (
                // If no user data exists, render the registration form
                <RegistrationForm />
            )}
        </div>
    );
};

export default RegistrationChecker;








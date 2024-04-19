// RegistrationChecker.tsx
'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers/rootReducer';
import RegistrationForm from './RegistrationForm';

const RegistrationChecker = ({ children }: { children: React.ReactNode }) => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <>
            {user.name ? (
                <>
                    {children}
                </>
            ) : (
                <RegistrationForm />
            )}
        </>
    );
};

export default RegistrationChecker;

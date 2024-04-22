// Home.tsx
'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from './reducers/rootReducer';
import Image from 'next/image';
import UserInformation from "@/app/ui/dashboard/UserInformation";
import Chart from "@/app/ui/dashboard/Chart";
import UserCalendar from "@/app/ui/dashboard/UserCalendar";

const Home = () => {
    const user = useSelector((state: RootState) => state.user);

    return (
        <main className="flex min-h-screen flex-col items-center px-6 pb-6">
            <UserInformation />
            <div className="flex w-full flex-row gap-8 justify-between px-2">
                <Chart />
                <UserCalendar />
            </div>
        </main>
    );
};

export default Home;

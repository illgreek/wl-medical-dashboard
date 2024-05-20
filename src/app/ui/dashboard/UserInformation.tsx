import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import rootReducer  from '../../reducers/rootReducer';
import Swal from 'sweetalert2';
import Link from "next/link";

const UserInformation = () => {
    type RootState = ReturnType<typeof rootReducer>;
    const user = useSelector((state: RootState) => state.user);

    return (
        <div className="flex w-full p-4 items-center gap-9">

            <div className="mr-4">
                <Image src="/assets/hero.png" alt="User Image" width={221} height={554}  />
            </div>

            <div className="flex flex-col">
                <p className="text-6xl font-semibold text-pink mb-2">Hi, {user.name}!</p>
                <p className="text-lg text-light_blue mb-6">
                    Welcome back! Check all new information to be up to date.
                </p>
                <Link href={'/my-doctors'}
                        className="p-4 bg-blue text-lg text-center text-white font-semibold rounded-full hover:bg-light_blue focus:outline-none w-1/2">
                    Find a Doctor
                </Link>
            </div>
        </div>
    );
};

export default UserInformation;

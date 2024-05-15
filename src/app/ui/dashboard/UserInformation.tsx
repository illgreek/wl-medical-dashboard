import React from 'react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import rootReducer  from '../../reducers/rootReducer';
import Swal from 'sweetalert2';

const UserInformation = () => {
    type RootState = ReturnType<typeof rootReducer>;
    const user = useSelector((state: RootState) => state.user);

    const handleFindDoctor = () => {
        // Открываем попап с сообщением о недоступности врачей
        Swal.fire({
            icon: 'error',
            title: 'No Doctors available',
            text: 'Try again later',
        });
    };

    return (
        <div className="flex w-full p-4 items-center gap-9">
            {/* Изображение пользователя */}
            <div className="mr-4">
                <Image src="/assets/hero.png" alt="User Image" width={221} height={554}  />
            </div>
            {/* Информация о пользователе */}
            <div className="flex flex-col">
                <p className="text-6xl font-semibold text-pink mb-2">Hi, {user.name}!</p>
                <p className="text-lg text-light_blue mb-6">
                    Welcome back! Check all new information to be up to date.
                </p>
                <button onClick={handleFindDoctor}
                        className="p-4 bg-blue text-lg text-white font-semibold rounded-full hover:bg-light_blue focus:outline-none w-1/2">
                    Find a Doctor
                </button>
            </div>
        </div>
    );
};

export default UserInformation;

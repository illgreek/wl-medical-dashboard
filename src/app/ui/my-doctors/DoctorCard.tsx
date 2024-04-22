'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { useCookies } from 'react-cookie';
import Swal from 'sweetalert2';

interface Doctor {
    name: string;
    specialty: string;
    experience: number;
    city: string;
    state: string;
    imageUrl: string;
}

const DoctorCard = ({ doctor }: { doctor: Doctor }) => {
    const { name, specialty, experience, city, state, imageUrl } = doctor;
    const [cookies, setCookie] = useCookies(['user']); // Используем куки

    const handleBookConsultation = (selectedDate: string, selectedTime: string) => {
        if (!selectedDate || !selectedTime) {
            // Показываем сообщение об ошибке, если данные не заполнены
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please select both date and time for the consultation!',
            });
            return;
        }

        // Проверяем, есть ли уже запись о данном враче в массиве врачей в куки
        const doctorsArray = cookies.user?.doctors || [];
        const doctorExists = doctorsArray.some((doc: any) => doc.name === name);

        if (doctorExists) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: `You have already booked a consultation with ${name}`,
            });
            return;
        }

        // Формируем объект с информацией о выбранном враче и дате/времени консультации
        const selectedDoctor = {
            name: name,
            specialty: specialty,
            bookedDate: selectedDate,
            bookedTime: selectedTime
        };

        // Добавляем информацию о выбранном враче в массив
        const updatedDoctorsArray = [...doctorsArray, selectedDoctor];

        // Обновляем куки пользователя с обновленным массивом врачей
        const updatedUser = { ...cookies.user, doctors: updatedDoctorsArray };
        setCookie('user', JSON.stringify(updatedUser), { path: '/' });

        // Показываем уведомление об успешном создании
        Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: `Consultation booked for ${selectedDate} at ${selectedTime}.`,
        });
    };

    const openBookingPopup = () => {
        Swal.fire({
            title: 'Book Consultation',
            html: `
                <input type="date" id="swal-date" class="swal2-input">
                <input type="time" id="swal-time" class="swal2-input">
            `,
            showCancelButton: true,
            confirmButtonText: 'Book',
            cancelButtonText: 'Cancel',
            focusConfirm: false,
            preConfirm: () => {
                const dateInput = document.getElementById('swal-date') as HTMLInputElement;
                const timeInput = document.getElementById('swal-time') as HTMLInputElement;
                const selectedDate = dateInput.value;
                const selectedTime = timeInput.value;
                handleBookConsultation(selectedDate, selectedTime);
            }
        });
    };

    return (
        <div className="w-full bg-white rounded-lg overflow-hidden flex flex-col items-center p-4">
            <Image className="object-cover object-center" src={imageUrl} alt={name} height={80} width={80} />
            <div className="text-center flex flex-col gap-2 mt-4">
                <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
                <p className="text-blue font-semibold bg-background p-1 rounded-full">{specialty}</p>
                <p className="text-gray text-sm">Experience: {experience} years</p>
                <p className="text-gray text-sm">{city}, {state}</p>
                <button
                    className="bg-blue hover:bg-light_blue text-white font-bold py-2 px-4 rounded-full"
                    onClick={openBookingPopup}
                >
                    Book Consultation
                </button>
            </div>
        </div>
    );
};

export default DoctorCard;

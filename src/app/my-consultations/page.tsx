'use client'
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css'; // Импорт стилей календаря
import { useCookies } from 'react-cookie';

const localizer = momentLocalizer(moment);

const UserCalendar = () => {
    // Получаем данные пользователя из куки
    const [cookies] = useCookies(['user']);
    const user = cookies.user;

    // Массив стандартных встреч врачей
    const defaultDoctors = [
        {
            name: "Dr. Sarah Johnson",
            specialty: "Dermatologist",
            bookedDate: "2024-04-24",
            bookedTime: "22:13"
        },
        {
            name: "Dr. Michael Brown",
            specialty: "Pediatrician",
            bookedDate: "2024-04-30",
            bookedTime: "22:14"
        }
    ];

    // Используем стандартные данные, если данные в куки отсутствуют или поле doctors не определено
    const doctors = user && user.doctors ? user.doctors : defaultDoctors;

    // Преобразуем данные в формат событий календаря
    const events = doctors.map(doctor => ({
        title: `${doctor.name} (${doctor.specialty})`,
        start: new Date(doctor.bookedDate + 'T' + doctor.bookedTime),
        end: new Date(doctor.bookedDate + 'T' + doctor.bookedTime),
    }));

    // Настройки цветов
    const colors = {
        background: "#E5EEFF",
        pink: "#FF7BAC",
        light_blue: "#8BACED",
        blue: "#1A65F5",
        black: "#2C2C2C",
        white: "#FFFFFF",
        gray: "#A7A7A7",
    };

    return (
        <div className="user-calendar-container" style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day', 'agenda']} // Добавляем доступные виды календаря
                style={{ height: '100%', backgroundColor: colors.background }} // Применяем стиль для высоты и цвет фона календаря
                eventPropGetter={event => ({
                    style: {
                        backgroundColor: colors.pink, // Цвет фона для событий
                        color: colors.black, // Цвет текста для событий
                    },
                })}
            />
        </div>
    );
};

export default UserCalendar;

'use client'
import React, { useState } from 'react';
// @ts-ignore
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { useCookies } from 'react-cookie';

interface Doctor {
    name: string;
    specialty: string;
    bookedDate: string;
    bookedTime: string;
}

interface Event {
    title: string;
    start: Date;
    end: Date;
}

const localizer = momentLocalizer(moment);

const UserCalendar = () => {
    const [cookies] = useCookies(['user']);
    console.log(cookies);
    const user = cookies.user;

    const defaultDoctors: Doctor[] = [
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

    const doctors: Doctor[] = user && user.doctors ? user.doctors : defaultDoctors;

    const events: Event[] = doctors.map((doctor: Doctor) => ({
        title: `${doctor.name} (${doctor.specialty})`,
        start: new Date(doctor.bookedDate + 'T' + doctor.bookedTime),
        end: new Date(doctor.bookedDate + 'T' + doctor.bookedTime),
    }));

    const colors = {
        background: "#E5EEFF",
        pink: "#FF7BAC",
        light_blue: "#8BACED",
        blue: "#1A65F5",
        black: "#2C2C2C",
        white: "#FFFFFF",
        gray: "#A7A7A7",
    };

    // State to manage the current date and view of the calendar
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentView, setCurrentView] = useState<string>('month');

    return (
        <div className="user-calendar-container px-8 pt-4 pb-6" style={{ height: 500 }}>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                views={['month', 'week', 'day', 'agenda']}
                style={{ height: '100%', backgroundColor: colors.white }}
                eventPropGetter={(event: Event) => ({
                    style: {
                        backgroundColor: colors.pink,
                        color: colors.white,
                    },
                })}
                // Handle navigation events
                onNavigate={(newDate: Date) => setCurrentDate(newDate)}
                // Handle view change events
                onView={(newView: string) => setCurrentView(newView)}
                // Set the current date and view
                date={currentDate}
                view={currentView}
            />
        </div>
    );
};

export default UserCalendar;



import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { FiCalendar, FiClock, FiUser } from 'react-icons/fi'; // Импорт иконок из библиотеки react-icons

const AppointmentCard = () => {
    // State for controlling the video popup
    const [showVideoPopup, setShowVideoPopup] = useState(false);

    // State for controlling the selected date in the calendar
    const [selectedDate, setSelectedDate] = useState(new Date());

    // Function to handle date selection in the calendar
    const handleDateChange = (value: any, event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (value instanceof Date) {
            setSelectedDate(value);
        }
        // Handle other cases if needed
    };

    // Function to toggle the video popup
    const toggleVideoPopup = () => {
        setShowVideoPopup(!showVideoPopup);
    };

    // Function to close the video popup when clicking outside of it
    const closeVideoPopup = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (event.target === event.currentTarget) {
            setShowVideoPopup(false);
        }
    };

    // Function to customize the appearance of calendar tiles (dates)
    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month' && date.getDay() === 0) {
            // Add custom content for Sundays
            return <div style={{ color: '#2C2C2C' }}>{date.getDate()}</div>;
        }
        // Return null for all other dates
        return null;
    };

    return (
        <div>
            {/* Calendar component with current date */}
            <Calendar
                value={selectedDate}
                onChange={handleDateChange}
                locale="en"
                tileContent={tileContent}
            />

            {/* Card displaying appointment information */}
            <div className="flex flex-col bg-white rounded-lg p-4 mt-4">
                <h2 className="font-bold text-lg mb-4">Cardiologist</h2>
                <div className="flex flex-col gap-2">
                    <span className="flex flex-row gap-2 items-center text-black justify-between"><span
                        className="flex flex-row gap-2 items-center text-black"><FiCalendar/> Date:</span> <p
                        className="font-semibold">18.02.2021</p></span>
                    <span className="flex flex-row gap-2 items-center text-black justify-between"><span
                        className="flex flex-row gap-2 items-center text-black"><FiClock/> Time:</span> <p
                        className="font-semibold">04:00 PM</p></span>
                    <span className="flex flex-row gap-2 items-center text-black justify-between"><span
                        className="flex flex-row gap-2 items-center text-black"><FiUser/> Doctor:</span> <p
                        className="font-semibold">Brooklyn Simmons</p></span>
                    <button className="bg-blue text-white rounded-lg p-2 mt-4 hover:bg-light_blue"
                            onClick={toggleVideoPopup}>Open Video Consultation
                    </button>
                </div>
            </div>

            {/* Video popup */}
            {showVideoPopup && (
                <div className="video-popup-overlay" onClick={closeVideoPopup}>
                    <div className="video-popup">
                        {/* You can replace the video URL with your desired YouTube video */}
                        <iframe
                            width="100%"
                            height="100%"
                            src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=ieIMJcfjvjkj_Etb"
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        ></iframe>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AppointmentCard;

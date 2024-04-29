import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Clock from 'react-live-clock';
import Image from "next/image";

const UserInfoSidebar = () => {
    const [currentTime, setCurrentTime] = useState(new Date().toLocaleString());
    const [temperature, setTemperature] = useState('');
    const [weatherIcon, setWeatherIcon] = useState('');
    const [userLocation, setUserLocation] = useState('');
    const [cookies] = useCookies(['user']);
    const [showExitButton, setShowExitButton] = useState(false);
    const [userInfo, setUserInfo] = useState<{ name: string, avatar: string } | null>(null);

    const fetchTime = async () => {
        try {
            const response = await axios.get('https://worldtimeapi.org/api/ip');
            const { datetime } = response.data;
            setCurrentTime(new Date(datetime).toLocaleString());
        } catch (error) {
            console.error('Error fetching current time:', error);
        }
    };

    const fetchWeather = async () => {
        try {
            const response = await axios.get('http://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: userLocation,
                    appid: '170f594e14baa4dd2d04aa316901836a',
                    units: 'metric',
                }
            });
            const { temp } = response.data.main;
            const { icon } = response.data.weather[0];
            setTemperature(temp);
            setWeatherIcon(icon);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    };

    const fetchUserLocation = async () => {
        try {
            const response = await axios.get('https://ipinfo.io/json');
            const { city } = response.data;
            setUserLocation(city);
        } catch (error) {
            console.error('Error fetching user location:', error);
        }
    };

    useEffect(() => {
        fetchTime();
        fetchUserLocation();
    }, []);

    useEffect(() => {
        if (userLocation) {
            fetchWeather();
        }
    }, [userLocation]);

    useEffect(() => {
        if (cookies.user) {
            setUserInfo(cookies.user);
        }
    }, [cookies.user]);

    const handleExit = () => {
        document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.reload();
    };

    const handleNameClick = () => {
        setShowExitButton(!showExitButton);
    };

    return (
        <div className="w-full flex flex-row items-center p-8 justify-between">
            <div className="flex flex-row gap-4">
                <div className="flex flex-row items-center gap-4 bg-blue text-white rounded p-2">
                    <p className="text-white font-bold">{userLocation}</p>
                    <div className="flex flex-row items-center">
                        <p className="text-white">{temperature}&deg;C</p>
                        {weatherIcon && (
                            <img
                                src={`http://openweathermap.org/img/wn/${weatherIcon}.png`}
                                alt="Weather Icon"
                                className='w-6 h-6'
                            />
                        )}
                    </div>
                </div>

                <div className="flex flex-row items-center gap-4 bg-pink p-2 rounded">
                    <p className="text-white font-bold">Time:</p>
                    <Clock format={'HH:mm'} ticking={true} className="text-white"/>
                </div>
            </div>

            <div className="flex flex-row items-center gap-2">
                {/* Render user photo */}
                {userInfo && userInfo.avatar ? (
                    <Image
                        src={userInfo.avatar}
                        alt="User Photo"
                        className="rounded-full h-8 w-8"
                        height={24}
                        width={24}
                    />
                ) : (
                    <Image
                        src="/assets/user.png"
                        alt="User Photo"
                        className="rounded-full h-8 w-8"
                        height={24}
                        width={24}
                    />
                )}

                {/* Render user name */}
                {userInfo && (
                    <div className="relative text-center cursor-pointer" onClick={handleNameClick}>
                        <p className="select-none font-medium">
                            {userInfo.name} {showExitButton ? <>&#9652;</> : <>&#9662;</>}
                        </p>
                        {/* Conditionally render "Exit" button */}
                        {showExitButton && (
                            <button onClick={handleExit} className="text-white bg-red-500 hover:bg-red-700 px-2 py-1 rounded-md absolute bottom-[-40px] left-1/2 transform -translate-x-1/2">
                                Exit
                            </button>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserInfoSidebar;


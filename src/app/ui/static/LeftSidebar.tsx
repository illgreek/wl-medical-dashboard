import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'; // Импорт иконок из библиотеки react-icons/fi

interface LeftSidebarProps {
    isSidebarOpen: boolean;
    toggleSidebar: () => void;
}

const LeftSidebar = ({ isSidebarOpen, toggleSidebar }: LeftSidebarProps) => {
    // State to track hover status for each link
    const [hoveredLink, setHoveredLink] = useState<string | null>(null);

    // Function to handle mouse enter event
    const handleMouseEnter = (link: string) => {
        setHoveredLink(link);
    };

    // Function to handle mouse leave event
    const handleMouseLeave = () => {
        setHoveredLink(null);
    };

    return (
        <>
            {/* Боковая панель */}
            <nav className={`bg-white w-64 flex flex-col items-center pt-8 fixed left-0 h-screen overflow-y-auto ${isSidebarOpen ? '' : 'hidden'}`}>
                {/* Logo */}
                <Image className="mb-14" src={'/assets/logo-nda.svg'} alt={''} width={52} height={70} />
                {/* Menu Items */}
                <ul className="text-light_blue flex flex-col flex-1 gap-1">
                    <li className="p-2">
                        <Link href="/" className="flex items-center py-2 hover:text-blue"
                              onMouseEnter={() => handleMouseEnter('dashboard')}
                              onMouseLeave={() => handleMouseLeave()}>
                            {hoveredLink === 'dashboard' ? (
                                <img src="/assets/grid-hover.svg" alt="Grid Hover" className="mr-2 w-6 h-6" />
                            ) : (
                                <img src="/assets/grid.svg" alt="Grid" className="mr-2 w-6 h-6" />
                            )}
                            Dashboard
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link href="/my-doctors" className="flex items-center py-2 hover:text-blue"
                              onMouseEnter={() => handleMouseEnter('my-doctors')}
                              onMouseLeave={() => handleMouseLeave()}>
                            {hoveredLink === 'my-doctors' ? (
                                <img src="/assets/stethoscope-hover.svg" alt="Stethoscope Hover" className="mr-2 w-6 h-6" />
                            ) : (
                                <img src="/assets/stethoscope.svg" alt="Stethoscope" className="mr-2 w-6 h-6" />
                            )}
                            My Doctors
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link href="/test-results" className="flex items-center py-2 hover:text-blue"
                              onMouseEnter={() => handleMouseEnter('test-results')}
                              onMouseLeave={() => handleMouseLeave()}>
                            {hoveredLink === 'test-results' ? (
                                <img src="/assets/clipboard-hover.svg" alt="Clipboard Hover" className="mr-2 w-6 h-6" />
                            ) : (
                                <img src="/assets/clipboard.svg" alt="Clipboard" className="mr-2 w-6 h-6" />
                            )}
                            Test Results
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link href="/my-consultations" className="flex items-center py-2 hover:text-blue"
                              onMouseEnter={() => handleMouseEnter('my-consultations')}
                              onMouseLeave={() => handleMouseLeave()}>
                            {hoveredLink === 'my-consultations' ? (
                                <img src="/assets/conversation-hover.svg" alt="Conversation Hover" className="mr-2 w-6 h-6" />
                            ) : (
                                <img src="/assets/conversation.svg" alt="Conversation" className="mr-2 w-6 h-6" />
                            )}
                            My Consultations
                        </Link>
                    </li>
                    <li className="p-2">
                        <Link href="/settings" className="flex items-center py-2 hover:text-blue"
                              onMouseEnter={() => handleMouseEnter('settings')}
                              onMouseLeave={() => handleMouseLeave()}>
                            {hoveredLink === 'settings' ? (
                                <img src="/assets/settings-hover.svg" alt="Settings Hover" className="mr-2 w-6 h-6" />
                            ) : (
                                <img src="/assets/settings.svg" alt="Settings" className="mr-2 w-6 h-6" />
                            )}
                            Settings
                        </Link>
                    </li>
                </ul>
                {/* Кнопка для сокрытия боковой панели */}
                <div className="mt-auto mb-4">
                    <button className='bg-blue text-white rounded-full p-2 fixed bottom-4 left-4' onClick={toggleSidebar}>
                        {isSidebarOpen ? (
                            <FiChevronLeft size={24} /> // Используем иконку для скрытия
                        ) : (
                            <FiChevronRight size={24} /> // Используем иконку для открытия
                        )}
                    </button>
                </div>
            </nav>
        </>
    );
};

export default LeftSidebar;

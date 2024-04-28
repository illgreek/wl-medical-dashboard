'use client'
// UserProfileForm.js
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';

const UserProfileForm = () => {
    const [cookies, setCookie] = useCookies(['user']);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        sex: '',
        height: '',
        weight: '',
        chronicDiseases: '',
        doctors: [],
        avatar: cookies.user && cookies.user.avatar ? cookies.user.avatar : '/assets/user.png'
    });

    // Populate form data from cookies when component mounts
    useEffect(() => {
        if (cookies.user) {
            setFormData((prevFormData) => ({
                ...prevFormData,
                ...cookies.user,
                avatar: cookies.user.avatar ? cookies.user.avatar : prevFormData.avatar
            }));
        }
    }, [cookies.user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            const avatarData = reader.result;
            setFormData({
                ...formData,
                avatar: avatarData // Update avatar with base64 encoded image
            });
            setCookie('user', { ...formData, avatar: avatarData }, { path: '/' }); // Save updated avatar data in the cookie
        };
        reader.readAsDataURL(file);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setCookie('user', formData, { path: '/' });
        alert('Form submitted successfully!');
    };

    return (
        <div className="flex">
            {/* Avatar */}
            <div className="w-1/7 flex flex-col items-center">
                <img src={formData.avatar} alt="User Avatar" className="h-32 w-32 rounded-full mx-auto mb-4" />
                <label htmlFor="avatar-upload" className="block w-full px-4 py-2 text-white bg-blue rounded-md hover:bg-light_blue focus:outline-none focus:bg-blue-600">Change Photo</label>
                <input type="file" id="avatar-upload" accept="image/*" onChange={handleAvatarChange} className="hidden" />
            </div>
            {/* User Details */}
            <div className="w-full">
                <form onSubmit={handleSubmit} className="mx-auto mt-8 p-6 bg-white rounded-lg shadow-xl">
                    <div className="flex flex-row">
                        <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black" />
                        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black" />
                    </div>
                    <div className="flex flex-row">
                        <input type="date" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black" />
                        <select name="sex" value={formData.sex} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black">
                            <option value="">Select Sex</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <div className="flex flex-row">
                        <input type="number" name="height" placeholder="Height" value={formData.height} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black" />
                        <input type="number" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black" />
                    </div>
                    {/* Add input field for Chronic Diseases */}
                    <input type="textarea" name="chronicDiseases" placeholder="Chronic Diseases" value={formData.chronicDiseases} onChange={handleChange} className="block w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 text-black" />
                    {/* Add button for saving */}
                    <button type="submit" className="block w-full px-4 py-2 text-white bg-blue rounded-md hover:bg-light_blue focus:outline-none focus:bg-blue-600">Save</button>
                </form>
            </div>
        </div>
    );
};

export default UserProfileForm;








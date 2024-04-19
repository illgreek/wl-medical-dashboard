// RegistrationForm.tsx
'use client';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

const RegistrationForm = () => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        dob: '',
        sex: '',
        height: '',
        weight: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Dispatch action to store user data
        dispatch({ type: 'REGISTER_USER', payload: formData });
        // Clear form data
        setFormData({
            name: '',
            email: '',
            dob: '',
            sex: '',
            height: '',
            weight: '',
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} />
            <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
            <input type="text" name="dob" placeholder="Date of Birth" value={formData.dob} onChange={handleChange} />
            <input type="text" name="sex" placeholder="Sex" value={formData.sex} onChange={handleChange} />
            <input type="text" name="height" placeholder="Height" value={formData.height} onChange={handleChange} />
            <input type="text" name="weight" placeholder="Weight" value={formData.weight} onChange={handleChange} />
            <button type="submit">Register</button>
        </form>
    );
};

export default RegistrationForm;

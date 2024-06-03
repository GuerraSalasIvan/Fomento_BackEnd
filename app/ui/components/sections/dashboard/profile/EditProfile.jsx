'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '@/hooks/auth';
import Image from 'next/image';

export default function EditProfile() {
    const { user, mutate } = useAuth({ middleware: 'guest' });
    const [formData, setFormData] = useState({
        name: '',
        full_name: '',
        email: '',
        birthdate: '',
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name,
                full_name: user.player.full_name,
                email: user.email,
                birthdate: user.player.birthdate,
                image: null,
            });
            setImagePreview(user.player.imageURL);
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFormData({ ...formData, image: file });
        setImagePreview(URL.createObjectURL(file));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        form.append('name', formData.name);
        form.append('full_name', formData.full_name);
        form.append('email', formData.email);
        form.append('birthdate', formData.birthdate);
        if (formData.image) {
            form.append('image', formData.image);
        }

        try {
            const response = await axios.post('/api/updateUser', form, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
            mutate(); // Refresca los datos del usuario
        } catch (error) {
            setMessage('Error updating profile');
        }
    };

    return (
        <div>
            <h2>Edit Profile</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Full Name:</label>
                    <input
                        type="text"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Birthdate:</label>
                    <input
                        type="date"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleInputChange}
                    />
                </div>
                <div>
                    <label>Profile Image:</label>
                    <input type="file" onChange={handleImageChange} />
                </div>
                {imagePreview && (
                    <div>
                        <Image src={imagePreview} alt="Profile Image" width={100} height={100} />
                    </div>
                )}
                <button type="submit">Update Profile</button>
            </form>
        </div>
    );
}

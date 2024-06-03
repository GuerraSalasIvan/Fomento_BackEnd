'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/auth';
import Input from '@/components/Input';
import Label from '@/components/Label';
import Button from '@/components/Button';
import InputError from '@/components/InputError';

const UpdateProfile = () => {
    const router = useRouter();
    const { user, updateProfile } = useAuth({
        middleware: 'auth',
        redirectIfNotAuthenticated: '/login',
    });

    const [formData, setFormData] = useState({
        name: '',
        full_name: '',
        email: '',
        birthdate: '',
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        if (user && user.player) {
            setFormData({
                name: user.name || '',
                full_name: user.player.full_name || '',
                email: user.email || '',
                birthdate: user.player.birthdate || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await updateProfile({
                name: formData.name,
                full_name: formData.full_name,
                email: formData.email,
                birthdate: formData.birthdate,
                setErrors,
                setMessage,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div>
            <h2>Update Profile</h2>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <Label htmlFor="name">Username</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <InputError messages={errors.name} />
                </div>
                <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                        type="text"
                        id="full_name"
                        name="full_name"
                        value={formData.full_name}
                        onChange={handleChange}
                    />
                    <InputError messages={errors.full_name} />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <InputError messages={errors.email} />
                </div>
                <div>
                    <Label htmlFor="birthdate">Birthdate</Label>
                    <Input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                    />
                    <InputError messages={errors.birthdate} />
                </div>
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                </Button>
            </form>
        </div>
    );
};

export default UpdateProfile;

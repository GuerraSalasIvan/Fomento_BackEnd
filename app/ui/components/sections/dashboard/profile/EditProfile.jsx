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
        image: null,
    });
    const [imagePreview, setImagePreview] = useState(null);
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
                image: null,
            });
            setImagePreview(user.player.imageURL); // Set initial image preview
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            const file = files[0];
            setFormData({ ...formData, image: file });
            setImagePreview(URL.createObjectURL(file)); // Update image preview
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await updateProfile({
                ...formData,
                setErrors,
                setMessage,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='p-3'>
            {message && <p className="text-green-500 mb-4">{message}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-x-4">
                    <div className="flex flex-col items-center space-y-4">
                        {imagePreview && (
                            <div className="mb-4">
                                <img
                                    src={imagePreview}
                                    alt="Profile Preview"
                                    className="h-64 w-64 object-cover rounded-full"
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex-grow space-y-4">
                        <div>
                            <Label htmlFor="name">Nombre de usuario</Label>
                            <Input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                            />
                            <InputError messages={errors.name} />
                        </div>
                        <div>
                            <Label htmlFor="full_name">Nombre completo</Label>
                            <Input
                                type="text"
                                id="full_name"
                                name="full_name"
                                value={formData.full_name}
                                onChange={handleChange}
                                className="mt-1 block w-full"
                            />
                            <InputError messages={errors.full_name} />
                        </div>
                        <div>
                            <Label htmlFor="image">Foto de perfil</Label>
                            <Input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                onChange={handleChange}
                                className="mt-1 block w-full"
                            />
                            <InputError messages={errors.image} />
                        </div>
                    </div>
                </div>
                <div>
                    <Label htmlFor="email">Correo</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full"
                    />
                    <InputError messages={errors.email} />
                </div>
                <div>
                    <Label htmlFor="birthdate">Fecha de nacimiento</Label>
                    <Input
                        type="date"
                        id="birthdate"
                        name="birthdate"
                        value={formData.birthdate}
                        onChange={handleChange}
                        className="mt-1 block w-full"
                    />
                    <InputError messages={errors.birthdate} />
                </div>
                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                    {isSubmitting ? 'Actualizando...' : 'Actualizar'}
                </Button>
            </form>
        </div>
    );
};

export default UpdateProfile;

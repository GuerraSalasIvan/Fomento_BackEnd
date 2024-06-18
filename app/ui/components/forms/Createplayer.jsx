'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import axios from '@/lib/axios';

const CreatePlayer = () => {
    const router = useRouter();
    const [fullName, setFullName] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [position, setPosition] = useState('');
    const [errors, setErrors] = useState([]);
    const [csrfToken, setCsrfToken] = useState('');

    useEffect(() => {
        const fetchCsrfToken = async () => {
            try {
                await axios.get('/sanctum/csrf-cookie', {
                    withCredentials: true,
                });

                const response = await axios.get('/api/csrf-token', {
                    withCredentials: true,
                });

                setCsrfToken(response.data.csrfToken);
            } catch (error) {
                console.error('Failed to fetch CSRF token:', error);
            }
        };

        fetchCsrfToken();
    }, []);

    const submitForm = async (event) => {
        event.preventDefault();
        console.log('Submitting form with data:', {
            full_name: fullName,
            birthdate,
            position,
        });

        try {
            const response = await axios.post('/api/player', {
                full_name: fullName,
                birthdate,
                position,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': csrfToken,
                },
                withCredentials: true,
            });

            if (!response.data.success) {
                setErrors(response.data.errors || []);
                return;
            }

            router.push('/dashboard');
        } catch (error) {
            console.error('An unexpected error happened:', error);
            setErrors(['An unexpected error happened.']);
        }
    };

    return (


        <form onSubmit={submitForm}>
            <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                    id="fullName"
                    type="text"
                    value={fullName}
                    className="block mt-1 w-full"
                    onChange={(event) => setFullName(event.target.value)}
                    required
                />
                <InputError messages={errors.full_name} className="mt-2" />
            </div>

            {/* Birthdate */}
            <div className="mt-4">
                <Label htmlFor="birthdate">Birthdate</Label>
                <Input
                    id="birthdate"
                    type="date"
                    value={birthdate}
                    className="block mt-1 w-full"
                    onChange={(event) => setBirthdate(event.target.value)}
                    required
                />
                <InputError messages={errors.birthdate} className="mt-2" />
            </div>

            {/* Position */}
            <div className="mt-4">
                <Label htmlFor="position">Position</Label>
                <select
                    id="position"
                    value={position}
                    className="block mt-1 w-full"
                    onChange={(event) => setPosition(event.target.value)}
                    required
                >
                    <option value="">Select Position</option>
                    <option value="1">Base</option>
                    <option value="2">Escolta</option>
                    <option value="3">Alero</option>
                    <option value="4">Ala-Pivot</option>
                    <option value="5">Pivot</option>
                </select>
                <InputError messages={errors.position} className="mt-2" />
            </div>

            <div className="flex items-center justify-end mt-4">
                <Button className="ml-4">Crear Jugador</Button>
            </div>
        </form>
    )
}

export default CreatePlayer

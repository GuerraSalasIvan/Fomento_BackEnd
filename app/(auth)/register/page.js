'use client'

import Button from '@/components/Button'
import Input from '@/components/Input'
import InputError from '@/components/InputError'
import Label from '@/components/Label'
import Link from 'next/link'
import { useAuth } from '@/hooks/auth'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const Page = () => {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/user',
    })

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirmation, setPasswordConfirmation] = useState('')
    const [playerFullName, setPlayerFullName] = useState('')
    const [playerBirthdate, setPlayerBirthdate] = useState('')
    const [playerPosition, setPlayerPosition] = useState('1')
    const [errors, setErrors] = useState([])
    const [isSubmitting, setIsSubmitting] = useState(false)

    const submitForm = async event => {
        event.preventDefault()
        setIsSubmitting(true)

        try {
            await register({
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
                player_full_name: playerFullName,
                player_birthdate: playerBirthdate,
                player_position: playerPosition,
                setErrors,
            })
            // router.push('/user')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <form onSubmit={submitForm}>
            {/* Name */}
            <div>
                <Label htmlFor="name">Usuario</Label>

                <Input
                    id="name"
                    type="text"
                    value={name}
                    className="block mt-1 w-full"
                    onChange={event => setName(event.target.value)}
                    required
                    autoFocus
                />

                <InputError messages={errors.name} className="mt-2" />
            </div>

            {/* Player Full Name */}
            <div className="mt-4">
                <Label htmlFor="playerFullName">Nombre completo</Label>
                <Input
                    id="playerFullName"
                    type="text"
                    value={playerFullName}
                    className="block mt-1 w-full"
                    onChange={event => setPlayerFullName(event.target.value)}
                    required
                />
                <InputError messages={errors.player_full_name} className="mt-2" />
            </div>

            {/* Email Address */}
            <div className="mt-4">
                <Label htmlFor="email">Email</Label>

                <Input
                    id="email"
                    type="email"
                    value={email}
                    className="block mt-1 w-full"
                    onChange={event => setEmail(event.target.value)}
                    required
                />

                <InputError messages={errors.email} className="mt-2" />
            </div>

            {/* Player Birthdate */}
            <div className="mt-4">
                <Label htmlFor="playerBirthdate">Fecha de Nacimiento del Jugador</Label>
                <Input
                    id="playerBirthdate"
                    type="date"
                    value={playerBirthdate}
                    className="block mt-1 w-full"
                    onChange={event => setPlayerBirthdate(event.target.value)}
                    required
                />
                <InputError messages={errors.player_birthdate} className="mt-2" />
            </div>


            {/* Player Position */}
            <div className="mt-4">
                <Label htmlFor="playerPosition">Posición del Jugador</Label>
                <select
                    id="playerPosition"
                    value={playerPosition}
                    className="block mt-1 w-full"
                    onChange={event => setPlayerPosition(event.target.value)}
                    required
                >
                    <option value="1">Base</option>
                    <option value="2">Escolta</option>  
                    <option value="3">Alero</option>
                    <option value="4">Ala-pivot</option>
                    <option value="5">Pivot</option>
                    <option value="0">Entrenador</option>
                </select>
                <InputError messages={errors.player_position} className="mt-2" />
            </div>

            {/* Password */}
            <div className="mt-4">
                <Label htmlFor="password">Contraseña</Label>

                <Input
                    id="password"
                    type="password"
                    value={password}
                    className="block mt-1 w-full"
                    onChange={event => setPassword(event.target.value)}
                    required
                    autoComplete="new-password"
                />

                <InputError messages={errors.password} className="mt-2" />
            </div>

            {/* Confirm Password */}
            <div className="mt-4">
                <Label htmlFor="passwordConfirmation">
                    Confirm Password
                </Label>

                <Input
                    id="passwordConfirmation"
                    type="password"
                    value={passwordConfirmation}
                    className="block mt-1 w-full"
                    onChange={event =>
                        setPasswordConfirmation(event.target.value)
                    }
                    required
                />

                <InputError
                    messages={errors.password_confirmation}
                    className="mt-2"
                />
            </div>

            <div className="flex items-center justify-end mt-4">
                <Link
                    href="/login"
                    className="underline text-sm text-gray-600 hover:text-gray-900">
                    Ya tengo cuenta
                </Link>

                <Button className="ml-4" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Register'}
                </Button>
            </div>
        </form>
    )
}

export default Page

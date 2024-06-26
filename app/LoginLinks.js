'use client'

import Link from 'next/link'
import { useAuth } from '@/hooks/auth';


const LoginLinks = () => {
    const { user, logout } = useAuth({ middleware: 'guest' , redirectIfNAuthenticated: '/dashboard'})

    return (
        <div className="hidden fixed top-0 right-0 px-6 py-4 sm:block">
            {user ? (
                <>
                    <Link
                        href="/dashboard"
                        className="ml-4 text-sm text-gray-700 underline"
                    >
                        Dashboard
                    </Link>
                    <button
                        onClick={logout}
                        className="ml-4 text-sm text-gray-700 underline"
                    >
                        Logout
                    </button>
                </>
            ) : (
                <>
                    <Link
                        href="/login"
                        className="text-sm text-gray-700 underline"
                    >
                        Login
                    </Link>

                    <Link
                        href="/register"
                        className="ml-4 text-sm text-gray-700 underline"
                    >
                        Registrar
                    </Link>
                </>
            )}
        </div>
    )
}

export default LoginLinks

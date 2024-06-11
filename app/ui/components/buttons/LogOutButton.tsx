import React from 'react';
import { useAuth } from '@/hooks/auth';

export default function LogOutButton() {
    const { user, logout } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '/null' });

    return (
        <>
        <button
            onClick={logout}
            className="ml-4 text-sm text-gray-700 underline"
            >Logout
        </button>
        </>
    )
    }

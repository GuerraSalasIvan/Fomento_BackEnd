import React from 'react';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';


function AssingTeam() {

    const router = useRouter()
    const { user } = useAuth({ middleware: 'guest' });

    return (
        <div>
            {user ? (
                user.player.teams && user.player.teams.length > 0 ? (
                    router.push('/dashboard')
                ) : (
                    <p>Jugador sin equipo</p>
                )
            ) : (
                <p>No logueado</p>
            )}
        </div>
    )
}

export default AssingTeam
import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import fondo from '@/public/assests/img/fondo_login.jpeg';
import Image from 'next/image';

export default function AssingTeam() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
    const [loading, setLoading] = useState(false);
    const { user, assignTeam } = useAuth({ middleware: 'guest' });
    const router = useRouter();

    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/api/currentteams');
                setTeams(response.data.teams);
            } catch (error) {
                console.error('Error fetching teams:', error);
            }
        };
        fetchTeams();
    }, []);

    useEffect(() => {
        if (user && user.player.teams && user.player.teams.length > 0) {
            router.push('/dashboard');
        }
    }, [user, router]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedTeam) {
            setLoading(true);
            try {
                await assignTeam({
                    playerId: user.player.id,
                    teamId: selectedTeam.id
                });
                router.push('/dashboard');
            } catch (error) {
                console.error('Error assigning team:', error);
                setLoading(false);
            }
        }
    };

    console.log('aqui', teams);

    if (!user) {
        return <p className="text-red-500">No logueado</p>;
    }

    if (user.player.teams && user.player.teams.length > 0) {
        return null; // Return null to render nothing while redirecting
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gray-100">
            <Image
                src={fondo}
                alt="fondo"
                layout="fill"
                className="absolute inset-0 w-full h-full object-cover z-0 opacity-85"
            />
            <div className="relative z-10 p-14 rounded-lg w-full">
                <div className="text-2xl text-white font-semibold mb-4">
                    <span className='bg-menu-bg-100 text-menu-bg-950 px-6 py-1 rounded-2xl border'>
                        Selecciona tu equipo, <strong>{user.name}</strong>:
                    </span>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
                        {teams.map((team) => (
                            <div
                                key={team.id}
                                className={`card p-4 border rounded-lg justify-center cursor-pointer bg-menu-bg-50 transition-transform transform ${
                                    selectedTeam && selectedTeam.id === team.id
                                        ? 'border-menu-bg-700 scale-105 shadow-lg'
                                        : 'border-gray-300'
                                }`}
                                onClick={() => setSelectedTeam(team)}
                            >
                                <div className="flex justify-center mb-2">
                                    <img src={team.imageURL} alt={team.name} className="w-80 object-cover rounded-lg" />
                                </div>
                                <div className="text-center">
                                    <p className="font-bold">{team.name}</p>
                                    <p className="text-gray-500">{team.leagues.name}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-menu-bg-50 rounded-lg border disabled:opacity-50"
                        disabled={loading}
                    >
                        {loading ? 'Cargando...' : 'Asignar Equipo'}
                    </button>
                </form>
            </div>
        </div>
    );
}

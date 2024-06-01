import React, { useEffect, useState } from 'react';
import { useAuth } from '@/hooks/auth';
import { useRouter } from 'next/navigation';
import axios from 'axios';

function AssingTeam() {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState('');
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedTeam) {
            try {
                await assignTeam({
                    playerId: user.player.id,
                    teamId: parseInt(selectedTeam, 10)  // Convert to number here
                });
                router.push('/dashboard');
            } catch (error) {
                console.error('Error assigning team:', error);
            }
        }
    };

    return (
        <div>
            {user ? (
                user.player.teams && user.player.teams.length > 0 ? (
                    router.push('/dashboard')
                ) : (
                    <>
                        <p>Jugador sin equipo</p>
                        <p>{user.name}</p>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="team">Selecciona un equipo:</label>
                            <select
                                id="team"
                                value={selectedTeam}
                                onChange={(e) => setSelectedTeam(e.target.value)}
                            >
                                <option value="">Seleccione un equipo</option>
                                {teams.map((team) => (
                                    <option key={team.id} value={team.id}>
                                        {team.name}
                                    </option>
                                ))}
                            </select>
                            <button type="submit">Asignar Equipo</button>
                        </form>
                    </>
                )
            ) : (
                <p>No logueado</p>
            )}
        </div>
    );
}

export default AssingTeam;

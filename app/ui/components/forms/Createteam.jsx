'use client'

import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import { useRouter } from 'next/navigation';

export default function CreateTeam() {
    const [name, setName] = useState('');
    const [leagueId, setLeagueId] = useState('');
    const [externalTeam, setExternalTeam] = useState(false);
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const fetchLeagues = async () => {
            try {
                const response = await axios.get('/leagues');
                setLeagues(response.data);
            } catch (error) {
                setError('Error fetching leagues');
                console.error('Error fetching leagues:', error);
            }
        };

        fetchLeagues();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.post('/team', { name, league_id: leagueId, external_team: externalTeam });
            router.push('/dashboard/teams');
        } catch (error) {
            setError('Error creating team');
            console.error('Error creating team:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Nombre del Equipo
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="league_id" className="block text-sm font-medium text-gray-700">
                        Liga
                    </label>
                    <select
                        id="league_id"
                        value={leagueId}
                        onChange={(e) => setLeagueId(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        required
                    >
                        <option value="">Seleccione una liga</option>
                        {leagues.map((league) => (
                            <option key={league.id} value={league.id}>
                                {league.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label htmlFor="external_team" className="block text-sm font-medium text-gray-700">
                        Equipo Externo
                    </label>
                    <input
                        type="checkbox"
                        id="external_team"
                        checked={externalTeam}
                        onChange={(e) => setExternalTeam(e.target.checked)}
                        className="mt-1 block"
                    />
                </div>

                <div>
                    <button
                        type="submit"
                        className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-menu-bg-700 hover:text-primary-600 hover:bg-menu-bg-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        disabled={loading}
                    >
                        {loading ? 'Creando...' : 'Crear Equipo'}
                    </button>
                </div>

                {error && (
                    <div className="mt-4 text-red-500">
                        {error}
                    </div>
                )}
            </form>
        </div>
    );
}

'use client';

import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import dayjs from 'dayjs';
import Link from 'next/link';

export default function GamesList() {
    const [games, setGames] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedLeague, setSelectedLeague] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [gamesResponse, leaguesResponse] = await Promise.all([
                    axios.get('/game'),
                    axios.get('/leagues')
                ]);

                setGames(gamesResponse.data);
                setLeagues(leaguesResponse.data);
            } catch (error) {
                setError('Error fetching data');
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const handleLeagueChange = (event) => {
        setSelectedLeague(event.target.value);
    };

    const filteredGames = selectedLeague
        ? games.filter(game => game.league_id === parseInt(selectedLeague))
        : games;

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="container mx-auto p-4">

            <div className="mb-6 flex">
                <label htmlFor="league" className="block text-sm font-semibold text-menu-bg-700 w-2/12 p-2">
                    Selector de ligas
                </label>
                <select
                    id="league"
                    value={selectedLeague}
                    onChange={handleLeagueChange}
                    className="mt-1 block w-full rounded-md border border-menu-bg-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option value="">Todas las ligas</option>
                    {leagues.map((league) => (
                        <option key={league.id} value={league.id}>
                            {league.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {filteredGames.map((game) => (
                    <div key={game.id} className="bg-white shadow-md rounded p-4 mb-4 transform transition-transform hover:scale-105 hover:bg-menu-bg-100">
                        <Link  href={`/dashboard/games/arbitrate/${game.id}`}>
                            <h2 className="text-xl text-menu-bg-700">
                                <strong>{game.local_team.name}</strong> vs <strong>{game.visit_team.name}</strong>
                            </h2>
                            <p className="text-gray-700">
                                Date: {dayjs(game.match_date).format('YYYY-MM-DD HH:mm')}
                            </p>
                            <p className="text-gray-700">League: {game.leagues.name}</p>
                            <p className="text-gray-700">Location: {game.ubications.name}, {game.ubications.address}</p>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
}

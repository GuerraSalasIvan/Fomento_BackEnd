'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PlayerDetail from '@/app/ui/components/cards/players/GameDetail';
import BackButton from "@/app/ui/components/buttons/BackButton";
import axios from '@/lib/axios';

export default function GameDetails({ gameId }) {
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await axios.get(`/game/details/${gameId}`);
                setGameData(response.data || {});
            } catch (error) {
                console.error("Error fetching game data: ", error);
                setGameData({});
            } finally {
                setLoading(false);
            }
        };

        fetchGameData();
    }, [gameId]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><p>Cargando...</p></div>;
    }

    if (!gameData || !gameData.game) {
        return (
            <div className="container mx-auto p-4">
                <div className="flex justify-between mb-4">
                    <p>Este partido no tiene registro todavía</p>
                    <BackButton url={`/dashboard/games`} />
                </div>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-wrap justify-around items-center p-4 rounded-lg mb-4">
                <div>
                    <h1 className="text-3xl text-menu-bg-800">
                        <strong>{gameData.game.local_team.name}</strong> vs <strong>{gameData.game.visit_team.name}</strong>
                    </h1>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-menu-bg-800">
                        {gameData.localPoints} - {gameData.visitPoints}
                    </h2>
                </div>
            </div>

            <div className="flex flex-wrap -mx-2">
                <div className="w-full lg:w-1/2 p-2">
                    <div className="bg-white border p-4 rounded-lg shadow-md overflow-x-auto">
                        <h3 className="text-lg font-semibold mb-4 text-menu-bg-800">{gameData.game.local_team.name}</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr className="font-bold">
                                    <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº</th>
                                    <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-5">Nombre</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pts</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Reb</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ast</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rob</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tap</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">F.P</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {gameData.localTeamPlayers.map((player, index) => (
                                    <PlayerDetail key={player.id} player={player} team={gameData.game.local_team} index={index} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-2">
                    <div className="bg-white p-4 border rounded-lg shadow-md overflow-x-auto">
                        <h3 className="text-lg font-semibold mb-4 text-menu-bg-800">{gameData.game.visit_team.name}</h3>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr className="font-bold">
                                    <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº</th>
                                    <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-5">Nombre</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pts</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Reb</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ast</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rob</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tap</th>
                                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">F.P</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {gameData.visitTeamPlayers.map((player, index) => (
                                    <PlayerDetail key={player.id} player={player} team={gameData.game.visit_team} index={index} />
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="mt-6 pt-4 bg-menu-bg-100 border rounded-lg shadow-md">
                <h2 className="text-xl font-semibold mb-4 mx-6 text-menu-bg-800">Incidencias y observaciones</h2>
                <div className="bg-white p-4 border-t rounded-b-lg">
                    <p>{gameData.game.reports}</p>
                </div>
            </div>
        </div>
    );
}

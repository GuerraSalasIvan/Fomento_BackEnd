'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PlayerDetail from '@/app/ui/components/cards/players/GameDetail';

export default function GameDetails({ gameId }) {
    const [gameData, setgameData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchgameData() {
            try {
                const response = await fetch(`https://proyectointegrado-production-0e79.up.railway.app//api/game/details/${gameId}`);
                const data = await response.json();
                setgameData(data || {});
            } catch (error) {
                console.error("Error fetching game data: ", error);
                setgameData({});
            } finally {
                setLoading(false);
            }
        }
        fetchgameData();
    }, [gameId]);

    if (loading) {
        return <div className="flex justify-center items-center min-h-screen"><p>Cargando...</p></div>;
    }

    if (!gameData || !gameData.game) {
        return (
            <div className="flex justify-between items-center min-h-screen">
                <p>Este partido no tiene registro todavía</p>
                <Link className="px-4 py-1 bg-menu-bg-500 text-white rounded-lg" href={`/dashboard/games`}> Volver </Link>
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
                    <div className="bg-white border p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-menu-bg-800">{gameData.game.local_team.name}</h3>
                        <PlayerDetail isHeader={true} />
                        {gameData.localTeamPlayers.map((player, index) => (
                            <PlayerDetail key={player.id} player={player} team={gameData.game.local_team} index={index} />
                        ))}
                    </div>
                </div>

                <div className="w-full md:w-1/2 p-2">
                    <div className="bg-white border p-4 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-4 text-menu-bg-800"> {gameData.game.visit_team.name}</h3>
                        <PlayerDetail isHeader={true} />
                        {gameData.visitTeamPlayers.map((player, index) => (
                            <PlayerDetail key={player.id} player={player} team={gameData.game.visit_team} index={index} />
                        ))}
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

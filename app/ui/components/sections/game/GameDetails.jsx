'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PlayerDetail from '@/app/ui/components/cards/players/GameDetail';

export default function GameDetails({gameId}) {

    const [gameData, setgameData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchgameData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/game/details/${gameId}`);
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
        return <div>Loading...</div>;
    }

    if (!gameData || !gameData.game) {
        return  <div className='flex justify-between items-center'>
                    <p>Este partido no tiene registro todavía</p>
                    <Link className='px-4 py-1 bg-menu-bg-950 text-white rounded-lg' href={`/dashboard/games`}> Volver </Link>
                </div>
    }


    return (
        <div>
            <div>{gameData.localPoints} - {gameData.visitPoints}</div>

        <div>
            {gameData.localTeamPlayers.map((player) => (
                <div key={player.id}>
                    <PlayerDetail player={player}/>
                </div>
            ))}
        </div>

        <div>
            {gameData.visitTeamPlayers.map((player) => (
                <div key={player.id}>
                    <PlayerDetail player={player}/>
                </div>
            ))}
        </div>

        </div>
    )
}

'use client'

import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';
import Arbitrategame from '@/app/ui/components/forms/Arbitrategame';

export default function ArbitrateGamePage({ params }) {
    const { gameId } = params;
    const [gameData, setGameData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchGameData = async () => {
            try {
                const response = await axios.get(`/game/${gameId}`);
                setGameData(response.data);
            } catch (error) {
                setError('Error fetching game data');
                console.error('Error fetching game data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGameData();
    }, [gameId]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            {gameData && (
                <Arbitrategame
                    gameId={gameId}
                    localTeam={gameData.local_team}
                    visitTeam={gameData.visit_team}
                />
            )}
        </div>
    );
}

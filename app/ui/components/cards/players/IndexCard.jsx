'use client'

import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import PlayerCard from '@/app/ui/components/cards/players/MediumCard';
import axios from '@/lib/axios';

export default function Page() {
    const [playerData, setplayerData] = useState([]);

    useEffect(() => {
        async function fetchplayerData() {
            try {
                const response = await axios.get("/player");
                const data = response.data;
                setPlayerData(data || []);
            } catch (error) {
                console.error("Error fetching game data: ", error);
                setplayerData([]);
            }
        }
        fetchplayerData();
    }, []);

    return (
        <div className="container mx-auto p-4">
        {Object.entries(playerData).map(([teamName, players])  => (
            <div key={teamName} className="mb-8">
                <h2 className="text-2xl font-bold mb-4 text-title-dark-700">{teamName}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {players.map((player) => (
                        <PlayerCard key={player.id} player={player} />
                    ))}
                </div>
            </div>
        ))}
        </div>
    );
}

'use client'
import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import MediumCard from '@/app/ui/components/cards/players/MediumCard';
import Image from 'next/image';
import AverageCard from '@/app/ui/components/cards/games/TeamAverageCard';

const positionOrder = {
    1: 1, // Base
    2: 2, // Escolta
    3: 3, // Alero
    4: 4, // Ala-Pívot
    5: 5, // Pívot
    6: 0,
};

const positionNames = {
    0: 'Cuerpo técnico',
    1: 'Bases',
    2: 'Escoltas',
    3: 'Aleros',
    4: 'Ala-Pivots',
    5: 'Pivots',
};

export default function Page({ teamId }) {
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTeamData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/team/${teamId}`);
                if (!response.ok) {
                    throw new Error(`Error fetching data: ${response.statusText}`);
                }
                const data = await response.json();
                setTeamData(data|| null);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTeamData();
    }, [teamId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!teamData.team) {
        return <div>No team data available</div>;
    }

    // Ordenar los jugadores por posición
    const sortedPlayers = teamData.team.players.sort((a, b) => {
        return positionOrder[a.position] - positionOrder[b.position];
    });

    // Agrupar jugadores por posición y convertir códigos a nombres
    const groupedPlayers = sortedPlayers.reduce((acc, player) => {
        const positionName = positionNames[player.position];
        if (!acc[positionName]) {
            acc[positionName] = [];
        }
        acc[positionName].push(player);
        return acc;
    }, {});

    return (
        <div>
            <div className='flex items-center m-3 justify-between'>
                <DarkTitle text={teamData.team.name} />
                <Image src={teamData.team.imageURL} alt="alt" width={200} height={200} />
            </div>

            <div>
                {Object.entries(groupedPlayers).map(([position, players]) => (
                    <div key={position}>
                        <h3 className="m-3 font-bold text-xl text-menu-bg-800">{position}</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {players.map(player => (
                                <div key={player.id}>
                                    <MediumCard player={player} />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            <div>
                <AverageCard average={teamData.averageStats} text={'Promedios de equipo'}/>
            </div>
        </div>
    );
}

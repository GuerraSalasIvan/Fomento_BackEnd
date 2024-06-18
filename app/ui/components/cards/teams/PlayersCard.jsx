'use client'
import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import MediumCard from '@/app/ui/components/cards/players/MediumCard';
import Image from 'next/image';
import AverageCard from '@/app/ui/components/cards/games/TeamAverageCard';
import axios from '@/lib/axios';
import MockImage from '@/public/assests/img/default_team.png';

const positionOrder = {
    1: 1, // Base
    2: 2, // Escolta
    3: 3, // Alero
    4: 4, // Ala-Pívot
    5: 5, // Pívot
    6: 0, // Cuerpo técnico
};

const positionNames = {
    0: 'Cuerpo técnico',
    1: 'Bases',
    2: 'Escoltas',
    3: 'Aleros',
    4: 'Ala-Pivots',
    5: 'Pivots',
    6: 'Estadisticas de equipo'
};

export default function Page({ teamId }) {
    const [teamData, setTeamData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchTeamData() {
            try {
                const response = await axios.get(`/team/${teamId}`);
                if (!response.data.team) {
                    throw new Error(`No team data found for team ID ${teamId}`);
                }
                setTeamData(response.data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }

        fetchTeamData();
    }, [teamId]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!teamData || !teamData.team) {
        return <div>No team data available</div>;
    }

    const sortedPlayers = teamData.team.players.sort((a, b) => {
        return positionOrder[a.position] - positionOrder[b.position];
    });

    const groupedPlayers = sortedPlayers.reduce((acc, player) => {
        const positionName = positionNames[player.position];
        if (!acc[positionName]) {
            acc[positionName] = [];
        }
        acc[positionName].push(player);
        return acc;
    }, {});

    const hasPlayers = Object.keys(groupedPlayers).length > 0;

    return (
        <div>
            <div className='flex flex-col sm:flex-row items-center m-3 justify-between'>
                <DarkTitle text={teamData.team.name} />
                <div className="mt-3 sm:mt-0">
                    <Image src={teamData.team.imageURL || MockImage} alt="alt" width={200} height={200} />
                </div>
            </div>

            <div>
                {hasPlayers ? (
                    Object.entries(groupedPlayers).map(([position, players]) => (
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
                    ))
                ) : (
                    <p className="m-3 text-lg text-center text-red-500">Este equipo no tiene jugadores todavía.</p>
                )}
            </div>
            <div>
                <AverageCard average={teamData.averageStats} text={'Promedios de equipo'} />
            </div>
        </div>
    );
}

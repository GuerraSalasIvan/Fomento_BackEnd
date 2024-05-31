'use client'

import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import MediumCard from '@/app/ui/components/cards/players/MediumCard';
import Image from 'next/image';

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
                setTeamData(data.team || null);
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

    if (!teamData) {
        return <div>No team data available</div>;
    }
    console.log(teamData)
    return (
        <div>
            <div className='flex items-center m-3 justify-between'>
                <DarkTitle text={teamData.name} />
                <Image src={teamData.imageURL} alt="alt" width={200} height={200} />
            </div>

            <div>
                <h2 className='m-3 text-title-dark-700'>Jugadores:</h2>
                <ul>
                    {teamData.players.map(player => (
                        <div key={player.id}>
                            <MediumCard player={player} />
                        </div>
                    ))}
                </ul>
            </div>
        </div>
    );
}

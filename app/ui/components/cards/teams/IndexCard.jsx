'use client'

import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';


export default function Page() {
    const [teamData, setTeamData] = useState([]);

    useEffect(() => {
        async function fetchTeamData() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/team");
                const data = await response.json();
                console.log('Teams: ', data);
                setTeamData(data.teams || []);
            } catch (error) {
                console.error("Error fetching team data: ", error);
                setTeamData([]);
            }
        }
        fetchTeamData();
    }, []);

    return (
                <div className='grid grid-cols-2'>
                    {teamData.length > 0 ? (
                        teamData.map((team) => (
                            <Link key={team.id} href={`/dashboard/teams/${team.id}`} className='no-underline text-title-dark-700'>
                                <div className='flex flex-col items-center pb-4' style={{ padding: '10px', margin: '10px' }}>
                                    <img src={team.imageURL} alt={`${team.name} logo`} width={300} height={300} />
                                    <p><strong>{team.name}</strong></p>
                                    <p>{team.league_name}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <p>No team data available</p>
                    )}
                </div>
    );
}


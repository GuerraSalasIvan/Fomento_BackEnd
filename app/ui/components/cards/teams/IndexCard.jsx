'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from '@mui/material/Link';
import axios from '@/lib/axios';
import MockImage from '@/public/assests/img/default_team.png';

export default function Page() {
    const [teamData, setTeamData] = useState([]);
    const [leagues, setLeagues] = useState([]);
    const [selectedLeague, setSelectedLeague] = useState(null); // Estado para almacenar la liga seleccionada

    useEffect(() => {
        async function fetchTeamData() {
            try {
                const response = await axios.get("/team");
                const data = response.data;
                setTeamData(data.teams || []);
            } catch (error) {
                console.error("Error fetching team data: ", error);
                setTeamData([]);
            }
        }
        fetchTeamData();
    }, []);

    useEffect(() => {
        async function fetchLeagues() {
            try {
                const response = await axios.get("/leagues");
                setLeagues(response.data || []);
            } catch (error) {
                console.error("Error fetching leagues: ", error);
                setLeagues([]);
            }
        }
        fetchLeagues();
    }, []);

    const handleLeagueChange = (e) => {
        const selectedLeagueId = parseInt(e.target.value);
        setSelectedLeague(selectedLeagueId);
    };

    return (
        <div className='grid grid-cols-1 gap-4'>
            <div className='items-center mb-4'>
                <label htmlFor="leagueSelect" className="block font-semibold text-lg text-menu-bg-900 mx-2">Seleccionar Liga:</label>
                <select
                    id="leagueSelect"
                    value={selectedLeague || ''}
                    onChange={handleLeagueChange}
                    className="mt-1 block w-full rounded-md border border-menu-bg-300 shadow-sm mx-2"
                >
                    <option value="">Todas las Ligas</option>
                    {leagues.map((league) => (
                        <option key={league.id} value={league.id}>{league.name}</option>
                    ))}
                </select>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                {teamData.length > 0 ? (
                    teamData
                        .filter(team => !selectedLeague || team.league_id === selectedLeague) // Filtrar por la liga seleccionada
                        .map((team) => (
                            <Link key={team.id} href={`/dashboard/teams/${team.id}`} className='no-underline hover:no-underline text-title-dark-700'>
                                <div className='flex flex-col items-center pb-4 transition-transform transform hover:scale-105' style={{ padding: '10px', margin: '10px' }}>
                                    <Image src={team.imageURL || MockImage} alt={`${team.name} logo`} width={300} height={300} />
                                    <p className='text-title-dark-700'><strong>{team.name}</strong></p>
                                    <p className='text-title-dark-700'>{team.league_name}</p>
                                </div>
                            </Link>
                        ))
                ) : (
                    <p>No team data available</p>
                )}
            </div>
        </div>
    );
}

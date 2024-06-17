'use client';

import Grid from '@mui/material/Grid';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import PlayerDetail from '@/app/ui/components/sections/dashboard/player/PlayerDetail';
import PlayerGames from '@/app/ui/components/sections/dashboard/player/PlayerGames';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import unknown from '@/public/assests/img/default_avatar.jpg';
import BackButton from "@/app/ui/components/buttons/BackButton"
import axios from '@/lib/axios';


export default function Page({ params }) {
    const { playerId } = params;
    const [playerData, setPlayerData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPlayerData() {
            try {
                const response = await axios.get(`/player/${playerId}`);
                setPlayerData(response.data || {});
            } catch (error) {
                console.error("Error fetching player data: ", error);
                setPlayerData({});
            } finally {
                setLoading(false);
            }
        }
        fetchPlayerData();
    }, [playerId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!playerData || !playerData.player) {
        return  <div className='flex justify-between items-center'>
                    <p>Este jugador no tiene registro de partidos todavía</p>
                    <Link className='px-4 py-1 bg-menu-bg-950 text-white rounded-lg' href={`/dashboard/players`}> Volver </Link>
                </div>
    }

    return (
        <>
            <div className="sm:hidden ml-auto">
                <BackButton url={`/dashboard/teams`} />
            </div>
        <div className='flex justify-between items-center'>
            <div className=' flex flex-col sm:flex-row my-4 mx-1 items-center justify-between'>
                <Image
                    src={playerData.player.imageURL || unknown}
                    alt="alt"
                    width={70}
                    height={70}
                    className="h-28 w-28 object-cover rounded-full"
                />
                <div className="ml-2">
                    <DarkTitle text={playerData.player.full_name} />
                </div>
            </div>

            <div className="hidden sm:block ml-auto">
                <BackButton url={`/dashboard/teams`} />
            </div>

        </div>


            <Grid container spacing={3}>
                <Grid item xs={12} md={12} lg={5}>
                    <div>
                        <PlayerDetail playerData={playerData} />
                    </div>
                </Grid>
                <Grid item xs={12} md={12} lg={7}>
                    <div>
                        <PlayerGames gamePlayer={playerData.gamePlayers}/>
                    </div>
                </Grid>
            </Grid>
        </>
    );
}

'use client';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import React, { useState, useEffect } from 'react';
import PlayerDetail from '@/app/ui/components/sections/dashboard/player/PlayerDetail';
import PlayerGames from '@/app/ui/components/sections/dashboard/player/PlayerGames';

export default function Page({ params }) {
    const { playerId } = params;
    const [playerData, setPlayerData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPlayerData() {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/player/${playerId}`);
                const data = await response.json();
                setPlayerData(data || {});
                console.log(data)
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
        return <div>Error loading player data</div>;
    }

    return (
        <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
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
        </Paper>
    );
}

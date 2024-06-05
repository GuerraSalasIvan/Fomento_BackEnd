

import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import GameList from '@/app/ui/components/sections/game/GameList';

export default function page() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                    <div>
                        <DarkTitle text = {'Partidos'}/>
                    </div>

                    <div>
                        <GameList />
                    </div>

            </Grid>
        </Grid>
    )
}

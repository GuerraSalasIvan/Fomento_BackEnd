

import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import GameList from '@/app/ui/components/sections/game/GameList';
import BackButton from "@/app/ui/components/buttons/BackButton"


export default function page() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
            <div className='flex justify-between items-center'>
                <DarkTitle text = {'Crear encuentro'}/>
                <BackButton url={`/dashboard/events`} />
            </div>
                    <div>
                        <GameList />
                    </div>

            </Grid>
        </Grid>
    )
}

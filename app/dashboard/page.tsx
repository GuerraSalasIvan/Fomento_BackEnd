'use client'

import * as React from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import Calendar from '@/app/ui/components/sections/dashboard/main/Calendar';
import DashboardEvent from '@/app/ui/components/cards/events/DashBoardEvent';
import LastGames from '@/app/ui/components/sections/dashboard/main/LastGames';
import UserGameCard from '@/app/ui/components/cards/games/UserGameCard';

export default function Page() {
    return (
        <Grid container spacing={1}>
              {/* Chart */}
            <Grid item xs={12} md={8} lg={8}>
                    <div>
                        <DarkTitle text = {'Mis partidos'}/>
                        <UserGameCard />
                    </div>

                    <div>
                        <LastGames />
                    </div>
            </Grid>


            <Grid item xs={12} md={4} lg={4}>
                    <div>
                        <Calendar />
                    </div>

                    <div>
                        <DarkTitle text = {'Próximos eventos'}/>
                        <DashboardEvent />
                    </div>
            </Grid>
        </Grid>
    );
}
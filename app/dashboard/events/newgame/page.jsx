import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import Creategame from '@/app/ui/components/forms/Creategame';

export default function page() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                <Paper
                    sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                }}>
                    <div>
                        <DarkTitle text = {'Crear encuentro'}/>
                    </div>

                    <div>
                        <Creategame />
                    </div>
                </Paper>

            </Grid>
        </Grid>
    );
}

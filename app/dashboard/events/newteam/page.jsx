import React from 'react';
import Grid from '@mui/material/Grid';
import Createteam from '@/app/ui/components/forms/Createteam';
import BackButton from "@/app/ui/components/buttons/BackButton"
import DarkTitle from '@/app/ui/components/titles/DarkTitle';

export default function page() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                <div className='flex justify-between items-center'>
                    <DarkTitle text = {'Crear equipo'}/>
                    <BackButton url={`/dashboard/events`} />
                </div>

                    <div>
                        <Createteam />
                    </div>
            </Grid>
        </Grid>
    );
}
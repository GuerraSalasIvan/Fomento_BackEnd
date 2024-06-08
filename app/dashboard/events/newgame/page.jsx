import React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from 'next/link';

import Creategame from '@/app/ui/components/forms/Creategame';
import BackButton from "@/app/ui/components/buttons/BackButton"
import DarkTitle from '@/app/ui/components/titles/DarkTitle';

export default function page() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                <div className='flex justify-between items-center'>
                    <DarkTitle text = {'Crear encuentro'}/>
                    <BackButton url={`/dashboard/events`} />
                </div>

                    <div>
                        <Creategame />
                    </div>
            </Grid>
        </Grid>
    );
}

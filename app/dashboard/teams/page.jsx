import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import IndexCard from '@/app/ui/components/cards/teams/IndexCard';



export default function Page() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                    <div>
                        <DarkTitle text = {'Equipos'}/>
                    </div>

                    <div>
                        <IndexCard />
                    </div>
            </Grid>
        </Grid>
    );
}
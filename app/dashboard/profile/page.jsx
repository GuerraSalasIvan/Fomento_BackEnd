import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import IndexCard from '@/app/ui/components/cards/players/IndexCard';
import EditProfile from '@/app/ui/components/sections/dashboard/profile/EditProfile';



export default function Page() {
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
                        <DarkTitle text = {'Profile'}/>
                    </div>

                    <div>
                        <EditProfile />
                    </div>
                </Paper>

            </Grid>
        </Grid>
    );
}
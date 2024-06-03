import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PlayersCard from '@/app/ui/components/cards/teams/PlayersCard';


export default function Page({params}) {
    const { teamId } = params;

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
                    </div>

                    <div>
                        <PlayersCard teamId={teamId}/>
                    </div>
                </Paper>

            </Grid>
        </Grid>
    );
}
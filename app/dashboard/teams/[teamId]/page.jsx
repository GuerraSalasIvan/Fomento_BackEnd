import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import PlayersCard from '@/app/ui/components/cards/teams/PlayersCard';
import BackButton from "@/app/ui/components/buttons/BackButton"



export default function Page({params}) {
    const { teamId } = params;

    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                    <div className='flex justify-between items-center'>
                        <div></div>
                        <BackButton url={`/dashboard/teams`} />
                    </div>

                    <div className='mt-4'>
                        <PlayersCard teamId={teamId}/>
                    </div>


            </Grid>
        </Grid>
    );
}
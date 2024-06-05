import Grid from '@mui/material/Grid';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import IndexCard from '@/app/ui/components/cards/players/IndexCard';
import EditProfile from '@/app/ui/components/sections/dashboard/profile/EditProfile';



export default function Page() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                    <div>
                        <DarkTitle text = {'Perfil'}/>
                    </div>

                    <div>
                        <EditProfile />
                    </div>
            </Grid>
        </Grid>
    );
}
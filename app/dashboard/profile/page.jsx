import Grid from '@mui/material/Grid';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import IndexCard from '@/app/ui/components/cards/players/IndexCard';
import EditProfile from '@/app/ui/components/sections/dashboard/profile/EditProfile';
import BackButton from "@/app/ui/components/buttons/BackButton"



export default function Page() {
    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
            <div className='flex justify-between items-center'>
                <DarkTitle text = {'Editar perfil'}/>
                <BackButton url={`/dashboard`} />
            </div>

                    <div>
                        <EditProfile />
                    </div>
            </Grid>
        </Grid>
    );
}
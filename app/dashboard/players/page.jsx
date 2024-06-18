import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import IndexCard from '@/app/ui/components/cards/players/IndexCard';



export default function Page() {
    return (
        <>
            <div>
                <DarkTitle text = {'Jugadores'}/>
            </div>

            <div>
                <IndexCard />
            </div>
        </>
    );
}
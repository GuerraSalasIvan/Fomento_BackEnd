import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from 'next/link';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import IndexCard from '@/app/ui/components/cards/players/IndexCard';



export default function Page() {
    return (
        <>
            <div>
                <DarkTitle text = {'Eventos'}/>
            </div>

            <div className='p-2.5'>

                <Link href='/dashboard/events/newgame'>
                    <div>
                        <p>Crear partido</p>
                    </div>
                </Link>

                <Link href='/dashboard/games'>
                    <div>
                        <p>Lista de partidos</p>
                    </div>
                </Link>

                <Link href='/dashboard/games/arbitrate'>
                    <div>
                        <p>Arbitrar Partido</p>
                    </div>
                </Link>

            </div>
        </>
    );
}
// LastGames Component
import React from 'react';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import HomeCard from '@/app/ui/components/cards/games/HomeCard';
import { format } from "date-fns";
import axios from '@/lib/axios';
import Link from 'next/link';

export default function LastGames() {
    const [gameData, setGameData] = React.useState([]);

    React.useEffect(() => {
        async function fetchGameData() {
            try {
                const response = await axios.get("/arbitrated");
                setGameData(response.data || []);
            } catch (error) {
                console.error("Error fetching game data: ", error);
                setGameData([]);
            }
        }
        fetchGameData();
    }, []);

    return (
        <div>
            <DarkTitle text={'Últimos partidos'}/>
            <div className="hidden sm:flex justify-around items-center p-2 text-yellow-500 border border-yellow-500 font-bold rounded bg-primary-50">
                <div className="flex-1 text-center">Equipo Local</div>
                <div className="flex-1 text-center">Resultado</div>
                <div className="flex-1 text-center">Equipo Visitante</div>
                <div className="flex-1 text-center">División</div>
                <div className="flex-1 text-center">MVP</div>
            </div>

            {gameData?.length > 0 ? (
                gameData.map((game, index) => (
                    <div key={index} className="my-2">
                        <Link href={`/dashboard/games/${game.id}`} className='no-underline hover:no-underline '>
                            <div className="hover:bg-menu-bg-50">
                                <HomeCard gameData={game} />
                            </div>
                        </Link>
                    </div>
                ))
            ) : (
                <p>No hay datos disponibles.</p>
            )}
        </div>
    );
}

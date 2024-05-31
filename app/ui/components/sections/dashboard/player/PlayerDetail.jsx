'use client'

import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import AverageCard from '@/app/ui/components/cards/games/AverageCard';

import Boton from '@/app/ui/components/buttons/InscribeEventButton';

export default function Page({ playerData }) {
    
    return (
        <div className=''>
            <DarkTitle text={playerData.player.full_name} />
            <p className='m-4'>{playerData.player.full_name}</p>
            <AverageCard average={playerData.averages} text={'Promedios del jugador'}/>
            <AverageCard average={playerData.seasonAverages} text={'Promedios de temporada'}/>
        </div>
    );
}

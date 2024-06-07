'use client'

import AverageCard from '@/app/ui/components/cards/games/AverageCard';

import Boton from '@/app/ui/components/buttons/InscribeEventButton';

export default function Page({ playerData }) {
    console.log(playerData)
    return (
        <div className=''>
            <AverageCard average={playerData.averages} text={'Promedios del jugador'}/>
            <AverageCard average={playerData.seasonAverages} text={'Promedios de temporada'}/>
        </div>
    );
}

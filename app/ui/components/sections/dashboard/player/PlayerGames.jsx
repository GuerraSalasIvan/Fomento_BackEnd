import React from 'react'
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import GamesTable from '@/app/ui/components/cards/players/GamesTable';

export default function PlayerGames({gamePlayer}) {
    console.log(gamePlayer)
    return (
        <div>
            <DarkTitle text={'Últimos partidos'}/>
            <GamesTable gameData={gamePlayer}/>
        </div>
    )
}


import React from 'react';
import GameDetails from '@/app/ui/components/sections/game/GameDetails';

export default function page({ params }) {

    const { gameId } = params;
    return (
        <div>
            <GameDetails gameId={gameId}/>
        </div>
    )
}

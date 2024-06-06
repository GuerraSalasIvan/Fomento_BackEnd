import React from 'react';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import ArbitratedList from '@/app/ui/components/sections/game/ArbitratedList';

export default function page() {
    return (
        <div>
            <DarkTitle text={'Lista de partidos'} />
            <div>
                <ArbitratedList />
            </div>

        </div>
    )
}



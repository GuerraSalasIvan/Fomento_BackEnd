import React from 'react';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import ArbitratedList from '@/app/ui/components/sections/game/ArbitratedList';
import BackButton from "@/app/ui/components/buttons/BackButton"



export default function page() {
    return (
        <div>
            <div className='flex justify-between items-center'>
                <DarkTitle text = {'Lista de partidos'}/>
                <BackButton url={`/dashboard/events`} />
            </div>
            <div>
                <ArbitratedList />
            </div>

        </div>
    )
}



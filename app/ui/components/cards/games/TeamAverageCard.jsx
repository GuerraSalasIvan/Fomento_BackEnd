'use client'

import DarkTitle from '@/app/ui/components/titles/DarkTitle';

export default function AverageCard({average, text}) {
    console.log('aqui',average)
    return (
        <div className='space-y-2'>
            <DarkTitle text={text}/>
            <div className="flex justify-around items-center p-2 text-yellow-500 border border-yellow-500 font-bold rounded bg-primary-50">
                <div className="flex-1 text-center">Puntos</div>
                <div className="flex-1 text-center">Rebotes</div>
                <div className="flex-1 text-center">Asitencia </div>
                <div className="flex-1 text-center">Robos</div>
                <div className="flex-1 text-center">Tapones</div>
            </div>

            <div className="border flex justify-around items-center p-2 rounded border-primary-500 text-title-dark-700">
                <div className="flex-1 text-center">{average.points}</div>
                <div className="flex-1 text-center">{average.rebounds}</div>
                <div className="flex-1 text-center">{average.assists}</div>
                <div className="flex-1 text-center">{average.steals}</div>
                <div className="flex-1 text-center">{average.blocks}</div>
            </div>
        </div>
    );
}
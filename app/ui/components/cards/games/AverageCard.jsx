'use client'

import DarkTitle from '@/app/ui/components/titles/DarkTitle';

export default function AverageCard({average, text}) {
    return (
        <div className='space-y-2'>
            <DarkTitle text={text} />
            <div className="flex flex-col sm:flex-row justify-around items-center p-2 text-yellow-500 border border-yellow-500 font-bold rounded bg-primary-50">
                <div className="flex-1 text-center sm:flex sm:flex-col">
                    Puntos
                </div>
                <div className="flex-1 text-center sm:flex sm:flex-col">
                    Rebotes
                </div>
                <div className="flex-1 text-center sm:flex sm:flex-col">
                    Asistencias
                </div>
                <div className="flex-1 text-center sm:flex sm:flex-col">
                    Robos
                </div>
                <div className="flex-1 text-center sm:flex sm:flex-col">
                    Tapones
                </div>
            </div>

            <div className="border flex flex-col sm:flex-row justify-around items-center p-2 rounded border-primary-500 text-title-dark-700">
                <div className="flex-1 text-center sm:flex sm:flex-col">
                    {average.points}
                </div>
                <div className="flex-1 text-center sm:flex sm:flex-col">
                    {average.rebounds}
                </div>
                <div className="flex-1 text-center sm:flex sm:flex-col">
                    {average.assists}
                </div>
                <div className="flex-1 text-center sm:flex sm:flex-col">
                    {average.steals}
                </div>
                <div className="flex-1 text-center sm:flex sm:flex-col">
                    {average.blocks}
                </div>
            </div>
        </div>
    );
}
// AverageCard Component
import React from 'react';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';

export default function AverageCard({ average, text }) {
    return (
        <div className='space-y-2'>
            <DarkTitle text={text} />
            <div className="grid grid-cols-2 sm:flex sm:flex-row justify-around items-center p-2 text-yellow-500 border border-yellow-500 font-bold rounded bg-primary-50">
                <div className="text-center">
                    Puntos
                </div>
                <div className="text-center">
                    Rebotes
                </div>
                <div className="text-center">
                    Asistencias
                </div>
                <div className="text-center">
                    Robos
                </div>
                <div className="text-center">
                    Tapones
                </div>
            </div>

            <div className="grid grid-cols-2 sm:flex sm:flex-row justify-around items-center p-2 rounded border border-primary-500 text-title-dark-700">
                <div className="text-center">
                    {average.points}
                </div>
                <div className="text-center">
                    {average.rebounds}
                </div>
                <div className="text-center">
                    {average.assists}
                </div>
                <div className="text-center">
                    {average.steals}
                </div>
                <div className="text-center">
                    {average.blocks}
                </div>
            </div>
        </div>
    );
}

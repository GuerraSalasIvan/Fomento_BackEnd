'use client'

import DarkTitle from '@/app/ui/components/titles/DarkTitle';
import { format } from "date-fns";
import React, { useState, useEffect } from 'react';
import HomeCard from '@/app/ui/components/cards/games/HomeCard';
import { Home } from '@mui/icons-material';

export default function LastGames() {
    const [gameData, setGameData] = useState([]);

    useEffect(() => {
        async function fetchGameData() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/home");
                const data = await response.json();
                console.log('Last Games: ',data);
                setGameData(data || []);
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
            <div className="flex justify-around items-center p-2 text-yellow-500 border border-yellow-500 font-bold rounded bg-primary-50">
                <div className="flex-1 text-center">Equipo Local</div>
                <div className="flex-1 text-center">Resultado</div>
                <div className="flex-1 text-center">Equipo Visitante</div>
                <div className="flex-1 text-center">División</div>
                <div className="flex-1 text-center">MVP</div>
            </div>


            {gameData?.length > 0 ? (
                gameData.map((gameData, index) => (
                    <div key={index} className="my-1.5 ">
                        <HomeCard gameData={gameData}/>
                    </div>
                ))
            ) : (
                <p>No hay datos disponibles.</p>
            )}
        </div>
    );
}

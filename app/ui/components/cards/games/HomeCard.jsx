import React, { useState, useEffect } from 'react';

export default function HomeCard({ gameData }) {
    const [mvpName, setMvpName] = useState('Cargando...');
    
    useEffect(() => {
        const fetchMvpName = async (mvpId) => {
            if (mvpId === 0) {
                setMvpName('Por definir');
                return;
            }

            try {
                const response = await fetch(`https://proyectointegrado-production-0e79.up.railway.app//api/player/${mvpId}`);
                const data = await response.json();
                setMvpName(data.player.full_name);
            } catch (error) {
                console.error('Error fetching player data:', error);
                setMvpName('Error al cargar');
            }
        };

        fetchMvpName(gameData.game_details.mvp);
    }, [gameData.game_details.mvp]);

    // Calcular el resultado sumando los puntajes de los cuartos
    const localTeamScore = gameData.game_details.local_first_cuarter +
                           gameData.game_details.local_second_cuarter +
                           gameData.game_details.local_third_cuarter +
                           gameData.game_details.local_fourth_cuarter;

    const visitTeamScore = gameData.game_details.visit_first_cuarter +
                           gameData.game_details.visit_second_cuarter +
                           gameData.game_details.visit_third_cuarter +
                           gameData.game_details.visit_fourth_cuarter;

    return (
        <div className="border flex justify-around items-center p-2 rounded border-primary-500 text-title-dark-700">
            <div className="flex-1 text-center font-bold">{gameData.local_team.name}</div>
            <div className="flex-1 text-center">{localTeamScore} - {visitTeamScore}</div>
            <div className="flex-1 text-center font-bold">{gameData.visit_team.name}</div>
            <div className="flex-1 text-center">{gameData.leagues.name}</div>
            <div className="flex-1 text-center">{mvpName}</div>
        </div>
    );
}

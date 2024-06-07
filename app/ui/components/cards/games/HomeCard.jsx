import React from 'react';

export default function HomeCard({ gameData }) {
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
            <div className="flex-1 text-center">{gameData.game_details.mvp}</div>
        </div>
    );
}

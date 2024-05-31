'use client'

export default function HomeCard({gameData}) {
    return (
        <div className="border flex justify-around items-center p-2 rounded border-primary-500 text-title-dark-700">
            <div className="flex-1 text-center font-bold">{gameData.local_team}</div>
            <div className="flex-1 text-center">{gameData.local_team_score} - {gameData.visit_team_score}</div>
            <div className="flex-1 text-center font-bold">{gameData.visit_team} </div>
            <div className="flex-1 text-center">{gameData.league}</div>
            <div className="flex-1 text-center">{gameData.mvp}</div>
        </div>
    );
}
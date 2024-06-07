import React, { useState, useEffect } from 'react';
import { format } from "date-fns";
import { useAuth } from '@/hooks/auth';

export default function UserGameCard() {
    const { user } = useAuth({ middleware: 'guest' });
    const [userTeamGames, setUserTeamGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUserTeamGames() {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/game");
                const data = await response.json();

                console.log("Fetched data: ", data);

                // Obtener el ID del equipo del usuario
                const userTeamId = user?.player?.teams?.[0]?.id;
                console.log("User Team ID: ", userTeamId);

                // Filtrar los juegos del equipo del usuario
                const filteredGames = data.filter(game => {
                    const isUserTeamGame = (game.local_team_id === userTeamId || game.visit_team_id === userTeamId);

                    console.log(`Game ID: ${game.id}, Local Team ID: ${game.local_team_id}, Visit Team ID: ${game.visit_team_id}, Is User Team Game: ${isUserTeamGame}`);

                    return isUserTeamGame;
                });

                console.log("Filtered Games: ", filteredGames);

                setUserTeamGames(filteredGames);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching user team games: ", error);
                setIsLoading(false);
            }
        }

        if (user && user.player && user.player.teams && user.player.teams.length > 0) {
            fetchUserTeamGames();
        } else {
            setIsLoading(false);
        }
    }, [user]);

    return (
        <div className='ml-2'>
            {isLoading ? (
                <p>Cargando...</p>
            ) : userTeamGames.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userTeamGames.map((game, index) => (
                        <div key={index} className="bg-primary-200 shadow-md rounded-lg p-4">
                            <div className="mb-4">
                                <p className="text-menu-bg-700 bg-menu-bg-50 font-semibold">{format(new Date(game.match_date), "d/M/yyyy")} - {format(new Date(game.match_date), "HH:mm")}</p>
                            </div>
                            <div className="mb-4">
                                <p className="text-menu-bg-900 font-bold">{game.local_team.name} vs {game.visit_team.name}</p>
                            </div>
                            <div>
                                <p className="text-menu-bg-600">Ubicación: {game.ubications.name}</p>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No hay partidos para tu equipo.</p>
            )}
        </div>
    );
}

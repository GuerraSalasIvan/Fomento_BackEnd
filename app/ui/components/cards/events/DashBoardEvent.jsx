import { format } from "date-fns";
import React, { useState, useEffect } from 'react';

export default function DashBoardEvent(){
    const [eventData, setEventData] = useState([]);
    const [isLoading, setIsLoading] = useState(true); // Estado para controlar la carga

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("https://proyectointegrado-production-0e79.up.railway.app/api/game");
                const data = await response.json();
                setEventData(data);
                setIsLoading(false); // Una vez que se cargan los datos, actualiza el estado de isLoading
            } catch (error) {
                console.error("Error fetching data: ", error);
                setEventData([]);
                setIsLoading(false); // En caso de error, también actualiza el estado de isLoading
            }
        }
        fetchData();
    }, []);

    return(
        <>
            {isLoading ? ( // Si isLoading es true, muestra el mensaje de "Cargando..."
                <div className="m-2 bg-secondary-400 bg-opacity-10 border border-secondary-400 rounded-md px-5 py-2">
                    <p className="text-subtitle-event-800">Cargando...</p>
                </div>
            ) : (
                // Si isLoading es false, renderiza la lista de juegos
                <>
                    {eventData.map((game, index) => (
                        <div key={index} className="m-2 bg-secondary-400 bg-opacity-10 border border-secondary-400 rounded-md px-5 py-2">
                            <div className="flex justify-between">
                                <h1 className="text-base text-title-dark-700 font-bold pb-2">{game.local_team.name} vs {game.visit_team.name}</h1>
                                {/* <MoreVert className="h-6 w-9 -mr-3 text-gray-500" /> */}
                            </div>

                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-subtitle-event-800">{format(new Date(game.match_date), "d/M/yyyy")} - {format(new Date(game.match_date), "HH:mm")}</p>
                                </div>

                                <p className="text-subtitle-event-800">{game.ubications.name}</p>
                                <p className="text-subtitle-event-800 mt-0"> {game.leagues.name} </p>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </>
    );
}

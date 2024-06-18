import { format } from "date-fns";
import React, { useState, useEffect } from 'react';
import axios from '@/lib/axios';

export default function DashBoardEvent(){
    const [eventData, setEventData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('/calendar');
                setEventData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setEventData([]);
                setIsLoading(false);
            }
        }
        fetchData();
    }, []);

    return(
        <>
            {isLoading ? (
                <div className="m-2 bg-secondary-400 bg-opacity-10 border border-secondary-400 rounded-md px-5 py-2">
                    <p className="text-subtitle-event-800">Cargando...</p>
                </div>
            ) : (
                
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

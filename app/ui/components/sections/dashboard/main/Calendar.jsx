'use client'

import React, { useState, useEffect } from 'react';
import { Calendar, Whisper, Popover } from 'rsuite';
import 'rsuite/dist/rsuite.min.css';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';

const CalendarComponent = () => {
    const [games, setGames] = useState([]);

    useEffect(() => {
        const fetchGames = async () => {
            try {
                const response = await fetch('https://proyectointegrado-production-0e79.up.railway.app/api/game');
                const data = await response.json();
                setGames(data);
            } catch (error) {
                console.error('Error fetching games:', error);
            }
        };

        fetchGames();
    }, []);

    function renderCell(date) {
        const currentDate = new Date();
        const gamesOnDate = games.filter(game => {
            const gameDate = new Date(game.match_date);
            return (
                gameDate.getDate() === date.getDate() &&
                gameDate.getMonth() === date.getMonth() &&
                gameDate.getFullYear() === date.getFullYear()
            );
        });
        if (gamesOnDate.length > 0) {
            const popoverContent = (
                <Popover>
                    <ul>
                        {gamesOnDate.map(game => (
                            <li key={game.id}>
                                <strong>{game.local_team.name}</strong> VS <strong>{game.visit_team.name}</strong> - {new Date(game.match_date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </li>
                        ))}
                    </ul>
                </Popover>
            );

            return (
                <Whisper placement="top" trigger="click" speaker={popoverContent}>
                    <span style={{ color: '#E3017E', cursor: 'pointer' }}>●</span>
                </Whisper>
            );
        }

        return null;
    }

    return <Calendar bordered compact renderCell={renderCell} />;
};

export default CalendarComponent;

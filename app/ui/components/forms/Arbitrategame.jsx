import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import GameInput from '@/app/ui/components/forms/games/GameInput';
import GameInputPoints from '@/app/ui/components/forms/games/GameInputPoints';
import ScoreBoard from '@/app/ui/components/sections/game/ScoreBoard';
import axios from '@/lib/axios';

export default function GameDetailsForm({ localTeam, visitTeam, gameId }) {
    const initializePlayers = (team) => {
        return team.players.map(player => ({
            ...player,
            dorsal: player.dorsal || '',
            points: 0,
            rebounds: 0,
            assists: 0,
            steals: 0,
            blocks: 0,
            fouls: 0
        }));
    };

    const [localPlayers, setLocalPlayers] = useState(initializePlayers(localTeam));
    const [visitPlayers, setVisitPlayers] = useState(initializePlayers(visitTeam));

    const handlePlayerChange = (team, index, field, value) => {
        const updatedPlayers = team === 'local' ? [...localPlayers] : [...visitPlayers];
        updatedPlayers[index][field] = value;
        team === 'local' ? setLocalPlayers(updatedPlayers) : setVisitPlayers(updatedPlayers);
    };

    const handleIncrement = (team, index, field, increment = 1) => {
        const updatedPlayers = team === 'local' ? [...localPlayers] : [...visitPlayers];
        const newValue = parseInt(updatedPlayers[index][field], 10) + increment;
        if (newValue >= 0) {
            updatedPlayers[index][field] = newValue.toString();
            team === 'local' ? setLocalPlayers(updatedPlayers) : setVisitPlayers(updatedPlayers);
        }
    };

    const getTotalPoints = (players) => {
        return players.reduce((acc, player) => acc + parseInt(player.points), 0);
    };

    const localTotalPoints = getTotalPoints(localPlayers);
    const visitTotalPoints = getTotalPoints(visitPlayers);

    const handleFinishGame = async () => {
        const data = {
            gameId,
            players: [...localPlayers, ...visitPlayers].map(player => ({
                game_id: gameId,
                player_id: player.id,
                number: player.dorsal,
                points: player.points,
                rebounds: player.rebounds,
                assists: player.assists,
                steals: player.steals,
                blocks: player.blocks,
                fouls: player.fouls,
            })),
        };

        try {
            await axios.post('/api/gamePlayer', data);
            alert('Partido terminado y datos guardados con éxito');
        } catch (error) {
            console.error('Error al guardar los datos del partido:', error);
            alert('Hubo un error al guardar los datos del partido.');
        }
    };

    return (
        <div className="grid grid-cols-1 gap-3">
            <ScoreBoard local={localTeam.name} localscore={localTotalPoints} visitscore={visitTotalPoints} visit={visitTeam.name} gameId={gameId} />

            <div className="max-w-full overflow-auto">
                <h2 className="text-lg font-semibold mb-2">{localTeam.name}</h2>
                <Table size="small" className="min-w-full">
                    <TableHead>
                        <TableRow>
                            <TableCell className="w-4 text-center font-bold"> Nº&nbsp;&nbsp; </TableCell>
                            <TableCell className="w-2/8 text-center font-bold">Jugador</TableCell>
                            <TableCell className="w-1/8 text-center">Puntos</TableCell>
                            <TableCell className="w-1/8 text-center">Rebotes</TableCell>
                            <TableCell className="w-1/8 text-center">Asistencias</TableCell>
                            <TableCell className="w-1/8 text-center">Robos</TableCell>
                            <TableCell className="w-1/8 text-center">Tapones</TableCell>
                            <TableCell className="w-1/8 text-center">Faltas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {localPlayers.map((player, index) => (
                            <TableRow key={index}>
                                <TableCell className="w-1/8">
                                    <input
                                        type="text"
                                        value={player.dorsal}
                                        onChange={(e) => handlePlayerChange('local', index, 'dorsal', e.target.value)}
                                        className="w-full text-center border rounded"
                                    />
                                </TableCell>
                                <TableCell className="w-2/8 font-bold">{player.full_name}</TableCell>
                                <TableCell className="w-1/8">
                                    <GameInputPoints
                                        value={player.points}
                                        change={(e) => handlePlayerChange('local', index, 'points', e.target.value)}
                                        clickplus={() => handleIncrement('local', index, 'points', 2)}
                                        clickminus={() => handleIncrement('local', index, 'points', 3)}
                                    />
                                </TableCell>
                                <TableCell className="w-1/8">
                                    <GameInput
                                        value={player.rebounds}
                                        change={(e) => handlePlayerChange('local', index, 'rebounds', e.target.value)}
                                        clickplus={() => handleIncrement('local', index, 'rebounds', 1)}
                                        clickminus={() => handleIncrement('local', index, 'rebounds', -1)}
                                        bgColorPlus="bg-menu-bg-200"
                                        bgColorMinus="bg-red-200"
                                    />
                                </TableCell>
                                <TableCell className="w-1/8">
                                    <GameInput
                                        value={player.assists}
                                        change={(e) => handlePlayerChange('local', index, 'assists', e.target.value)}
                                        clickplus={() => handleIncrement('local', index, 'assists', 1)}
                                        clickminus={() => handleIncrement('local', index, 'assists', -1)}
                                        bgColorPlus="bg-menu-bg-200"
                                        bgColorMinus="bg-red-200"
                                    />
                                </TableCell>
                                <TableCell className="w-1/8">
                                    <GameInput
                                        value={player.steals}
                                        change={(e) => handlePlayerChange('local', index, 'steals', e.target.value)}
                                        clickplus={() => handleIncrement('local', index, 'steals', 1)}
                                        clickminus={() => handleIncrement('local', index, 'steals', -1)}
                                        bgColorPlus="bg-menu-bg-200"
                                        bgColorMinus="bg-red-200"
                                    />
                                </TableCell>
                                <TableCell className="w-1/8">
                                    <GameInput
                                        value={player.blocks}
                                        change={(e) => handlePlayerChange('local', index, 'blocks', e.target.value)}
                                        clickplus={() => handleIncrement('local', index, 'blocks', 1)}
                                        clickminus={() => handleIncrement('local', index, 'blocks', -1)}
                                        bgColorPlus="bg-menu-bg-200"
                                        bgColorMinus="bg-red-200"
                                    />
                                </TableCell>
                                <TableCell className="w-1/8">
                                    <GameInput
                                        value={player.fouls}
                                        change={(e) => handlePlayerChange('local', index, 'fouls', e.target.value)}
                                        clickplus={() => handleIncrement('local', index, 'fouls', 1)}
                                        clickminus={() => handleIncrement('local', index, 'fouls', -1)}
                                        bgColorPlus="bg-menu-bg-200"
                                        bgColorMinus="bg-red-200"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="max-w-full overflow-auto">
                <h2 className="text-lg font-semibold mb-2">{visitTeam.name}</h2>
                <Table size="small" className="min-w-full">
                    <TableHead>
                        <TableRow>
                            <TableCell className="w-4 text-center font-bold"> Nº&nbsp;&nbsp; </TableCell>
                            <TableCell className="w-2/8 text-center font-bold">Jugador</TableCell>
                            <TableCell className="w-1/8 text-center">Puntos</TableCell>
                            <TableCell className="w-1/8 text-center">Rebotes</TableCell>
                            <TableCell className="w-1/8 text-center">Asistencias</TableCell>
                            <TableCell className="w-1/8 text-center">Robos</TableCell>
                            <TableCell className="w-1/8 text-center">Tapones</TableCell>
                            <TableCell className="w-1/8 text-center">Faltas</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {visitPlayers.map((player, index) => (
                            <TableRow key={index}>
                                <TableCell className="w-1/8">
                                    <input
                                        type="text"
                                        value={player.dorsal}
                                        onChange={(e) => handlePlayerChange('visit', index, 'dorsal', e.target.value)}
                                        className="w-full text-center border rounded"
                                    />
                                </TableCell>
                                <TableCell className="w-2/8 font-bold">{player.full_name}</TableCell>
                                <TableCell className="w-1/8">
                                    <GameInputPoints
                                        value={player.points}
                                        change={(e) => handlePlayerChange('visit', index, 'points', e.target.value)}
                                        clickplus={() => handleIncrement('visit', index, 'points', 2)}
                                        clickminus={() => handleIncrement('visit', index, 'points', 3)}
                                    />
                                </TableCell>
                                <TableCell className="w-1/8">
                                    <GameInput
                                        value={player.rebounds}
                                        change={(e) => handlePlayerChange('visit', index, 'rebounds', e.target.value)}
                                        clickplus={() => handleIncrement('visit', index, 'rebounds', 1)}
                                        clickminus={() => handleIncrement('visit', index, 'rebounds', -1)}
                                        bgColorPlus="bg-menu-bg-200"
                                        bgColorMinus="bg-red-200"
                                    />
                                </TableCell>
                                <TableCell className="w-1/8">
                                    <GameInput
                                        value={player.assists}
                                        change={(e) => handlePlayerChange('visit', index, 'assists', e.target.value)}
                                        clickplus={() => handleIncrement('visit', index, 'assists', 1)}
                                        clickminus={() => handleIncrement('visit', index, 'assists', -1)}
                                        bgColorPlus="bg-menu-bg-200"
                                        bgColorMinus="bg-red-200"
                                    />
                                </TableCell>
                                <TableCell className="w-1/8">
                                    <GameInput
                                        value={player.steals}
                                        change={(e) => handlePlayerChange('visit', index, 'steals', e.target.value)}
                                        clickplus={() => handleIncrement('visit', index, 'steals', 1)}
                                        clickminus={() => handleIncrement('visit', index, 'steals', -1)}
                                        bgColorPlus="bg-menu-bg-200"
                                        bgColorMinus="bg-red-200"
                                    />
                                </TableCell>
                                <TableCell className="w-1/8">
                                    <GameInput
                                        value={player.blocks}
                                        change={(e) => handlePlayerChange('visit', index, 'blocks', e.target.value)}
                                        clickplus={() => handleIncrement('visit', index, 'blocks', 1)}
                                        clickminus={() => handleIncrement('visit', index, 'blocks', -1)}
                                        bgColorPlus="bg-menu-bg-200"
                                        bgColorMinus="bg-red-200"
                                    />
                                </TableCell>
                                <TableCell className="w-1/8">
                                    <GameInput
                                        value={player.fouls}
                                        change={(e) => handlePlayerChange('visit', index, 'fouls', e.target.value)}
                                        clickplus={() => handleIncrement('visit', index, 'fouls', 1)}
                                        clickminus={() => handleIncrement('visit', index, 'fouls', -1)}
                                        bgColorPlus="bg-menu-bg-200"
                                        bgColorMinus="bg-red-200"
                                    />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <div className="mt-4">
                <button
                    onClick={handleFinishGame}
                    className="px-4 py-2 bg-menu-bg-950 text-white rounded hover:bg-menu-bg-600"
                >
                    Terminar Partido
                </button>
            </div>
        </div>
    );
}

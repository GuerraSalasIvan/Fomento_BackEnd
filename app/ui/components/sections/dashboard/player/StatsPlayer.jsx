import React from 'react';

function StatsPlayer({ player, handlePlayerChange }) {
    return (
        <div className="flex flex-col mb-4">
            <h3 className="text-md font-medium mb-2">{player.full_name}</h3>
            <div className="flex gap-2">
                <input
                    type="number"
                    value={player.points}
                    onChange={(e) => handlePlayerChange('points', e.target.value)}
                    placeholder="Points"
                    className="w-1/6"
                />
                <input
                    type="number"
                    value={player.rebounds}
                    onChange={(e) => handlePlayerChange('rebounds', e.target.value)}
                    placeholder="Rebounds"
                    className="w-1/6"
                />
                <input
                    type="number"
                    value={player.assists}
                    onChange={(e) => handlePlayerChange('assists', e.target.value)}
                    placeholder="Assists"
                    className="w-1/6"
                />
                <input
                    type="number"
                    value={player.steals}
                    onChange={(e) => handlePlayerChange('steals', e.target.value)}
                    placeholder="Steals"
                    className="w-1/6"
                />
                <input
                    type="number"
                    value={player.blocks}
                    onChange={(e) => handlePlayerChange('blocks', e.target.value)}
                    placeholder="Blocks"
                    className="w-1/6"
                />
                <input
                    type="number"
                    value={player.fouls}
                    onChange={(e) => handlePlayerChange('fouls', e.target.value)}
                    placeholder="Fouls"
                    className="w-1/6"
                />
            </div>
        </div>
    );
}


export default function GameDetailsForm({ localTeam, visitTeam, handleLocalPlayerChange, handleVisitPlayerChange }) {
    return (
        <div className="grid grid-cols-2 gap-4">
            <div>
                <h2 className="text-lg font-semibold mb-2">Local Team</h2>
                {/* {localTeam.players.map((player, index) => (
                    <StatsPlayer
                        key={index}
                        player={player}
                        handlePlayerChange={(field, value) => handleLocalPlayerChange(index, field, value)}
                    />
                ))} */}
            </div>
            <div>
                <h2 className="text-lg font-semibold mb-2">Visit Team</h2>
                {/* {visitTeam.players.map((player, index) => (
                    <StatsPlayer
                        key={index}
                        player={player}
                        handlePlayerChange={(field, value) => handleVisitPlayerChange(index, field, value)}
                    />
                ))} */}
            </div>
        </div>
    );
}

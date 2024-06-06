import React from 'react';

const PlayerStats = ({ player }) => {
    return (
        <div className="flex justify-between items-center bg-gray-100 p-4 mb-2 rounded">
            <div className="flex items-center">
                {/* <div className="font-semibold">{player.player.full_name}</div> */}
            </div>
            <div className="flex items-center space-x-4">
                <div className="stat">{player.points}</div>
                <div className="stat">{player.rebounds}</div>
                <div className="stat">{player.assists}</div>
                <div className="stat">{player.steals}</div>
                <div className="stat">{player.blocks}</div>
            </div>
        </div>
    );
};

export default PlayerStats;

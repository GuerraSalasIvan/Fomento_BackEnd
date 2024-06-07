// ui/components/cards/players/GameDetail.jsx
import React from 'react';

export default function PlayerDetail({ player, team, index, isHeader }) {
    if (isHeader) {
        return (
            <div className="grid grid-cols-12 gap-2 p-2 mb-2 font-medium border-b border-menu-bg-300">
                <div className="font-bold">Nº</div>
                <div className="col-span-5 font-bold">Nombre</div>
                <div className="text-center font-bold border-l border-menu-bg-300">Pts</div>
                <div className="text-center font-bold">Reb</div>
                <div className="text-center font-bold">Ast</div>
                <div className="text-center font-bold">Rob</div>
                <div className="text-center font-bold">Tap</div>
                <div className="text-center font-bold">F.P</div>
            </div>
        );
    }

    const playerInfo = team.players.find(p => p.id === player.player_id);
    const coaches = team.players.find(p => p.position === 0);
    const rowStyle = index % 2 === 0 ? '' : 'bg-menu-bg-50';

    return (
        <div className={`grid grid-cols-12 gap-2 p-2 border-b border-menu-bg-300 ${rowStyle}`}>
            <div className="truncate font-medium">{player.number}</div>
            <div className="col-span-5 font-medium truncate">{playerInfo.full_name}</div>
            <div className="text-center truncate border-l border-menu-bg-300">{player.points}</div>
            <div className="text-center truncate">{player.rebounds}</div>
            <div className="text-center truncate">{player.assists}</div>
            <div className="text-center truncate">{player.steals}</div>
            <div className="text-center truncate">{player.blocks}</div>
            <div className="text-center truncate">{player.fouls}</div>
        </div>
    );
}

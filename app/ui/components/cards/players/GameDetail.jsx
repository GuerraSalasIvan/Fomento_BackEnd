import React from 'react';

export default function PlayerDetail({ player, team, index, isHeader }) {
    if (isHeader) {
        return (
            <thead className="bg-gray-50">
                <tr className="font-bold">
                    <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nº</th>
                    <th className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-5">Nombre</th>
                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pts</th>
                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Reb</th>
                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ast</th>
                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Rob</th>
                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Tap</th>
                    <th className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">F.P</th>
                </tr>
            </thead>
        );
    }

    const playerInfo = team.players.find(p => p.id === player.player_id);
    const rowStyle = index % 2 === 0 ? '' : 'bg-menu-bg-50';

    return (
        <tr className={`border-b border-menu-bg-300 ${rowStyle}`}>
            <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{player.number}</td>
            <td className="px-1 py-4 whitespace-nowrap text-sm text-gray-500 col-span-5">{playerInfo.full_name}</td>
            <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500">{player.points}</td>
            <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500">{player.rebounds}</td>
            <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500">{player.assists}</td>
            <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500">{player.steals}</td>
            <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500">{player.blocks}</td>
            <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500">{player.fouls}</td>
        </tr>
    );
}

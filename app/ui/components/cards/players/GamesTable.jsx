import React from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

export default function GamesTable({ gameData }) {
    return (
        <div className="overflow-x-auto">
            
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr className='font-bold'>
                        <th scope="col" className="px-1 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Fecha
                        </th>
                        <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">
                            Rival
                        </th>
                        <th scope="col" className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">
                            Pts
                        </th>
                        <th scope="col" className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">
                            Reb
                        </th>
                        <th scope="col" className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">
                            Ast
                        </th>
                        <th scope="col" className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">
                            Rob
                        </th>
                        <th scope="col" className="px-1 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider col-span-2">
                            Tap
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {gameData.map((game) => (
                        <tr key={game.id} className='hover:bg-gray-100'>
                            <td className="px-1 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {format(new Date(game.game.match_date), "EEE. dd/MM", { locale: es })}
                            </td>
                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 col-span-2">
                                {game.rival_team}
                            </td>
                            <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500 col-span-2">
                                {game.points}
                            </td>
                            <td className=" py-4 whitespace-nowrap text-center text-sm text-gray-500 col-span-2">
                                {game.rebounds}
                            </td>
                            <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500 col-span-2">
                                {game.assists}
                            </td>
                            <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500 col-span-2">
                                {game.steals}
                            </td>
                            <td className="py-4 whitespace-nowrap text-center text-sm text-gray-500 col-span-2">
                                {game.blocks}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

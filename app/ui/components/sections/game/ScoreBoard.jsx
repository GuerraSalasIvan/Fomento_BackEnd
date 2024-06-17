import React, { useState } from 'react';
import axios from '@/lib/axios';
import { useAuth } from '@/hooks/auth';

export default function ScoreBoard({ local, localscore, visit, visitscore, gameId }) {
    const [scoreHistory, setScoreHistory] = useState([]);
    const [activeQuarter, setActiveQuarter] = useState('');
    const { user } = useAuth({ middleware: 'guest', redirectIfAuthenticated: '' });

    const handleSaveScore = (quarter) => {
        let localQuarterScore = 0;
        let visitQuarterScore = 0;

        const firstQuarter = scoreHistory.find(score => score.quarter === '1º cuarto');
        const secondQuarter = scoreHistory.find(score => score.quarter === '2º cuarto');
        const thirdQuarter = scoreHistory.find(score => score.quarter === '3º cuarto');

        switch (quarter) {
            case '1º cuarto':
                localQuarterScore = localscore;
                visitQuarterScore = visitscore;
                setActiveQuarter('2º cuarto');
                break;
            case '2º cuarto':
                localQuarterScore = localscore - (firstQuarter?.localScore || 0);
                visitQuarterScore = visitscore - (firstQuarter?.visitScore || 0);
                setActiveQuarter('3º cuarto');
                break;
            case '3º cuarto':
                localQuarterScore = localscore - (firstQuarter?.localScore || 0) - (secondQuarter?.localScore || 0);
                visitQuarterScore = visitscore - (firstQuarter?.visitScore || 0) - (secondQuarter?.visitScore || 0);
                setActiveQuarter('4º cuarto');
                break;
            case '4º cuarto':
                localQuarterScore = localscore - (firstQuarter?.localScore || 0) - (secondQuarter?.localScore || 0) - (thirdQuarter?.localScore || 0);
                visitQuarterScore = visitscore - (firstQuarter?.visitScore || 0) - (secondQuarter?.visitScore || 0) - (thirdQuarter?.visitScore || 0);
                break;
            default:
                break;
        }

        const newScore = {
            quarter: quarter,
            localScore: localQuarterScore,
            visitScore: visitQuarterScore
        };

        setScoreHistory(prevScoreHistory => [...prevScoreHistory, newScore]);
    };

    const handleFinish = async () => {
        setActiveQuarter('Fin');

        const data = {
            game_id: gameId,
            local_first_cuarter: scoreHistory.find(score => score.quarter === '1º cuarto')?.localScore || 0,
            visit_first_cuarter: scoreHistory.find(score => score.quarter === '1º cuarto')?.visitScore || 0,
            local_second_cuarter: scoreHistory.find(score => score.quarter === '2º cuarto')?.localScore || 0,
            visit_second_cuarter: scoreHistory.find(score => score.quarter === '2º cuarto')?.visitScore || 0,
            local_third_cuarter: scoreHistory.find(score => score.quarter === '3º cuarto')?.localScore || 0,
            visit_third_cuarter: scoreHistory.find(score => score.quarter === '3º cuarto')?.visitScore || 0,
            local_fourth_cuarter: scoreHistory.find(score => score.quarter === '4º cuarto')?.localScore || 0,
            visit_fourth_cuarter: scoreHistory.find(score => score.quarter === '4º cuarto')?.visitScore || 0,
            mvp: 0,
        };

        axios.post('/api/gameDetail', data)
            .then(response => {
                // console.log('Data saved successfully:', response.data);
            })
            .catch(error => {
                // console.error('There was an error saving the data!', error);
            });
    };

    return (
        <div className='bg-menu-bg-950 text-white p-3 rounded m-3 overflow-x-auto'>
            <h1 className='text-3xl font-extrabold text-center mb-5'>Marcador</h1>
            <div className='flex flex-col sm:flex-row sm:justify-around items-center text-center sm:text-2xl font-bold'>
                <div className='mb-2 sm:mb-0'>
                    {local}
                </div>
                <div className='text-3xl mb-2 sm:mb-0'>
                    {localscore}
                </div>
                <div className='text-3xl mb-2 sm:mb-0'>
                    -
                </div>
                <div className='text-3xl mb-2 sm:mb-0'>
                    {visitscore}
                </div>
                <div>
                    {visit}
                </div>
            </div>


            <div className="overflow-x-auto mt-5">
                <table className="w-full">
                    <thead>
                        <tr>
                            <th className="px-4 py-2"></th>
                            <th className="border px-4 py-2">1º Cuarto</th>
                            <th className="border px-4 py-2">2º Cuarto</th>
                            <th className="border px-4 py-2">3º Cuarto</th>
                            <th className="border px-4 py-2">4º Cuarto</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border px-4 py-2">{local}</td>
                            {['1º cuarto', '2º cuarto', '3º cuarto', '4º cuarto'].map((quarter, index) => (
                                <td key={index} className="border px-4 py-2">
                                    {scoreHistory.find(score => score.quarter === quarter)?.localScore || ''}
                                </td>
                            ))}
                        </tr>
                        <tr>
                            <td className="border px-4 py-2">{visit}</td>
                            {['1º cuarto', '2º cuarto', '3º cuarto', '4º cuarto'].map((quarter, index) => (
                                <td key={index} className="border px-4 py-2">
                                    {scoreHistory.find(score => score.quarter === quarter)?.visitScore || ''}
                                </td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="mt-5 flex flex-wrap justify-around">
                <button className={`w-full lg:w-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${activeQuarter !== '' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleSaveScore('1º cuarto')} disabled={activeQuarter !== ''}>
                    1º Cuarto
                </button>
                <button className={`w-full lg:w-auto mt-2 lg:mt-0 lg:ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${activeQuarter !== '2º cuarto' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleSaveScore('2º cuarto')} disabled={activeQuarter !== '2º cuarto'}>
                    2º Cuarto
                </button>
                <button className={`w-full lg:w-auto mt-2 lg:mt-0 lg:ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${activeQuarter !== '3º cuarto' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleSaveScore('3º cuarto')} disabled={activeQuarter !== '3º cuarto'}>
                    3º Cuarto
                </button>
                <button className={`w-full lg:w-auto mt-2 lg:mt-0 lg:ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${activeQuarter !== '4º cuarto' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleSaveScore('4º cuarto')} disabled={activeQuarter !== '4º cuarto'}>
                    4º Cuarto
                </button>
                <button className={`w-full lg:w-auto mt-2 lg:mt-0 lg:ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${activeQuarter !== '4º cuarto' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleFinish} disabled={activeQuarter !== '4º cuarto'}>
                    Fin
                </button>
            </div>
        </div>
    );
}

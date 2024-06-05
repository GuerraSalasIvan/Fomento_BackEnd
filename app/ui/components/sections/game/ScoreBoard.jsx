import React, { useState } from 'react';

export default function ScoreBoard({ local, localscore, visit, visitscore }) {
    const [scoreHistory, setScoreHistory] = useState([]);
    const [activeQuarter, setActiveQuarter] = useState('');

    const handleSaveScore = (quarter) => {
        let localQuarterScore = 0;
        let visitQuarterScore = 0;

        switch (quarter) {
            case '1º cuarto':
                localQuarterScore = localscore;
                visitQuarterScore = visitscore;
                setActiveQuarter('2º cuarto');
                break;
            case '2º cuarto':
                localQuarterScore = localscore - scoreHistory.find(score => score.quarter === '1º cuarto')?.localScore || 0;
                visitQuarterScore = visitscore - scoreHistory.find(score => score.quarter === '1º cuarto')?.visitScore || 0;
                setActiveQuarter('3º cuarto');
                break;
            case '3º cuarto':
                localQuarterScore = localscore - scoreHistory.find(score => score.quarter === '2º cuarto')?.localScore || 0;
                visitQuarterScore = visitscore - scoreHistory.find(score => score.quarter === '2º cuarto')?.visitScore || 0;
                setActiveQuarter('4º cuarto');
                break;
            case '4º cuarto':
                localQuarterScore = localscore - scoreHistory.find(score => score.quarter === '3º cuarto')?.localScore || 0;
                visitQuarterScore = visitscore - scoreHistory.find(score => score.quarter === '3º cuarto')?.visitScore || 0;
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

    const handleFinish = () => {
        setActiveQuarter('Fin');
    };

    return (
        <div className='bg-menu-bg-950 text-white p-3 rounded m-3'>
            <h1 className='text-3xl font-extrabold text-center mb-5'>Marcador</h1>
            <div className='flex justify-around text-2xl font-bold'>
                <div>{local}</div>
                <div className='text-3xl'>{localscore}</div>
                <div> - </div>
                <div className='text-3xl'>{visitscore}</div>
                <div>{visit}</div>
            </div>

            <table className="mt-5 w-full">
                <thead>
                    <tr>
                        <th className="px-4 py-2"></th>
                        {scoreHistory.map((score, index) => (
                            <th key={index} className="border px-4 py-2">{score.quarter}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border px-4 py-2">{local}</td>
                        {scoreHistory.map((score, index) => (
                            <td key={index} className="border px-4 py-2">{score.localScore}</td>
                        ))}
                    </tr>
                    <tr>
                        <td className="border px-4 py-2">{visit}</td>
                        {scoreHistory.map((score, index) => (
                            <td key={index} className="border px-4 py-2">{score.visitScore}</td>
                        ))}
                    </tr>
                </tbody>
            </table>

            <div className="mt-5 flex justify-around">
                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${activeQuarter !== '' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleSaveScore('1º cuarto')} disabled={activeQuarter !== ''}>
                    1º Cuarto
                </button>
                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${activeQuarter !== '2º cuarto' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleSaveScore('2º cuarto')} disabled={activeQuarter !== '2º cuarto'}>
                    2º Cuarto
                </button>
                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${activeQuarter !== '3º cuarto' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleSaveScore('3º cuarto')} disabled={activeQuarter !== '3º cuarto'}>
                    3º Cuarto
                </button>
                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${activeQuarter !== '4º cuarto' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={() => handleSaveScore('4º cuarto')} disabled={activeQuarter !== '4º cuarto'}>
                    4º Cuarto
                </button>
                <button className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${activeQuarter !== '4º cuarto' ? 'opacity-50 cursor-not-allowed' : ''}`} onClick={handleFinish} disabled={activeQuarter !== '4º cuarto'}>
                    Fin
                </button>
            </div>
        </div>
    );
}

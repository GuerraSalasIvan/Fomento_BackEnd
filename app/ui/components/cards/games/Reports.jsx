import React from 'react';

const GameReports = ({ game }) => {
    return (
        <div className="col-12 flex justify-center">
            <div className="col-10">
                <div className="flex flex-col justify-center items-center bg-blue-100 border border-blue-700">
                    <h2 className="mb-0 p-4">Incidencias y observaciones</h2>
                    <div className="bg-white border-t border-blue-700 p-4 w-full">
                        {game.reports}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GameReports;

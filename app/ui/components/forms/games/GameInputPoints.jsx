import React from 'react'

export default function GameInputPoints({value, change, clickplus, clickminus}) {
    return (
        <div className="flex flex-col items-center space-y-1">
            <div className="w-full flex">
                <input
                    type="number"
                    value={value}
                    onChange={change}
                    className="custom-number-input w-1/2 border rounded mr-1 pl-1"
                />
                    <div className="flex space-x-1 w-1/2">
                        <button className="bg-menu-bg-950 text-white px-2 py-1 rounded border" onClick={clickplus}>+2</button>
                        <button className="bg-menu-bg-950 text-white px-2 py-1 rounded border" onClick={clickminus}>+3</button>
                </div>
            </div>
        </div>
    )
}

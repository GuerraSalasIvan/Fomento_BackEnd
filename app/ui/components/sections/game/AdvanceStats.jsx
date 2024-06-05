import React from 'react'

export default function AdvanceStats({local, localscore, visit, visitscore}) {
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
            </div>
        )
}

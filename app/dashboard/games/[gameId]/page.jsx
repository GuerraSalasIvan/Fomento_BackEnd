import React from 'react'

export default function page({ params }) {

    const { gameId } = params;
    return (
        <div>{gameId}</div>
    )
}

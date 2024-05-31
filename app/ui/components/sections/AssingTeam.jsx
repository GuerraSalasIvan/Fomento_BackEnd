import React from 'react';
import { useAuth } from '@/hooks/auth';


function AssingTeam() {

    const { user } = useAuth({ middleware: 'guest' });

    return (
        <div>AssingTeam
            <p>{user ? user.name : 'No logueado'}</p>
        </div>
    )
}

export default AssingTeam
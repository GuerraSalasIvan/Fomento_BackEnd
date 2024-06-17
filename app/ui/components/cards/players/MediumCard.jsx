import Link from '@mui/material/Link';
import Image from 'next/image';
import MockImage from '@/public/assests/img/default_avatar.jpg';

const positionMap = {
    0: 'Entrenador',
    1: 'Base',
    2: 'Escolta',
    3: 'Alero',
    4: 'Ala-Pivot',
    5: 'Pivot',
    6: 'Equipo'
};

const PlayerCard = ({ player }) => {
    const positionName = positionMap[player.position] || 'Desconocido';

    return (
        <Link href={`/dashboard/players/${player.id}`} underline="none">
            <div className="player-card bg-white border border-white shadow-md rounded-lg p-4 m-2 flex flex-col items-center transition-transform transform hover:scale-105 hover:border-menu-bg-100 hover:bg-menu-bg-100">
                <div className="image-container flex justify-center items-center w-full h-32">
                    <Image src={player.imageURL || MockImage} alt="alt" width={100} height={100} className="h-28 w-28 rounded-full object-cover" />
                </div>
                <h3 className="text-lg font-bold mt-4">
                    {player.full_name.length > 22 ? `${player.full_name.substring(0, 19)}...` : player.full_name}
                </h3>
                <p className="text-gray-700">{positionName}</p>
            </div>
        </Link>
    );
};

export default PlayerCard;

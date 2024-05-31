import Link from '@mui/material/Link';
import Image from 'next/image';
import MockImage from '@/public/assests/img/default_avatar.jpg';

const PlayerCard = ({ player }) => {

    return (
    <Link  href={`/dashboard/players/${player.id}`}>
        <div className="bg-white shadow-md rounded-lg p-4 m-2">
            <Image src={player.imageURL || MockImage} alt="alt" width={100} height={100} />
            <h3 className="text-lg font-bold">{player.full_name}</h3>
            <p className="text-gray-700">Fecha de nacimiento: {player.birthdate}</p>
            <p className="text-gray-500">ID: {player.id}</p>
        </div>
    </Link>
    );
};

export default PlayerCard;
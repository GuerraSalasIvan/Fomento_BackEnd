import Link from 'next/link';
import DarkTitle from '@/app/ui/components/titles/DarkTitle';

export default function Page() {
    return (
        <>
            <div>
                <DarkTitle text={'Eventos'} />
            </div>

            <div className='p-2.5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                <Link href='/dashboard/events/newgame' className='no-underline hover:no-underline'>
                    <div className='card flex items-center justify-center p-4 border rounded-lg cursor-pointer bg-white shadow-md transition-transform transform hover:scale-105 hover:bg-gray-100'>
                        <p className='text-title-dark-700 font-bold'>Crear partido</p>
                    </div>
                </Link>

                <Link href='/dashboard/games' className='no-underline hover:no-underline'>
                    <div className='card flex items-center justify-center p-4 border rounded-lg cursor-pointer bg-white shadow-md transition-transform transform hover:scale-105 hover:bg-gray-100'>
                        <p className='text-title-dark-700 font-bold'>Resultado de partidos </p>
                    </div>
                </Link>

                <Link href='/dashboard/games/arbitrate' className='no-underline hover:no-underline'>
                    <div className='card flex items-center justify-center p-4 border rounded-lg cursor-pointer bg-white shadow-md transition-transform transform hover:scale-105 hover:bg-gray-100'>
                        <p className='text-title-dark-700 font-bold'>Arbitrar partido</p>
                    </div>
                </Link>
            </div>
        </>
    );
}

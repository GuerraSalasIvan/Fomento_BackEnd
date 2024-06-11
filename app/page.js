'use client'

import LoginLinks from '@/app/LoginLinks';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';



const Home = () => {
    const router = useRouter();
    useEffect(() => {
        // Redirigir a /login cuando se cargue el componente
        router.push('/login');
    }, [router]);
    return (null)
}

export default Home

import React from 'react';
import Link from 'next/link';

export default function BackButton({url}) {
    return (
        <Link className='inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-menu-bg-950 hover:text-primary-600 hover:bg-menu-bg-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500' href={url}>Volver</Link>
    )
}

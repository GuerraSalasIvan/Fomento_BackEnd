import Link from 'next/link'
import AuthCard from '@/app/(auth)/AuthCard'
import ApplicationLogo from '@/components/ApplicationLogo'
import Image from 'next/image'
import fondo from '@/public/assests/img/fondo_login.jpeg';
import Logo from '@/public/assests/img/logo_mz_rosa.png';

export const metadata = {
    title: 'Laravel',
}

const Layout = ({ children }) => {
    return (
        <div>
            <div className="font-sans text-gray-900 antialiased">
                <Image
                    src={fondo}
                    alt="Logo de la empresa 10Code"
                    layout="fill"
                    className="mx-auto -z-50 opacity-85"
                />
                <AuthCard
                    logo={
                        <Link href="/">
                            <Image src={Logo} alt="Logo" width={200} height={200} />
                        </Link>
                    }
                >
                    {children}
                </AuthCard>
            </div>
        </div>
    );
}

export default Layout;

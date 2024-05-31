import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
  StarIcon,
  CalendarDaysIcon,
  PresentationChartBarIcon,
  UsersIcon,
  BanknotesIcon,
  Squares2X2Icon,
  NewspaperIcon,
  AcademicCapIcon,
  ChartBarIcon,
  BookmarkIcon,
} from '@heroicons/react/24/outline';




// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  { name: 'INICIO', href: '/dashboard', icon: HomeIcon },
  { name: 'CATEGORIAS', href: '/dashboard', icon: StarIcon },
  { name: 'ASIGNATURAS', href: '/dashboard', icon: ChartBarIcon },
  { name: 'PROFESORADO', href: '/dashboard', icon: PresentationChartBarIcon },
  { name: 'ALUMNADO', href: '/dashboard', icon: AcademicCapIcon },
  { name: 'MATRÍCULAS', href: '/dashboard', icon: BookmarkIcon },
  { name: 'EVENTOS', href: '/dashboard/events', icon: CalendarDaysIcon },
  { name: 'NOTICIAS', href: '/dashboard', icon: NewspaperIcon },
  { name: 'ESPACIOS', href: '/dashboard/ubications', icon: Squares2X2Icon },
  { name: 'PAGOS', href: '/dashboard', icon: BanknotesIcon },
  { name: 'ROLES', href: '/dashboard', icon: UsersIcon },


];


export default function NavLinks() {
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          
          <a
            key={link.name}
            href={link.href}
            className="flex grow items-center justify-center gap-1.5 w-30 rounded-md p-3 text-sm font-medium text-white hover:bg-sidebar-hover-200 hover:bg-opacity-30 hover:font-bold md:flex-none md:justify-start md:p-2 md:px-3"
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </a>
        );
      })}
    </>
  );
}

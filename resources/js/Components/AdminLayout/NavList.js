import { MdDashboard } from 'react-icons/md';
import { BsBuilding } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { BiGame, BiImages } from 'react-icons/bi';
import { CgListTree } from 'react-icons/cg';
import { FaRegObjectUngroup } from 'react-icons/fa';

const NavList = [
  {
    path: '/management',
    title: 'Dashboard',
    Icon: MdDashboard,
  },
  {
    path: '/management/tenants',
    title: 'Tenants',
    Icon: BsBuilding,
  },
  {
    path: '/management/users',
    title: 'Users',
    Icon: FiUsers,
  },
  {
    path: '/management/games',
    title: 'Games',
    Icon: BiGame,
  },
  {
    path: '/management/categories',
    title: 'Categories',
    Icon: CgListTree,
  },
  {
    path: '/management/images',
    title: 'Images',
    Icon: FaRegObjectUngroup,
  },
  {
    path: '/management/backgrounds',
    title: 'Backgrounds',
    Icon: BiImages,
  },
];

export default NavList;
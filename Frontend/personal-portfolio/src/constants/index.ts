import { faHistory, faDatabase, faInfoCircle, faSignOutAlt, faFileCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCheckCircle,faHome,faBlog, faExclamationTriangle, faRobot, faUserFriends, faFileAlt,faUser, faFileImport } from '@fortawesome/free-solid-svg-icons';

export const navItems = [
    {text: "Home", link: '/dashboard/home'},
    {text: "Blog", link: '/dashboard/blog'},
    {text: "Profile", link:'/dashboard/profile'}
]


export const menuItems = [

    { icon: faHome, text: "Home", url: '/dashboard/home' },
    { icon: faUser, text: "Profile", url: '/dashboard/profile' },
    { icon: faBlog, text: "Blog", url: '/dashboard/blog' },
    { icon: faSignOutAlt, text: "Logout",  }
 
   
];
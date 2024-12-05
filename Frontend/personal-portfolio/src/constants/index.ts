import {  faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit,faHome,faBlog, faUser} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

export const navItems = [
    {text: "Home", link: '/dashboard/home'},
    {text: "Blog", link: '/dashboard/blog'},
    {text: "Profile", link:'/dashboard/profile'}
]


export const menuItems = [

    { icon: faHome, text: "Home", url: '/dashboard/home' },
    { icon: faUser, text: "Profile", url: '/dashboard/profile' },
    { icon: faUserEdit, text: "Manage Users", url: '/dashboard/user' },
    { icon: faBlog, text: "Blog", url: '/dashboard/blog' },
   
    { icon: faSignOutAlt, text: "Logout",  }
 
   
];


export const activities = [
    { id: 1, title: 'Activity 1', link: 'https://colab.research.google.com/' },
    { id: 2, title: 'Activity 2', link: 'https://colab.research.google.com/' },
    { id: 3, title: 'Activity 3', link: 'https://colab.research.google.com/' },
    { id: 4, title: 'Activity 4', link: 'https://colab.research.google.com/' },
    { id: 5, title: 'Activity 5', link: 'https://colab.research.google.com/' },
    { id: 6, title: 'Activity 6', link: 'https://colab.research.google.com/' },
  ];

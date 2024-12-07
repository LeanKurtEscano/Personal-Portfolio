import {  faSignOutAlt} from '@fortawesome/free-solid-svg-icons';
import { faUserEdit,faHome,faBlog, faUser} from '@fortawesome/free-solid-svg-icons';

import act1 from "../assets/act1.png"
import act2 from "../assets/act2.png"
import act3 from "../assets/act3.png"
import act4 from "../assets/act4.png"
import act5 from "../assets/act5.png"
import act6 from "../assets/act6.png"


export const activitiesOop = [
    { img: act1, link: "https://colab.research.google.com/drive/1v5kAknAEkkTsKicw0OboKoWsiR1OJh-a?authuser=1", title: "Activity 1" },
    { img: act2, link: "https://colab.research.google.com/drive/19rVNe9NMK_DoWi5SQSdTKHb339Oqw2O9?authuser=1", title: "Activity 2" },
    { img: act3, link: "https://colab.research.google.com/drive/1s-gfycDqdWxLT_DXQimxIeiHNoRv1dTO?authuser=1", title: "Activity 3" },
    { img: act4, link: "https://colab.research.google.com/drive/1dwUUsNqUfkj7zElVyvTNQqSqnRnsVaVs?authuser=1", title: "Activity 4" },
    { img: act5, link: "https://colab.research.google.com/drive/1J0ItL1nLy_YeR5W9Dz-X3cs8nXiTDQ-S?authuser=1", title: "Activity 5" },
    { img: act6, link: "https://colab.research.google.com/drive/1DTuZMqfj14FQviSDTIc7eKGIsn_YZwqZ?authuser=1", title: "Activity 6" },
    { img: null, link: "#", title: "Activity 7" },
    { img: null, link: "#", title: "Activity 8" },
    { img: null, link: "#", title: "Activity 9" },
  ];
  
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

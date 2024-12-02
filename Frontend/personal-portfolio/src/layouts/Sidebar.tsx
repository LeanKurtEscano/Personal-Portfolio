import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { menuItems } from '../constants';
import { Link } from 'react-router-dom';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useMyContext } from '../context/MyContext';



const Sidebar: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [toggle, setToggle] = useState<boolean>(true);
  const navigate = useNavigate();


  const { isAuthenticated, userDetails, setUserDetails, setToggleLog } = useMyContext();

  const toUserProfile = () => {
    navigate('/dashboard/profile');
    setActiveIndex(3);
  }




  const handleMenuClick = (index: number) => {
    if (index === 3) {
      setToggleLog(true);
    } else {
      setActiveIndex(index);
    }
  };

  const showSideBar = () => {
    setToggle(!toggle);
  };


  return (
    <aside
      className={`fixed top-0 left-0 h-full transition-all duration-700 z-10 bg-loginbg shadow-sm
    ${toggle ? 'w-16' : 'w-64'}`}
    >

      <div className='flex justify-center align-center absolute pl-3 pt-4'>
        <button onClick={showSideBar} className='w-4'>
          <FontAwesomeIcon icon={toggle ? faBars : faTimes} className='text-cyan-400' />
        </button>
      </div>

      <div
        className={`flex items-center justify-center transition-all duration-300 cursor-pointer ${toggle ? 'opacity-0' : 'opacity-100'}`}
        onClick={toUserProfile}
        style={{ height: '80px', visibility: toggle ? 'hidden' : 'visible' }}
      >
        <div className='flex p-2 hover:bg-gray-800 rounded-lg flex-col items-center'>
          <div className='w-full flex '>
            <p className='text-slate-200 text-xs'>{userDetails.username}</p>
          </div>
          <div className='overflow-hidden'>
            <p className='flex text-gray-400 text-xs'>{userDetails.email}</p>
          </div>
        </div>
      </div>


      <nav className='h-auto flex flex-col justify-center p-4 items-center pb-20'>
        {menuItems.map((item, index) => (
          <div
            key={index}
            onClick={() => handleMenuClick(index)}
            className={`flex flex-row items-center w-full h-11 p-4 mb-3 transition-all duration-500 rounded-full 
          ${activeIndex === index ? 'bg-cyan-500 text-cyan-500' : 'hover:bg-cyan-500 hover:text-white group'}
          ${toggle ? 'w-full h-11 pr-8' : ''}`}
          >

            <div className='mr-1 '>
              <Link to={item.url ?? "/"}>
                <FontAwesomeIcon
                  icon={item.icon}
                  className={`transition-colors duration-300 
              ${activeIndex === index ? 'text-white' : 'text-cyan-500 group-hover:text-white'}`}
                />
              </Link>
            </div>

            <div className={`flex justify-center items-center w-full pr-5 overflow-hidden  
           ${toggle ? 'max-w-0 opacity-0' : 'max-w-full opacity-100'}`}>
              <p className={`pl-4 duration-500 whitespace-nowrap transition-opacity
            ${activeIndex === index ? 'text-white' : 'text-cyan-500 group-hover:text-white'}`}
              >
                <Link to={item.url ?? "/"}>{item.text}</Link>
              </p>
            </div>
          </div>
        ))}
      </nav>
    </aside>


  );
};

export default Sidebar;
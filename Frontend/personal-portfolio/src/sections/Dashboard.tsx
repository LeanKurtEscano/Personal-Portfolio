import React from 'react'
import { Outlet } from 'react-router-dom';
import Sidebar from '../layouts/Sidebar';

const Dashboard = () => {
  return (
    <div className='h-screen'>
    <div className=''>
    <Sidebar />
    </div>
    <div>
      <Outlet/>
    </div>
  </div>
  )
}

export default Dashboard
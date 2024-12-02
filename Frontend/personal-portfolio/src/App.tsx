import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Personal from './sections/Personal'
import './App.css'
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { MyProvider } from './context/MyContext';
import Navbar from './layouts/Navbar'
import Profile from './sections/Profile';
import ProtectedRoutes from './context/ProtectedRoutes';
import LogOut from './components/Logout'
import Dashboard from './sections/Dashboard';
import { useMyContext } from './context/MyContext';
import Blog from './sections/Blog'
import About from './sections/About'
import Login from './sections/Login'
import { useEffect } from 'react'
import axios from 'axios'
function App() {
  return (
    <MyProvider>
      <Main />
    </MyProvider>
  );
}




const Main: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated, toggleLog } = useMyContext();

  useEffect(() => { 
    if (isAuthenticated) {
      localStorage.setItem('currentPath', location.pathname);
    }
  }, [location, isAuthenticated]);
 
  useEffect(() => {
    const sessionID = localStorage.getItem("session");

    if(sessionID) {
      setIsAuthenticated(true);
    }
  }, []);

 
  

  useEffect(() => {
    if (isAuthenticated && location.pathname === '/') {
      navigate('/dashboard/home');
    }
  }, [isAuthenticated, location.pathname, navigate]);



  return (
    <>
      <Navbar />

      {toggleLog && (
        <LogOut />
      )}

      <Routes>
        <Route path = "/" element={<> <Login /> </>}/>
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
          <Route path="" element={<Navigate to="/dashboard/home" replace />} />
          <Route path="home" element={<>
            <Personal />
            <About/></>} />
          <Route path="home" element={<Blog />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>

    </>
  );
}

export default App;

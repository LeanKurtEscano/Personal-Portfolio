import { useState, useEffect } from 'react';
import Personal from './sections/Personal';
import './App.css';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { MyProvider } from './context/MyContext';
import Navbar from './layouts/Navbar';
import ProtectedRoutes from './context/ProtectedRoutes';
import LogOut from './components/Logout';
import Dashboard from './sections/Dashboard';
import { useMyContext } from './context/MyContext';
import Blog from './sections/Blog';
import About from './sections/About';
import Login from './sections/Login';
import Profile from './sections/Profile';


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
      localStorage.setItem('currentPath', location.pathname);  // Save the current path
    }
  }, [location, isAuthenticated]);


  useEffect(() => {
    const sessionID = localStorage.getItem("session");

    if(sessionID) {
      setIsAuthenticated(true);
    }
    
   
    const savedPath = localStorage.getItem('currentPath');
    if (savedPath) {
      navigate(savedPath);  // Navigate to the saved path
    } else if (isAuthenticated && location.pathname === '/') {
      navigate('/dashboard/home');
    }
  }, []);  // This runs once when the app loads

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
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <Dashboard />
            </ProtectedRoutes>
          }
        >
  
          <Route path="home" element={<><Personal /><About /></>} />
          <Route path="blog" element={<Blog />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;

import React from 'react';
import BlogForm from '../Components/BlogForm';
import Home from '../Components/Home';
import Login from '../Components/Login';
import NavBar from '../Shared/NavBar';
import { Outlet } from 'react-router-dom';

const Main = () => {
    return (
        <div>
           <NavBar></NavBar>
          
           <Outlet></Outlet>
        
        </div>
    );
};

export default Main;
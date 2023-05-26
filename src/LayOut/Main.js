import React from 'react';
import BlogForm from '../Components/BlogForm';
import Home from '../Components/Home';
import Login from '../Components/Login';
import NavBar from '../Shared/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Shared/Footer';

const Main = () => {
    return (
        <div className=''>
           <NavBar></NavBar>
          
           <Outlet></Outlet>
           <Footer></Footer>
        
        </div>
    );
};

export default Main;
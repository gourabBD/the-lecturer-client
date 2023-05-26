import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';

const FirstSection = () => {
    const {user,allUsers}=useContext(AuthContext)
    return (
        
        
        <div data-theme="synthwave" className=' grid gap-5 '>
             <Link
            to={"/"}
            className="border w-full font-medium btn btn-ghost normal-case text-sm shadow-2xl flex text-left"
          >
            Home
          </Link>
          {user?.uid ? <Link
            to={"/tests"}
            className="font-medium btn btn-ghost normal-case text-sm w-full  shadow-2xl flex text-left"
          >
            Tests
          </Link>:<></>}
          {allUsers?.map((users) =>
            users?.email === user?.email && users?.role === "admin551717" ? (
              <div  key={users?._id} className="gap-5 grid">

              <Link
               
                to={"/createblog"}
                className="font-medium btn btn-ghost normal-case text-sm w-full  shadow-2xl flex text-left"
              >
                Create a blog
              </Link>
              <Link
              to={"/Createtests"}
              className="font-medium btn btn-ghost normal-case  w-full shadow-2xl flex text-left text-sm"
            >
              Create tests
            </Link>
              </div>
            ) : (
              <div key={Math.random()}></div>
            )
          )}
        </div>
    );
};

export default FirstSection;
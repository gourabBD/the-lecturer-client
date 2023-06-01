import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { TypeAnimation } from "react-type-animation";
const FirstSection = () => {
    const {user,allUsers}=useContext(AuthContext)
    return (
        
        
        <div data-theme="synthwave" className=' grid gap-5 '>
             
          {user?.uid ?<div>
            <Link
            to={"/"}
            className="border w-full font-medium btn btn-ghost normal-case text-sm shadow-2xl flex text-left"
          >
            Home
          </Link>
          <Link
            to={"/tests"}
            className="font-medium btn btn-ghost normal-case text-sm w-full  shadow-2xl flex text-left"
          >
            Tests
          </Link>
          </div> :<div>
          <TypeAnimation
          sequence={["Login first to attend quizes!! ", 3000,"",2000,]}
          className="text-lg text-center font-medium  mt-10  text-blue-700"
          wrapper="span"
          cursor={false}
          repeat={Infinity}
          style={{ fontSize: "1.4em", display: "inline-block" }}
        />
          </div>}
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
              to={"/createTests"}
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
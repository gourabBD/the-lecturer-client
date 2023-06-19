import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import logo from "../android-chrome-192x192.png"
import { FiLogIn,FiLogOut } from 'react-icons/fi';
const NavBar = () => {
  const { user, logOut, allUsers } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((err) => console.log(err));
  };

  return (
    <div className="navbar  flex justify-between bg-base-100  lg:pr-5 lg:pl-5 bg-blue-500">
      <div className="flex gap-2">
      <Link to={"/"}>

      <img className=" h-32 rounded-full" src={logo} alt="" />
      </Link>
        <Link to={"/"} className="btn btn-ghost normal-case text-xl lg:flex md:flex hidden  align-middle">
       
          The Lecturer
        </Link>
      </div>

      <div className=" ">
      
        <div className=" lg:flex lg:items-center md:flex hidden">
        { allUsers?.map((users) =>
            users?.email === user?.email && users?.role === "admin551717" ?  <div key={users?._id} className="flex justify-start items-center ">
            <Link className="btn btn-ghost normal-case text-xl lg:flex md:hidden hidden" to={"/createblog"}>Create a blog</Link>
            <Link className="btn btn-ghost normal-case text-xl lg:flex md:hidden hidden" to={"/createTests"}>Create tests</Link>
            
     
     </div>: <div key={users?._id}></div>)}
         
          {user?.uid ? (
            <div className="flex items-center gap-2 ">
            <div className="flex justify-start items-center ">
            <Link className="btn btn-ghost normal-case text-xl lg:flex md:hidden hidden" to={"/tests"}>Tests</Link>
            </div>

              <p className=" font-semibold text-black text-sm  border border-primary  rounded p-2">
                {user?.displayName}
              </p>
              <button className="btn btn-error gap-2" onClick={handleLogOut}>
              <FiLogOut></FiLogOut>
                Sign out
              </button>
            </div>
          ) : (
            <Link
              to={"/login"}
              className="font-medium btn btn-ghost normal-case gap-2 text-lg"
            >
            <FiLogIn></FiLogIn>
              Login
            </Link>
          )}
        </div>
        <div className="dropdown dropdown-end lg:hidden md:hidden block">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <div
            tabIndex={0}
            className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 gap-2"
          >
            <Link
              to={"/"}
              className="font-medium btn btn-ghost normal-case text-md"
            >
              Home
            </Link>
           {user?.uid ? <Link
              to={"/tests"}
              className="font-medium btn btn-ghost normal-case text-md"
            >
              Tests
            </Link>:<></>}
            {allUsers?.map((users) =>
              users?.email === user?.email && users?.role ==="admin551717" ? (
                <div   key={users?._id} className="lg:flex md:flex">

                <Link
                
                  to={"/createblog"}
                  className="font-medium btn btn-ghost normal-case text-md"
                >
                  Create a blog
                </Link>
                 <Link
              to={"/Createtests"}
              className="font-medium btn btn-ghost normal-case text-md"
            >
              Create Tests
            </Link>
                </div>

                
              ) : (
                <div key={Math.random()}></div>
              )
            )}
            {user?.uid ? (
              <div className="block  p-1">
                {/* <Link to={"/createblog"} className="font-medium btn btn-ghost normal-case text-md">Create a blog</Link> */}
                <p className=" font-semibold text-sm mb-2 border border-primary  rounded p-2 mr-2 text-black ">
                  {user?.displayName}
                </p>
                <button className="btn btn-error gap-2" onClick={handleLogOut}>
                <FiLogOut></FiLogOut>
                  Sign out
                </button>
              </div>
            ) : (
              <Link
                to={"/login"}
                className="font-medium btn btn-ghost normal-case gap-2 text-md"
              >
               <FiLogIn></FiLogIn>
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

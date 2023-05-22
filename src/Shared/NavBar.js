import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const NavBar = () => {
    const { user, logOut,allUsers } = useContext(AuthContext);

  const handleLogOut = () => {
    logOut()
        .then(() => { })
        .catch(err => console.log(err));
}
   
  return (
    <div className="navbar  flex justify-between bg-base-100 lg:pr-5 lg:pl-5">
      <div className="">
      <Link to={"/"} className="btn btn-ghost normal-case text-xl">The Lecturer</Link>
      </div>
      
      <div className=" ">
       <div className="gap-5 lg:flex md:block hidden">
       <Link to={"/"} className="font-medium btn btn-ghost normal-case text-lg">Home</Link>
        <Link to={"/tests"} className="font-medium btn btn-ghost normal-case text-lg">Tests</Link>
        {
            allUsers?.map(users=>users?.email===user?.email && users?.role==="admin551717" ?<Link to={"/createblog"} className="font-medium btn btn-ghost normal-case text-lg">Create a blog</Link>:<></>)  
        }
        {user?.uid ?
        <>
       
            <button className="btn btn-error" onClick={handleLogOut}>Sign out</button>
        </>
        : <Link to={"/login"} className="font-medium btn btn-ghost normal-case text-lg">Login</Link>}
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
            <Link to={"/"} className="font-medium btn btn-ghost normal-case text-md">Home</Link>
        <Link to={"/tests"} className="font-medium btn btn-ghost normal-case text-md">Tests</Link>
        {
            allUsers?.map(users=>users?.email===user?.email && users?.role==="admin551717" ?<Link to={"/createblog"} className="font-medium btn btn-ghost normal-case text-md">Create a blog</Link>:<></>)  
        }
            {user?.uid ?
        <>
        {/* <Link to={"/createblog"} className="font-medium btn btn-ghost normal-case text-md">Create a blog</Link> */}
            <button className="btn btn-error" onClick={handleLogOut}>Sign out</button>
        </>
        : <Link to={"/login"} className="font-medium btn btn-ghost normal-case text-md">Login</Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

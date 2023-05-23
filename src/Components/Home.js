import React, { useContext, useEffect, useState } from "react";
import './TextEditor.css';
import  { AuthContext } from "../contexts/AuthProvider";
import Editpost from "./Editpost";
const Home = () => {
  const {allBlogs}=useContext(AuthContext)
  
  return (
    <div className="lg:p-10 ">
      {
        allBlogs?.map(blog=><Editpost key={blog?._id} blog={blog}> </Editpost>)
      }
    </div>
  );
};

export default Home;

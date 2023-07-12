import React, { useContext, useEffect, useState } from "react";
import "./TextEditor.css";
import { AuthContext } from "../contexts/AuthProvider";
import Editpost from "./Editpost";
import { useQuery } from "@tanstack/react-query";
import FirstSection from "./FirstSection";
const Home = () => {
  const { user,allBlogs } = useContext(AuthContext);
  //testing
  

  //testing
  return (
    <div className="lg:p-10   lg:flex     md:grid sm:grid grid gap-2 h-fit">
    <div  className=" lg:w-1/3 mt-10 relative  shadow-2xl  p-5 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 ">
    <div className="sticky  top-0">

  <FirstSection></FirstSection>
    </div>
   
    </div>
    <div className="overflow-y-auto overflow-x-hidden  w-full">

      {allBlogs?.map((blog) => (
        <Editpost key={blog?._id} blog={blog}>
          {" "}
        </Editpost>
      ))}
    </div>
    </div>
  );
};

export default Home;

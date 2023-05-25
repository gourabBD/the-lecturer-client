import React, { useContext, useEffect, useState } from "react";
import "./TextEditor.css";
import { AuthContext } from "../contexts/AuthProvider";
import Editpost from "./Editpost";
import { useQuery } from "@tanstack/react-query";
const Home = () => {
  const { user,allBlogs } = useContext(AuthContext);
  //testing
  

  //testing
  return (
    <div className="lg:p-10 min-h-screen overflow-x-hidden">
      {allBlogs?.map((blog) => (
        <Editpost key={blog?._id} blog={blog}>
          {" "}
        </Editpost>
      ))}
    </div>
  );
};

export default Home;

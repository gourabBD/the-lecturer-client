import React from 'react';
import  { useEffect, useState } from "react";
import './TextEditor.css';
const AllBlogs = () => {
    const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data);
      });
  }, [blogs]);
    return (
        <div className="allHeading p-10">
      {blogs?.map((blog) => (
        <div
          className="allHeading"
          key={blog?._id}
          dangerouslySetInnerHTML={{ __html: blog?.blogs }} 
          //
          //***********/ using html tags from strings ************ dangerouslySetInnerHTML={{ __html: blog?.blogs }} ***************
          //
        />
      ))}
    </div>
    );
};

export default AllBlogs;
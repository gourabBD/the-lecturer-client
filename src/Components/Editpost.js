import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { toast } from "react-hot-toast";
import 'react-quill/dist/quill.snow.css';

const Editpost = ({ blog }) => {
  const { allUsers, user } = useContext(AuthContext);
  const [currentTime, setCurrentTime] = useState("");

  //testing

  //testing
  
 
  const handleDeleteBlog = () => {
    const proceed = window.confirm(
      "Are you sure, you want to delete this blog?"
    );

    if (proceed) {
      fetch(`https://the-lecturer-server.vercel.app/allBlogs/${blog?._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success(`Blog deleted successfully!`);
          }
        });
    }
  };
  return (
    <div className="  mt-10  shadow-lg shadow-teal-500 border border-teal-500">
      <div className="p-2">
        <div
        
          className="p-5 mt-10 text-left   "
          key={blog?._id}
          dangerouslySetInnerHTML={{ __html: blog?.blogs }}
        />
        <div className="lg:flex md:flex grid justify-between items-center ">
        <p  className="text-accent mt-10 text-left">
                Author:{" "}
                <span className="font-semibold badge badge-accent shadow-lg shadow-yellow-500 badge-outline">
                  {blog?.author}
                </span>{" "}
              </p>
          
          <div className="mt-10 gap-5 font-semibold flex justify-around">
            <p className="">
              Date: <span>{blog?.date}</span>{" "}
            </p>
            <p>
              Time: <span>{blog?.time}</span> <span>{blog?.AmPm}</span>
            </p>
          </div>
        </div>
      </div>

      {/* admin conditions */}

      {allUsers?.map((users) =>
        user?.email === users?.email && users?.role === "admin551717" ? (
          <div
            key={users?._id}
            className="flex justify-end gap-2 pr-5 items-center"
          >
            <Link
              className="btn btn-sm btn-outline shadow-lg shadow-blue-800 btn-primary mt-5 mb-5"
              to={`/allBlogs/${blog?._id}`}
            >
              <button>Edit Blog</button>
            </Link>

            <button
              onClick={() => {
                handleDeleteBlog(blog?._id);
              }}
              className="btn btn-sm btn-outline  shadow-lg shadow-red-800  btn-error mt-5 mb-5"
            >
              Delete Blog
            </button>
          </div>
        ) : (
          <span key={Math.random()}></span>
        )
      )}
    </div>
  );
};

export default Editpost;

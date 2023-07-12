import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";

const MakeAdmin = () => {
  const [allUsers, setAllUsers] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetch("https://the-lecturer-server.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, [allUsers]);

  const handleMakeAdmin = (users) => {
    fetch(`https://the-lecturer-server.vercel.app/users/${users?._id}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ role: "admin551717" }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success(`${users?.name} is now an admin`);
        }
      });
  };

  const handleDeleteUser = (users) => {
    const proceed = window.confirm(
      "Are you sure, you want to delete this user?"
    );

    if (proceed) {
      fetch(`https://the-lecturer-server.vercel.app/users/${users?._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success(`User deleted successfully!`);
          }
        });
    }
  };

  return (
    <div className="min-h-screen shadow-2xl shadow-teal-500 p-10 grid ">
      <div></div>

      {allUsers?.map((users) => (
        <div
          className="  w-full mt-5 p-10 shadow-2xl shadow-teal-500 font-semibold justify-evenly items-center grid lg:grid-cols-3 grid-cols-1    gap-5 overflow-x-auto scrollbar-hide"
          key={users?._id}
        >
          <div className="">
            <p>
              User Name: <span className="text-blue-600 "> {users?.name}</span>
            </p>
            {users?.email === user?.email && <span>(You)</span>}
          </div>
          <p>{users?.email}</p>

          {users?.email === user?.email ? (
            <></>
          ) : (
            <div className="lg:flex md:flex grid  gap-5">
              <button
                onClick={() => {
                  handleMakeAdmin(users);
                }}
                className="btn btn-sm btn-outline shadow-2xl shadow-blue-800 mr-2 btn-primary"
              >
                Make admin
              </button>
              <button
                onClick={() => handleDeleteUser(users)}
                className="btn btn-outline  shadow-2xl shadow-red-800 btn-sm btn-error "
              >
            
                Remove User
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MakeAdmin;

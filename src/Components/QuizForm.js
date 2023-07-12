import React, { useContext } from "react";
import { Link, useNavigate, redirect, Route } from "react-router-dom";
import AllQuizes from "./AllQuizes";
import { toast } from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";

const QuizForm = ({ allQQ, qid, id, quest }) => {
  const { user, allUsers } = useContext(AuthContext);

  const handleDeleteTest = () => {
    const proceed = window.confirm(
      "Are you sure, you want to delete this Quiz test?"
    );

    if (proceed) {
      fetch(`https://the-lecturer-server.vercel.app/createTests/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success(`Quiz test deleted successfully!`);
          }
        });
    }
  };

  return (
    <div className=" shadow-2xl p-2 block ">
      <p className="text-lg mt-10 font-bold ">Topic Name: </p>
      <Link className="  text-lg font-medium overflow-x-auto flex p-2 flex-wrap  rounded-lg hover:font-bold hover:link-hover shadow-lg shadow-teal-500" to={`/createTests/${id}`}>
        {quest?.topic}
      </Link>

      {allUsers?.map((users) =>
        users?.email === user?.email && users?.role === "admin551717" ? (
          <div key={users?._id} className="mt-5 ">
            <button className="btn btn-sm btn-outline btn-error shadow-lg shadow-red-700 " onClick={handleDeleteTest}>
              Delete Quiz
            </button>
          </div>
        ) : (
          <div key={users?._id}></div>
        )
      )}
    </div>
  );
};

export default QuizForm;

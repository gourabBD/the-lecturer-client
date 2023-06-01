import React from "react";
import { Link, useNavigate ,redirect, Route } from "react-router-dom";
import AllQuizes from "./AllQuizes";
import { toast } from "react-hot-toast";

const QuizForm = ({ allQQ, qid,id,quest }) => {
  const navigate = useNavigate();

  const handleDeleteTest = () => {
    const proceed = window.confirm(
      "Are you sure, you want to delete this Quiz test?"
    );

    if (proceed) {
      fetch(`http://localhost:5000/createTests/${id}`, {
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
    <div className=" shadow-2xl p-2">

     <Link className="btn btn-primary text-lg mt-10" to={`/createTests/${id}`}>Topic: {quest?.topic}</Link>
     <div className="mt-2">

      <button className="btn btn-error" onClick={handleDeleteTest}>Delete Quiz</button>
     </div>
    
    </div>
  );
};

export default QuizForm;

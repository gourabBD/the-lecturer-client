import React from "react";
import { Link, useNavigate ,redirect, Route } from "react-router-dom";
import AllQuizes from "./AllQuizes";

const QuizForm = ({ allQQ, qid,id,quest }) => {
  const navigate = useNavigate();
  const handleClick=(id)=>{
    return redirect(`/createTests/${id}`)
  }
  return (
    <div className=" ">

     <Link className="btn btn-primary mt-10" to={`/createTests/${id}`}>{quest?.topic}</Link>
      
    
    </div>
  );
};

export default QuizForm;

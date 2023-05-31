import React from "react";
import { Link } from "react-router-dom";

const QuizForm = ({ allQQ, qid,id,quest }) => {
  
  return (
    <div className="pl-10 pr-10">
       <p>{quest?.topic}</p>
    
    </div>
  );
};

export default QuizForm;

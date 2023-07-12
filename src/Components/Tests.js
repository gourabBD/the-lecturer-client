import React, { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";
import QuizForm from "./QuizForm";
import { useState } from "react";
import { useEffect } from "react";

const Tests = () => {
  const [allQuest, setAllQuest] = useState([]);
  useEffect(() => {
    fetch("https://the-lecturer-server.vercel.app/createTests")
      .then((res) => res.json())
      .then((data) => setAllQuest(data));
  }, [allQuest]);

  return (
    <div className="min-h-screen">
      <p className="text-xl font-semibold underline text-teal-400 mb-10 mt-10 underline-offset-4 ">
        Quiz Topics:
      </p>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {allQuest?.map((quest) => (
          <QuizForm
            key={quest?._id}
            allQQ={quest?.allTestQuestions}
            quest={quest}
            id={quest?._id}
            qid={quest?.qid}
          ></QuizForm>
        ))}
      </div>
    </div>
  );
};

export default Tests;

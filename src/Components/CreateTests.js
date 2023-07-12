import React, { useState } from "react";
import { useForm } from "react-hook-form";
import DisplayError from "./DisplayError";
import { toast } from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const CreateTests = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const [topicName, setTopicName] = useState("");
  let qArr = [];
  const [createTestValues, setCreateTestValues] = useState([]);

  let [count, setCount] = useState([]);
  // const [topicName, setTopicName] = useState("");
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const handleTestQuestions = (data) => {
    const question = data?.question;
    const optionA = data?.optionA;
    const optionB = data?.optionB;
    const optionC = data?.optionC;
    const optionD = data?.optionD;
    const correctAns = data?.correctAns;

    const allData = {
      question,
      optionA,
      optionB,
      optionC,
      optionD,
      correctAns,
    };

    const arr = [];
    arr.push(allData);
    setCreateTestValues(arr);
    qArr = [...createTestValues, allData];
    setCreateTestValues(qArr);

    // console.log(qArr);

    setCount([...qArr]);

    reset();
    toast.success("Question added successfully!!");
  };
  console.log(topicName);

  const handleChange = (e) => {
    e.preventDefault();
    setTopicName(e.target.value);
    console.log(topicName);
  };

  const handleQuestionSubmit = () => {
    console.log(topicName);

    const allTestInfo = {
      qid: (Math.random() * (1.5 - 0.1 + 0.1)).toFixed(6),
      topic: topicName,
      allTestQuestions: count,
    };
    if (count.length > 0) {
      fetch(`https://the-lecturer-server.vercel.app/createTests`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(allTestInfo),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            toast.success("Successfully published the test questions");
          }

          navigate("/tests");
        });
    } else {
      toast.error("Please write something in the input fields");
    }
  };

  return (
    <div className="min-h-screen mt-10 p-2">
      <div className="flex justify-center mb-5">
        <div>
          <p className="text-md font-semibold mb-2 text-teal-400">
            Enter the topic name once
          </p>
          <input
            value={topicName}
            onChange={handleChange}
            type="text"
            name="topic"
            className="input shadow-2xl shadow-teal-500 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 w-full max-w-xs disabled"
            placeholder="Topic name "
            required
          />
        </div>
      </div>
      <form onSubmit={handleSubmit(handleTestQuestions)} className="">
        <div className="flex justify-center mb-5">
          {/* <div className="form-control w-full max-w-xs">
            <p className="text-md font-semibold mb-2 text-blue-700">
              Enter the topic name once
            </p>
            <input
              type="text"
              {...register("topic")}
              className="input input-bordered w-full max-w-xs disabled"
              placeholder="Topic name "
            />
          </div> */}
        </div>
        <div className="flex justify-center">
          <div className="form-control  w-full max-w-lg">
            <textarea
              type="text"
              {...register("question", {
                required: "Question field is required",
              })}
              className="input shadow-2xl shadow-teal-500 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900  w-full max-w-lg"
              placeholder="Write your question here..."
            />
            {errors.question && (
              <p className="text-red-400 font-semibold">{errors.question?.message}</p>
            )}
          </div>
        </div>

        <p className="text-teal-400 underline mt-5 text-lg font-semibold">
          Put your options bellow
        </p>
        <div className="flex justify-center mt-10">
          <div className="grid grid-cols-2 gap-5">
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                {...register("optionA", {
                  required: "Option A is required",
                })}
                className="input shadow-2xl shadow-teal-500 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 w-full max-w-xs"
                placeholder="Option A"
              />
              {errors.optionA && (
                <p className="text-red-400 font-semibold">{errors.optionA?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                {...register("optionB", {
                  required: "Option B is required",
                })}
                className="input shadow-2xl shadow-teal-500 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 w-full max-w-xs"
                placeholder="Option B"
              />
              {errors.optionB && (
                <p className="text-red-400 font-semibold">{errors.optionB?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                {...register("optionC", {
                  required: "Option C is required",
                })}
                className="input shadow-2xl shadow-teal-500 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 w-full max-w-xs"
                placeholder="Option C"
              />
              {errors.optionC && (
                <p className="text-red-400 font-semibold">{errors.optionC?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                {...register("optionD", {
                  required: "Option D is required",
                })}
                className="input shadow-2xl shadow-teal-500 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 w-full max-w-xs"
                placeholder="Option D"
              />
              {errors.optionD && (
                <p className="text-red-400 font-semibold font-semibold">{errors.optionD?.message}</p>
              )}
            </div>

            <select
              {...register("correctAns", {
                required: "Correct Answer is required",
              })}
              className="border border-teal-500 bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 shadow-2xl shadow-teal-500 max-w-lg mb-10"
              required
            >
              <option className="disabled" value={""}>
                Select answer
              </option>
              <option value="optionA">A</option>
              <option value="optionB">B</option>
              <option value="optionC">C</option>
              <option value="optionD">D</option>
            </select>
          </div>
        </div>
        <div>
          <input
            className="btn btn-accent w-auto  mt-2"
            value="Add to queue"
            type="submit"
          />
        </div>
      </form>
      <div>
        <button
          onClick={handleQuestionSubmit}
          className="btn  hover:bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 shadow-2xl shadow-teal-500 mt-10"
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default CreateTests;

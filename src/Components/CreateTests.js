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
  const topicName = "";
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
    const topic = data?.topic;
    const question = data?.question;
    const optionA = data?.optionA;
    const optionB = data?.optionB;
    const optionC = data?.optionC;
    const optionD = data?.optionD;
    const correctAns = data?.correctAns;

    const allData = {
      topic,
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

    console.log(qArr);

    setCount([...qArr]);

    reset();
    toast.success("Question added successfully!!");
  };

  const handleQuestionSubmit = () => {
    const allTestInfo = {
      allTestQuestions: count,
    };
    if (count) {
      fetch(`http://localhost:5000/createTests`, {
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
          } else {
            toast.error(data.message);
          }
        });
    } else {
      toast.error("Please write something in the input fields");
    }
    navigate("/tests");
  };

  return (
    <div className="min-h-screen mt-10 p-2">
      <form onSubmit={handleSubmit(handleTestQuestions)} className="">
        <div className="flex justify-center mb-5">
          <div className="form-control w-full max-w-xs">
            <p className="text-md font-semibold mb-2 text-blue-700">
              Enter the topic name once
            </p>
            <input
              type="text"
              {...register("topic")}
              className="input input-bordered w-full max-w-xs disabled"
              placeholder="Topic name "
            />
          </div>
        </div>
        <div className="flex justify-center">
          <div className="form-control  w-full max-w-lg">
            <textarea
              type="text"
              {...register("question", {
                required: "Question field is required",
              })}
              className="input input-bordered w-full max-w-lg"
              placeholder="Write your question here..."
            />
            {errors.question && (
              <p className="text-red-600">{errors.question?.message}</p>
            )}
          </div>
        </div>

        <p className="text-blue-700 underline mt-5 text-lg font-semibold">
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
                className="input input-bordered input-accent w-full max-w-xs"
                placeholder="Option A"
              />
              {errors.optionA && (
                <p className="text-red-600">{errors.optionA?.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                {...register("optionB", {
                  required: "Option B is required",
                })}
                className="input input-bordered input-primary w-full max-w-xs"
                placeholder="Option B"
              />
              {errors.optionB && (
                <p className="text-red-600">{errors.optionB?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                {...register("optionC", {
                  required: "Option C is required",
                })}
                className="input input-bordered input-success w-full max-w-xs"
                placeholder="Option C"
              />
              {errors.optionC && (
                <p className="text-red-600">{errors.optionC?.message}</p>
              )}
            </div>

            <div className="form-control w-full max-w-xs">
              <input
                type="text"
                {...register("optionD", {
                  required: "Option D is required",
                })}
                className="input input-bordered input-info w-full max-w-xs"
                placeholder="Option D"
              />
              {errors.optionD && (
                <p className="text-red-600">{errors.optionD?.message}</p>
              )}
            </div>

            <select
              {...register("correctAns", {
                required: "Correct Answer is required",
              })}
              className="border border-primary max-w-lg mb-10"
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
            className="btn btn-primary w-auto  mt-2"
            value="Add to queue"
            type="submit"
          />
        </div>
        <div>
          <button
            onClick={handleQuestionSubmit}
            className="btn btn-info btn-outline mt-10"
          >
            Publish
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTests;

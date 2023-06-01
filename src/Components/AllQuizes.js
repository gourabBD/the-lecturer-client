import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';
import Quiz from 'react-quiz-component';

const AllQuizes = () => {
    const params = useParams();
    const [quiz,setQuiz]=useState([])
    // console.log(params?.id);
    useEffect(()=>{
        fetch(`http://localhost:5000/createTests/${params?.id}`)
        .then(res=>res.json())
        .then(data=>setQuiz(data))
    },[quiz])
    
    const {allTestQuestions,qid}=quiz
   
    const [optA,setOptA]=useState("")
    const [correctOpt,setCorrectOpt]=useState("")
    const [questIndex,setQuestIndex]=useState("")
    const [optD,setOptD]=useState("")
    const [corAns,setCorAns]=useState("")
    

    // const handleOnClick=(e)=>{
    // const ans=e.target.value
    // if(ans){
      
    // console.log(optA);
    // console.log(ans);
    // }
    return (
        <div className='min-h-screen overflow-hidden '>
          <p className='text-xl  font-semibold text-primary mt-10 '> <span className='underline text-green-500'>Topic Name:</span> {quiz?.topic}</p>
          <div className="divider"></div> 
        <div>
         <div className='p-5 '>
        {
            allTestQuestions?.map(singleQuest=>
            <div key={allTestQuestions.indexOf(singleQuest)} id={allTestQuestions.indexOf(singleQuest)} className=" cursor-pointer overflow-x-scroll scrollbar-hide mt-16  shadow-2xl mb-16 border p-5">
            <div className='lg:flex md:flex sm:grid flex-wrap text-left'>
            <span className='text-lg font-semibold text-success '>Q:</span>
            <p className='text-lg ml-2 flex flex-nowrap font-semibold text-primary '> {singleQuest?.question}</p>
            </div>
            <div className='grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 grid-cols-1 gap-5'>
            <div  className='lg:flex md:flex sm:grid justify-start items-center mt-5 border border-primary shadow-2xl p-5 overflow-x-scroll scrollbar-hide'>

    <input  onClick={(e)=>{if(e.target.value===singleQuest?.correctAns){setCorAns(singleQuest?.optionA) ;setCorrectOpt(e.target.value);setQuestIndex(allTestQuestions.indexOf(singleQuest))
    }  else{setCorrectOpt(e.target.value);setQuestIndex(allTestQuestions.indexOf(singleQuest))}}} type="radio" name="optionA" value={"optionA"} className="radio checked:bg-blue-500 flex justify-start"    />
    <span className="ml-2 flex text-start text-base font-medium">{singleQuest?.optionA}</span> 
    </div>

  
    <div className='lg:flex md:flex sm:grid justify-start items-center mt-5 border border-primary shadow-2xl p-5 overflow-x-scroll scrollbar-hide'>

    <input onClick={(e)=>{if(e.target.value===singleQuest?.correctAns){setCorAns(singleQuest?.optionB);setCorrectOpt(e.target.value);setQuestIndex(allTestQuestions.indexOf(singleQuest))}  else{setCorrectOpt(e.target.value); setQuestIndex(allTestQuestions.indexOf(singleQuest))}}} type="radio" name="optionB" value={"optionB"} className="radio checked:bg-blue-500 flex justify-start"   />
    <span className="ml-2 flex text-start text-base font-medium">{singleQuest?.optionB}</span> 
    </div>
    <div className=' justify-start items-center mt-5 border border-primary shadow-2xl p-5 lg:flex md:flex sm:grid overflow-x-scroll scrollbar-hide'>

    <input onClick={(e)=>{if(e.target.value===singleQuest?.correctAns){setCorAns(singleQuest?.optionC);setCorrectOpt(e.target.value);setQuestIndex(allTestQuestions.indexOf(singleQuest))}  else{setCorrectOpt(e.target.value);setQuestIndex(allTestQuestions.indexOf(singleQuest))}}} type="radio" name="optionC" value={"optionC"} className="radio checked:bg-blue-500 flex justify-start"    />
    <span className="ml-2 flex text-start text-base font-medium">{singleQuest?.optionC}</span> 
    </div>
    <div className='lg:flex md:flex sm:grid justify-start items-center mt-5 border border-primary overflow-x-scroll scrollbar-hide shadow-2xl p-5'>

    <input onClick={(e)=>{if(e.target.value===singleQuest?.correctAns){setCorAns(singleQuest?.optionD);setCorrectOpt(e.target.value);setQuestIndex(allTestQuestions.indexOf(singleQuest))}
    else{setCorrectOpt(e.target.value);setQuestIndex(allTestQuestions.indexOf(singleQuest))}}} type="radio" name="optionD" value={"optionD"} className="radio checked:bg-blue-500 flex justify-start"   />
    <span className="ml-2 flex text-start text-base  font-medium">{singleQuest?.optionD}</span> 
    </div>
    {correctOpt && (questIndex===allTestQuestions.indexOf(singleQuest))&& <div>

     {(correctOpt === singleQuest?.correctAns) && <div className='flex justify-start  items-center gap-2 overflow-scroll scrollbar-hide'>
  <p className='text-lg font-bold '>Correct Ans:</p> <span className='text-green-600 text-lg font-bold'>{corAns}</span>
     </div>  }
     {
        (correctOpt !== singleQuest?.correctAns) && <div>
       <p className='text-red-600 text-start text-lg font-bold'>Wrong Answer!!!</p>
       <div className='flex justify-start  items-center gap-2 overflow-scroll scrollbar-hide'>
  <p className='text-lg font-bold '>Correct Ans:</p> <span className='text-green-600 text-lg font-bold'>{corAns}</span>
     </div>
     </div>
     }
    </div>}
            </div>
  </div>)
        }

         </div>
        </div>
        </div>
    );
};

export default AllQuizes;
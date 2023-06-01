import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthProvider';
import QuizForm from './QuizForm';
import { useState } from 'react';
import { useEffect } from 'react';

const Tests = () => {
    const [allQuest,setAllQuest]=useState([])
    useEffect(()=>{
        fetch('http://localhost:5000/createTests')
        .then(res=>res.json())
        .then(data=>setAllQuest(data))
        },[allQuest])
   
    return (
        <div className='min-h-screen'>
         <p className="text-xl font-semibold underline text-primary mb-10 mt-10">Quiz Topics:</p>
         <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>

           {
            allQuest?.map(quest=><QuizForm key={quest?._id} allQQ={quest?.allTestQuestions} quest={quest} id={quest?._id} qid={quest?.qid}></QuizForm>)
           }
         </div>
        </div>
    );
};

export default Tests;
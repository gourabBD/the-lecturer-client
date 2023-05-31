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
        },[setAllQuest])
   
    return (
        <div className='min-h-screen'>
           {
            allQuest?.map(quest=><QuizForm key={quest?._id} allQQ={quest?.allTestQuestions} quest={quest} id={quest?._id} qid={quest?.qid}></QuizForm>)
           }
        </div>
    );
};

export default Tests;
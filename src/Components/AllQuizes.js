import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const AllQuizes = () => {
    const params = useParams();
    const [quiz,setQuiz]=useState([])
    // console.log(params?.id);
    useEffect(()=>{
        fetch(`http://localhost:5000/createTests/${params?.id}`)
        .then(res=>res.json())
        .then(data=>setQuiz(data))
    },[quiz])
    
    const {allTestQuestions}=quiz
    const [topicName,setTopicNAme]=useState("")
    return (
        <div className='min-h-screen'>
          <p>{quiz?.topic}</p>
        </div>
    );
};

export default AllQuizes;
import React, { useEffect, useState } from 'react';
import { useLoaderData, useParams } from 'react-router-dom';

const Quizes = () => {
    const params = useParams();
    const [quiz,setQuiz]=useState([])
    console.log(params?.id);
    useEffect(()=>{
        fetch(`http://localhost:5000/createTests/${params?.id}`)
        .then(res=>res.json())
        .then(data=>setQuiz(data))
    },[setQuiz])
    
    const {allTestQuestions}=quiz
    const [topicName,setTopicNAme]=useState("")
    return (
        <div className='min-h-screen'>
           {allTestQuestions?.map(tpc=>(tpc?.topic ? setTopicNAme(tpc?.topic):setTopicNAme("")))}
        </div>
    );
};

export default Quizes;
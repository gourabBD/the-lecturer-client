import React from 'react';
import { Link } from 'react-router-dom';

const Editpost = ({blog}) => {
  return (
    <div className=' border-2 border-blue-100 mt-10 shadow-xl'>

    <div className="card mt-10  bg-base-100 " key={blog?._id} dangerouslySetInnerHTML={{ __html: blog?.blogs }}/>

    <Link className='btn btn-sm btn-outline btn-primary mt-5 mb-5' to={`/editblog/${blog?._id}`}><button >Edit Blog</button></Link>
    </div>
      
    
  );
};

export default Editpost;
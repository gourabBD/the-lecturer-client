import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { toast } from 'react-hot-toast';

const Editpost = ({blog}) => {
  const {allUsers,user}=useContext(AuthContext)
 
  const handleDeleteBlog=()=>{
    const proceed = window.confirm(
      "Are you sure, you want to delete this blog?"
    );

    if (proceed) {
      fetch(`http://localhost:5000/allblogs/${blog?._id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.deletedCount > 0) {
            toast.success(`Blog deleted successfully!`);
            
          }
        });
    }
  }
  return (
    <div className=' border-2 border-blue-100 mt-10 shadow-xl'>
<div className='p-5'>

    <div className="card mt-10  bg-base-100 " key={blog?._id} dangerouslySetInnerHTML={{ __html: blog?.blogs }}/>
    <p className='text-primary mt-10 text-left'>Author: <span className=' badge badge-success badge-outline'>{user?.displayName}</span> </p>
</div>
         
         {/* admin conditions */}


        {allUsers?.map(users=>user?.email===users?.email && users?.role==='admin551717' ? <div key={users?._id} className='flex justify-end gap-2 pr-5 items-center'>

<Link className='btn btn-xs btn-outline btn-primary mt-5 mb-5' to={`/allblogs/${blog?._id}`}><button >Edit Blog</button></Link>

<button onClick={()=>{handleDeleteBlog(blog?._id)}} className='btn btn-xs btn-outline btn-error mt-5 mb-5'>Delete Blog</button>
     </div> :< span key={Math.random()}></span>) }
    </div>
      
    
  );
};

export default Editpost;
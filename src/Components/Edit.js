import React from 'react';
import { useLoaderData } from 'react-router-dom';
import BlogForm from './BlogForm';
import EditingForm from './EditingForm';

const Edit = () => {
  const individualBlog=useLoaderData()
  
  return (
    <div className='min-h-screen'>
      <EditingForm blogId={individualBlog?._id} prevblog={individualBlog?.blogs}></EditingForm>
    </div>
  );
};

export default Edit;
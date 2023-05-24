import React from 'react';
import  { useState } from 'react';
import { Link,useLocation, useNavigate} from "react-router-dom";
import 'react-photo-view/dist/react-photo-view.css';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import ReactQuill from 'react-quill';
import { Quill } from 'react-quill';
import { ImageActions } from '@xeger/quill-image-actions';
import { ImageFormats } from '@xeger/quill-image-formats';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-hot-toast';

Quill.register('modules/imageActions', ImageActions);
Quill.register('modules/imageFormats', ImageFormats);
const BlogForm = () => {
    const [value, setValue] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';

    const getValue=(event)=>{
      event.preventDefault()
      const form=event.target
      const blogs=value
      const blogDescription = { blogs };

      fetch("http://localhost:5000/allblogs", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(blogDescription),
      })
        .then((res) => res.json())
        .then((data) => {
         
          if (data.acknowledged) {
           
            toast.success("Booking Confirmed!");
            navigate(from, { replace: true });
            
          } else {
            toast.error(data.message);
          }
        });
        
   
    }

    const modules = {
      imageActions: {},
  imageFormats: {},
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{size: []}], [{ 'color': [] }, { 'background': [] }], [{ 'align': [] }], 
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'},  
           {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image', 'video'],
          ['clean'],
        ],
        clipboard: {
          // toggle to add extra line breaks when pasting HTML:
          matchVisual: false,
        }
      }
      const formats = [
        'header', 'font', 'size',
        'bold', 'italic',"align",'float', 'underline', 'strike',  "color",
        "code-block", 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]

    return (
        <div  className='lg:p-10 md:p-10 sm:p-2 min-h-screen '>
             <h1 className='text-left  mb-5 text-lg font-semibold'>Write your blog: </h1>

             <form onSubmit={getValue} action="">

        <div className='lg:mb-16'>

             <ReactQuill placeholder='Write something...' className='  overflow-y-visible  lg:h-96' theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
        </div>
            
        <button className='btn btn-primary mt-10' onSubmit={getValue}>Post</button>
             </form>
     
      
        </div>
    );
};

export default BlogForm;
import React from 'react';
import  { useState } from 'react';
import { Link} from "react-router-dom";
import 'react-photo-view/dist/react-photo-view.css';
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { PhotoProvider, PhotoView } from 'react-photo-view';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-hot-toast';
const BlogForm = () => {
    const [value, setValue] = useState('');


    const getValue=(event)=>{
      
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
            
            
          } else {
            toast.error(data.message);
          }
        });
        
   
    }

    const modules = {
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
        'bold', 'italic',"align", 'underline', 'strike',  "color",
        "code-block", 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image', 'video'
      ]

    return (
        <div  className='p-32 '>
             <h1 className='text-left  mb-5 text-lg font-semibold'>Write your blog: </h1>

             <form onSubmit={getValue} action="">

        <div className='mb-16'>

             <ReactQuill placeholder='Write something...' className='  overflow-y-visible  h-96' theme="snow" value={value} onChange={setValue} modules={modules} formats={formats} />
        </div>
            
        <button className='btn btn-primary mt-16' onSubmit={getValue}>Post</button>
             </form>
     
       {/* <PhotoProvider>
      <div className="foo">
      <PhotoView  src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ETPUM3G6l9Pe3VTHbMbx_yfLk5KqZ_kU9w&usqp=CAU"}>
            <p><img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2ETPUM3G6l9Pe3VTHbMbx_yfLk5KqZ_kU9w&usqp=CAU'/></p>
          </PhotoView>
      </div>
    </PhotoProvider> */}
        </div>
    );
};

export default BlogForm;
import React from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-photo-view/dist/react-photo-view.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";

import ReactQuill from "react-quill";
import { Quill } from "react-quill";

import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";

// Quill.register('modules/imageActions', ImageActions);
// Quill.register('modules/imageFormats', ImageFormats);

const EditingForm = ({ prevblog, blogId }) => {
  const [value, setValue] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from?.pathname || "/";
  //button function
  const handleEditedBlog = (event) => {
    event.preventDefault();
    fetch(`https://the-lecturer-server.vercel.app/allBlogs/${blogId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ blogs: value }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(value);
        if (data.modifiedCount > 0) {
          toast.success(`Blog is now updated.`);
          navigate(from, { replace: true });
        }
      });
  };
  // const getValue=(event)=>{

  //   const form=event.target
  //   const blogs=value
  //   const blogDescription = { blogs };

  //   fetch("https://the-lecturer-server.vercel.app/allBlogs", {
  //     method: "POST",
  //     headers: {
  //       "content-type": "application/json",
  //     },
  //     body: JSON.stringify(blogDescription),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {

  //       if (data.acknowledged) {

  //         toast.success("Booking Confirmed!");

  //       } else {
  //         toast.error(data.message);
  //       }
  //     });

  // }

  const modules = {
    imageActions: {},
    imageFormats: {},
    toolbar: [
      [{ header: "1" }, { header: "2" }],
     
      [{ color: [] }, { background: [] }],
      
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    clipboard: {
      // toggle to add extra line breaks when pasting HTML:
      matchVisual: false,
    },
  };
  const formats = [
    "header",
    
    "bold",
    "italic",
    
    "float",
    "underline",
    "strike",
    "color",
    "code-block",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "video",
  ];
  return (
    <div className="lg:p-10 md:p-10 sm:p-2 min-h-screen ">
      <h1 className="text-left  mb-5 text-lg font-semibold">
        Edit your blog:{" "}
      </h1>

      <form className="" onSubmit={handleEditedBlog}>
        <div className="lg:mb-16">
          <ReactQuill
          
            placeholder="Write something..."
            className=" overflow-y-visible  lg:h-96 "
            theme="snow"
            onChange={setValue}
            modules={modules}
            defaultValue={prevblog}
            formats={formats}
          />
        </div>
        <div className="flex justify-center">

        <button className="btn btn-primary btn-outline shadow-lg shadow-blue-800  mt-16" onSubmit={handleEditedBlog}>
          Post
        </button>
        </div>

      </form>
    </div>
  );
};

export default EditingForm;

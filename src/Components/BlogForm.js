import React, { useContext } from "react";
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "react-photo-view/dist/react-photo-view.css";
import EditorToolbar, { modules, formats } from "./EditorToolbar";
import { PhotoProvider, PhotoView } from "react-photo-view";
import ReactQuill from "react-quill";
import { Quill } from "react-quill";
import { ImageActions } from "@xeger/quill-image-actions";
import { ImageFormats } from "@xeger/quill-image-formats";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-hot-toast";
import { AuthContext } from "../contexts/AuthProvider";

Quill.register("modules/imageActions", ImageActions);
Quill.register("modules/imageFormats", ImageFormats);

const BlogForm = () => {
  const [value, setValue] = useState("");
  const {user}=useContext(AuthContext)

  const location = useLocation();
  const navigate = useNavigate();
  const current = new Date();
  const date = `${current.getDate()}/${
    current.getMonth() + 1
  }/${current.getFullYear()}`;
  let AmPm = "";
  const today = new Date(),
    time =
      (today.getHours() % 12 || 12) +
      ":" +
      today.getMinutes() +
      ":" +
      today.getSeconds();

  if (today.getHours() < 12) {
    AmPm = "AM";
  } else {
    AmPm = "PM";
  }
  const from = location.state?.from?.pathname || "/";

  const getValue = (event) => {
    event.preventDefault();
    const form = event.target;
    const blogs = value;
    const author= user?.displayName
    const blogDescription = { blogs, time, date, AmPm,author };

    fetch("https://the-lecturer-server.vercel.app/allBlogs", {
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
  };

  const modules = {
    imageActions: {},
    imageFormats: {},
    toolbar: [
      [{ header: "1" }, { header: "2" }],
     
      [{ color: []}, { background: [] }],
     
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
    <div className="lg:p-10 md:p-10 sm:p-2  min-h-screen ">
      <h1 className="text-left  mb-5 text-lg font-semibold">
        Write your blog:{" "}
      </h1>

      <form onSubmit={getValue} action="">
        <div className="lg:mb-16">
          <ReactQuill
            className="placeholder-teal-400 overflow-y-visible  lg:h-96 "
            placeholder="Write something..."
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
          />
        </div>
<div className="flex justify-center">

        <button className="btn btn-outline btn-primary mt-10" onSubmit={getValue}>
          Post blog
        </button>
</div>
      </form>
    </div>
  );
};

export default BlogForm;

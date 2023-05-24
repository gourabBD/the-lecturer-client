import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import DisplayError from "../Components/DisplayError";
import Home from "../Components/Home";
import Add from "../Components/Add";
import Edit from "../Components/Edit";
import Login from './../Components/Login';
import Signup from './../Components/Signup';
import BlogForm from './../Components/BlogForm';
import Tests from './../Components/Tests';
import Loadings from "../Components/Loadings";



const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element:<Loadings><Home></Home></Loadings> ,
      },
      {
        path: "/Add",
        element: <Add></Add>,
      },
      {
        path: "/Edit/:postID",
        element: <Edit></Edit>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/register",
        element: <Signup></Signup>,
      },
      {
        path: "/createblog",
        element: <Loadings><BlogForm></BlogForm></Loadings>,
      },
      {
        path: "/tests",
        element: <Loadings><Tests></Tests></Loadings>,
      },
      {
        path: `/allblogs/:id`,
        element:<Loadings><Edit></Edit></Loadings> ,
        loader:({params})=>fetch(`http://localhost:5000/allblogs/${params.id}`),
      },

      
    ],
  },
]);
export default router;

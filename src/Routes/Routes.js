import { createBrowserRouter } from "react-router-dom";
import Main from "../LayOut/Main";
import DisplayError from "../Components/DisplayError";
import Home from "../Components/Home";
import Add from "../Components/Add";
import Edit from "../Components/Edit";
import Login from "./../Components/Login";
import Signup from "./../Components/Signup";
import BlogForm from "./../Components/BlogForm";
import Tests from "./../Components/Tests";
import Loadings from "../Components/Loadings";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import CreateTests from "../Components/CreateTests";

import AllQuizes from "../Components/AllQuizes";
import MakeAdmin from "../Components/MakeAdmin";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <DisplayError></DisplayError>,
    children: [
      {
        path: "/",
        element: (
          <Loadings>
            <Home></Home>
          </Loadings>
        ),
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
        element: (
          <PrivateRoute>
            <BlogForm></BlogForm>
          </PrivateRoute>
        ),
      },
      {
        path: "/createTests",
        element: (
          <PrivateRoute>
            <CreateTests></CreateTests>
          </PrivateRoute>
        ),
      },
      {
        path: `/createTests/:id`,
        element:  <PrivateRoute>
          <AllQuizes></AllQuizes>
        </PrivateRoute>,
      },
      {
        path: "/tests",
        element: (
          <PrivateRoute>
            <Tests></Tests>
          </PrivateRoute>
        ),
      },
      {
        path: `/allBlogs/:id`,
        element: (
          <PrivateRoute>
            <Edit></Edit>
          </PrivateRoute>
        ),
        loader: ({ params }) =>
          fetch(`https://the-lecturer-server.vercel.app/allBlogs/${params.id}`),
      },
      {
        path: `/makeAdmin2431`,
        element: (
          <PrivateRoute>
            <MakeAdmin></MakeAdmin>
          </PrivateRoute>
        ),
      },
    ],
  },
]);
export default router;

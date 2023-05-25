import React from 'react';
import { GoogleAuthProvider } from "firebase/auth";
import  { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from '../contexts/AuthProvider';
import useToken from '../hooks/useToken';



const Signup = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm();
      const { googleSignIn } = useContext(AuthContext);
      const { createUser, updateUser, loading } = useContext(AuthContext);
      const [signUpError, setSignUPError] = useState("");
      const [createdUserEmail, setCreatedUserEmail] = useState("");
        const [token] = useToken(createdUserEmail);
      const navigate = useNavigate();
      const location = useLocation();
      const from = location.state?.from?.pathname || "/";
    
        if (token) {
          navigate("/");
        }
    
      const handleSignUp = (data) => {
        setSignUPError("");
        createUser(data.email, data.password)
          .then((result) => {
            const user = result.user;
            console.log(user);
            toast.success("User Created Successfully.");
            const userInfo = {
              displayName: data.name,
            };
            updateUser(userInfo)
              .then(() => {
                saveUser(data.name, data.email);
              })
              .catch((err) => console.log(err));
            navigate(from, { replace: true });
          })
    
          .catch((error) => {
            console.log(error);
            setSignUPError(error.message);
          });
      };
    
      const saveUser = (name, email) => {
        const user = { name, email };
        fetch("http://localhost:5000/users", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(user),
        })
          .then((res) => res.json())
          .then((data) => {
            setCreatedUserEmail(email);

            getUserToken(email)
          });
      };

      const getUserToken=email=>{
        fetch(`http://localhost:5000/jwt?email=${email}`)
        .then(res=>res.json())
        .then(data=>{
          if(data.accessToken){
            localStorage.setItem('accessToken',data.accessToken)
            navigate("/")
          }
        })
      }

      const googleProvider = new GoogleAuthProvider();
      const handleGoogleSignIn = () => {
        googleSignIn(googleProvider)
          .then((result) => {
            const user = result.user;
            saveUser(user?.displayName, user?.email);
            navigate(from, { replace: true });
          })
          .catch((error) => console.error(error));
      };
    return (
        <div className="h-[800px] flex justify-center items-center">
        <div className="w-96 p-7">
          <h2 className="text-xl text-center">Sign Up</h2>
          <form onSubmit={handleSubmit(handleSignUp)}>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                {...register("name", {
                  required: "Name is Required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.name && (
                <p className="text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.email && (
                <p className="text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="label">
                {" "}
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be 6 characters long",
                  },
                  pattern: {
                    value: /(?=.*[a-z])(?=.*[!@#$&*])(?=.*[0-9])/,
                    message:
                      "Password must have alphabets, number and special characters",
                  },
                })}
                className="input input-bordered w-full max-w-xs"
              />
              {errors.password && (
                <p className="text-red-500">{errors.password.message}</p>
              )}
            </div>
            {/* select options */}
            
            <input
              className="btn btn-primary w-full mt-4"
              value="Sign Up"
              type="submit"
            />
            {signUpError && <p className="text-red-600">{signUpError}</p>}
          </form>
          <p>
            Already have an account?{" "}
            <Link className="text-blue-600 underline" to="/login">
              Please Login.
            </Link>
          </p>
          <div className="divider">OR</div>
          <button
            onClick={handleGoogleSignIn}
            className="btn btn-outline  w-full"
          >
            Sign Up with GOOGLE
          </button>
        </div>
      </div>
    );
};

export default Signup;
import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';


// import useToken from './../../hooks/useToken';

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { signIn } = useContext(AuthContext);
    const {googleSignIn,setUser,loading}=useContext(AuthContext)
    const [loginError, setLoginError] = useState("");
    const [loginUserEmail,setLoginUserEmail]= useState('')
    
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';
    

    
    const handleLogin = data => {
        
        setLoginError('');
        signIn(data.email, data.password)
            .then(result => {
                const user = result.user;
                setLoginUserEmail(data?.email)
                
                navigate(from, { replace: true });
               
            })
            .catch(error => {
               
                setLoginError(error.message);
                console.log(error.message)
                console.log(loginError)
                
            });
    }
    const googleProvider = new GoogleAuthProvider();
    const handleGoogleSignIn=()=>{

        googleSignIn(googleProvider)
        .then(result=>{
          const user=result.user;
          
          navigate(from, { replace: true });
        })
        .catch(error=>console.error(error))
       
    
    
      }

    return (
        <div className='h-[800px] flex justify-center items-center'>
            <div className='w-96 p-7'>
                <h2 className='text-xl text-center'>Login</h2>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Email</span></label>
                        <input type="text"
                            {...register("email", {
                                required: "Email Address is required"
                            })}
                            className="input input-bordered w-full max-w-xs" />
                        {errors.email && <p className='text-red-600'>{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full max-w-xs">
                        <label className="label"> <span className="label-text">Password</span></label>
                        <input type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: 'Password must be 6 characters or longer' }
                            })}
                            className="input input-bordered w-full max-w-xs " />
                       
                        {errors.password && <p className='text-red-600'>{errors.password?.message}</p>}
                    </div>
                    <input className='btn btn-primary w-full mt-2' value="Login" type="submit" />
                   <div>
                       {loginError && <p className='text-red-600'>{loginError}</p>}
                    </div>
                </form>
                <p>New to The Lecturer? <Link className='text-blue-600 underline' to="/register">Create new Account.</Link></p>
                <div className="divider">OR</div>
                <button onClick={handleGoogleSignIn} className='btn btn-outline w-full'>Login WITH GOOGLE</button>
            </div>
        </div>
    );
};

export default Login;
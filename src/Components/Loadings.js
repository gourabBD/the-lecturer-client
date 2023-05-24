import React,{useContext} from 'react';
import { AuthContext } from '../contexts/AuthProvider';


const Loadings = ({children}) => {
   const {loading}=useContext(AuthContext)
   if(loading){
    return  <div className="flex items-center justify-center space-x-2 min-h-screen">
    {/* <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-blue-500 rounded-full" role="status" /> */}
    <progress className="progress progress-primary w-56"></progress>
      <span className="visually-hidden">Loading...</span>
    </div>
   }
   return children;
};

export default Loadings;
import toast, { Toaster } from 'react-hot-toast'
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';


function App() {
  
  return (
    <div className="App min-h-screen bg-gradient-to-r from-slate-900 via-teal-900 to-slate-900 text-teal-400">
      <RouterProvider router={router}>
      
      </RouterProvider>
      <Toaster></Toaster>
    </div>

  );
}

export default App;

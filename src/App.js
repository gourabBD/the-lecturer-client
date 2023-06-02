import toast, { Toaster } from 'react-hot-toast'
import './App.css';
import { RouterProvider } from 'react-router-dom';
import router from './Routes/Routes';


function App() {
  
  return (
    <div className="App min-h-screen">
      <RouterProvider router={router}>
      
      </RouterProvider>
      <Toaster></Toaster>
    </div>

  );
}

export default App;

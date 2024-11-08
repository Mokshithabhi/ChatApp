import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/auth-context";
import Home from "./pages/Home";
import Login from "./pages/login";
import { Toaster } from "react-hot-toast";
import SignUp from "./pages/signup";

function App() {
  const { authUser } = useAuthContext();
  return (

      <div className='p-4 h-screen flex items-center justify-center'>
        <Routes>
          <Route path='/' element={authUser ? <Home /> : <Navigate to={"/login"} />} />
          <Route path='/login' element={authUser ? <Navigate to='/' /> : <Login />} />
          <Route path='/signup' element={authUser ? <Navigate to='/' /> : <SignUp />} />
        </Routes>
        <Toaster />
      </div>
    );

}

export default App;
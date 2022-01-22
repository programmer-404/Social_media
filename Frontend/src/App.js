import './App.css';
import { Route, Routes, Navigate } from "react-router-dom"
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import PageNotFound from './pages/404';
import { useEffect, useState } from 'react';

function App() {
  const [login, setlogin] = useState(false);
  useEffect(() => {
    async function fetch() {
      if (sessionStorage.getItem("x-access-token")) setlogin(true)
    }
    fetch();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={login ? <Home /> : <Login />} exact />
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path='/register' element={<Register />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;

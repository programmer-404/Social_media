import './App.css';
import {Route,Routes} from "react-router-dom"
import Home from './pages/home';
import Login from './pages/login';
import Register from './pages/register';
import PageNotFound from './pages/404';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home/>} exact/>
        <Route path="/login" element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path="*" element={<PageNotFound/>}/>
      </Routes>
    </div>
  );
}

export default App;

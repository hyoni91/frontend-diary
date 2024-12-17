import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './users/Login';
import Join from './users/Join';
import { useEffect, useState } from 'react';

function App() {
const navigate = useNavigate();
const [loginInfo, setLoginInfo] = useState({})

useEffect(()=>{
  const sessionStorage = window.sessionStorage.getItem('loginInfo')

  if(sessionStorage != null){
    const obj_loginInfo = JSON.parse(sessionStorage);
    setLoginInfo(obj_loginInfo)
  }
},[])

console.log(loginInfo)

  return (
    <div className="App">
      <div className='main-bar'>
        <h2>diary icon</h2>
        <div>
          <span onClick={()=>{navigate('/login' )}}>Login</span>
          <span onClick={()=>{navigate('/join')}}>Join</span>
        </div>
      </div>
    <Routes>
      <Route path='/login' element={<Login setLoginInfo={setLoginInfo}/>}/>
      <Route path='/join' element={<Join />}/>
    </Routes>
    
    </div>
  );
}

export default App;

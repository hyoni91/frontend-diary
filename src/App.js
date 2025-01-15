import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './users/Login';
import Join from './users/Join';
import { useEffect, useState } from 'react';
import Diary from './users/ Diary';
import Slider from "react-slick";
import UsersLayout from './users/UsersLayout';

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

  return (
    <div className="App">
      <div className='main-bar'>
        <h2>
          <span onClick={()=>{navigate('/')}}>Diary Icon</span>
        </h2>
        <div>
          {
            loginInfo.userName == null?
            <>
              <span onClick={()=>{navigate('/login' )}}>Login</span>
              <span onClick={()=>{navigate('/join')}}>Join</span>
            </>
            :
            <>
              <span onClick={()=>{navigate(`/myDiary/${loginInfo.userNum}`)}}>{loginInfo.userName}</span>
              <span>logout</span>
            </>

          }
          
        </div>    
      </div>
      <div className='main-menu'>
        <div>
          <ul>
            <li>みんなの日記</li>
            <li>私の日記</li>
          </ul>
        </div>
        <div>
           <Routes>
            <Route path='/' element={<UsersLayout />}/>
            <Route path='/login' element={<Login setLoginInfo={setLoginInfo}/>}/>
            <Route path='/join' element={<Join />}/>  
            <Route path='/myDiary/:userNum' element={<Diary loginInfo={loginInfo}/>}/>
           </Routes>   
        </div>
      </div>
    
    
    </div>
  );
}

export default App;

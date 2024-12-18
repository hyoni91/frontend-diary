import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './users/Login';
import Join from './users/Join';
import { useEffect, useState } from 'react';
import Diary from './users/ Diary';

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
            loginInfo == ' '?
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
        <div>공개일기</div>
        <div>개인일기</div>        
      </div>
    <Routes>
      <Route path='/login' element={<Login setLoginInfo={setLoginInfo}/>}/>
      <Route path='/join' element={<Join />}/>
      <Route path='/myDiary/:userNum' element={<Diary loginInfo={loginInfo}/>}/>
    </Routes>
    
    </div>
  );
}

export default App;

import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Login from './users/Login';
import Join from './users/Join';
import { useEffect, useState } from 'react';
import Diary from './users/ Diary';

function App() {
const navigate = useNavigate();
const [loginInfo, setLoginInfo] = useState({})

const [dropmenu, setDropMenu] = useState(false)

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
          <div className='menu-bar'>
            <span onClick={()=>setDropMenu(!dropmenu)}>
              <i className="bi bi-list" />
            </span>
          </div>
          {
            dropmenu?
            <div  className='menu-down'>
            <ul>
              <li>
                Secret
              </li>
             <li>
                Public
             </li>
            </ul>
          </div> 
            :
            null
          }
          
        </div>
        <div>
           <Routes>
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

import React, { useState } from 'react';
import './Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({setLoginInfo}) => {
    const navigate = useNavigate()

   const [loginData, setLoginData] = useState({
    mail : '',
    userPw : ''
   })

   const loginHandle = (e)=>{
    const {name, value} = e.target;
    setLoginData({...loginData,
        [name] : value
    })
   }

   const login = ()=>{
    if(loginData.mail == '' || loginData.userPw == ''){
        alert('ログイン情報を確かめてください。')
        return;
    }

    axios.post('/login', loginData)
    .then((res)=>{
        if(res.data == ''){
            alert('ログインの情報が一致しません。')
        }else{
            alert('ログインしました。')
            const loginInfo = {
                userNum : res.data.userNum,
                userName : res.data.userName,
                mail : res.data.mail
            }

            window.sessionStorage.setItem('loginInfo',JSON.stringify(loginInfo))
            setLoginInfo(loginInfo)
            navigate('/')
        }
    })
    .catch((error)=>{
        alert('error!')
        console.log(error)
    })
   }

   console.log(loginData)

    return (
        <div className='login-div'>
            <h3>LOGIN</h3>
            <div className='login-content'>
                <input 
                    type='text' 
                    placeholder='EMAIL'
                    name='mail'
                    onChange={(e)=>{loginHandle(e)}}
                />
                <br/>
                <input 
                    type='password' 
                    placeholder='PASSWORD'
                    name='userPw'
                    onChange={(e)=>{loginHandle(e)}}
                />
                <div>
                    <button type='button' onClick={()=>{login()}}>Sign in</button>
                </div>
                <span onClick={()=>{navigate("/resetPw")}}>forgot your PW?</span>
                <span>Sign up</span>
            </div>
        </div>
    );
};

export default Login;
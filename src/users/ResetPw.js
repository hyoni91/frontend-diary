import axios from 'axios';
import React, { useState } from 'react';

const ResetPw = () => {
    const [restPwData, setResetPwData] = useState({})
    const resetPwHandle = (e)=>{
        const {name, value} = e.target;
        setResetPwData({...restPwData,
            [name] : value 
        })
    }

    const resetPw = ()=>{
        if(restPwData.mail == '' || restPwData.newPw == ''){
            alert('情報を確認してください。')
            return;
        }

        axios.put('/resetPw', restPwData)
        .then((res)=>{
            alert('パスワードが正常にリセットされました。');
        })
        .catch((error)=>{
            alert('エラーが発生しました。もう一度お試しください。');
            console.log(error)
        }) 

        console.log(restPwData)
    }

    return (
        <div className='reset-pw-div'>
            <h3>Reset Password</h3>
            <div className='reset-pw-content'>
                <input 
                    type='text' 
                    placeholder='EMAIL'
                    name='mail'
                    onChange={(e)=>{resetPwHandle(e)}}
                />
                <input
                type='text'
                placeholder='NEW PASSWORD'
                name='userPw'
                onChange={(e)=>{resetPwHandle(e)}} 
                />
                <button onClick={()=>{resetPw()}}>RESET</button>
            </div>  
            
        </div>
    );
};

export default ResetPw;
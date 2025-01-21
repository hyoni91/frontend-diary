
import React, { useEffect, useRef, useState } from 'react';
import './Join.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Join(props) {
    const navigate = useNavigate();

    const [joinData, setJoinData] = useState({
        userName : '',
        userPw : '',
        userPwChk : '',
        mail : ''
    })

       // 유효성 및 메시지 상태
       const [validationErrors, setValidationErrors] = useState({
        mail: '',
        userPw: '',
        userPwChk: ''
    });

    const [mailValid, setMailValid] = useState(false); // 이메일 중복 확인 여부


    //입력값 핸들러
    const goJoin = (e)=>{
        const { name, value } = e.target;
        setJoinData({...joinData,
            [name] : value
        })

         // 입력값이 변경될 때 유효성 검사 실행
         validateInput(name, value);
    }

    // 유효성 검사 함수
    const validateInput = (name, value) => {
        let errors = { ...validationErrors };

        switch (name) {
            case 'mail':
                const emailRegex =  /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
                errors.mail = emailRegex.test(value) ? '' : '有効なメールを入力してください。';
                break;

            case 'userPw':
                const pwRegex = /^(?=.*[a-z])(?=.*[0-9]).{4,12}$/;
                errors.userPw = pwRegex.test(value)
                    ? ''
                    : 'パスワードは英文と数字を含めた4~12字で入力してください。';
                break;

            case 'userPwChk':
                errors.userPwChk = value === joinData.userPw ? 
                '' : 'パスワードが一致しません。';
                break;

            default:
                break;
        }

        setValidationErrors(errors);
    };

    console.log(validationErrors)

    //이메일 중복 확인
    const checkMail = async () => {

        if(!joinData.mail){
            alert('メールを入力してください。');
            return;
        }
        try {
            const res = await axios.get(`/mailChk/${joinData.mail}`);
            if (res.data) {
                setValidationErrors((prev)=>({
                    ...prev,
                    mail :'このメールはすでに使用されています。'
                }));
                setMailValid(false)

            } else {
                setValidationErrors((prev)=>({
                    ...prev,
                    mail: ''
                }));
                setMailValid(true)
            }
        } catch (error) {
            console.error(error);
            alert('メール確認に失敗しました。もう一度試してください。');
        }
    };
    


        // 회원가입 요청 
        const handleSignUp = async () => {
             // 유효성 검사 통과 여부 확인
        if (Object.values(validationErrors).some((error) => error)) {
            alert('入力内容を確認してください。');
            return;
        }

        if (!mailValid) {
            alert('有効なメールを入力してください。');
            return;
        }

            axios.post('join', joinData)
            .then((res)=>{
                alert('WELCOME!')
                navigate('/login')
                
            })
            .catch((error)=>{
                alert(error)
                console.log(error)
            })
        };

    console.log(joinData)



    return (
        <div className='join-div'>
            <h3>JOIN</h3>
            <div className='join-content'>
                <table className='join-table'>
                    <tbody>
                        <tr>
                            {/* <td>Email</td> */}
                            <td>
                                <input 
                                    type='mail'
                                    placeholder='メールを入力してください'
                                    name='mail'
                                    onChange={(e)=>{goJoin(e)}}
                                    onBlur={checkMail} // 입력 후 포커스가 벗어났을 때 중복 확인
                                    />
                                <div
                                    className={`feedback ${
                                        validationErrors.mail
                                            ? mailValid
                                                ? "good"
                                                : "error"
                                            : ""
                                    }`}
                                >
                                    {validationErrors.mail}
                                </div>

                            </td>
                        </tr>
                        <tr>
                            {/* <td>Name</td> */}
                            <td>
                                <input 
                                    type='text' 
                                    placeholder='名前を入力してください'
                                    name='userName'
                                    onChange={(e)=>{goJoin(e)}}
                                    />
                            </td>
                        </tr>
                        <tr>
                            {/* <td>Password</td> */}
                            <td>
                                <input 
                                    type='password' 
                                    placeholder='パスワードを入力してください'
                                    name='userPw'
                                    onChange={(e)=>{goJoin(e)}}
                                    />
                                 <div
                                    className={`feedback ${
                                        validationErrors.userPw ? "error" : "good"
                                    }`}
                                >
                                    {validationErrors.userPw}
                                </div>

                            </td>
                        </tr>
                        <tr>
                            {/* <td>Password</td> */}
                            <td>
                                <input 
                                    type='password' 
                                    placeholder='パスワードをもう一度入力してください'
                                    name='userPwChk'
                                    onChange={(e)=>{goJoin(e)}}
                                />
                                  <div
                                    className={`feedback ${
                                        validationErrors.userPwChk ? "error" : "good"
                                    }`}
                                >
                                    {validationErrors.userPwChk}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className='join-btn'>
                    <button type='button' onClick={()=>{handleSignUp()}}>Sign up</button>
                </div>
            </div>
        </div>
    );
}

export default Join;
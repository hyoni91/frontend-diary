import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { data } from 'react-router-dom';

const WriteFrom = ({loginInfo}) => {
    console.log(loginInfo.userNum)
    const [startDate, setStartDate] = useState(new Date());
    //오늘의 감정
    const [cate, setCate] = useState([])
    //일기목록
    const [diaryList, setDiaryList] = useState([])
    //일기작성
    const [writeInfo, setWriteInfo] = useState({
        title : '',
        content : '',
        dDate : startDate.toISOString().split('T')[0],
        cateNum : 0,
        userNum : loginInfo? loginInfo.userNum : 0,
        secret : 'N'
    })

    //writeInfo 실시간갱신
    const writeHandle = (e) => {
        const {name, value} = e.target
        setWriteInfo({
            ...writeInfo,
            [name]: value,
        });
    }

    //날짜 선택
    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0]; 
        setStartDate(date); // 선택 날짜 
        setWriteInfo((prev) => ({ // writeInfo갱신
            ...prev,
            dDate: formattedDate,
        }));
    };
    

    //감정선택
    useEffect(()=>{
        axios.get('/cateList')
        .then((res)=>{
            setCate(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    console.log(writeInfo)

    //일기저장버튼
    const saveButton = ()=>{
        axios.post('/writeFrom', writeInfo)
        .then((res)=>{
          alert("Success")
          setWriteInfo({
            title : '',
            content : '',
            dDate : startDate.toISOString().split('T')[0],
            cateNum : 0,
            userNum : loginInfo? loginInfo.userNum : 0,
            secret : 'N' 
          })
        })
        .catch((error)=>{
            alert(error)
            console.log(error)
        })
    }

    return (
        <div className='diary-div'>
          <h2>My Diary</h2>
            <div className='diary-header'>
              <input 
                  type='text' 
                  placeholder='title' 
                  name='title'
                  value={writeInfo.title}
                  onChange={(e)=>{writeHandle(e)}}
              />
              <select 
                name='cateNum' 
                onChange={(e)=>{writeHandle(e)}}
                value={writeInfo.cateNum}
              >
                <option value={0}>--emotion--</option>
                  {
                    cate.map((cate, i) => (
                      <option key={i} value={cate.cateNum}>
                        {cate.cateName}
                      </option>
                      ))
                  }
                </select>
                <DatePicker
			            selected={startDate}
                  onChange={(date) => {
                    handleDateChange(date) 
                   }}
			            dateFormat="YYYY-MM-DD"
                  showTimeSelect={false}
			          />
            </div>
              <div className='diary-content'>
                <textarea 
                  placeholder='content' 
                  name='content'
                  value={writeInfo.content}
                  onChange={(e)=>{writeHandle(e)}}
                />
              </div>
              <div>
                <button type='button' onClick={()=>{saveButton()}}>Save</button>
              </div>    
        </div>
    );
};

export default WriteFrom;
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Diary.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const  Diary = ({loginInfo}) => {
    console.log(loginInfo.userNum)

    //오늘의 감정
    const [cate, setCate] = useState([])
    //일기작성
    const [writeInfo, setWriteInfo] = useState({
        title : '',
        content : '',
        dDate : '',
        cateNum : 0
    })
    //일기목록
    const [diaryList, setDiaryList] = useState([])
    //datepicker
    const [startDate, setStartDate] = useState(new Date());

    const writeHandle = (e) => {
        const {name, value} = e.target
        setWriteInfo({
            ...writeInfo,
            [name]: value,
            dDate : startDate
        });
    }

    console.log(writeInfo)

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



    return (
        <div className='diary-div'>
            <h2>My Diary</h2>
            <div className='diary-header'>
                <input 
                    type='text' 
                    placeholder='title' 
                    name='title'
                    onChange={(e)=>{writeHandle(e)}}
                />
                <select name='cateNum' onChange={(e)=>{writeHandle(e)}}>
                    <option value={0}>--emotion--</option>
                    {cate.map((cate, i) => (
                        <option key={i} value={cate.cateNum}>
                            {cate.cateName}
                        </option>
                    ))}
                </select>
                <DatePicker
			      selected={startDate}
                  onChange={(date) => {
                    setStartDate(date); // 날짜 선택 시 startDate 업데이트
                    setWriteInfo({
                        ...writeInfo,
                        dDate: date // 실시간으로 dDate 업데이트
                    });
                 }}
			      dateFormat="yyyy-MM-dd"
			    />
            </div>
            <div className='diary-content'>
                <textarea 
                    placeholder='content' 
                    name='content'  
                    onChange={(e)=>{writeHandle(e)}}
                />
            </div>
        </div>
    );
};

export default  Diary;
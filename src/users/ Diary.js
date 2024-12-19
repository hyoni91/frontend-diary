import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './Diary.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReactModal from 'react-modal'
import Writeform from './Writeform';

const  Diary = ({loginInfo}) => {
    console.log(loginInfo.userNum)
    //일기저장버튼
    // const saveButton = ()=>{
    // axios.post()''
    // .then()
    // .catch()}datepicker
    const [startDate, setStartDate] = useState(new Date());
    //모달창 여부 
    const [modalOpen, setModalOpen] = useState(true)
    //클릭하면 모달창 열고 닫기
    const showModal = () => {
     setModalOpen(!modalOpen)
    }
    //오늘의 감정
    const [cate, setCate] = useState([])
    //일기목록
    const [diaryList, setDiaryList] = useState([])

    //일기작성
    const [writeInfo, setWriteInfo] = useState({
        title : '',
        content : '',
        dDate : '',
        cateNum : 0
    })

    //writeInfo 실시간갱신
    const writeHandle = (e) => {
        const {name, value} = e.target
        setWriteInfo({
            ...writeInfo,
            [name]: value
        });
    }

    //날짜 선택
    const handleDateChange = (date) => {
        const formattedDate = date.toISOString().split('T')[0]; //YYYY-DD-MM
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

    //일기저장버튼
    const saveButton = ()=>{
        axios.post('')
        .then((res)=>{})
        .catch((error)=>{
            alert(error)
            console.log(error)
        })
    }



    return (
        <div className='diary-div'>
            <h2>My Diary</h2>
            
            { modalOpen?
          <ReactModal
            isOpen={true}
            ariaHideApp={false}
            onRequestClose={() => {setModalOpen(false)}}
            style={{
              overlay: {
                position: 'fixed',
                borderRadius : 10,
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(0,0,0, 0.6)'
              },
              content: {
                position: 'absolute',
                width: '710px',
                height: '50%',
                top: '180px',
                left: '20%',
                right: '80%',
                bottom: '50%',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
              }
            }}
            >
              <div>
                <Writeform 
                    writeHandle={writeHandle} 
                    cate={cate} DatePicker={DatePicker} 
                    startDate={startDate} 
                    handleDateChange={handleDateChange}
                    setModalOpen={setModalOpen}
                />
              </div>
            </ReactModal>
            
            :
            null
          }
        </div>
    );
};

export default  Diary;
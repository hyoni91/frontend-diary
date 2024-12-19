import React from 'react';
import ReactModal from 'react-modal';
import './Writeform.css'

const Writeform = ({writeHandle,cate,DatePicker,startDate,handleDateChange, setModalOpen}) => {


    return (
        <div>
            <div className='diary-header'>
                <div className='x-btn' onClick={()=>{setModalOpen(false)}}>
                    <i className="bi bi-x" />
                </div>
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
                    handleDateChange(date) 
                    // setStartDate(date); 
                    // setWriteInfo({
                    //     ...writeInfo,
                    //     dDate:  date.toISOString().split('T')[0]// 실시간으로 dDate 업데이트(단점 : 유지보수 어려움 )
                    // });
                 }}
			      dateFormat="yyyy-MM-dd"
                  showTimeSelect={false}
			    />
            </div>
            <div className='diary-content'>
                <textarea 
                    placeholder='content' 
                    name='content'  
                    onChange={(e)=>{writeHandle(e)}}
                />
            </div>
            <div>
                <button type='button'>Save</button>
            </div>
        </div>
    );
};

export default Writeform;
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const OpenSpace = () => {
    const[diaryList, setDiaryList] = useState([])
    
    useEffect(()=>{
        axios.get('/openDiaryList')
        .then((res)=>{
            console.log(res.data)
            setDiaryList(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    return (
        <div>
            <div class="container text-center">
                <div class="row lg-3 md-2 sm-1">

                {
                    diaryList.map((diary, index)=>{
                        return(
                            <div class="col">
                                <div class="card" style={{width: '18rem'}}>
                                    <img src="https://picsum.photos/600/400" class="card-img-top" alt="..." />
                                    <div class="card-body">
                                        <p class="card-text">{diary.title}</p>
                                        <p class="card-text">{diary.content}</p>
                                        <p class="card-text">{diary.d_date}</p>
                                    </div>
                                </div>
                            </div>
                        )   
                    })
                }
                    </div>
                    
                </div>
            </div>
    );
};

export default OpenSpace;
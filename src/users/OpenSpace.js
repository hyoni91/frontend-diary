import axios from 'axios';
import React, { useEffect } from 'react';

const OpenSpace = () => {

    useEffect(()=>{
        axios.get('/openDiaryList')
        .then((res)=>{
            console.log(res.data)
        })
        .catch((error)=>{
            console.log(error)
        })
    },[])

    return (
        <div>
            <div class="container text-center">
                <div class="row lg-3 md-2 sm-1">
                    <div class="col">
                        <div class="card" style={{width: '18rem'}}>
                            <img src="https://picsum.photos/600/400" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card" style={{width: '18rem'}}>
                            <img src="https://picsum.photos/600/400" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card" style={{width: '18rem'}}>
                            <img src="https://picsum.photos/600/400" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                    <div class="col">
                        <div class="card" style={{width: '18rem'}}>
                            <img src="https://picsum.photos/600/400" class="card-img-top" alt="..." />
                            <div class="card-body">
                                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default OpenSpace;
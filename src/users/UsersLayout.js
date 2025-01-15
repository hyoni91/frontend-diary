import React from 'react';
import Slider from "react-slick";
import './UsersLayout.css';
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const UsersLayout = () => {
const settings = {
  dots: true,
  infinite: true,
  slidesToShow: 3,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 4000,
  cssEase: "linear"
};
       
    
    return (
        <div>
             <div className="slider-container">
                <Slider {...settings}>
                    <div>
                        <h3>1</h3>
                    </div>
                    <div>
                        <h3>2</h3>
                    </div>
                    <div>
                        <h3>3</h3>
                    </div>
                    <div>
                        <h3>4</h3>
                    </div>
                    <div>
                        <h3>5</h3>
                    </div>
                    <div>
                        <h3>6</h3>
                    </div>
                </Slider>
            </div>
        </div>
    );
};

export default UsersLayout;
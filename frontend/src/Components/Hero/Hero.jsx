import React from 'react'
import './Hero.css'
import backgroundImage from '../Assets/denim-2_1400x.webp';

const Hero = () => {
    return (
        <div className="slider-area pos-relative">
            <div className="slider-active">
                <div
                    className="single-slider slider-height d-flex align-items-center justify-content-center"
                    style={{
                        backgroundImage:`url(${backgroundImage})`,
                    }}
                >
                    <div className="container">
                        <div className="row">
                            <div className="col-xl-9 col-md-12">
                                <div className="slider-content slider-content-2">
                                    <h1
                                        className="white-color f-700"
                                        data-animation="fadeInUp"
                                        data-delay=".2s"
                                    >
                                        {/* <span>Admissions Going On </span> */}
                                        <br />
                                        {/* Eduara University */}
                                    </h1>
                                    {/* <p data-animation="fadeInUp" data-delay=".4s">
                                        Sorem ipsum dolor sit amet consectetur adipisicing elit sed do
                                        eiusmod tempor <br /> incididunt ut labore et dolore magna
                                        aliqua enim ad minime.
                                    </p> */}
                                    <button
                                        className="theme-btn"
                                        data-animation="fadeInUp"
                                        data-delay=".6s"
                                    >
                                        {/* <span className="btn-text">admit now</span> */}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

    )
}

export default Hero
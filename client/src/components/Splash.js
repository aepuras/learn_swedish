import React from 'react';
import './Splash.css';

const Splash = () => (
    <div className="overlay">
        <div className="preload-wrapper">
            <div className="spinner">
                <div className="bounce1"></div>
                <div className="bounce2"></div>
                <div className="bounce3"></div>
            </div>
        </div>
    </div>
);

export default Splash;

import React from 'react';
import { useNavigate } from "react-router-dom";
import LycheeLogo from '../LycheeLogo.png';
import '.././App.css'

const VideoPageNavBar = () => {
    const navigate = useNavigate();

    const newVideo = () => {
        navigate(`/video`);
    }

    return (
        <nav 
            className="navbar bg-body-tertiary">
            <div 
                className="container-fluid align-center">
                <a 
                    className="navbar-brand" 
                    href="/">
                    <img
                        src={LycheeLogo} 
                        alt="Lychee Logo"
                        width="50" 
                        height="50" 
                        className="d-inline-block align-text-top" /> 
                </a>
                <div className="newVideo">
                    <button 
                        className="btn btn-danger pt-3 pb-3 ps-4 pe-4" onClick={newVideo}>
                            New Video
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default VideoPageNavBar;
import React from 'react';
import { useNavigate } from "react-router-dom";
import LycheeLogo from '../LycheeLogo.png';
import '.././App.css'
import IssueModal from './IssueModal';
import Disclaimer from './Disclaimer';

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
                    className="navbar-brand d-flex align-items-center" 
                    href="/">
                    <img
                        src={LycheeLogo} 
                        alt="Lychee Logo"
                        width="50" 
                        height="50" 
                        className="" /> 
                        <div 
                            className=''
                            style={{
                                color: '#ba0b32',
                                fontWeight: '500',
                            }}
                            >
                                Lychee
                        </div>
                </a>
                <div className="newVideo d-flex items-center gap-10">
                    <Disclaimer />
                    <IssueModal />
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
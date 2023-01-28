import React from 'react';
// import colors from '../colors';
import LycheeLogo from '../LycheeLogo.png';

const NavBar = () => {
    return (
        <nav 
            className="navbar bg-body-tertiary position-sticky top-0">
            <div 
                className="container">
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
            </div>
        </nav>
    //     <nav className="navbar navbar-expand-lg bg-body-tertiary">
    //         <div className="container">
    //             <a 
    //                 className="navbar-brand" 
    //                 href="/">
    //                 <img
    //                     src="/docs/5.3/assets/brand/bootstrap-logo.svg" 
    //                     alt="Logo"
    //                     width="30" 
    //                     height="24" 
    //                     className="d-inline-block align-text-top" />
    //             </a>
    //             <button clclassNameass="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    //                 <span className="navbar-toggler-icon"></span>
    //             </button>
    //             <div className="collapse navbar-collapse" id="navbarSupportedContent">
    //                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
    //                     <li className="nav-item">
    //                         <a className="nav-link" ariaCurrent="page" href="/">Home</a>
    //                     </li>
    //                     <li className="nav-item">
    //                         <a className="nav-link" href="/">Link</a>
    //                     </li>
    //                     <li className="nav-item">
    //                         <a className="nav-link" href="/">Disabled</a>
    //                     </li>
    //                 </ul>
    //             </div>
    //         </div>
    //   </nav>
    );
};

export default NavBar;
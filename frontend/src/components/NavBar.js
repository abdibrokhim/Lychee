import React from 'react';
// import colors from '../colors';
import LycheeLogo from '../LycheeLogo.png';

const NavBar = () => {

    const ProductHunt = () => {
        return (
            <div>
                <a 
                    href="https://www.producthunt.com/posts/lychee-2?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-lychee&#0045;2" 
                    target="_blank">
                        <img 
                            src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=381107&theme=light" 
                            alt="Lychee - Lychee&#0032;&#0045;&#0032;Learn&#0032;more&#0032;from&#0032;YouTube&#0032;videos&#0032;with&#0032;AI | Product Hunt" 
                            style={{
                                width: '250px', 
                                height: '54px'
                            }} 
                            width="250" 
                            height="54" 
                        />
                </a>
            </div>
        );
    };

    return (
        <nav 
            className="navbar bg-body-tertiary position-sticky top-0">
            <div 
                className="container-fluid">
                <a 
                    className="navbar-brand d-flex align-items-center" 
                    href="/">
                    <img
                        src={LycheeLogo} 
                        alt="Lychee Logo"
                        width="50" 
                        height="50" 
                        className="" 
                    /> 
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
                <div 
                    className='ProductHunt'>
                    <ProductHunt />
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
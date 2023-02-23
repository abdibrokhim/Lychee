import React from 'react';
import colors from "../colors";

const Footer = () => {
    return (
        <>
            <div
                className="footer d-flex justify-center mt-5 gap-3"
                style={{
                    color: colors.const_dark_text,
                    fontSize: '16px',
                    fontWeight: '400',
                }}>
                <a
                    className="footerLinks"
                    href="https://docs.google.com/presentation/d/15Oh-v1J2zAoGjwSxBoOBoIWma0ZpZ9j9jCUTdKEvnGY/edit#slide=id.p"
                    target="_blank"
                    rel="noreferrer"
                    >
                        Presentation
                </a>
                <a
                    className="footerLinks"
                    href="https://github.com/abdibrokhim/Lychee"
                    target="_blank"
                    rel="noreferrer"
                    >
                        Open Source
                </a>
                <a
                    className="footerLinks"
                    href="https://twitter.com/abdibrokhim"
                    target="_blank"
                    rel="noreferrer"
                    >
                        Twitter
                </a>
                <a 
                    className='primaryHover'
                    href='mailto: [abdibrokhim@gmail.com] ?subject=Lychee&body=Hi%20abdibrokhim,'
                    target='_blank'
                    rel="noreferrer"
                    >
                        Email
                </a>
                <a 
                    className='primaryHover'
                    href='https://www.buymeacoffee.com/abdibrokhim'
                    target='_blank'
                    rel="noreferrer"
                    >
                        Donate & Support
                </a>
            </div>
            <div 
                className="mt-3 pb-3"
                style={{
                    color: colors.const_dark_text,
                    fontSize: '14px',
                }}>
                    Lychee Feb 23 Version. First Release. Free Research Preview. Our goal is to improve education, help youth to get more from YouTube videos with AI. Your feedback will help us improve.
            </div>
        </>
    );
};

export default Footer;
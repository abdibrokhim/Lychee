import React from 'react';
// import colors from '../colors';
// import faq from '.././faq/faq.json';

const IssueModal = () => {
    return (
        <div 
            className=''
            style={{
                // marginTop: '20px',
            }}>
            <div 
                style={{
                    fontSize: '16px',
                    // color: '#ba0b32',
                }}
                type="button" 
                className="primaryHover" 
                data-bs-toggle="modal" 
                data-bs-target="#faqModal">
                    Facing An Issue?
            </div>
            <div 
                className="modal fade" 
                id="faqModal" 
                tabIndex="-1"
                aria-labelledby="faqModalLabel" 
                aria-hidden="true">
                <div 
                    className="modal-dialog modal-dialog-centered">
                    <div 
                        className="modal-content">
                        <div 
                            className="modal-header"
                            style={{
                                fontSize: '20px',
                            }}
                            >
                            <div>Facing An Issue?</div>
                            <button 
                                type="button" 
                                className="btn-close" 
                                // style={{
                                //     color: 'black',
                                //     backgroundColor: '#ba0b32',
                                // }}
                                data-bs-dismiss="modal" 
                                aria-label="Close">
                            </button>
                        </div>
                        <div 
                            style={{
                                fontSize: '16px',
                            }}
                            className="modal-body">
                                <div
                                    className='pb-3'
                                    > 
                                    <div className='pt-2'> - Make sure you have stable internet connection.</div>
                                    <div className='pt-2'> - There can be Error with current OpenAI API Key.</div>
                                    <div className='pt-2'> - Zero tokens/credits left for current OpenAI API Key.</div>
                                </div>
                                <hr/>
                                <div 
                                    className='pt-3 pb-2'
                                    >
                                        Contact Me:
                                </div>
                                <div
                                    className='pb-3 gap-3 d-flex'
                                    >
                                    <a 
                                        className='primaryHover'
                                        href='mailto: [abdibrokhim@gmail.com] ?subject=Lychee%20Issue&body=Hi%20Abdibrokhim%2C%0A%0AI%20have%20an%20issue%20with%20Lychee%20and%20I%20would%2'
                                        target='_blank'
                                        rel="noreferrer"
                                        >
                                            Email
                                    </a>
                                    <a 
                                        className='primaryHover'
                                        href='https://t.me/abdibrokhim'
                                        target='_blank'
                                        rel="noreferrer"
                                        >
                                            Telegram
                                    </a>
                                    <a 
                                        className='primaryHover'
                                        href='https://linktr.ee/abdibrokhim'
                                        target='_blank'
                                        rel="noreferrer"
                                        >
                                            Linktree
                                    </a>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IssueModal;
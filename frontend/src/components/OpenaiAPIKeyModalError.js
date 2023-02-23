import React from 'react';
// import colors from '../colors';
// import faq from '.././faq/faq.json';

const OpenaiAPIKeyModalError = () => {
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
                data-bs-target="#openaiKeyError">
                    OpenAI API Key Error!
            </div>
            <div 
                className="modal fade" 
                id="openaiKeyError" 
                tabIndex="-1"
                aria-labelledby="openaiKeyError" 
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
                            <div>OpenAI API Key Error!</div>
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
                                <div className='pt-2'> - Make sure you saved OpenAI API Key.</div>
                                <div className='pt-2'> - ake sure you have a working OpenAI API Key.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OpenaiAPIKeyModalError;
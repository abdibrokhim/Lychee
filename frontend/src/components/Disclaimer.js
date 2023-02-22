import React from 'react';
// import colors from '../colors';
// import faq from '.././faq/faq.json';

const Disclaimer = () => {
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
                data-bs-target="#disclaimerModal">
                    Disclaimer
            </div>
            <div 
                className="modal fade" 
                id="disclaimerModal" 
                tabIndex="-1"
                aria-labelledby="disclaimerModalLabel" 
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
                            <div>Disclaimer</div>
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
                                <div className='pt-2'> - It will automatically show last saved transcript, if video you put does not have transcript.</div>
                                <div className='pt-2'> - Enabling Memory reqiures more tokens.</div>
                                <div className='pt-2'> - It can answer only question related to the current video</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
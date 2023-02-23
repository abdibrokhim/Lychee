import React from 'react';
// import colors from '../colors';
// import faq from '.././faq/faq.json';

const CustomApiKey = () => {
    // const [email, setEmail] = React.useState('');
    const [openai_api_key, setOpenai_api_key] = React.useState('');
    const [error, setError] = React.useState('');

    const SaveApiKey = () => {
        console.log('openai_api_key', openai_api_key);
        console.log('error', error);

        localStorage.setItem('openai_api_key', JSON.stringify({key: openai_api_key}));
        setError('');
    }

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
                data-bs-target="#openai_api_key">
                    API Key
            </div>
            <div 
                className="modal fade" 
                id="openai_api_key" 
                tabIndex="-1"
                aria-labelledby="openai_api_key" 
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
                            <div>Your OpenAI API Key, more stable, 
                                <span 
                                    style={{
                                        marginLeft: '5px',
                                        color: '#ba0b32',
                                    }}>charge by usage
                                </span>
                            </div>
                        </div>
                        <div 
                            style={{
                                fontSize: '16px',
                            }}
                            className="modal-body">
                            <div
                                className='pb-3 d-flex flex-row gap-2 items-center'
                                > 
                                <input 
                                    // value={input}
                                    autoComplete="off"
                                    autofocus="true"
                                    style={{
                                        fontSize: '16px',
                                        width: '100%',
                                        height: '40px',
                                        borderRadius: '5px',
                                        border: '1px solid #ba0b32',
                                        padding: '10px',
                                        outline: 'none',
                                    }}
                                    type="text" 
                                    placeholder='Enter OpenAI API Key here'
                                    onChange={(e) => setOpenai_api_key(e.target.value)}
                                ></input>
                                <button 
                                    style={{
                                        height: '40px',
                                    }}
                                    className="btn btn-danger pt-2 pb-2 pe-3 ps-3" 
                                    onClick={SaveApiKey}>
                                        Save
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CustomApiKey;
import React, { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from "openai";
// import SpeechOutput from './SpeechOutput';
// import SpeechInput from './SpeechInput';
// import outputAudio from '.././audios/output.wav';
// import openai_logo from '.././openai-logo.png';
import '.././App.css';
// require('dotenv').config();

import transcriptJson from ".././transcripts/script.json";
// import noTranscriptJson from ".././transcripts/noscript.json";

// import { Markdown } from 'react-markdown';
// import icons from '.././Icons';
import colors from '.././colors';
import genWords from '../generalWords';

const ChatGPT = () => {
    const [openai_api_key, setOpenai_api_key] = React.useState([]);

    // const configuration = new Configuration({
    //     apiKey: openai_api_key,
    // });
    // const openai = new OpenAIApi(configuration);

    const [input, setInput] = useState("");
    // const [result, setResult] = useState("");
    // const [userInput, setUserInput] = useState("");
    // const [logo, setLogo] = useState("");
    const [transcript, setTranscript] = useState("");
    const [loading, setLoading] = useState(false);
    const [chatItems, setChatItems] = useState([]);
    const [memory, setMemory] = useState(false);
    // const [quizMeItems, setQuizMeItems] = useState([]);
    // const [text, setText] = useState('');
    
    // const [markdownText, setMarkdownText] = useState('');

    const summarizeText = "I am coming up with a summary...";
    const quizMeText = "I am coming up with a quiz...";
    const quizMeMode = "\n\nsend single multiple choice quiz question related to the Article";
    const articleText = "\nHere is Article:\n";
    // const quizMeMode = "\n\nsend quiz questions related to the Article\n";
    const summarizeMode = "\n\nsummarize the Article\n";
    
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('openai_api_key'));

        const key = data && data.key;

        console.log('key', key);
        if (key) {
            setOpenai_api_key(key);
        } else {
            setOpenai_api_key('');
        }
        console.log('from ChatGPT');
        console.log('openai_api_key:', typeof(openai_api_key));
    }, [openai_api_key]);

    const configuration = new Configuration({
        apiKey: openai_api_key,
    });
    const openai = new OpenAIApi(configuration);

    const alertOptions  = {
        notSavedAPIKey: 'Make sure you saved OpenAI API Key.',
        notWorkingAPIKey: 'Make sure you have a working OpenAI API Key.',
    }

    const alertOpenaiKeySaved = () => {
        alert(alertOptions.notSavedAPIKey);
    }

    const alertOpenaiKeyWorking = () => {
        alert(alertOptions.notWorkingAPIKey);
    }

    const completion = async () => {
        setLoading(true);

        // check user input for simple english words
        setTimeout(() => {
            for (const [key, values] of Object.entries(genWords[0])) {
                if (input.toLowerCase().includes(key)) {
                    const randomIndex = Math.floor(Math.random() * values.length);
                    setChatItems([
                        ...chatItems,
                        { content: values[randomIndex], time: '', isAnswer: true },]);
                    setLoading(false);
                    return ;
                }
            }
        }, 2000);

        const memoryOn = transcript.map((item) => item).join('\n')+'\n'+chatItems.map((item) => item.content).join('\n')+'\n';
        const memoryOff = transcript.map((item) => item).join('\n')+'\n'+input+'\n';

        // handleTranscript();
        // setLogo(userLogo);
        // setText('');
        // setUserInput(input);
        console.log(input);

        console.log('--------chatItems--------');
        // console.log(chatItems);
        console.log('---------transcript-------');
        // console.log(transcript);
        console.log('--------all--------');
        console.log(memory ? memoryOn : memoryOff);
        console.log('--------end--------');


        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: memory ? memoryOn : memoryOff,
            temperature: 0.8,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        console.log(response.data.choices[0].text);
        // setLogo(opeanaiLogo);
        setChatItems([
            ...chatItems,
            { content: response.data.choices[0].text, isAnswer: true },]);
        setLoading(false);
        setInput('');
    }

    const quizMe = async () => {
        setChatItems([
            ...chatItems,
            { content: quizMeText, isAnswer: true },]);
        setLoading(true);
        // handleTranscript();
        
        const quiz = articleText+transcript.map((item) => item).join('\n')+'\n\n'+quizMeMode
        // setUserInput(quiz);
        console.log(quiz);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: quiz,
            temperature: 0.8,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        console.log(response.data.choices[0].text);
        let a = response.data.choices[0].text.replace('Q.', '').replace('Q:', '');

        // if (response.data.choices[0].text.includes('1.')) {
        //     let b = response.data.choices[0].text.split('2.').split('2:')[0];
        //     a = b;
        // }
        // setLogo(opeanaiLogo);
        setChatItems([
            ...chatItems,
            { content: a, isAnswer: true },]);
        setLoading(false);
    }
    
    const summarize = async () => {
        setChatItems([
            ...chatItems,
            { content: summarizeText, isAnswer: true },]);
        setLoading(true);
        // handleTranscript();

        const summary = articleText+transcript.map((item) => item).join('\n')+'\n\n'+summarizeMode
        // setUserInput(summary);
        console.log(summary);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: summary,
            temperature: 0.8,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        console.log(response.data.choices[0].text);
        // setLogo(opeanaiLogo);
        setChatItems([
            ...chatItems,
            { content: response.data.choices[0].text, isAnswer: true },]);
        setLoading(false);
    }

    // transcript mapping transcript ready to use
    useEffect(() => {
        let newTranscript = transcriptJson.map((line) => line.text);
        setTranscript(newTranscript);
    }, []);

    // const handleTranscript = async () => {
    //     return transcript;
    // }

    // chatitems all messages
    useEffect(() => {
        console.log(chatItems)
        if (chatItems.length === 0) return;
        if (chatItems[chatItems.length - 1].isAnswer) return;
        completion();
    
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [chatItems]);
    
    function handleSubmit(e) {
        e.preventDefault();
    
        // elChatList.appendChild(getChatItem(input, false));
        // elChatList.appendChild(getChatItem(input, false));
        setChatItems([...chatItems, { content: input, isAnswer: false }]);
    }

    const ChatItem = ({ isAnswer, content }) => {
        const userLogo = (
            <div className='w-[30px] flex flex-col relative items-start'>
                {userSvg}
            </div>
        );

        const aiLogo = (
            <div className='w-[30px] flex flex-col relative items-start'>
                {lycheeLogo}
            </div>
        );

        return (
          <li className={`flex py-3 ${isAnswer ? "justify-start" : "justify-start"}`}>
            {isAnswer ? aiLogo : userLogo}
            <div
              className={`relative max-w-xl px-4 text-white rounded shadow ${
                !isAnswer ? "bg-none text-white" : "bg-none text-white"
              }`} style={{whiteSpace: 'pre-wrap'}}>
                {content.trimStart()}
            </div>
          </li>
        );
    };

    const toggleMemory = () => {
        // setLoading(true);
        setMemory(!memory);
        console.log(!memory);
    }

    const sendIcon = (
        <svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 20 20"
          className="rotate-45"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
        </svg>
    );
    
    const spinner = (
        <div 
          className="spinner-border spinner-border-sm d-flex align-items-center" 
          role="status">
          <span 
            className="visually-hidden">
              Loading...
          </span>
        </div>
    );

    const lycheeLogo = (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            version="1.0" 
            width="36" 
            height="36" 
            viewBox="80 100 500.000000 500.000000" 
            preserveAspectRatio="xMidYMid meet">
            <g 
            transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" 
            fill="#ffffff" 
            stroke="none">
                <path 
                    d="M2285 3839 c-279 -40 -518 -131 -666 -253 -45 -37 -98 -67 -165 -95 -325 -136 -554 -356 -571 -552 -5 -51 -10 -63 -35 -80 -35 -25 -68 -88 -68 -129 0 -40 32 -103 64 -123 l25 -17 -24 -36 c-47 -69 -25 -166 46 -207 21 -12 39 -25 39 -30 0 -4 -9 -24 -20 -44 -63 -117 25 -281 160 -299 53 -7 58 -14 35 -54 -24 -42 -18 -109 15 -167 24 -42 40 -56 86 -78 57 -27 90 -29 160 -9 19 5 21 2 20 -53 -1 -102 66 -175 162 -175 l47 0 20 -52 c38 -98 157 -145 251 -100 34 16 36 16 63 -10 41 -39 89 -50 143 -32 l43 15 40 -38 c78 -76 174 -92 269 -45 51 25 55 25 84 10 60 -31 165 -14 191 31 9 17 12 17 58 0 79 -28 145 -18 210 33 19 15 41 20 85 20 92 0 168 43 202 114 l16 34 60 -5 c43 -4 72 -1 104 11 52 20 114 84 122 125 6 29 7 29 64 24 76 -7 103 0 149 43 47 42 68 108 51 164 -15 51 -13 57 18 63 79 17 136 93 131 175 -3 45 -2 47 29 53 65 13 96 74 75 144 -9 30 -8 36 13 54 35 31 43 87 20 141 -4 10 4 21 24 32 34 20 48 60 32 100 -9 25 -7 31 24 62 40 40 45 80 13 120 l-21 26 21 34 c12 18 21 44 21 57 0 33 -35 88 -63 98 -16 6 -26 23 -35 57 -50 187 -279 386 -579 503 -29 11 -85 48 -124 80 -208 175 -538 273 -911 270 -90 -1 -190 -5 -223 -10z m836 -275 c157 -47 293 -213 294 -360 0 -51 -4 -66 -28 -97 -49 -64 -70 -54 -162 77 -71 102 -97 129 -202 207 -52 39 -97 77 -100 85 -12 32 8 65 50 84 52 24 78 25 148 4z m-1716 -251 c-30 -72 -49 -199 -40 -257 15 -88 85 -180 195 -256 77 -52 140 -83 258 -124 583 -203 1422 -107 1736 198 58 57 97 134 103 207 6 59 -16 180 -43 246 -9 19 -13 37 -10 40 6 6 120 -56 186 -101 241 -163 315 -397 188 -591 -158 -241 -582 -424 -1124 -486 -142 -17 -547 -17 -694 0 -164 18 -392 65 -523 107 -123 40 -334 136 -394 180 -192 143 -263 252 -263 404 0 175 119 322 372 460 40 21 73 38 75 37 1 -2 -9 -30 -22 -64z"/>
            </g>
        </svg>
    );

    const userSvg = (
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24"
            fill="none">
            <circle cx="12" cy="10" r="4" stroke="#ffffff" strokeLinecap="round"/>
            <circle cx="12" cy="12" r="12" stroke="#ffffff"/>
            <path 
                d="M18 18.7059C17.6461 17.6427 16.8662 16.7033 15.7814 16.0332C14.6966 15.3632 13.3674 15 12 15C10.6326 15 9.30341 15.3632 8.21858 16.0332C7.13375 16.7033 6.35391 17.6427 6 18.7059" 
                stroke="#ffffff" 
                strokeLinecap="round"/>
        </svg>
    );

    const bgRed = {
        backgroundColor: colors.const_brand_name,
        border: `1px solid ${colors.const_brand_name}`,
    };

    const bgLight = {
        backgroundColor: colors.const_light_text,
        border: `1px solid ${colors.const_brand_name}`,
    };

    return (
        <div className='RightSide col'>
            <div className="ChatSide p-3">
                <div className="flex-1 overflow-auto">
                    <div className="overflow-auto stretch flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto mx-auto lg:max-w-3xl lg:pt-6">
                        <ul className="ml-5 space-y-2 w-ful text-white overflow-auto">
                            {chatItems.map((item, i) => (
                                <ChatItem
                                    key={i}
                                    isAnswer={item.isAnswer}
                                    content={item.content}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="ButtonSide p-3">
                <div 
                    className="w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient">
                    <form
                        onSubmit={openai_api_key.length > 0 ? handleSubmit : alertOpenaiKeySaved}
                        data-chat-form
                        className="stretch flex flex-row gap-3 pt-2 last:mb-2 mx-auto md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
                        <div className="relative flex h-full flex-1 md:flex-col">
                            <div className="ml-1 mt-1.5 md:w-full md:m-auto md:flex md:mb-2 gap-2 justify-center"></div>
                            <div 
                                className="align-middle flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-white dark:border-gray-900/50 dark:text-dark dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                                    <textarea 
                                        value={loading ? "" : input}
                                        tabIndex="0" 
                                        data-id="request-:r4:-0" 
                                        rows="1" 
                                        placeholder="Ask any question related to the video..." 
                                        onChange={(e) => setInput(e.target.value)}
                                        className="textarea m-0 w-full resize-none border-0 bg-transparent p-0 pl-2 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:pl-0" 
                                    ></textarea>
                                    <button 
                                        disabled={loading || input === ""}
                                        id="chat-submit"
                                        type="submit"
                                        // onClick={completion}
                                        className="absolute p-1 rounded-md text-gray-500 bottom-1.5 right-1 md:bottom-2.5 md:right-2 hover:bg-gray-100 dark:hover:text-gray-700 dark:hover:bg-gray-200 disabled:hover:bg-transparent dark:disabled:hover:bg-transparent">
                                        {loading ? spinner : sendIcon}
                                    </button>
                                </div>
                            </div>
                        </form>
                    <div className='pt-3 d-flex gap-3'>
                        <button 
                            disabled={loading}
                            className='btn btn-danger pt-2 pb-2 ps-3 pe-3'
                            onClick={openai_api_key.length > 0 ? quizMe : alertOpenaiKeySaved}>
                            Quiz me
                        </button>
                        <button 
                            disabled={loading}
                            className='btn btn-danger pt-2 pb-2 ps-3 pe-3'
                            onClick={openai_api_key.length > 0 ? summarize : alertOpenaiKeySaved}>
                            Summarize
                        </button>
                        {/* <SpeechOutput url={outputAudio}/> */}
                        {/* <SpeechInput /> */}
                        <div 
                            className="enableMemory form-check form-switch">
                            <input 
                                onClick={toggleMemory}
                                className="form-check-input"
                                role="switch" 
                                style={memory ? bgRed : bgLight}
                                type="checkbox" 
                                id="flexSwitchCheckChecked" 
                                />
                            <label 
                                className="form-check-label" 
                                htmlFor="flexSwitchCheckChecked"
                                style={{
                                    color: colors.const_light_text
                                }}
                                >
                                Enable Memory
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatGPT;
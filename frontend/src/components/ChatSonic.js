import React, { useState, useEffect } from 'react';
import { Configuration, OpenAIApi } from "openai";
// import { useParams } from "react-router-dom";
// import SpeechOutput from './SpeechOutput';
// import SpeechInput from './SpeechInput';
// import outputAudio from '.././audios/output.wav';
// import openai_logo from '.././openai-logo.png';
import '.././App.css';
import transcriptJson from ".././transcripts/script.json";
// import { Markdown } from 'react-markdown';
// import icons from '.././Icons';
import colors from '.././colors';
import genWords from '../generalWords';

const ChatSonic = () => {
    const configuration = new Configuration({
        apiKey: "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",
    });
    const openai = new OpenAIApi(configuration);

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
    const quizMeMode = "\n\nCan you send single multiple choice question related to the Article?  without revealing answer";
    const articleText = "\nHere is the Article:\n";
    // const quizMeMode = "\n\nsend quiz questions related to the Article\n";
    const summarizeMode = "\n\nSummarize the Article\n";

    const meantionedStartDurationText = 'Now give more detailed answer for each paragraph. Where it was mentioned, Give starting time. Stricly use this format "start": 0.00 seconds.';


    const splitIntoParagraphs = (text) => {
        const paragraphs = text.split(".");
        return paragraphs;
    };
    
    const getStartDuration = (text) => {
        if (!text) return "";
    
        const startTimeRegex = /(?:start|Start): (\d+\.\d+)/;
        const match = text.match(startTimeRegex);
        if (!match) return "";

        console.log('getStartDuration(): ', match[1]);
    
        return match[1];
    };

    const compare = async (prompt) => {

        // const memoryOn = transcript.map((item) => item).join('\n')+'\n'+chatItems.map((item) => item.content).join('\n')+'\n';
        const memoryOff = transcript.map((item) => item).join('\n')+"\n\n"+prompt+'\n\n'+meantionedStartDurationText+'\n';

        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: memoryOff,
            temperature: 0.8,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        console.log(response.data.choices[0].text);

        return response.data.choices[0].text;
    };
    // let { id } = useParams();
    let id = "";

    const [timeSt, setTimeSt] = React.useState(0.00);
    // const [isRef, setIsRef] = React.useState(false);

    const videoURL = React.useRef(`https://www.youtube.com/watch?v=${id}`);
    // let videoURL = `https://www.youtube.com/watch?v=${id}`;

    React.useEffect(() => {
        videoURL.current = `${id}&t=${timeSt}s`;
        console.log(videoURL);
    }, [timeSt, id]);


    const timeFunc = (e) => {
        console.log(e.target.id);
        setTimeSt(e.target.id);
    }

    const refTimeStamp = (start) => {
        // setIsRef(true);
        const ref = `[ref${start}]`;

        return (
            <span
                onClick={timeFunc}
                className="me-2 highlight d-inline" 
                key={start}
                id={start} 
                style={{cursor: "pointer"}}
                >
                {ref}
            </span>
        );
    };

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    // }, []);

    // const getResponse = (input) => {
    //     for (const [key, values] of Object.entries(genWords[0])) {
    //         if (input.toLowerCase().includes(key)) {
    //             const randomIndex = Math.floor(Math.random() * values.length);
    //             return values[randomIndex];
    //         }
    //     }
    //     return "I don't understand what you're asking.";
    // };
      

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

        // console.log('--------chatItems--------');
        // console.log(chatItems);
        // console.log('---------transcript-------');
        // console.log(transcript);
        console.log('memory: ', memory);
        console.log('-----------------------');


        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: memory ? memoryOn : memoryOff,
            temperature: 0.8,
            max_tokens: 256,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        console.log('response: ', response.data.choices[0].text);
        // setLogo(opeanaiLogo);
        setChatItems([
            ...chatItems,
            { content: response.data.choices[0].text, time: '', isAnswer: true },]);
        setLoading(false);
        setInput('');
    }

    const quizMe = async () => {
        setChatItems([
            ...chatItems,
            { content: quizMeText, time: '', isAnswer: true },]);
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
        let a = response.data.choices[0].text
            .replace('Q.', '')
            .replace('Q:', '')
            .replace('a)', 'A.')
            .replace('b)', 'B.')
            .replace('c)', 'C.')
            .replace('d)', 'D.')
            .replace('a.', 'A.')
            .replace('b.', 'B.')
            .replace('c.', 'C.')
            .replace('d.', 'D.')
            .replace('a:', 'A.')
            .replace('b:', 'B.')
            .replace('c:', 'C.')
            .replace('d:', 'D.');

        // if (response.data.choices[0].text.includes('1.')) {
        //     let b = response.data.choices[0].text.split('2.').split('2:')[0];
        //     a = b;
        // }
        // setLogo(opeanaiLogo);
        setChatItems([
            ...chatItems,
            { content: a, time: '', isAnswer: true },]);
        setLoading(false);
    }
    
    const summarize = async () => {
        console.log('summarize');
        setChatItems([
            ...chatItems,
            { content: summarizeText, time: "", isAnswer: true },]);
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

        let splittedParagraphs = splitIntoParagraphs(response.data.choices[0].text);
        console.log('--------splittedParagraphs--------');
        console.log(splittedParagraphs);
        console.log('-----------------------');

        let content = [];

        for (let i = 0; i < splittedParagraphs.length; i++) {
            let c = await compare(splittedParagraphs[i]);
            console.log('--------compare--------');
            console.log(c);
            console.log('-----------------------');
            
            let t = getStartDuration(c);
            console.log('--------getStartDuration--------');
            console.log('start time: ', t);
            console.log('-----------------------');

            content.push({ content: splittedParagraphs[i], time: t, isAnswer: true });
        }
        
        setChatItems([
            ...chatItems, ...content,
        ]);

        // setLogo(opeanaiLogo);
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
        setChatItems([...chatItems, 
            { content: input, time: '', isAnswer: false }]);
    }

    const ChatItem = ({ isAnswer, content, time }) => {
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
            <li className='flex py-3 justify-start'>
                {isAnswer ? aiLogo : userLogo}
                <div
                    className='relative max-w-xl px-4 rounded shadow bg-none text-white'
                    style={{whiteSpace: 'pre-wrap'}}>
                    {content.trimStart()}
                    {time.length > 0 ? refTimeStamp(time) : <></>}
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

    // const opeanaiLogo = (
    //     <svg 
    //         width="41" 
    //         height="41" 
    //         viewBox="0 0 41 41" 
    //         fill="none" 
    //         xmlns="http://www.w3.org/2000/svg" 
    //         className="h-6 w-6">
    //         <path 
    //             d="M37.5324 16.8707C37.9808 15.5241 38.1363 14.0974 37.9886 12.6859C37.8409 11.2744 37.3934 9.91076 36.676 8.68622C35.6126 6.83404 33.9882 5.3676 32.0373 4.4985C30.0864 3.62941 27.9098 3.40259 25.8215 3.85078C24.8796 2.7893 23.7219 1.94125 22.4257 1.36341C21.1295 0.785575 19.7249 0.491269 18.3058 0.500197C16.1708 0.495044 14.0893 1.16803 12.3614 2.42214C10.6335 3.67624 9.34853 5.44666 8.6917 7.47815C7.30085 7.76286 5.98686 8.3414 4.8377 9.17505C3.68854 10.0087 2.73073 11.0782 2.02839 12.312C0.956464 14.1591 0.498905 16.2988 0.721698 18.4228C0.944492 20.5467 1.83612 22.5449 3.268 24.1293C2.81966 25.4759 2.66413 26.9026 2.81182 28.3141C2.95951 29.7256 3.40701 31.0892 4.12437 32.3138C5.18791 34.1659 6.8123 35.6322 8.76321 36.5013C10.7141 37.3704 12.8907 37.5973 14.9789 37.1492C15.9208 38.2107 17.0786 39.0587 18.3747 39.6366C19.6709 40.2144 21.0755 40.5087 22.4946 40.4998C24.6307 40.5054 26.7133 39.8321 28.4418 38.5772C30.1704 37.3223 31.4556 35.5506 32.1119 33.5179C33.5027 33.2332 34.8167 32.6547 35.9659 31.821C37.115 30.9874 38.0728 29.9178 38.7752 28.684C39.8458 26.8371 40.3023 24.6979 40.0789 22.5748C39.8556 20.4517 38.9639 18.4544 37.5324 16.8707ZM22.4978 37.8849C20.7443 37.8874 19.0459 37.2733 17.6994 36.1501C17.7601 36.117 17.8666 36.0586 17.936 36.0161L25.9004 31.4156C26.1003 31.3019 26.2663 31.137 26.3813 30.9378C26.4964 30.7386 26.5563 30.5124 26.5549 30.2825V19.0542L29.9213 20.998C29.9389 21.0068 29.9541 21.0198 29.9656 21.0359C29.977 21.052 29.9842 21.0707 29.9867 21.0902V30.3889C29.9842 32.375 29.1946 34.2791 27.7909 35.6841C26.3872 37.0892 24.4838 37.8806 22.4978 37.8849ZM6.39227 31.0064C5.51397 29.4888 5.19742 27.7107 5.49804 25.9832C5.55718 26.0187 5.66048 26.0818 5.73461 26.1244L13.699 30.7248C13.8975 30.8408 14.1233 30.902 14.3532 30.902C14.583 30.902 14.8088 30.8408 15.0073 30.7248L24.731 25.1103V28.9979C24.7321 29.0177 24.7283 29.0376 24.7199 29.0556C24.7115 29.0736 24.6988 29.0893 24.6829 29.1012L16.6317 33.7497C14.9096 34.7416 12.8643 35.0097 10.9447 34.4954C9.02506 33.9811 7.38785 32.7263 6.39227 31.0064ZM4.29707 13.6194C5.17156 12.0998 6.55279 10.9364 8.19885 10.3327C8.19885 10.4013 8.19491 10.5228 8.19491 10.6071V19.808C8.19351 20.0378 8.25334 20.2638 8.36823 20.4629C8.48312 20.6619 8.64893 20.8267 8.84863 20.9404L18.5723 26.5542L15.206 28.4979C15.1894 28.5089 15.1703 28.5155 15.1505 28.5173C15.1307 28.5191 15.1107 28.516 15.0924 28.5082L7.04046 23.8557C5.32135 22.8601 4.06716 21.2235 3.55289 19.3046C3.03862 17.3858 3.30624 15.3413 4.29707 13.6194ZM31.955 20.0556L22.2312 14.4411L25.5976 12.4981C25.6142 12.4872 25.6333 12.4805 25.6531 12.4787C25.6729 12.4769 25.6928 12.4801 25.7111 12.4879L33.7631 17.1364C34.9967 17.849 36.0017 18.8982 36.6606 20.1613C37.3194 21.4244 37.6047 22.849 37.4832 24.2684C37.3617 25.6878 36.8382 27.0432 35.9743 28.1759C35.1103 29.3086 33.9415 30.1717 32.6047 30.6641C32.6047 30.5947 32.6047 30.4733 32.6047 30.3889V21.188C32.6066 20.9586 32.5474 20.7328 32.4332 20.5338C32.319 20.3348 32.154 20.1698 31.955 20.0556ZM35.3055 15.0128C35.2464 14.9765 35.1431 14.9142 35.069 14.8717L27.1045 10.2712C26.906 10.1554 26.6803 10.0943 26.4504 10.0943C26.2206 10.0943 25.9948 10.1554 25.7963 10.2712L16.0726 15.8858V11.9982C16.0715 11.9783 16.0753 11.9585 16.0837 11.9405C16.0921 11.9225 16.1048 11.9068 16.1207 11.8949L24.1719 7.25025C25.4053 6.53903 26.8158 6.19376 28.2383 6.25482C29.6608 6.31589 31.0364 6.78077 32.2044 7.59508C33.3723 8.40939 34.2842 9.53945 34.8334 10.8531C35.3826 12.1667 35.5464 13.6095 35.3055 15.0128ZM14.2424 21.9419L10.8752 19.9981C10.8576 19.9893 10.8423 19.9763 10.8309 19.9602C10.8195 19.9441 10.8122 19.9254 10.8098 19.9058V10.6071C10.8107 9.18295 11.2173 7.78848 11.9819 6.58696C12.7466 5.38544 13.8377 4.42659 15.1275 3.82264C16.4173 3.21869 17.8524 2.99464 19.2649 3.1767C20.6775 3.35876 22.0089 3.93941 23.1034 4.85067C23.0427 4.88379 22.937 4.94215 22.8668 4.98473L14.9024 9.58517C14.7025 9.69878 14.5366 9.86356 14.4215 10.0626C14.3065 10.2616 14.2466 10.4877 14.2479 10.7175L14.2424 21.9419ZM16.071 17.9991L20.4018 15.4978L24.7325 17.9975V22.9985L20.4018 25.4983L16.071 22.9985V17.9991Z" 
    //             fill="#ffffff">
    //         </path>
    //     </svg>
    // );

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
                    <div className="overflow-auto stretch mx-5 flex flex-row gap-3 pt-2 last:mb-2 md:last:mb-6 lg:mx-auto mx-auto lg:max-w-3xl lg:pt-6">
                        <ul className="ml-5 space-y-2 w-ful text-white overflow-auto">
                            {chatItems.map((item, i) => (
                                <ChatItem
                                    key={i}
                                    isAnswer={item.isAnswer}
                                    content={item.content}
                                    time={item.time}
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
                        onSubmit={handleSubmit}
                        data-chat-form
                        className="stretch mx-2 flex flex-row gap-3 pt-2 last:mb-2 mx-auto md:last:mb-6 lg:mx-auto lg:max-w-3xl lg:pt-6">
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
                            onClick={quizMe}>
                                Quiz me
                        </button>
                        <button 
                            disabled={loading}
                            className='btn btn-danger pt-2 pb-2 ps-3 pe-3'
                            onClick={summarize}>
                                Summarize
                        </button>
                        {/* <SpeechOutput url={outputAudio}/> */}
                        {/* <SpeechInput /> */}
                        <div 
                            className="form-check form-switch">
                            <input 
                                onClick={toggleMemory}
                                className="form-check-input"
                                style={
                                    memory ? bgRed : bgLight
                                }
                                type="checkbox" 
                                role="switch" 
                                id="flexSwitchCheckChecked" />
                            <label 
                                className="form-check-label" 
                                htmlFor="flexSwitchCheckChecked"
                                style={{
                                    color: colors.const_light_text
                                }}
                                >
                                    Enable Memory</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatSonic;